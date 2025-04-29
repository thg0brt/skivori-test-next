"use client";

import  Header   from "../header/header"
import PlayGame  from "./components/play-game"
import GameRules from "./components/game-rules";


//Route for the play page.
export default function Play() {

  return (
    <div className="min-h-screen grid grid-rows-[30px_450px_350px] lg:grid-rows-[60px_450px_340px] justify-items-center gap-4">
      <Header />
      <PlayGame />
      <GameRules />
    </div>
  );
}
