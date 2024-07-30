import { getAllUsergroups } from "@/app/actions/acl/usergroups";
import { isPermitted } from "@/libs/permission";
import UsergroupRoleView from "./_components/UsergroupRoleView";

export default async function UsergroupRole() {

    await isPermitted('usergroup-role-assoc');

    const usergroups = await getAllUsergroups();

    const {data} = usergroups;

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">Usergroup & Role Association</h3>
            </div>
            <div className="flex flex-col mt-4">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle">
                        <div className="p-4 bg-white rounded-md">
                            <UsergroupRoleView data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}