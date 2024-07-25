<?php

namespace App\Http\Requests\Acl;

class AssignUsergroupRoleRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'role_ids' => ['required', 'array'],
            'role_ids.*' => ['exists:acl_roles,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'role_ids.required' => 'The role IDs field is required.',
            'role_ids.array' => 'The role IDs must be an array.',
            'role_ids.*.exists' => 'The role ID :input does not exist in our records.',
        ];
    }
}
