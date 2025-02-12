
import Svg from "./svg.js"
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function playGame({coins, setCoins}){

    const [spin, setSpin] = useState(false); //defines whether the user spun the machine slot or not 
    const [json, setJson] = useState(null);
    const [mainRow, setMainRow] = useState({ 0 : "lemon", 1 : "lemon", 2 : "apple" });

    //default styles
    const rowStyle  = "grid grid-rows-3 items-center justify-items-center ReelRow";
    const middleRow = "middleRow";

    const play = async () => {
        const response = await fetch("https://skivori-test-nest.onrender.com/games/play");
        const data = await response.json();
        setJson(data);
    }

    useEffect(() => {
        if(spin){
            setTimeout(() => {
                play();

                setSpin(false);
            }, 3000);
            
        } 
    }, [spin]);


    useEffect(() => {
        if(json != null){
            setMainRow(json[1]);
            
            const result = json[0];

            //defines the toast mensage
            if(result < 0){
                toast.error("Bad luck! You lost 1 coin.");
            } else if (result < 15){
                toast.success("Great! You earned "+result+" coins.");
            } else if (result >= 15){
                toast.success("Big win! You earned "+result+" coins.");
            }

            const currentCoins = coins;
            const newBalance   = currentCoins + (result)

            setCoins(newBalance);
            console.log(mainRow);
        }
    }, [json]);

    //OnClick action
    function handleClick(){
        if(coins == 0){
            toast.error("Sorry, you don't have enought coins to spin the slot machine!");
            return;
        }
        if(spin === false){
            setSpin(true);
        }
    }

    return (
        <div className="w-full lg:w-1/3 h-60">
            <div>
                <h1 className="text-center text-lg" >Spin the slot machine!</h1>
            </div>
            <div className="grid grid-cols-3 items-center gap-1">
                <div className={rowStyle}>
                    <div className={spin ? "animate-bounce" : ""}>
                        <Svg svgName="apple" />
                    </div>
                    <div className={spin ? "animate-bounce" : middleRow}>
                        <Svg svgName={mainRow[0]} />
                    </div>
                    <div className={spin ? "animate-bounce" : ""}>
                        <Svg svgName="banana" />
                    </div>
                </div>
                <div className={rowStyle}>
                    <div className={spin ? "animate-bounce" : ""}>
                        <Svg svgName="lemon" />
                    </div>
                    <div className={spin ? "animate-bounce" : middleRow}>
                    <Svg svgName={mainRow[1]} />
                    </div>
                    <div className={spin ? "animate-bounce" : ""}>
                        <Svg svgName="cherry" />
                    </div>
                </div>
                <div className={rowStyle}>
                    <div className={spin ? "animate-bounce" : ""}>
                        <Svg svgName="lemon" />
                    </div>
                    <div className={spin ? "animate-bounce" : middleRow}>
                    <Svg svgName={mainRow[2]} />
                    </div>
                    <div className={spin ? "animate-bounce" : ""}>
                        <Svg svgName="cherry" />
                    </div>
                </div>
            </div>
            <br></br>
            <div className="grid grid-rows-1 items-center justify-items-center"> 
                <input
                    defaultValue = {!spin ? "Spin!" : ""}
                    type         = "button"
                    onClick      = {handleClick}
                    placeholder  = {!spin ? "Spin!" : ""}
                    className    = "w-60 h-20 rounded-xl text-4xl text-center bg-red-800 bottom-8 left-8 cursor-pointer">
                </input>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    )
}