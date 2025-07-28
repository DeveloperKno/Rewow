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
        Schema::create('movimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained();
            $table->integer('canMovimiento');
            $table->string('preMovimiento', 256);
            $table->foreignId('user_id')->constrained();
            $table->foreignId('tipo_movimiento_id')->constrained();
            $table->bigInteger('facMovimiento')->nullable();
            $table->foreignId('estado_id')->constrained();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimientos');
    }
};
