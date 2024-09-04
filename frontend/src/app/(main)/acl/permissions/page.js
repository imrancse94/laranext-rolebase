
import { isPermitted } from "@/libs/permission";
import CreatePermission from "./_components/CreatePermission";
import PermissionList from "./_components/PermissionList";
import SearchBar from "@/components/SearchBar";

export default async function Page({ searchParams }) {
    // console.log('searchParams',searchParams)
    await isPermitted('permission-list');

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">Permission List</h3>
                <div className="flex">
                    <SearchBar placeholder="Search Title, Key" />
                    <CreatePermission />
                </div>
            </div>
            <PermissionList searchParams={searchParams} />
        </>
    )
}