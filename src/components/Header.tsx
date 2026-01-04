import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🙏</span>
          <span className="font-heading text-xl font-semibold text-foreground">
            Divya Darshan
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#deities" className="text-muted-foreground hover:text-primary transition-colors font-body">
            Deities
          </a>
          <a href="#mantras" className="text-muted-foreground hover:text-primary transition-colors font-body">
            Mantras
          </a>
          <a href="#categories" className="text-muted-foreground hover:text-primary transition-colors font-body">
            Categories
          </a>
        </nav>

        <Button variant="sacred" size="sm">
          Begin Journey
        </Button>
      </div>
    </header>
  );
};

export default Header;
