import { useState } from "react";
import ImageSelector from "./components/ImageSelector";
import PuzzleBoard from "./components/PuzzleBoard";

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold mb-6">🧩 Image Puzzle Game</h1>

      {!imageSrc ? (
        <ImageSelector onSelect={(src) => setImageSrc(src)} />
      ) : (
        <PuzzleBoard imageSrc={imageSrc} onBack={() => setImageSrc(null)} />
      )}
    </div>
  );
}
