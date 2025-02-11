import Image from "next/image";
import GameBanner from "../../assets/game-banner.webp"
import Link from "next/link";

export default function gameBanner() {
    return (
        <div className="w-full lg:w-3/5 h-20">
            <div>
                <Image 
                    className = "w-full rounded-xl"  
                    key       = "gamebannerid" 
                    src       = {GameBanner} 
                    width     = {200} 
                    height    = {250} 
                    alt       = "Game banner">
                </Image>
            </div>
            <div className="grid grid-rows-[40px_40px] items-center justify-items-center">
                <h1>You will start with 20 coins!</h1>
                <input
                    defaultValue = "Play now!"
                    type         = "button"
                    placeholder  = "Play now!"
                    className    = "w-24 h-10 rounded-xl text-center bg-red-800 bottom-8 left-8">
                </input>
            </div>
        </div>
    );
}