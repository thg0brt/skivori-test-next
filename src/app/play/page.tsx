"use client";

import MenuBar from "../menu-bar";
import PlayGame from "./components/play-game"
import GameRules from "./components/game-rules";

import { useState } from "react";

//Route for the play page.
export default function Play() {

  //UseState for the coins variable
  const [coins, setCoins] = useState<number>(20);

  return (
    <div className="grid grid-rows-[30px_450px_580px] lg:grid-rows-[30px_450px_540px] items-center justify-items-center gap-4 p-4 font-[family-name:var(--font-geist-sans)]">
      <MenuBar coins={coins} homeButton={true} />
      <PlayGame coins={coins} setCoins={setCoins} />
      <GameRules />
    </div>
  );
}
