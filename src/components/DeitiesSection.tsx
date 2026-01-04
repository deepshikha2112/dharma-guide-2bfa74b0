import DeityCard from "./DeityCard";

const deities = [
  {
    name: "Lord Ganesha",
    sanskrit: "श्री गणेश",
    description: "The remover of obstacles and the deity of beginnings, wisdom, and learning.",
    emoji: "🐘",
    color: "bg-primary/10",
  },
  {
    name: "Lord Shiva",
    sanskrit: "भगवान शिव",
    description: "The supreme being who creates, protects, and transforms the universe.",
    emoji: "🔱",
    color: "bg-secondary/20",
  },
  {
    name: "Lord Vishnu",
    sanskrit: "भगवान विष्णु",
    description: "The preserver and protector of the universe, embodiment of mercy and goodness.",
    emoji: "🪷",
    color: "bg-accent/20",
  },
  {
    name: "Goddess Durga",
    sanskrit: "माँ दुर्गा",
    description: "The fierce warrior goddess who protects the righteous and destroys evil.",
    emoji: "🦁",
    color: "bg-primary/10",
  },
  {
    name: "Lord Hanuman",
    sanskrit: "श्री हनुमान",
    description: "The embodiment of devotion, strength, and selfless service.",
    emoji: "🙏",
    color: "bg-accent/20",
  },
  {
    name: "Goddess Lakshmi",
    sanskrit: "माँ लक्ष्मी",
    description: "The goddess of wealth, fortune, prosperity, and beauty.",
    emoji: "✨",
    color: "bg-secondary/20",
  },
];

const DeitiesSection = () => {
  return (
    <section id="deities" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Divine Presence
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Sacred Deities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the stories, symbolism, and teachings of the divine beings 
            who guide devotees on their spiritual path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deities.map((deity, index) => (
            <DeityCard
              key={deity.name}
              {...deity}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeitiesSection;
