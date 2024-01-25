import { useEffect, useRef, useState } from "react";

const Demo2 = () => {
  const [y, setY] = useState(0);
  let ref = useRef(0);
  let x = 0;

  const interval = useRef(null);
  //   const interval = {
  //     current: null,
  //   };
  useEffect(() => {
    interval.current = setInterval(() => {
      console.log(`🚀 ~ Demo2 ~ `, Math.random() * 100);
    }, 1500);
    return () => {
      clearInterval(interval.current);
    };
  }, [y]);
  console.log("🚀Rendering....");
  return (
    <div className="m-4 p-2 w-96 h-96 border border-black">
      <div>
        <button
          className="p-2 m-2 bg-red-500 rounded-lg text-white"
          onClick={() => {
            x = x + 1;
            console.log("🚀 ~ Demo2 ~ let", x);
          }}
        >
          Increase X
        </button>
        <span className="font-bold text-xl">let = {x}</span>
      </div>
      <div>
        <button
          className="p-2 m-2 bg-red-500 rounded-lg text-white"
          onClick={() => {
            setY(y + 1);
            console.log("🚀 ~ Demo2 ~ State:", y);
          }}
        >
          Increase Y
        </button>
        <span className="font-bold text-xl">State = {y}</span>
      </div>
      <div>
        <button
          className="p-2 m-2 bg-red-500 rounded-lg text-white"
          onClick={() => {
            ref.current = ref.current + 1;
            console.log("🚀 ~ Demo2 ~ ref.current:", ref.current);
          }}
        >
          Increase Ref
        </button>
        <span className="font-bold text-xl">Ref = {ref.current}</span>
      </div>
      <button
        className="bg-red-900 m-2 p-2 text-white font-bold rounded-lg"
        onClick={() => clearInterval(interval.current)}
      >
        Stop Printing
      </button>
    </div>
  );
};

export default Demo2;
