import { useState, useEffect } from "react";
import Board from "./board/Board";
import Controls from "./Controls";

export default function PuzzleBoard({ imageSrc, onBack }) {
  const [gridSize, setGridSize] = useState(3);
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(null);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    resetBoard();
  }, [gridSize, imageSrc]);

  const resetBoard = () => {
    const total = gridSize * gridSize;
    const arr = [...Array(total).keys()];
    arr[total - 1] = null;
    setTiles(shuffleArray(arr));
    setEmptyIndex(total - 1);
    setMoves(0);
    setTime(0);
    setSolved(false);
    if (intervalId) clearInterval(intervalId);
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    setIntervalId(id);
    setIsPlaying(true);
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const moveTile = (index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    if (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    ) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
      setEmptyIndex(index);
      setMoves((m) => m + 1);

      if (checkSolved(newTiles)) {
        setSolved(true);
        setIsPlaying(false);
        clearInterval(intervalId);
        saveToLeaderboard();
      }
    }
  };

  const checkSolved = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== i) return false;
    }
    return true;
  };

  const saveToLeaderboard = () => {
    const entry = { moves, time, date: new Date().toLocaleString() };
    const data = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    data.push(entry);
    localStorage.setItem("leaderboard", JSON.stringify(data));
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBack}
        className="mb-6 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
      >
        ⬅ Back
      </button>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl w-full max-w-3xl">
        <Controls
          gridSize={gridSize}
          setGridSize={setGridSize}
          moves={moves}
          time={time}
          resetBoard={resetBoard}
        />

        <div
          id="puzzle-board"
          className="flex justify-center mt-6 rounded-2xl shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 p-4"
        >
          <Board
            tiles={tiles}
            gridSize={gridSize}
            imageSrc={imageSrc}
            moveTile={moveTile}
          />
        </div>

        {solved && (
          <div className="mt-6 text-green-600 font-bold text-xl animate-bounce text-center">
            🎉 You solved it in {moves} moves & {time}s!
          </div>
        )}
      </div>
    </div>
  );
}
