"use client";

import MenuBar from "../menu-bar";
import PlayGame from "./components/play-game.js"
import GameRules from "./components/game-rules";

import { useState } from "react";

export default function Play() {

  const [coins, setCoins] = useState(20);

  return (
    <div className="grid grid-rows-[30px_450px_580px] lg:grid-rows-[30px_450px_540px] items-center justify-items-center gap-4 p-4 font-[family-name:var(--font-geist-sans)]">
      <MenuBar coins={coins} homeButton={true} />
      <PlayGame coins={coins} setCoins={setCoins} />
      <GameRules />
    </div>
  );
}
