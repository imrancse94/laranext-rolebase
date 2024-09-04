
import { isPermitted } from "@/libs/permission";
import CreateUser from "./_components/CreateUser";
import UserList from "./_components/UserList";
import SearchBar from "@/components/SearchBar";
import {getAllUsergroups} from "@/app/actions/acl/usergroups";

export default async function Page({ searchParams }) {

    await isPermitted('create-user');
    const usergroups = await getAllUsergroups();

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">User List</h3>
                <div className="flex">
                    <SearchBar placeholder="Search Name, Email" />
                    <CreateUser usergroups={usergroups?.data || []} />
                </div>
            </div>
            <UserList searchParams={searchParams} />
        </>
    )
}