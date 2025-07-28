@extends('layout/template')

@section('title', 'Roles')

@section('contenido')

<main>
    <div class="container py-4">
        <h2>{{ $msg }}</h2>


<a href="{{ url('roles') }}" class="btn btn-secondary">Regresar</a>



    </div>
</main>