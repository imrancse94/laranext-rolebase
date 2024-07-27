import Sidebar from "@/app/(main)/_components/partials/Sidebar";
import Header from "@/app/(main)/_components/partials/Header";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
// import Sidebar from "@/app/(main)/_components/Sidebar";
import {SessionProvider} from 'next-auth/react';

export default async function AuthLayout({children}) {
    const session = await auth();
    if (Object?.keys(session?.user)?.length === 0) {
        redirect("/login");
    }
    return (
        <SessionProvider>
            <div className="flex h-screen bg-gray-200">
                <Sidebar/>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header/>
                    {/* {message && <Toaster message={message}/>} */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                        <div className="container px-6 py-8 mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SessionProvider>
    )
}