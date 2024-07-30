
import { isPermitted } from "@/libs/permission";
import CreateRole from "./_components/CreateRole";
import RoleList from "./_components/RoleList";
import SearchBar from "@/components/SearchBar";


export default async function Page({ searchParams }) {
    // console.log('searchParams',searchParams)
    await isPermitted('permission-list');

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">Role List</h3>
                <div className="flex">
                    <SearchBar />
                    <CreateRole />
                </div>
            </div>
            <RoleList searchParams={searchParams} />
        </>
    )
}