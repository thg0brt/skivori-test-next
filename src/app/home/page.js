"use client";

import MenuBar from "../menu-bar.js"
import GameBanner from "./components/game-banner.js"
import SearchBar from "./components/search-bar.js"
import Games from "./components/games.js"

import { useEffect, useState } from "react";

//Route for the homepage.
export default function Home() {

  //UseState for the search-bar and games.
  const [search, setSearch] = useState("");

  //UseEffect to monitor and refresh the game-list (Games)
  useEffect(() => {
  }, [search]);

  return (
    <div className="grid grid-rows-[30px_360px_0px_340px] lg:grid-rows-[30px_550px_0px_370px] items-center justify-items-center gap-4 p-4 font-[family-name:var(--font-geist-sans)]">
      <MenuBar />
      <GameBanner />
      <SearchBar search={search} setSearch={setSearch} />
      <Games searchGame={search} />
    </div>
  );
}
