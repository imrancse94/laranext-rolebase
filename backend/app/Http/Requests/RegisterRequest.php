<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class RegisterRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => ['required','email',Rule::unique('users')->ignore($this->id)],
            'password' => 'required|string|confirmed',
            'usergroup_id'=>'required|integer|exists:acl_usergroups,id'
        ];
    }
}
