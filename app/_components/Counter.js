"use client";
import { useState } from "react";

function Counter({ users }) {
  const [counter, setCounter] = useState(0);
  console.log(users);
  return (
    <div>
      {counter}
      <button onClick={() => setCounter((prev) => prev + 1)}>Add</button>
    </div>
  );
}

export default Counter;
