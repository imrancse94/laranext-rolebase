import Checkbox from "@/components/Checkbox";
import cn from "@/libs/cn";

export default function MultiCheckbox({name,onChange, error, options, selected, label,className }) {

    const newClass = cn("w-[50%] border border-gray-200 p-4 pb-2 rounded-md mt-2 h-[300px] overflow-y-auto",className)
    return (
        <div>
            <label
                className="block mt-4 text-sm font-bold text-gray-900 dark:text-white"
            >
                {label} {error && <span className="text-red-600 text-sm font-normal">({error})</span>}
            </label>
            
            <div className={newClass}>
                {
                    options.map(option => (
                        <Checkbox
                            key={option.id}
                            onChange={onChange}
                            defaultValue={option.id}
                            defaultChecked={selected?.includes(option.id)}
                            label={option.name}
                            name={name}
                        />
                        )
                    )
                }
            </div>
        </div>
    )
}