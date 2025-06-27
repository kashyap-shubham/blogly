import {
  Search,
  Bell,
  Pencil,
} from "lucide-react";


export const NavBar = () => {
    return(
        <div className="flex items-center justify-between px-6 py-2 shadow-sm bg-white ">
            <div className="flex items-center gap-4">
                <div className="text-2xl font-serif font-bold">
                    Blogly
                </div> 
                <div className="relative rounded-full bg-gray-100 px-4 py-2 flex items-center w-64">
                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                    <input type="text" placeholder="Search" className="bg-transparent outline-none text-sm w-full" />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                    <Pencil className="w-4 h-4" />
                    <span className="text-sm">Write</span>
                </button>
                <Bell className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                <img src = "https://i.pravatar.cc/40" alt="User" className="w-8 h-8 rounded-full"/>
            </div>
        </div>
    )
}