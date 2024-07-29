"use client"

import cn from "@/libs/cn";
import { Controller, useFormContext } from 'react-hook-form';

export default function Input({ ...props }) {
    const { control } = useFormContext();
    const { label, type, name, placeholder, className } = props
    const newClass = cn("bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", className);
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    {label && <label
                        htmlFor={name}
                        className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {label}
                    </label>}
                    <input
                        className={newClass}
                        placeholder={placeholder}
                        type={type}
                        value={type === 'number' && field.value === 0 ? '' : field.value}
                        onChange={(event) => {
                            if (type === 'number') {
                                field.onChange(Number(event.target.value));
                            } else {
                                field.onChange(event.target.value);
                            }
                        }}
                    />
                    {error?.message && <span className="text-red-600 text-xs">{error?.message}</span>}
                </>
            )}
        />
    )
}