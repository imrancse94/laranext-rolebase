export default function Table({children,headings}) {
    return (
        <table className="min-w-full">
            <thead>
                <tr>
                {headings.map(heading=>
                        <th key={heading} className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200 bg-gray-50">
                            {heading}
                        </th>
                )}
                </tr>
            </thead>
            <tbody className="bg-white">
            {children}
            </tbody>
        </table>
    )
}