import { useState } from "react";

const sampleImages = [
  { name: "Prabhas", src: "/sample-images/prabhas.webp" },
  { name: "NTR", src: "/sample-images/ntr.jpg" },
  { name: "Lion", src: "/sample-images/lion1.webp" },
  { name: "rithik", src: "/sample-images/rithik.jpg" },
  { name: "allu", src: "/sample-images/allu.jpg" },
  { name: "yash", src: "/sample-images/yash.jpg" },
  { name: "ram", src: "/sample-images/ram.jpg" },
  { name: "surya", src: "/sample-images/surya.jpg" },
  { name: "ramcharan", src: "/sample-images/ramcharan.jpg" },
  { name: "nani", src: "/sample-images/nani.jpg" },
  { name: "chiru", src: "/sample-images/chiru.jpg" },
  { name: "balayya", src: "/sample-images/balayya.webp" },
  { name: "zebra", src: "/sample-images/zebra.jpg" },
  { name: "swan", src: "/sample-images/swan.jpg" },
  { name: "gorilla", src: "/sample-images/gorilla.jpg" },
  { name: "dear", src: "/sample-images/dear.webp" },
  { name: "elephant", src: "/sample-images/elephant.jpeg" },
  { name: "eagle", src: "/sample-images/eagle.webp" },
  { name: "taj", src: "/sample-images/taj.webp" },
  { name: "mountain", src: "/sample-images/mountain.jpg" },
  { name: "hand", src: "/sample-images/hand.jpg" },
  { name: "palace", src: "/sample-images/palace.jpg" },
  { name: "sunset", src: "/sample-images/sunset.jpg" },
  { name: "char", src: "/sample-images/char.jpg" },
];

export default function ImageSelector({ onSelect }) {
  const [mode, setMode] = useState("sample");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onSelect(url);
    }
  };

  return (
    <div className="w-full mx-auto mb-6">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setMode("sample")}
          className={`px-4 py-2 rounded-lg ${
            mode === "sample" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sample Images
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded-lg ${
            mode === "upload" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Upload My Own
        </button>
      </div>

      {mode === "sample" && (
        <div className="grid grid-cols-6 gap-4">
          {sampleImages.map((img) => (
            <div
              key={img.name}
              className="cursor-pointer object-contain w-full h-40 bg-gray-100 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => onSelect(img.src)}
            >
              <img src={img.src} alt={img.name} />
            </div>
          ))}
        </div>
      )}

      {mode === "upload" && (
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
}
