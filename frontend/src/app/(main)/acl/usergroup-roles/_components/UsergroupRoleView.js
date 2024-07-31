"use client"

import { getRoleByUsergroupId } from "@/app/actions/acl/usergroups";
import Button from "@/components/Button";
import MultiCheckbox from "@/components/MultiCheckbox";
import Select from "@/components/Select";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { assignRole } from "@/app/actions/acl/usergroup-roles";
import toaster from "@/libs/toaster";

export default function UsergroupRoleView({data}) {

    const [usergroups,setUsergroups] = useState({})
    const [loading,setLoading] = useState(false)
    const [errors,setErrors] = useState({})

    const handleChange = async (e) => {
        const value = e.target.value;
        setUsergroups({})
        if(value){
            setLoading(true);
            const response = await getRoleByUsergroupId({id:value})
            if(response?.data){
                setUsergroups(response?.data)
            }
        }

        setLoading(false);
    }

    const formAction = async (params) => {

        const role_ids = params.getAll("role_ids");
        const usergroup_id = params.get("usergroup_id")

        const errs = {}

         if(!usergroup_id) {
            errs.usergroup_id = "The field is required";
         }


        setErrors({...errs})

        if(Object.keys(errs).length > 0){   
            return;
        }
         
        const response = await assignRole({usergroup_id,role_ids})

        if(response?.status_code === 100){
            toaster('success','Assigned Role successfully.')
        }

    }

    return (
        <form action={formAction}>
            <Select
                label="Usergroups"
                options={data}
                onChange={handleChange}
                empty="Please select usergroup"
                loading={loading}
                name="usergroup_id"
                error={errors?.usergroup_id}
            />
            {
                usergroups?.roles &&
                <>
                    <MultiCheckbox 
                        name="role_ids"
                        label="Selected Roles" 
                        options={usergroups?.roles || []} 
                        selected={usergroups?.selected_role_ids || []}
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