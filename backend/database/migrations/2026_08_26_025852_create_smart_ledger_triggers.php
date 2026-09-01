<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Create a table to log security anomalies (tamper attempts)
        Schema::create('security_anomalies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id');
            $table->string('attempt_type');
            $table->text('description');
            $table->timestamps();
        });

        // 2. Create PostgreSQL Stored Procedure (Function) for Smart Ledger Lock (if using PostgreSQL)
        if (DB::getDriverName() === 'pgsql') {
            DB::unprepared("
                CREATE OR REPLACE FUNCTION check_wage_tampering()
                RETURNS TRIGGER AS $$
                BEGIN
                    -- If worker is already assigned (job is matched/active), wage cannot be modified
                    IF OLD.worker_id IS NOT NULL AND NEW.wage <> OLD.wage THEN
                        -- Log anomaly
                        INSERT INTO security_anomalies (job_id, attempt_type, description, created_at, updated_at)
                        VALUES (OLD.id, 'WAGE_TAMPERING', 'Attempted to change wage from ' || OLD.wage || ' to ' || NEW.wage || ' after worker assigned.', NOW(), NOW());
                        
                        -- Raise Exception to block the update
                        RAISE EXCEPTION 'SMART LEDGER: Wage is permanently locked once a worker is assigned and cannot be modified.';
                    END IF;
                    
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            ");

            // 3. Create the Trigger
            DB::unprepared("
                CREATE TRIGGER prevent_wage_tampering_trigger
                BEFORE UPDATE ON jobs
                FOR EACH ROW
                EXECUTE FUNCTION check_wage_tampering();
            ");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::unprepared("DROP TRIGGER IF EXISTS prevent_wage_tampering_trigger ON jobs;");
            DB::unprepared("DROP FUNCTION IF EXISTS check_wage_tampering();");
        }
        Schema::dropIfExists('security_anomalies');
    }
};
