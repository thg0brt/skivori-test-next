"use client";

export default function searchBar({search, setSearch})  {

    //Set new value to the search state variable when the game-bar input changes.
    function changeSeach(e){
        const val = e.target.value;
        setSearch(val);
    }

    return (
        <div className="w-full lg:w-3/5 h-5">
            <input
                value        = {search}
                onChange     = {changeSeach}
                placeholder  = "Search a game by title"
                className    = "w-full h-1/2 p-8 text-lg bg-neutral-700 rounded-xl">
            </input>
        </div>
        
    );
}