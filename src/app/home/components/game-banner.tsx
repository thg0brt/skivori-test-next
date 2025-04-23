import Image from "next/image";
import GameBannerImg from "../../assets/game-banner.png"
import { redirect } from 'next/navigation'

export default function GameBanner() {

    //redirect to play page.
    function changeRoute(){
        redirect("/play");
    }

    return (
        <div className="w-full lg:w-3/5 h-30">
            <div>
                <Image 
                    id        = "banner"
                    className = "w-full rounded-xl lg:h-96"  
                    key       = "gamebannerid" 
                    src       = {GameBannerImg} 
                    width     = {1600} 
                    height    = {400} 
                    alt       = "Game banner" >
                </Image>
            </div>
            <div className="grid grid-rows-[40px_40px] items-center justify-items-center">
                <h1>You will start with 20 coins!</h1>
                <input
                    defaultValue = "Play now!"
                    type         = "button"
                    onClick      = {changeRoute}
                    placeholder  = "Play now!"
                    className    = "w-24 h-10 rounded-xl text-center bg-red-800 bottom-8 left-8 cursor-pointer">
                </input>
            </div>
        </div>
    );
}