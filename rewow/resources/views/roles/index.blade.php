@extends('layout/template')

@section('title', 'Roles')

@section('contenido')

<main>
    <div class="container py-4">
        <h2>Listado Roles</h2>

        <a href="{{ url('roles/create') }}" class="btn btn-primary">Nuevo Rol</a>

        <table class="table table-hover">
            <thead>
                <tr>
                <th>Id</th>
                <th>Rol</th>
                </tr>
</thead>
<tbody>

</tbody>
@foreach($roles as $rol)
<tr>
                <td>{{ $rol->id }}</td>
                <td>{{ $rol->nomRol }}</td>
                <td><a href="{{ url('roles/'.$rol->id.'/edit') }}" class="btn btn-warning btn-sm">Editar</a></td>
                <td>
                <form action="{{ url('roles/'.$rol->id) }}" method="post">
                    @method("DELETE")
                    @csrf
                    <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                </form>    
                </tr>
@endforeach
</table>

    </div>


</main>