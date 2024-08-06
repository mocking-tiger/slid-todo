export default function ProgressCircle() {
  return (
    <div className="absolute left-[40%] 2xl:left-[50%] top-16 z-10">
      <svg
        width="166"
        height="166"
        viewBox="0 0 166 166"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="graph">
          <circle
            id="Ellipse 215"
            cx="83"
            cy="83"
            r="67"
            stroke="#F8FAFC"
            strokeWidth="32"
          />
          <circle
            className="progress-ring__circle"
            cx="83"
            cy="83"
            r="67"
            stroke="#000000"
            strokeWidth="32"
          />
        </g>
      </svg>
    </div>
  );
}
