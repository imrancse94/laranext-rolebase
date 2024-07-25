<?php

namespace App\Http\Requests\Acl;

use Illuminate\Validation\Rule;

class RoleRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required',Rule::unique('acl_roles')->ignore($this->id)]
        ];
    }
}
