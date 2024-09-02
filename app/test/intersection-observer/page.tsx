"use client";

import { useEffect, useRef } from "react";

export default function Test() {
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (it) => {
        if (it[0].isIntersecting) {
          console.log("보임");
        } else {
          console.log("안보임");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    const targetNode = divRef.current;
    return () => {
      if (targetNode) {
        observer.unobserve(targetNode);
      }
    };
  }, []);

  return (
    <div>
      <div className="w-[600px] h-[1600px] bg-black"></div>
      <div ref={divRef}>옵저버 발동!</div>
    </div>
  );
}
