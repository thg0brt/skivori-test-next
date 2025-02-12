
import Svg from "./svg";

export default function gameRules(){

    return (
        <div className="w-full lg:w-3/5 h-35">
            <h1 className="text-center text-2xl font-bold">Game rules:</h1>
            <div className="grid grid-rows-4 items-center justify-items-center gap-3">
                <div className="grid grid-cols-2 items-center justify-items-center ">
                    <Svg svgName="cherry" />
                    <div className="grid grid-rows-2 items-center justify-items-center ">
                        <h1>3x = 50 coins</h1>
                        <h1>2x = 40 coins</h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center justify-items-center">
                    <Svg svgName="apple" />
                    <div className="grid grid-rows-2 items-center justify-items-center ">
                        <h1>3x = 20 coins</h1>
                        <h1>2x = 10 coins</h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center justify-items-center">
                    <Svg svgName="banana" />
                    <div className="grid grid-rows-2 items-center justify-items-center ">
                        <h1>3x = 15 coins</h1>
                        <h1>2x = 5 coins</h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center justify-items-center">
                    <Svg svgName="lemon" />
                    <div className="grid grid-rows-2 items-center justify-items-center ">
                        <h1>3x = 3 coins</h1>
                        <h1>2x = 1 coin</h1>
                    </div>
                </div>
            </div>
            <h1 className="text-center text-xl"><b>Note:</b> A match is only valid if it is in order from left to right.</h1>
        </div>
    );
}