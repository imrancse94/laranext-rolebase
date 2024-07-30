import { getUsergroups } from "@/app/actions/acl/usergroups";
import Pagination from "@/components/Pagination";
import Table from "@/app/(main)/_components/Table";
import Actions from "./Actions";

export default async function UsergroupList({searchParams}) {

    const headings = ['Id', 'Name', 'CreatedAt', 'UpdatedAt', 'Actions'];

    const { data } = await getUsergroups(searchParams);

    const usergroups = data;

    return (
        <>
            <div className="flex flex-col mt-4">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <Table headings={headings}>
                            {usergroups?.data &&
                                usergroups?.data?.map(usergroup =>
                                    <tr key={usergroup.id}>
                                        <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                            <div className="text-sm leading-5 text-gray-900">{usergroup.id}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                            <div className="text-sm leading-5 text-gray-900">{usergroup.name}</div>
                                            {/* <div className="text-sm leading-5 text-gray-500">Web dev</div> */}
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                            <div className="text-sm leading-5 text-gray-900">{usergroup.created_at}</div>
                                        </td>

                                        <td
                                            className="text-center px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            {usergroup.updated_at}
                                        </td>

                                        <td
                                            className="text-center px-6 py-4 text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                                            <Actions params={usergroup} />
                                        </td>
                                    </tr>
                                )}
                        </Table>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <Pagination
                    first_page_url={usergroups?.first_page_url}
                    next_page_url={usergroups?.next_page_url}
                    prev_page_url={usergroups?.prev_page_url}
                    from={usergroups?.from}
                    to={usergroups?.to}
                    links={usergroups?.links}
                    current={usergroups?.current_page}
                />
            </div>
        </>
    )
}