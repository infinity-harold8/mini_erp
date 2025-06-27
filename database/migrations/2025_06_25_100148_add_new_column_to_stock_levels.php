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
        Schema::table('stock_levels', function (Blueprint $table) {
            $table->foreignId('created_by_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('restrict');
            $table->foreignId('updated_by_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('restrict');

            $table->enum('movement_type', [
                'in-stock',
                'sold',
                'transfer_in',
                'transfer_out',
                'return',
                'adjustment',
                'correction',
                'repair',
                'replacement',
                'cancelled',
                'disposed',
                'shipped',
                'delivered',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock_levels', function (Blueprint $table) {
            $table->dropConstrainedForeignId('created_by_id');
            $table->dropConstrainedForeignId('updated_by_id');
            $table->dropColumn('movement_type');
        });
    }
};
