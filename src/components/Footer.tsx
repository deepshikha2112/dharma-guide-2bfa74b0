const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 inline-block">ॐ</span>
          <h3 className="font-heading text-2xl font-semibold mb-2">
            Divya Darshan
          </h3>
          <p className="text-secondary-foreground/70 max-w-md mx-auto">
            Guiding souls towards inner peace through the timeless wisdom of Sanatan Dharma.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Explore</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">Deities</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Mantras</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Stories</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Festivals</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Learn</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">Scriptures</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Teachings</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Symbolism</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Rituals</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Practice</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">Daily Puja</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Meditation</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Aartis</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Chalisas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Connect</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Feedback</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Share App</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/60 mb-2">
            "सर्वे भवन्तु सुखिनः" — May all beings be happy
          </p>
          <p className="text-xs text-secondary-foreground/40">
            © 2024 Divya Darshan. Made with 🙏 and devotion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
