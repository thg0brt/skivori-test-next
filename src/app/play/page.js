import MenuBar from "../menu-bar";

export default function Play() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <MenuBar />
      <h1>Play page</h1>
    </div>
  );
}
