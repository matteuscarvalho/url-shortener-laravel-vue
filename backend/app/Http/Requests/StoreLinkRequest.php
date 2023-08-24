<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLinkRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'nullable|string',
            'url' => 'required|string',
            'code' => 'nullable|string|unique:links,code',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O campo Titulo é obrigatório.',
            'url.required' => 'O campo URL é obrigatório.',
            'code.required' => 'O campo Code é obrigatório.',
            'code.unique' => 'O indentificador informado já existe.',
        ];
    }
}
