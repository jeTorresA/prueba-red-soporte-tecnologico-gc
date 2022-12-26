<?php

namespace App\Http\Controllers;

use App\Models\Caracteristica;
use Illuminate\Http\Request;

class CaracteristicaController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'gce_nombre_equipo' => 'required',
            'gce_board' => 'required',
            'gce_case' => 'required',            
            'gce_procesador' => 'required',
            'gce_grafica' => 'required',
            'gce_ram' => 'required',
            'gce_disco_duro' => 'required',
            'gce_teclado' => 'required',
            'gce_mouse' => 'required',
            'gce_pantalla' => 'required',
            'gce_estado' => 'required'
        ]);

        $caracteristica = new Caracteristica();

        $caracteristica->gce_nombre_equipo = $request->gce_nombre_equipo;
        $caracteristica->gce_board = $request->gce_board;
        $caracteristica->gce_case = $request->gce_case;
        $caracteristica->gce_procesador = $request->gce_procesador;
        $caracteristica->gce_grafica = $request->gce_grafica;
        $caracteristica->gce_ram = $request->gce_ram;
        $caracteristica->gce_disco_duro = $request->gce_disco_duro;
        $caracteristica->gce_teclado = $request->gce_teclado;
        $caracteristica->gce_mouse = $request->gce_mouse;
        $caracteristica->gce_pantalla = $request->gce_pantalla;
        $caracteristica->gce_estado = $request->gce_estado;

        $caracteristica->save();

        return response()->json([
            'status' => 200,
            'response' => true, 
            'message' => 'se ha guardado el registro correctamente',
            'data' => [$caracteristica]
        ]);

    }

    public function index() {

        $caracteristicas = Caracteristica::all();

        return response()->json([
            'status' => 200, 
            'response' => true, 
            'message' => 'success',
            'data' => $caracteristicas
        ]);
    }

    public function show(Caracteristica $gce_id) {
        return response()->json([
            'status' => 200, 
            'response' => true,
            'message' => 'success', 
            'data' => [$gce_id]
        ]);
    }

    public function update(Request $request, $gce_id){
        $caracteristica = Caracteristica::find($gce_id);

        $caracteristica->gce_nombre_equipo = $request->gce_nombre_equipo;
        $caracteristica->gce_board = $request->gce_board;
        $caracteristica->gce_case = $request->gce_case;
        $caracteristica->gce_procesador = $request->gce_procesador;
        $caracteristica->gce_grafica = $request->gce_grafica;
        $caracteristica->gce_ram = $request->gce_ram;
        $caracteristica->gce_disco_duro = $request->gce_disco_duro;
        $caracteristica->gce_teclado = $request->gce_teclado;
        $caracteristica->gce_mouse = $request->gce_mouse;
        $caracteristica->gce_pantalla = $request->gce_pantalla;
        $caracteristica->gce_estado = $request->gce_estado;

        $caracteristica->save();

        return response()->json([
            'status' => 200,
            'response' => true, 
            'message' => 'se ha actualizado el registro correctamente', 
            'data' => [$caracteristica]
        ]);
    }

    public function destroy($gce_id) {
        $caracteristica = Caracteristica::find($gce_id);
        $caracteristica->delete();

        return response()->json([
            'status' => 200,
            'response' => true, 
            'message' => 'se ha eliminado el registro correctamente'            
        ]);
    }

}
