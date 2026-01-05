import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";
import { MeditationTrack } from "@/data/meditationMoods";

interface TrackListProps {
  tracks: MeditationTrack[];
  selectedTrack: MeditationTrack | null;
  onSelectTrack: (track: MeditationTrack) => void;
}

const TrackList = ({ tracks, selectedTrack, onSelectTrack }: TrackListProps) => {
  return (
    <div className="space-y-2">
      {tracks.map((track, index) => (
        <Card
          key={track.id}
          onClick={() => onSelectTrack(track)}
          className={`p-3 cursor-pointer transition-all hover:bg-primary/5 ${
            selectedTrack?.id === track.id
              ? "ring-1 ring-primary bg-primary/5"
              : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className={`w-10 h-10 rounded-full flex-shrink-0 ${
                selectedTrack?.id === track.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <Play className="w-4 h-4 ml-0.5" />
            </Button>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">
                {track.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {track.description}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
              <Clock className="w-3 h-3" />
              {track.duration}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TrackList;
