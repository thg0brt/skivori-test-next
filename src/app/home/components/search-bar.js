"use client";

export default function searchBar({search, setSearch})  {

    function changeSeach(e){
        const val = e.target.value;
        setSearch(val);
    }

    return (
        <div className="w-full lg:w-3/5 h-10">
            <input
                value        = {search}
                onChange     = {changeSeach}
                placeholder  = "Search a game by title"
                className    = "w-full h-1/2 p-8 text-lg bg-neutral-700 rounded-xl">
            </input>
        </div>
        
    );
}