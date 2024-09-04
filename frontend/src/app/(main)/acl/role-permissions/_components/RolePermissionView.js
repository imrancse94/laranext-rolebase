"use client"

import { getPermissionByRoleId,assignPermission } from "@/app/actions/acl/role-permission";
import Button from "@/components/Button";
import MultiCheckbox from "@/components/MultiCheckbox";
import Select from "@/components/Select";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import toaster from "@/libs/toaster";

export default function RolePermissionView({data}) {

    const [rolepermissions,setRolePermissions] = useState({})
    const [loading,setLoading] = useState(false)
    const [errors,setErrors] = useState({})

    const handleChange = async (e) => {
        const value = e.target.value;
        setRolePermissions({})
        if(value){
            setLoading(true);
            const response = await getPermissionByRoleId({id:value})
            if(response?.data){
                setRolePermissions(response?.data)
            }
        }

        setLoading(false);
    }

    const formAction = async (params) => {

        const permission_ids = params.getAll("permission_ids");
        const role_id = params.get("role_id")

        const errs = {}

         if(!role_id) {
            errs.role_id = "The field is required";
         }


        setErrors({...errs})

        if(Object.keys(errs).length > 0){   
            return;
        }

        const response = await assignPermission({role_id,permission_ids})

        if(response?.status_code === 100){
            toaster('success','Assigned permission successfully.')
        }

    }

    return (
        <form action={formAction}>
            <Select
                label="Roles"
                options={data}
                onChange={handleChange}
                empty="Please select role"
                loading={loading}
                name="role_id"
                error={errors?.role_id}
            />
            {
                rolepermissions?.permissions &&
                <>
                    <MultiCheckbox 
                        name="permission_ids"
                        label="Selected Permissions" 
                        options={rolepermissions?.permissions || []} 
                        selected={rolepermissions?.selected_permission_ids || []}
                        error={errors?.role_ids}
                    />
                    <div className="mt-2">
                        <SubmitButton label={'Save'}/>
                    </div>
                </>
            }
        </form>
    )
}