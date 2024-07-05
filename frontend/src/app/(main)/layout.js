import Sidebar from "@/app/(main)/_components/Sidebar";
import Header from "@/app/(main)/_components/Header";
// import Sidebar from "@/app/(main)/_components/Sidebar";

export default function AuthLayout({children}){

    return (
        <div  className="flex h-screen bg-gray-200">
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
    )
}