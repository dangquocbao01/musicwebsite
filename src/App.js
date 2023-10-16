import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [work, setWork] = useState("");
  const handleAdd = () => {
    if (todos?.some((items) => items.id === work.replace(/ /g, "_"))) {
      toast.warn("Công việc bị trùng");
    } else {
      setTodos((prev) => [...prev, { id: work.replace(/ /g, "_"), job: work }]);
      setWork("");
    }
  };
  const deleteWork = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <div className="flex gap-8 flex-col h-screen w-full items-center border-red-500 justify-center ">
        <div className="flex gap-8">
          <input
            type="text"
            className="outline-none border border-blue-600 px-4 py-2 w-[400px]"
            value={work}
            onChange={(e) => setWork(e.target.value)}
          ></input>
          <button
            type="button"
            className="bg-blue-500 rounded-md text-white px-4 py-2"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div>
          <h3 className="font-bold ">Content</h3>
          <ul>
            {todos?.map((item, index) => {
              return (
                <li key={item.id} className="  flex gap-10 items-center">
                  <span className="my-2"> {item.job}</span>
                  <span
                    className="my-2 cursor-pointer w-5 rounded-md bg-blue-400 text-center"
                    onClick={() => deleteWork(item.id)}
                  >
                    x
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
