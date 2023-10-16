import { useImperativeHandle, useState } from "react";
function App() {
  const [work, setWork] = useState("");

  return (
    <div className="flex gap-8 h-screen w-full items-center border-red-500 justify-center ">
      <input
        type="text"
        className="outline-none border border-blue-600 px-4 py-2 w-[400px]"
        value={work}
        onChange={(e) => setWork(e.target.value)}
      ></input>
      <button
        type="button"
        className="bg-blue-500 rounded-md text-white px-4 py-2"
      >
        Add
      </button>
    </div>
  );
}

export default App;
