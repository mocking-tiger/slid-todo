"use client";

import { useRef, useState } from "react";

export default function Test() {
  const num = useRef(1);
  const [num2, setNum2] = useState(1);

  function handleClick() {
    num.current++;
    setNum2((prev) => prev + 1);
  }

  return (
    <div>
      <div>{num.current}</div>
      <div>{num2}</div>
      <button onClick={handleClick}>Click me</button>;
    </div>
  );
}
