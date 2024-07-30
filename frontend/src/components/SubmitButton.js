import cn from "@/libs/cn";
import Button from "./Button";
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ className, label }) {
    const { pending } = useFormStatus();
    const newClass = cn(
        "w-auto bg-blue-700 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        className
    );
    return (
        <Button
            type="submit"
            className={newClass}
            label={label}
            loading={pending}
        />
    )
}