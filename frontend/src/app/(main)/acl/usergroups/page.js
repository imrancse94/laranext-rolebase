
import { isPermitted } from "@/libs/permission";
import CreateUsergroup from "./_components/CreateUsergroup";
import UsergroupList from "./_components/UsergroupList";
import SearchBar from "@/components/SearchBar";

export default async function Page({ searchParams }) {
    // console.log('searchParams',searchParams)
    await isPermitted('usergroup-list');

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">Usergroup List</h3>
                <div className="flex">
                    <SearchBar placeholder="Search Name" />
                    <CreateUsergroup />
                </div>
            </div>
            <UsergroupList searchParams={searchParams} />
        </>
    )
}