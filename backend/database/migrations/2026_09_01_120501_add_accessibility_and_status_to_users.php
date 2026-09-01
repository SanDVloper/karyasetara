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
        Schema::table('users', function (Blueprint $table) {
            $table->json('accessibility_preference')->nullable()->after('address');
            $table->boolean('is_suspended')->default(false)->after('accessibility_preference');
            $table->timestamp('suspended_at')->nullable()->after('is_suspended');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['accessibility_preference','is_suspended','suspended_at']);
        });
    }
};
