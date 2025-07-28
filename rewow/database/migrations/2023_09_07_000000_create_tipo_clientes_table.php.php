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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('nomCliente', 300);
            $table->string('ideCliente', 20);
            $table->string('telCliente', 20)->nullable();
            $table->string('emaCliente', 70)->nullable();
            $table->foreignId('estado_id')->constrained();
            $table->integer('desCliente', 2);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
