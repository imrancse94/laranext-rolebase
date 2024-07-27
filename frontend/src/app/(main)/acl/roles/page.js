import Table from "@/app/(main)/_components/Table";
import { getRoles } from "@/app/actions/acl/roles";
import RouteLink from "@/components/RouteLink";
import { isPermitted } from "@/libs/permission";

export default async function Page() {

    await isPermitted('permission-list');

    const {data} = await getRoles();

    const roles = data;

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium text-gray-700">Role List</h3>
                <RouteLink keyName="create-role" to="/acl/roles/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Role
                </RouteLink>
            </div>

            <div className="flex flex-col mt-4">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <Table>
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Id
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Name
                                    </th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Created At</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Updated At
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {roles?.data && 
                                roles?.data?.map(role =>
                                <tr>
                                    <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium leading-5 text-gray-900">{role.id}</div>
                                                {/* <div className="text-sm leading-5 text-gray-500">john@example.com</div> */}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">{role.name}</div>
                                        {/* <div className="text-sm leading-5 text-gray-500">Web dev</div> */}
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">{role.created_at}</div>
                                    </td>

                                    <td
                                        className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                        {role.updated_at}
                                    </td>

                                    <td
                                        className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}