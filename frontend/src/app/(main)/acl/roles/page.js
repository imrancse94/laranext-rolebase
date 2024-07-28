import Table from "@/app/(main)/_components/Table";
import { getRoles } from "@/app/actions/acl/roles";
import { isPermitted } from "@/libs/permission";
import CreateRole from "./_components/CreateRole";
import Pagination from "@/components/Pagination";

export default async function Page({searchParams}) {
    // console.log('searchParams',searchParams)
    await isPermitted('permission-list');

    const headings = ['Id','Name','CreatedAt','UpdatedAt','Actions'];

    const {data} = await getRoles(searchParams);

    const roles = data;
    console.log('roles',roles)

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">Role List</h3>
                
                <CreateRole/>
                
            </div>

            <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <Table headings={headings}>
                            {roles?.data && 
                                roles?.data?.map(role =>
                                <tr key={role.id}>
                                    <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                        <div className="text-sm leading-5 text-gray-900">{role.id}</div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                        <div className="text-sm leading-5 text-gray-900">{role.name}</div>
                                        {/* <div className="text-sm leading-5 text-gray-500">Web dev</div> */}
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                    <div className="text-sm leading-5 text-gray-900">{role.created_at}</div>
                                    </td>

                                    <td
                                        className="text-center px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                        {role.updated_at}
                                    </td>

                                    <td
                                        className="text-center px-6 py-4 text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                    </td>
                                </tr>
                            )}
                        </Table>
                    </div>
                </div>
            </div>
           <div className="flex justify-end">
           <Pagination
                first_page_url={roles?.first_page_url}
                next_page_url={roles?.next_page_url}
                prev_page_url={roles?.prev_page_url}
                from={roles?.from}
                to={roles?.to}
                links={roles?.links}
                current={roles?.current_page}
            />                         
           </div>
        </>
    )
}