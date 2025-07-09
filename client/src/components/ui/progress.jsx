export const Progress = ({ value = 0, className = "" }) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-300 ${className}`}>
      <div
        className="h-full bg-black transition-all duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
