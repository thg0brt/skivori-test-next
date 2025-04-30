"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaUserCircle } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, HelpCircle, Coins, RefreshCw, Home } from "lucide-react"
import { logoutAction } from "@/app/lib/logout"
import { UserStore } from "@/store/user-store"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ConversionJson {
  conversion_result: number;
  conversion_rate: number;
}

export default function Header() {
  const { name, email, balance, logout } = UserStore()

  //Configuration for the Convert Balance functionality
  const [convertActive, setConvertActive] = useState(false);
  const [json, setJson] = useState<ConversionJson | null>(null);

  // Check if we are on the home page
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/home"


  //Request to the ExchangeRate API endpoint.
  const exchangeRate = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_EXCHANGERATE_URL + "/pair/EUR/BRL/"+balance);
      const data = await response.json();
      setJson(data);
  }

  //useEffect to monitor changes in json useState and display a message when json is not null.
  useEffect(() => {
      if(json != null){
          const conversion_result = json.conversion_result;
          const conversion_rate   = json.conversion_rate;
          const result = "Your current balance of "+balance+" EUR is worth "+conversion_result+" BRL. The conversion rate is "+conversion_rate;
          toast.info(result, {
              closeButton: false,
              style: { width: "100%" }
          });
      }
  }, [json]);
  
  //useEffect to monitor changes in the convertActive useState, to trigger the request to the ExchangeRate API.
  useEffect(() => {
      if(convertActive){
          exchangeRate();
          setConvertActive(false);
      } 
  }, [convertActive]);

  // Toggles the convertActive state when called onClick.
  function handleConvert(){
      if(!convertActive){
          setConvertActive(true);
      }
  }

  //Logout method
  async function handleLogout(){
    //clear the zustant local storage
    logout();

    //clear the session cookie and redirect
    await logoutAction();
  }

  return (
    <header className="border-b bg-[#868674] w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-3xl text-gray-800">Play Games Casino</div>
        {!isHomePage && (
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-full">
            <Button variant="ghost" asChild className="h-6 gap-1">
              <Link href="/home">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-full">
            <Button variant="ghost"  onClick={handleConvert} className="h-6 cursor-pointer">
              <RefreshCw className="h-4 w-4 bg-gray-700" />
              <span>Convert Balance</span>
            </Button>
          </div>
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-full">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{balance.toLocaleString()} coins</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer">
                <FaUserCircle fontSize={40} className="text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
      </div>
      <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="colored"
                />
    </header>
  )
}
