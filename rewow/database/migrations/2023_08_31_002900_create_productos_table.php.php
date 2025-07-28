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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nomProducto', 256);
            $table->string('codProducto', 256);
            $table->foreignId('subcategoria_id')->constrained();
            $table->biginteger('canStock')->nullable();
            $table->biginteger('canMinStock');
            $table->string('preProducto', 20);
            $table->integer('porPubProducto');
            $table->integer('porCliProducto');
            $table->foreignId('estado_id')->constrained();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
