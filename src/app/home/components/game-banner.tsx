import Image from "next/image";
import GameBannerImg from "../../assets/game-banner.png"
import { redirect } from 'next/navigation'

export default function GameBanner() {

    //redirect to play page.
    function changeRoute(){
        redirect("/play");
    }

    return (
        <div className="w-full lg:w-3/5 h-auto flex flex-col items-center gap-4">
                <Image 
                    id        = "banner"
                    className ="w-full rounded-xl lg:h-96"  
                    key       = "gamebannerid" 
                    src       = {GameBannerImg} 
                    width     = {1600} 
                    height    = {400} 
                    alt       = "Game banner" >
                </Image>
                <input
                    defaultValue = "Play now!"
                    type         = "button"
                    onClick      = {changeRoute}
                    placeholder  = "Play now!"
                     className="w-24 h-10 rounded-xl text-center bg-red-800 text-white cursor-pointer hover:bg-red-700 transition-colors duration-200" />
        </div>
    );
}