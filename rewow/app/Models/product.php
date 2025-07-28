<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    public $timestamps = false;

     protected $fillable = [
    'description',
    'amount',
    'price',
    
];

 public function category(){

        return $this->belongsTo(Category::class);
        
    }
    

}
