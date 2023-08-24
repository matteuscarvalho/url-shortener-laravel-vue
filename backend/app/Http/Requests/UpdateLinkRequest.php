<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLinkRequest extends FormRequest
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
            'url' => 'nullable|string',
            'code' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O campo Titulo é obrigatório.',
            'url.required' => 'O campo URL é obrigatório.',
        ];
    }
}
