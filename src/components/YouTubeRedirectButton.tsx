import { ExternalLink } from "lucide-react";

interface YouTubeRedirectButtonProps {
  url: string;
  title: string;
  titleHindi?: string;
  variant?: "aarti" | "bhajan";
  className?: string;
}

const YouTubeRedirectButton = ({ 
  url, 
  title, 
  titleHindi,
  variant = "aarti",
  className = ""
}: YouTubeRedirectButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between gap-3 py-4 px-4 rounded-lg border border-border bg-background hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group ${className}`}
    >
      <div className="flex items-center gap-3">
        {/* YouTube Logo */}
        <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 text-white"
            fill="currentColor"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        <div className="text-left">
          {titleHindi && (
            <p className="font-hindi text-sm text-foreground">{titleHindi}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {variant === "aarti" ? "Watch Aarti on YouTube" : "Watch Bhajan on YouTube"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-red-600 transition-colors">
        <span className="text-xs hidden sm:inline">YouTube</span>
        <ExternalLink className="w-4 h-4" />
      </div>
    </a>
  );
};

export default YouTubeRedirectButton;
