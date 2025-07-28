<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
     public $timestamps = false;
    
    public function pet(){

        return $this->belongsTo(Pet::class);

    }

    public function subservice() {
    return $this->belongsTo(Subservice::class);
}



}
