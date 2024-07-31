import cn from "@/libs/cn"
import { Loader } from "lucide-react";

export default function Select({name,error, label,loading, onChange, className, options, selected, empty }) {

    const newClass = cn('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500', className);

    return (
        <div className="max-w-sm">
            <div className="flex">
                <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                    {label}
                </label>
                {loading && <Loader size={18} className="animate-spin ml-2" />}
            </div>
            <select
                defaultValue={selected}
                className={newClass}
                onChange={onChange}
                name={name}
            >
                {empty && <option value="">{empty}</option>}

                {
                    options?.map(option => <option key={option.id} value={option.id}>{option.name}</option>)
                }

            </select>
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    )
}