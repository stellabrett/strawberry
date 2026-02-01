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
        Schema::create('symptoms', function (Blueprint $table) {
            $table->id(); // bigint unsigned auto-increment primary key
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade')
                ->comment('Reference to user who logged this symptom');
            $table->date('date')->comment('Date when symptom was experienced');
            $table->string('type', 100)->comment('Symptom type: cramps, mood, energy, etc.');
            $table->unsignedTinyInteger('intensity')->comment('Symptom intensity from 1 (mild) to 5 (severe)');
            $table->timestamps(); // created_at, updated_at
            
            // Indexes
            $table->index(['user_id', 'date']);
            $table->index('date');
            $table->index('type');
        });
        
        // Add a comment to the table
        DB::statement("ALTER TABLE symptoms COMMENT 'Daily symptom tracking data'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('symptoms');
    }
};
