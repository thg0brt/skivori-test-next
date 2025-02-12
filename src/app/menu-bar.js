import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function menuBar({coins, homeButton}) {

    const apiKey = "cb2de2d399468cc6b721fa53";
    const [convertActive, setConvertActive] = useState(false);
    const [json, setJson] = useState(null);

    //redirect to play page.
    function changeRoute(){
        redirect("/home");
    }

    const exchangeRate = async () => {
        const response = await fetch("https://v6.exchangerate-api.com/v6/"+apiKey+"/pair/EUR/BRL/"+coins);
        const data = await response.json();
        setJson(data);
    }

    useEffect(() => {
        if(json != null){
            const conversion_result = json.conversion_result;
            const conversion_rate   = json.conversion_rate;
            const result = "Your current balance of "+coins+" EUR is worth "+conversion_result+" BRL. The conversion rate is "+conversion_rate;
            toast.info(result, {
                closeButton: false,
                style: { width: "100%" }
            });
        }
    }, [json]);
    
    useEffect(() => {
        if(convertActive){
            exchangeRate();

            setConvertActive(false);
        } 
    }, [convertActive]);


    function handleConvert(){
        if(!convertActive){
            setConvertActive(true);
        }
    }

    return (
        <div className="w-full lg:w-3/5 h-5">
            <div className="grid grid-rows-[40px_40px] items-center justify-items-center">
                <h1 className="text-3xl font-bold text-center">Play Games!</h1>
                {coins != undefined
                ? <h1 className="text-md text-center m-2">Coins Balance: {coins}</h1>
                : ""
                }
            {homeButton
            ? 
            <div className="grid grid-cols-2 items-center gap-1">
                <input
                    defaultValue = "Homepage"
                    type         = "button"
                    onClick      = {changeRoute}
                    placeholder  = "Homepage"
                    className    = "w-44 h-10 rounded-xl text-center bg-red-800 bottom-8 left-8 cursor-pointer">
                </input>
                <input
                    defaultValue = "Convert Balance"
                    type         = "button"
                    onClick      = {handleConvert}
                    placeholder  = "Convert Balance"
                    className    = "w-44 h-10 rounded-xl text-center bg-lime-900 bottom-8 left-8 cursor-pointer">
                </input>
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
            </div>
            : 
                ""
            }
            </div>
        </div>
    );
}