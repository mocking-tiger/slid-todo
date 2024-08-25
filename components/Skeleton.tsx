export default function Skeleton({ width = "100%", height = "100%" }) {
  return (
    <div
      className="animate-pulse bg-gray-200"
      style={{ width: width, height: height }}
    ></div>
  );
}
