<?php

namespace App\Http\Requests\Acl;

class RolePermissionAssocRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'role_id'=>'required|exists:acl_roles,id',
            'permission_ids'=>'array|exists:acl_permissions,id',
        ];
    }
}
