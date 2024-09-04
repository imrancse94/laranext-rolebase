import { getAllUsers } from "@/app/actions/acl/user";
import Pagination from "@/components/Pagination";
import Table from "@/app/(main)/_components/Table";
import Actions from "./Actions";

export default async function UserList({searchParams}) {

    const headings = ['Id', 'Name','Email', 'CreatedAt', 'UpdatedAt', 'Actions'];

    const { data } = await getAllUsers(searchParams);

    const users = data;

    return (
        <>
            <div className="flex flex-col mt-4">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <Table headings={headings}>
                            {users?.data &&
                                users?.data?.map(user =>
                                    <tr key={user.id}>
                                        <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                            <div className="text-sm leading-5 text-gray-900">{user.id}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                            <div className="text-sm leading-5 text-gray-900">{user.name}</div>
                                            {/* <div className="text-sm leading-5 text-gray-500">Web dev</div> */}
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                            <div className="text-sm leading-5 text-gray-900">{user.email}</div>
                                            {/* <div className="text-sm leading-5 text-gray-500">Web dev</div> */}
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                            <div className="text-sm leading-5 text-gray-900">{user.created_at}</div>
                                        </td>

                                        <td
                                            className="text-center px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            {user.updated_at}
                                        </td>

                                        <td
                                            className="text-center px-6 py-4 text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                                            <Actions params={user} />
                                        </td>
                                    </tr>
                                )}
                        </Table>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <Pagination
                    first_page_url={users?.first_page_url}
                    next_page_url={users?.next_page_url}
                    prev_page_url={users?.prev_page_url}
                    from={users?.from}
                    to={users?.to}
                    links={users?.links}
                    current={users?.current_page}
                />
            </div>
        </>
    )
}