<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGceCaracteristicasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gce_caracteristicas', function (Blueprint $table) {
            $table->id('gce_id');
            $table->string('gce_nombre_equipo');
            $table->string('gce_board');
            $table->string('gce_case');
            $table->string('gce_procesador');
            $table->string('gce_grafica');
            $table->string('gce_ram');
            $table->string('gce_disco_duro');
            $table->string('gce_teclado');
            $table->string('gce_mouse');
            $table->string('gce_pantalla');
            $table->string('gce_estado', 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gce_caracteristicas');
    }
}
