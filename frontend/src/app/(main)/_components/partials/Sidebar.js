

import RouteLink from "@/components/RouteLink";
import React from "react";


export default function Sidebar() {
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    // const [isToggleNotification, setIsToggleNotification] = useState(false);

    // const toggleDropdown = () => {
    //     setIsDropdownOpen(!isDropdownOpen)
    // }

    // const toggleSidebar = () => {
    //     setIsSideBarOpen(!isSideBarOpen)
    // }

    // const toggleNotification = () => {
    //     setIsToggleNotification(!isToggleNotification)
    // }

    return (
        <>
    	{/* <div className={`hidden fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden`} onClick={toggleSidebar} ></div> */}

        <div className={`-translate-x-full ease-in fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0`} >
            <div className="flex items-center justify-center mt-8">
                <div className="flex items-center">
                    <svg className="w-12 h-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z" fill="#4C51BF" stroke="#4C51BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z" fill="white"></path>
                    </svg>

                    <span className="mx-2 text-2xl font-semibold text-white">{'Dashboard'}</span>
                </div>
            </div>

            <nav className="mt-10">
                <RouteLink className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" to="/dashboard">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                    <span className="mx-3">{'Dashboard'}</span>
                </RouteLink>
                <RouteLink keyName="role-list" className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" to="/acl/roles">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                    <span className="mx-3">{'Role Management'}</span>
                </RouteLink>
                <RouteLink keyName="usergroup-list" className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" to="/acl/usergroups">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                    <span className="mx-3">{'Usergroup Management'}</span>
                </RouteLink>
                <RouteLink keyName="permission-list" className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" to="/acl/permissions">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                    <span className="mx-3">{'Permission Management'}</span>
                </RouteLink>

                <RouteLink keyName="usergroup-role-assoc" className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" to="/acl/usergroup-roles">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                    <span className="mx-3">{'Usergroup & Role Association'}</span>
                </RouteLink>

                <RouteLink keyName="role-permission-assoc" className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" to="/acl/role-permissions">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                    <span className="mx-3">{'Role & Permission Association'}</span>
                </RouteLink>

                <RouteLink keyName="user-list" className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" to="/acl/users">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                    <span className="mx-3">{'User Management'}</span>
                </RouteLink>


            </nav>
        </div>


        </>)

//     return (
//         <div className={`${isSideBarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} fixed inset-y-0 left-0 z-30 w-[300px] overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0`} >
//             <span
//                 className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
//                 onclick="openSidebar()"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-filter-left px-2 bg-gray-900 rounded-md" viewBox="0 0 16 16" fill="currentColor">
//   <path d="M0 2.5A.5.5 0 0 1 .5 2h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm3 5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
// </svg>

//                 {/* <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" /> */}
//             </span>
//             <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-full overflow-y-auto text-center bg-gray-900">
//                 <div className="text-gray-100 text-xl">
//                     <div className="p-2.5 mt-1 flex items-center">
//                         <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600" />
//                         <h1 className="font-bold text-gray-200 text-[15px] ml-3">
//                             TailwindCSS
//                         </h1>
//                         <i
//                             className="bi bi-x cursor-pointer ml-28 lg:hidden"
//                             onclick="openSidebar()"
//                         />
//                     </div>
//                     <div className="my-2 bg-gray-600 h-[1px]" />
//                 </div>
//                 <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
//                     <i className="bi bi-search text-sm" />
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
//                     />
//                 </div>
//                 <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//                     <i className="bi bi-house-door-fill" />
//                     <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
//                 </div>
//                 <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//                     <i className="bi bi-bookmark-fill" />
//                     <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
//                 </div>
//                 <div className="my-4 bg-gray-600 h-[1px]" />
//                 <div
//                     className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
//                     onclick="dropdown()"
//                 >
//                     <i className="bi bi-chat-left-text-fill" />
//                     <div className="flex justify-between w-full items-center">
//                         <span className="text-[15px] ml-4 text-gray-200 font-bold">
//                             Chatbox
//                         </span>
//                         <span className="text-sm rotate-180" id="arrow">
//                             <i className="bi bi-chevron-down" />
//                         </span>
//                     </div>
//                 </div>
//                 <div
//                     className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
//                     id="submenu"
//                 >
//                     <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
//                         Social
//                     </h1>
//                     <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
//                         Personal
//                     </h1>
//                     <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
//                         Friends
//                     </h1>
//                 </div>
//                 <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//                     <i className="bi bi-box-arrow-in-right" />
//                     <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
//                 </div>
//             </div>
//         </div>


//     )
}