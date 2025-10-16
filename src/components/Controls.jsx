import React from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export default function Controls({
  onImage,
  gridSize,
  setGridSize,
  moves,
  time,
  resetBoard,
}) {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImage(URL.createObjectURL(file));
  };

  const exportPNG = async () => {
    const el =
      document.querySelector("#puzzle-board") ||
      document.querySelector(".board-root");
    if (!el) return alert("Board not found");
    const canvas = await html2canvas(el);
    canvas.toBlob((blob) => {
      if (blob) saveAs(blob, "puzzle.png");
    });
  };

  const exportState = () => {
    const state = window.__PUZZLE_STATE__;
    const data = JSON.stringify(state || {}, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    saveAs(blob, "puzzle-state.json");
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center bg-white/80 rounded">
      {/* Image Upload */}
      <label className="flex items-center gap-2 cursor-pointer">
        <button className="px-2 py-1 rounded bg-gray-200 text-sm font-medium text-gray-700">
          Upload image
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {/* Grid Selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Grid :</label>
        <select
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className=" border rounded-md p-1 text-sm"
        >
          <option value={2}>2 × 2</option>
          <option value={3}>3 × 3</option>
          <option value={4}>4 × 4</option>
          <option value={5}>5 × 5</option>
        </select>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-gray-800 font-semibold">
        <span>⏱ {time}s</span>
        <span>🎯 {moves} moves</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={resetBoard}
          className="px-3 py-1 rounded bg-yellow-500 text-white text-sm hover:opacity-90"
        >
          Reset
        </button>
        <button
          onClick={exportPNG}
          className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:opacity-90"
        >
          Export PNG
        </button>
        <button
          onClick={exportState}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:opacity-90"
        >
          Export State
        </button>
      </div>
    </div>
  );
}
