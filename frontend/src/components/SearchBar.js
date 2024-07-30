"use client"

import { Loader } from "lucide-react";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ loading }) {

    
    
    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search"));
    const pathname = usePathname();
    const {replace} = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();

        let params = new URLSearchParams(searchParams);
        
        if(search){
            params.set('search',search)
        }else{
            params.delete('search')
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <form className="mx-auto" onSubmit={handleSubmit}>
            <div className="flex">
                <div className="relative w-full">
                    <input
                        type="search"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-md border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {loading ?
                            <Loader className="animate-spin" size="18" /> :
                            (<svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>)
                        }
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>

    )
}