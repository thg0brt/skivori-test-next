import { redirect } from 'next/navigation'

export default function menuBar({coins, homeButton}) {

    //redirect to play page.
    function changeRoute(){
        redirect("/home");
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
            <input
                    defaultValue = "Homepage"
                    type         = "button"
                    onClick      = {changeRoute}
                    placeholder  = "Homepage"
                    className    = "w-24 h-10 rounded-xl text-center bg-red-800 bottom-8 left-8 cursor-pointer">
                </input>
            : 
                ""
            }
            </div>
        </div>
    );
}