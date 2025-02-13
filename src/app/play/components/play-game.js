
import Svg from "./svg.js"
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function playGame({coins, setCoins}){

    //UseState for the game control variables.
    const [spin, setSpin] = useState(false); //defines whether the user spun the slot machine or not 
    const [json, setJson] = useState(null);
    const [mainRow, setMainRow] = useState({ 0 : "lemon", 1 : "lemon", 2 : "apple" }); //set a default mainRow.

    //default styles
    const rowStyle  = "grid grid-rows-3 items-center justify-items-center ReelRow";
    const middleRow = "middleRow";

    //POST request to the back-end Play REST API endpoint.
    const play = async () => {
        const response = await fetch("https://skivori-test-nest.onrender.com/games/play", {
            method: 'POST'
        });
        const data = await response.json();
        setJson(data);
    }

    //UseEffect to call the Play request when the user spin the the slot machine props changes.
    useEffect(() => {
        if(spin){
            //Set a timeout of 3 seconds, then call the play method.
            setTimeout(() => {
                play();

                setSpin(false);
            }, 3000);
            
        } 
    }, [spin]);

    //useEffect to update the new balance and mainRow icons when the json changes.
    useEffect(() => {
        if(json != null){
            setMainRow(json[1]);
            
            const result = json[0];

            //defines the toast mensage
            if(result < 0){
                toast.error("Bad luck! You lost 1 coin.", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else if (result < 15){
                toast.success("Great! You won "+result+" coins.", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else if (result >= 15){
                toast.success("Big win! You won "+result+" coins.", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }

            const currentCoins = coins;
            const newBalance   = currentCoins + (result)

            setCoins(newBalance);
            console.log(mainRow);
        }
    }, [json]);

    //OnClick action to triggers the play request.
    function handleClick(){
        if(coins == 0){
            toast.error("Sorry, you don't have enought coins to spin the slot machine!", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
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
            </div>
        </div>
    )
}