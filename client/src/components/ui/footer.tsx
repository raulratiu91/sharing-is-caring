import { Heart } from "lucide-react";

interface FooterProps {
  text?: string;
}

export function Footer({
  text = "Building stronger communities through mutual support and care.",
}: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/50 mt-16">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">iCare</span>
        </div>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </footer>
  );
}
