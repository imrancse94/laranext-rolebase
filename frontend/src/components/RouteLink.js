"use client"

import cn from "@/libs/cn";
import Link from "next/link";

export default function RouteLink({ ...props }) {
    
    const { label, onClick, to, className,children } = props;
    
    const newClass = cn("font-medium text-primary-600 hover:underline dark:text-primary-500", className);
    
    return (
        <Link href={to} onClick={onClick} className={newClass}>
            {children}
        </Link>
    )
}