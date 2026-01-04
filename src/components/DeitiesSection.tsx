import { Link } from "react-router-dom";
import DeityCard from "./DeityCard";
import { deities } from "@/data/deities";

const DeitiesSection = () => {
  return (
    <section id="deities" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Divine Presence
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Sacred Deities & Gurus
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the complete life histories, teachings, and divine wisdom of each deity. 
            Click on any card to read their full story in chapters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deities.map((deity, index) => (
            <Link key={deity.id} to={`/deity/${deity.id}`}>
              <DeityCard
                name={deity.name}
                sanskrit={deity.sanskrit}
                description={deity.description}
                emoji={deity.emoji}
                color={deity.color}
                delay={index * 100}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeitiesSection;
