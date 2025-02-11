"use client";

import MenuBar from "../menu-bar.js"
import GameBanner from "./components/game-banner.js"
import SearchBar from "./components/search-bar.js"
import Games from "./components/games.js"

import { useEffect, useState } from "react";

export default function Home() {

  const [homeButton, setHomeButton] = useState(false);
  const [coins, setCoins]   = useState(20);
  const [search, setSearch] = useState("");

  useEffect(() => {
  }, [search]);

  return (
    <div className="grid grid-rows-[40px_160px_360px_0px] items-center justify-items-center gap-4 p-4 font-[family-name:var(--font-geist-sans)]">
      <MenuBar coins={coins} homeButton={homeButton}/>
      <GameBanner />
      <SearchBar search={search} setSearch={setSearch} />
      <Games searchGame={search} />
    </div>
  );
}
