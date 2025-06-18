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
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->foreignId('serial_number_id')
                  ->nullable()
                  ->constrained('serial_numbers')
                  ->onDelete('restrict');
        });

        Schema::table('serial_numbers', function (Blueprint $table) {
            $table->foreignId('stock_transaction_items_id')
                  ->nullable()
                  ->constrained('stock_transaction_items')
                  ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->dropConstrainedForeignId('serial_number_id');
        });
        Schema::table('serial_numbers', function (Blueprint $table) {
            $table->dropConstrainedForeignId('stock_transaction_items_id');
        });
    }
};
