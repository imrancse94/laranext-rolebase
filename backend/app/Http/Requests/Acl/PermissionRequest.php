<?php

namespace App\Http\Requests\Acl;

use Illuminate\Validation\Rule;

class PermissionRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required',Rule::unique('acl_permissions')->ignore($this->id)],
            'key' => ['required',Rule::unique('acl_permissions')->ignore($this->id)],
        ];
    }
}
