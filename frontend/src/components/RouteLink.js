"use client"

import usePermission from "@/hooks/usePermission";
import cn from "@/libs/cn";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function RouteLink({ ...props }) {

    const { keyName, onClick, to, className, children } = props;
    

    if (keyName) {
        const { data:session } = useSession()
        const allow = usePermission(session,keyName)
        if (!allow) return null;
        
    }

    const newClass = cn("font-medium text-primary-600 hover:underline dark:text-primary-500", className);

    return (
        <Link href={to} onClick={onClick} className={newClass}>
            {children}
        </Link>
    )
}