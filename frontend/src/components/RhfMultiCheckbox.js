import cn from "@/libs/cn";
import {Controller, useFormContext} from 'react-hook-form';
import MultiCheckbox from "@/components/MultiCheckbox";

export default function RhfMultiCheckbox({...props}) {
    const {control} = useFormContext();
    const {label, type, name, placeholder, options, className} = props
    //const newClass = cn("bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", className);
    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => {

                return <MultiCheckbox
                    onChange={(e) => field.onChange(e.target.value)}
                    name={name}
                    className={className}
                    error={error?.message || ""}
                    options={options}
                    selected={field?.value || []}
                    label={label}
                />
            }}
        />
    );
}