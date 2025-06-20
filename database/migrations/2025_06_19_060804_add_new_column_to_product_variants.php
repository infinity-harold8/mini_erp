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
        Schema::table('product_variants', function (Blueprint $table) {
            $table->string('gtin', 14)->nullable();
            $table->string('ean', 14)->nullable();
            $table->string('upc', 14)->nullable();
        });

        Schema::table('batches', function (Blueprint $table) {
            $table->string('gs1_batch_code', 20)   // AI (10)
                  ->nullable()
                  ->index()
                  ->comment('GS1 AI‑10 lot / batch code used on labels');
        });

        Schema::table('serial_numbers', function (Blueprint $table) {
            $table->string('serial_number', 20)      // AI (21)
                  ->change();         
                  
            $table->string('series', 255)->nullable(); // ensure 20‑char capacity

            $table->text('gs1_payload')              // full string "(01)…(21)…"
                  ->nullable()
                  ->comment('Cached GS1 barcode string for quick printing');
        });

        Schema::create('serial_status_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('serial_number_id')->constrained('serial_numbers');
            $table->foreignId('changed_by')->nullable()->constrained('users');
            $table->enum('prev_status', ['in_stock','sold','returned','damaged','replacement','repaired','lost','expired','invalid']);
            $table->enum('new_status',  ['in_stock','sold','returned','damaged','replacement','repaired','lost','expired','invalid']);
            $table->text('note')->nullable();
            $table->timestamps();
        });

        Schema::create('rma_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sales_order_item_id')->nullable()->constrained('sales_order_items');
            $table->foreignId('serial_number_id')->constrained('serial_numbers');
            $table->foreignId('customer_id')->nullable()->constrained('customers');
            $table->enum('rma_type', ['return','repair','replacement']);
            $table->text('reason')->nullable();
            $table->enum('status', ['pending','approved','rejected','completed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn(['gtin', 'ean', 'upc']);
        });

        Schema::table('batches', fn (Blueprint $t) => $t->dropColumn('gs1_batch_code'));
    
        Schema::table('serial_numbers', function (Blueprint $t) {
            $t->dropColumn('gs1_payload');
            $t->dropColumn('series');
        });

        Schema::dropIfExists('serial_status_logs');
        Schema::dropIfExists('rma_requests');
    }
};
