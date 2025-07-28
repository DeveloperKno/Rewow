<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'owner_name' => 'required|string|min:4|max:250',
            'name' => 'required|string|min:4|max:250',
            'type_id' => 'required|exists:types,id',
            'size_id' => 'required|integer',
            'description' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'owner_name.required' => 'El nombre del dueño es obligatorio.',
            'name.required' => 'El nombre de la mascota es obligatorio.',
            'type_id.required' => 'El tipo de mascota es obligatorio.',
            'type_id.exists' => 'El tipo de mascota no es válido.',
        ];
    }
}
