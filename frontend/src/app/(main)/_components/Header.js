"use client"

import RouteLink from "@/components/RouteLink";
import React from "react"
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import { LOGIN } from "@/libs/routes";

export default function Header() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isToggleNotification, setIsToggleNotification] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const toggleSidebar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const toggleNotification = () => {
        setIsToggleNotification(!isToggleNotification)
    }

    const handleLogout = () => {
        
    }

    return (
        <header className="print:hidden flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
            <div className="flex items-center">

            </div>

            <div className="flex items-center">
                
                <div className="relative">
                    <button onClick={toggleDropdown}
                        className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                        <img className="object-cover w-full h-full"
                            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80"
                            alt="Your avatar" />
                    </button>

                    <div x-show="dropdownOpen" onClick={toggleDropdown} className="fixed inset-0 z-10 w-full h-full"
                        style={{ display: 'none' }}>

                    </div>

                    {isDropdownOpen &&
                        <div x-show="dropdownOpen"
                            className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl"
                        >
                            <a href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                            {/* <Button
                                onClick={handleLogout}
                                className="w-full text-left text-gray bg-white hover:bg-gray-100 cursor-pointer block px-4 py-2 text-sm text-gray-700"
                                label="Logout"
                                /> */}
                            <RouteLink
                                to={'#'}
                                onClick={async () => {
                                    await logout();
                                    router.push(LOGIN);
                                  }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                            >
                                {'Logout'}
                            </RouteLink>
                        </div>}
                </div>
            </div>
        </header>
    )
}