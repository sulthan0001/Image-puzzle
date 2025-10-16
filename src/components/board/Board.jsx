import Tile from "./Tile";

export default function Board({ tiles, gridSize, imageSrc, moveTile }) {
  const size = 400; // board size in px
  const tileSize = size / gridSize;

  const handleDrop = (e, index) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("tileIndex"), 10);
    if (!isNaN(fromIndex)) {
      moveTile(fromIndex, index);
    }
  };

  return (
    <div
      className="grid bg-gray-300 rounded-lg overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${tileSize}px)`,
        width: size,
        height: size,
      }}
    >
      {tiles.map((tile, i) => (
        <div
          key={i}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, i)}
        >
          {tile !== null && (
            <Tile
              index={i}
              tile={tile}
              gridSize={gridSize}
              imageSrc={imageSrc}
              moveTile={moveTile}
              tileSize={tileSize}
            />
          )}
        </div>
      ))}
    </div>
  );
}
