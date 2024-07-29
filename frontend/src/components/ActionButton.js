import usePermission from "@/hooks/usePermission";
import cn from "@/libs/cn";
import { useSession } from "next-auth/react";
import { Loader } from 'lucide-react';
export default function ActionButton({ ...props }) {

    const { loading, onAction, className, keyName, icon } = props;

    if (keyName) {
        const { data: session } = useSession()
        const allow = usePermission(session, keyName)
        if (!allow) return null;
    }

    const newClass = cn("underline mx-1 cursor-pointer text-indigo-600 hover:text-indigo-900", className)
    return (
        <div onClick={onAction} className={newClass}>
            {loading ? <Loader className="animate-spin" size="18" /> : icon}
        </div>
        )
}