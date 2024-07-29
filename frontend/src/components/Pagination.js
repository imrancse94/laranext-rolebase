"use client"
import Link from "next/link";
import { useSearchParams,usePathname,useRouter  } from "next/navigation";


const Pagination = ({ ...props }) => {
    
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter();

    const prepareQueryStringByKeyValue = (keyValue = {}) => {
        let newPathName = "";
        const params = new URLSearchParams(searchParams);
        console.log('params',params)
        
        Object.keys(keyValue).map(i=>{
            if (searchParams) {
                params.set(i, keyValue[i]);
            } else {
                params.delete(i);
            }
        })

         return `${pathname}?${params.toString()}`;
    }
    

    const {
        first_page_url,
        next_page_url,
        from,
        to,
        current,
        prev_page_url,
        links
    } = props

    return (
        <>
            {/* <nav className="mt-2 justify-center" aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                        <Link href={prev_page_url ?? "#"} disabled={prev_page_url == null}
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </Link>
                    </li>
                    {
                        links?.length > 0 &&
                        links.map((link) => {
                            if (link.label > 0) {
                                //return <Link key={link.label} className={link.active ? 'active-paginate-link':'inactive-paginate-link'} href={`/acl/roles?page=${link.label}`}>{link.label}</Link>
                                return <li key={link.label}>
                                    <Link
                                         href={`/acl/roles?page=${link.label}`}
                                        
                                        className={link.active ? 'active-paginate-link' : 'inactive-paginate-link'}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            }
                        })
                    }
                    <li>
                        <Link
                            href={next_page_url ?? "#"} disabled={next_page_url == null}
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </nav> */}
            <nav aria-label="Page navigation example">
  <ul className="inline-flex -space-x-px text-sm">
    <li>
    <Link href={prev_page_url ?? "#"} disabled={prev_page_url == null}
        
        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Previous
      </Link>
    </li>
    {
        links?.length > 0 &&
        links.map((link) => {
            if (link.label > 0) {
                return <li key={link.label}>
                <Link
                    href={prepareQueryStringByKeyValue({page:link.label})}
                    className={link.active ? 'active-paginate-link' : 'inactive-paginate-link'}
                >
                  {link.label}
                </Link>
              </li>
            }
        })
    }
    
    <li>
    <Link
        href={next_page_url ?? "#"} disabled={next_page_url == null}
        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Next
      </Link>
    </li>
  </ul>
</nav>
                
        </>

        // <div className="flex items-center justify-between mt-6">
        //     <Link href={prev_page_url ?? "#"} disabled={prev_page_url == null} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
        //             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        //         </svg>

        //         <span>
        //             previous
        //         </span>
        //     </Link>

        //     <div className="items-center bg-white py-1 px-4 rounded hidden md:flex gap-x-3">
        //         {
        //             links?.length > 0 &&
        //             links.map((link)=>{
        //                 if(link.label > 0){
        //                     return <Link key={link.label} className={link.active ? 'active-paginate-link':'inactive-paginate-link'} href={`/acl/roles?page=${link.label}`}>{link.label}</Link>
        //                 }
        //             })
        //         }

        //     </div>

        //     <Link href={next_page_url ?? "#"} disabled={next_page_url == null} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
        //         <span>
        //             Next
        //         </span>

        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
        //             <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        //         </svg>
        //     </Link>
        // </div>
    )
}

export default Pagination;