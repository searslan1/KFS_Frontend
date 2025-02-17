interface AchievementBadgeProps {
  title: string;
  score: number;
  type: "success" | "kfs" | "secondary";
}

export function AchievementBadge({
  title,
  score,
  type,
}: AchievementBadgeProps) {
  const getBadgeColors = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-100 text-emerald-700";
      case "kfs":
        return "bg-blue-100 text-blue-700";
      case "secondary":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${getBadgeColors(
        type
      )}`}
    >
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center ${
          type === "success"
            ? "bg-emerald-700"
            : type === "kfs"
            ? "bg-blue-700"
            : "bg-pink-700"
        }`}
      >
        <span className="text-white text-[10px]">★</span>
      </div>
      <span className="font-medium whitespace-nowrap">{title}</span>
      <span className="font-bold">{score}</span>
    </div>
  );
}
