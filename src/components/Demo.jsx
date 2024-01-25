import { useMemo, useState } from "react";
import { findPrime } from "../utilts/helper";

const Demo = () => {
  const [text, setText] = useState(0);
  const [isDarkTheme, setDarkTheme] = useState(false);

  // const primeNumbers = findPrime(text);
  const primeNumbers = useMemo(() => findPrime(text), [text]);

  return (
    <div
      className={
        "m-4 p-2 w-96 h-96 border border-black " +
        (isDarkTheme && "bg-gray-900 ")
      }
    >
      <div>
        <button
          onClick={() => setDarkTheme(!isDarkTheme)}
          className="p-2 m-2 bg-red-500 rounded-lg text-white"
        >
          {isDarkTheme ? "Normal" : "Dark"}
        </button>
      </div>
      <div>
        <input
          className={"border border-slate-500 w-72 rounded-full p-2 m-2"}
          type="number"
          value={text === 0 ? "" : text}
          placeholder="some text"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <h1
          className={
            "px-2 py-2 font-semibold text-2xl " + (isDarkTheme && "text-white")
          }
        >
          nth primes: {primeNumbers}
        </h1>
      </div>
    </div>
  );
};

export default Demo;
