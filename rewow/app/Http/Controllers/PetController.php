<?php

namespace App\Http\Controllers;

use App\Models\pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StorePetRequest;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $pets = Pet::with('type:id,description')
    ->orderBy('name', 'ASC')
    ->get()
    ->map(function ($pet) {
        return [
            'id' => $pet->id,
            'owner_name' => $pet->owner_name,
            'name' => $pet->name,
            'type_id' => $pet->type_id,
            'type' => $pet->type->description ?? null,
            'size_id' => $pet->size_id,
            'size' => $pet->size->description,
            'description' => $pet->description,
        ];
    });

return response()->json($pets);

    }

    public function getPetHistory()
{
    $pets = Pet::with(['schedule', 'type', 'size'])
        ->has('schedule')
        ->orderBy('name', 'ASC')
        ->get();

    $data = $pets->map(function ($pet) {
        return [
            'id' => $pet->id,
            'owner_name' => $pet->owner_name,
            'name' => $pet->name,
            'type_id' => $pet->type_id,
            'type' => $pet->type->description ?? null,
            'size_id' => $pet->size_id,
            'size' => $pet->size->description ?? null,
            'description' => $pet->description,
             'history' => $pet->schedule->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'date' => $appointment->date,
                    'subservice' => $appointment->subservice->description,
                    'service' => $appointment->subservice->service->description,
                    'icon' => $appointment->subservice->icon,
                ];
            }),
            
        ];
    });

    return response()->json($data);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePetRequest $request)
    {
       
      
    
           $pet = new Pet;
           $pet->owner_name = mb_strtoupper($request->input('owner_name'), 'UTF-8');
           $pet->name = mb_strtoupper($request->input('name'), 'UTF-8');
           $pet->type_id = $request->input('type_id');
           $pet->size_id = $request->input('size_id');
           $pet->description = mb_strtoupper($request->input('description'));
           $pet->save();
    
           return response()->json(['status' => true, 'message' => 'Creación de la mascota exitosa!'],200);
    
    }

    

    /**
     * Display the specified resource.
     */
    public function show(pet $pet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(pet $pet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePetRequest  $request, pet $pet)
    {
       
           $pet->owner_name = mb_strtoupper($request->input('owner_name'), 'UTF-8');
           $pet->name = mb_strtoupper($request->input('name'), 'UTF-8');
           $pet->type_id = $request->input('type_id');
           $pet->size_id = $request->input('size_id');
           $pet->description = mb_strtoupper($request->input('description'));
           $pet->update();

           return response()->json(['status' => true, 'message' => 'Actualización de la mascota exitoso!'],200);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pet = Pet::find($id);
       if(is_null($pet)){
        return response()->json(['status' => true, 'message' => 'La mascota no existe!'],404);
       } 

       try {
                $pet->delete();
                return response()->json(['status' => true, 'message' => 'Se elímino la mascota!'],200);
            } catch (\Exception $e) {
                return response()->json(['status' => true, 'message' => 'La mascota tiene historial medico!'],400);
            }
    }
}
