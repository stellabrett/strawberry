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
        Schema::create('cycles', function (Blueprint $table) {
            $table->id(); // bigint unsigned auto-increment primary key
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade')
                ->comment('Reference to user who owns this cycle');
            $table->date('start_date')->comment('First day of the cycle');
            $table->date('end_date')->nullable()->comment('Last day of the cycle, nullable for ongoing cycles');
            $table->unsignedInteger('cycle_length')->nullable()->comment('Calculated cycle length in days');
            $table->timestamps(); // created_at, updated_at
            
            // Indexes
            $table->index(['user_id', 'start_date']);
            $table->index('start_date');
            
            // Constraint to prevent overlapping cycles
            // This will be enforced at application level since MariaDB doesn't support CHECK constraints easily
            // Alternatively, use a unique constraint on user_id + start_date as a basic protection
        });
        
        // Add a comment to the table
        DB::statement("ALTER TABLE cycles COMMENT 'Menstrual cycle tracking data'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cycles');
    }
};
