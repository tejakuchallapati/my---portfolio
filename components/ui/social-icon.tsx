import { Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface SocialIconLinks {
  github?: string;
  linkedin?: string;
  email?: string;
}

const baseIconClass =
  "rounded-xl h-12 w-12 transition-all duration-300 cursor-pointer hover:scale-[1.12] bg-background/60";

const socialStyles = {
  github:
    "border-violet-500/40 text-violet-300 hover:border-violet-400 hover:bg-violet-500/15 hover:text-violet-200 hover:shadow-[0_0_22px_rgba(139,92,246,0.35)]",
  linkedin:
    "border-[#0A66C2]/45 text-[#5eb3ff] hover:border-[#0A66C2] hover:bg-[#0A66C2]/15 hover:text-[#7ec8ff] hover:shadow-[0_0_22px_rgba(10,102,194,0.4)]",
  email:
    "border-amber-500/45 text-amber-300 hover:border-amber-400 hover:bg-amber-500/15 hover:text-amber-200 hover:shadow-[0_0_22px_rgba(245,158,11,0.35)]",
};

export function SocialIcons({
  github = "https://github.com/tejakuchallapati",
  linkedin = "https://www.linkedin.com/in/teja-kuchallapati-806a29374/",
  email = "mailto:teja26kt@gmail.com",
}: SocialIconLinks) {
  return (
    <div className="flex items-center justify-start gap-4 flex-wrap">
      <Button
        variant="outline"
        size="icon"
        className={`${baseIconClass} ${socialStyles.github}`}
        asChild
      >
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`${baseIconClass} ${socialStyles.linkedin}`}
        asChild
      >
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`${baseIconClass} ${socialStyles.email}`}
        asChild
      >
        <a href={email} aria-label="Email">
          <Mail className="h-5 w-5" />
        </a>
      </Button>
    </div>
  );
}

export default SocialIcons;
