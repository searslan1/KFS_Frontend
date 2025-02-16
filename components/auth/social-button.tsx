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
      className="w-12 h-12 rounded-xl bg-[#4DB05F] border-[#4DB05F] hover:bg-[#4DB05F]/10"
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
