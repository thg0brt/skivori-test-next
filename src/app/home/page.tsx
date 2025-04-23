"use client";

import  MenuBar     from "../menu-bar"
import  GameBanner  from "./components/game-banner"
import  SearchBar   from "./components/search-bar"
import  Games       from "./components/games"

import { useEffect, useState } from "react";

//Route for the homepage.
export default function Home() {

  //UseState for the search-bar and games.
  const [search, setSearch] = useState<string>("");

  //UseEffect to monitor and refresh the game-list (Games)
  useEffect(() => {
  }, [search]);

  return (
    <div className="grid grid-rows-[30px_150px_350px_0px] lg:grid-rows-[30px_400px_450px_0px] items-center justify-items-center gap-4 p-4 font-[family-name:var(--font-geist-sans)]">
      <MenuBar coins={undefined} homeButton={false}/>
      <GameBanner />
      <SearchBar search={search} setSearch={setSearch} />
      <Games searchGame={search} />
    </div>
  );
}
