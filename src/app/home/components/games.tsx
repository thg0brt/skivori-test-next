import Image from "next/image";
import imgNotFound from "../../assets/img-not-found.png"
import { useState, useEffect } from "react";

interface gameProp {
    searchGame?: string
}

interface gameJson {
    id: string,
    slug: string,
    title: string,
    providerName: string,
    thumb: {
        url: string
    }    
}

export default function Games({searchGame}: gameProp){
    
    // useState for managing the json data.
    const [dataJson, setDataJson] = useState<gameJson[]>([]);

    //Request to the back-end REST API endpoint.
    const fetchGames = async () => {
        let response = null

        //if searchGame is not empty, fetch the game based on the search-bar filter.
        if(searchGame != ""){
            response = await fetch("https://skivori-test-nest.onrender.com/games/search-games/"+searchGame);

        //If searchGame is empty, fetch all games from the back-end REST API endpoint
        }else{
            response = await fetch("https://skivori-test-nest.onrender.com/games/get-games");
        }

        let json = null
        if(response.ok){
            json = await response.json();
        }
        
        setDataJson(json);
    }

    //UseEffect to monitor and call the fetchGames request when the searchGame props changes.
    useEffect(() => {
        fetchGames();
    }, [searchGame]);

    //Default styles
    const imgStyle  = "w-full h-full rounded-xl shadow-lg shadow-black ";
    const imgStyle2 = imgStyle + " border-8";

    return (
        <div className="w-full lg:w-3/5 h-60 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-4 md:gap-y-10">
            {dataJson 
            ? dataJson.map((data) => (
                <div key={data.id}>
                    <div className="h-14">
                        <div className="h-1/2">
                            <p className="font-bold whitespace-normal text-wrap leading-none">{data.title}</p>
                        </div>
                        <div className="h-1/2 mt-1">
                            <span className="text-sm  font-light dark:text-white/50">{data.providerName}</span>
                        </div>
                    </div>
                    <div>
                        {
                            data.thumb 
                            ? <img 
                                id     = "gameIcon"
                                className = {imgStyle} 
                                key       = {data.id} 
                                src       = {"https:"+data.thumb.url} 
                                width     = {200} 
                                height    = {200} 
                                alt       = {data.title} />
                            : <Image 
                                id     = "gameIcon"
                                className = {imgStyle2}  
                                key       = {data.id} 
                                src       = {imgNotFound} 
                                width     = {200} 
                                height    = {200} 
                                alt       = {data.title}>
                                </Image>
                        }
                    </div>
                </div>
            ))
            :  <h1 className="text-center text-2xl font-bold">Loading game list</h1>
            }
        </div>
    );
}