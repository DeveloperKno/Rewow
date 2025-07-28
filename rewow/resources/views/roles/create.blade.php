@extends('layout/template')

@section('title', 'Crear Rol')

@section('contenido')

<main>
    <div class="container py-4">
        <h2>Registro Rol</h2>

@if ($errors->any())

<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <ul>
        @foreach($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

@endif

<form action="{{ url('roles') }}" method="post">

@csrf

<div class="mb-3 row">
    <label for="rol" class="col-sm-2 col-form-label">Nombre Rol</label>
    <div class="col-sm-5">
        <input type="text" class="form-control" name="rol" id="rol" value="{{ old('rol') }}">
    </div>
</div>

<a href="{{ url('roles') }}" class="btn btn-secondary">Regresar</a>
<button type="submit" class="btn btn-success">Guardar</button>

</form>

    </div>
</main>