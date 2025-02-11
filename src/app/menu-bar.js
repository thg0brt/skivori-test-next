export default function menuBar({coins, homeButton}) {
    return (
        <div className="w-full lg:w-3/5 h-5">
            <div>
                <h1 className="text-3xl font-bold text-center">Play Games!</h1>
                <h1 className="text-sm text-center m-2">Coins Balance: {coins}</h1>
            </div>
        </div>
    );
}