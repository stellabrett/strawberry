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
        Schema::create('notes', function (Blueprint $table) {
            $table->id(); // bigint unsigned auto-increment primary key
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade')
                ->comment('Reference to user who owns this note');
            $table->date('date')->comment('Date associated with this note');
            $table->text('content')->comment('Encrypted note content via Laravel casts');
            $table->timestamps(); // created_at, updated_at
            
            // Indexes
            $table->index(['user_id', 'date']);
            $table->index('date');
        });
        
        // Add a comment to the table
        DB::statement("ALTER TABLE notes COMMENT 'Private encrypted user notes'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
