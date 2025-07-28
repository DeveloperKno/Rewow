<?php

namespace App\Http\Controllers;


use App\Models\Link;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LinkController extends Controller
{
    public function consultLinks()
    {
        $link = Link::get();
 
        return response()->json($link);
    }
}
