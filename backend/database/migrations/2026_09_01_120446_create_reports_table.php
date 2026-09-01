<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporter_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('job_id')->nullable()->constrained('jobs')->nullOnDelete();
            $table->foreignId('employer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('reason'); // e.g., pelecehan, penipuan, kata_kasar, tidak_merespons, lain
            $table->text('description');
            $table->string('evidence_path')->nullable();
            $table->enum('status', ['pending','investigating','resolved','warning','suspended'])->default('pending');
            $table->enum('priority', ['rendah','sedang','tinggi'])->default('sedang');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
