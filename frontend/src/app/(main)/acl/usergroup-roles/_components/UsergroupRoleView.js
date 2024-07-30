"use client"

import { getRoleByUsergroupId } from "@/app/actions/acl/usergroups";
import Button from "@/components/Button";
import MultiCheckbox from "@/components/MultiCheckbox";
import Select from "@/components/Select";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

export default function UsergroupRoleView({data}) {

    const [usergroups,setUsergroups] = useState({})
    const [loading,setLoading] = useState(false)

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

    const assignRole = async (params) => {
        console.log('params',params.getAll("roleIds[]"))
    }

    return (
        <form action={assignRole}>
            <Select
                label="Usergroups"
                options={data}
                onChange={handleChange}
                empty="Please select usergroup"
                loading={loading}
                name="usergroup_id"
            />
            {
                usergroups?.roles &&
                <>
                    <MultiCheckbox 
                        name="roleIds[]"
                        label="Selected Roles" 
                        options={usergroups?.roles || []} 
                        selected={usergroups?.selected_role_ids || []} 
                    />
                    <div className="mt-2">
                        <SubmitButton label={'Save'}/>
                    </div>
                </>
            }
        </form>
    )
}