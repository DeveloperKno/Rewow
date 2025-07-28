<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
        $schedules = Schedule::with(['subservice.service','pet'])
        ->where('date','>=',Carbon::now())
        ->orderBy('date', 'ASC')
        ->get();

    $data = $schedules->map(function ($schedule) {
        return [
            'id' => $schedule->id,
            'name' => $schedule->pet->name ?? '',
            'subservice' => $schedule->subservice->description ?? '',
            'service' => $schedule->subservice->service->description ?? '',
            'date' => $schedule->date,
            'icon' => $schedule->subservice->icon,
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
    public function store(Request $request)
    {
           $appointment = new Schedule;
           $appointment->pet_id = $request->input('pet_id');
           $appointment->subservice_id = $request->input('subservice_id');
           $appointment->date = $request->input('date');
           $appointment->save();
    
           return response()->json(['status' => true, 'message' => 'Creación de la cita exitosa!'],200);
    }

    
    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
       
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        //
    }
}
