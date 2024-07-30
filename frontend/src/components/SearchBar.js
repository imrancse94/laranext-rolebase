"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import SubmitSearchButton from "./SubmitSearchButton";

export default function SearchBar({ placeholder }) {

    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const pathname = usePathname();
    const { replace } = useRouter()


    const handleSubmit = (e) => {

        const params = new URLSearchParams(searchParams);

        if (search) {
            params.set('search', search)
        } else {
            params.delete('search')
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <form className="mx-auto" action={handleSubmit}>
            <div className="flex">
                <div className="relative w-full">
                    <input
                        type="search"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-md border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder={placeholder ?? 'Search'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SubmitSearchButton/>
                </div>
            </div>
        </form>

    )
}