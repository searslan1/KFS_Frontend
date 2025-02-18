import { Button } from "@/components/ui/button";

interface SocialButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export function SocialButton({ icon, onClick }: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="w-12 h-12 rounded-xl border-[#4DB05F] hover:bg-white"
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
