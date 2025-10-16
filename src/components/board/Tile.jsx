export default function Tile({
  index,
  tile,
  gridSize,
  imageSrc,
  moveTile,
  tileSize,
}) {
  const row = Math.floor(tile / gridSize);
  const col = tile % gridSize;

  const style = {
    width: tileSize,
    height: tileSize,
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
    backgroundPosition: `${(col / (gridSize - 1)) * 100}% ${
      (row / (gridSize - 1)) * 100
    }%`,
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("tileIndex", index);
  };

  return (
    <div
      className="border border-white cursor-pointer active:scale-95 transition-transform duration-150"
      style={style}
      onClick={() => moveTile(index)} // click to move
      draggable
      onDragStart={handleDragStart}
    ></div>
  );
}
