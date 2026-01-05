import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Pause, Play, Save, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MantraJaapCounterProps {
  mantra: string;
  deityName: string;
}

const MantraJaapCounter = ({ mantra, deityName }: MantraJaapCounterProps) => {
  const { toast } = useToast();
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const storageKey = `jaap_${deityName.replace(/\s/g, '_')}_${mantra.slice(0, 10)}`;

  useEffect(() => {
    // Load saved counts from localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      
      if (data.lastDate === today) {
        setDailyCount(data.dailyCount || 0);
      }
      setTotalCount(data.totalCount || 0);
    }
  }, [storageKey]);

  const handleTap = () => {
    if (isPaused) return;
    setCount(prev => prev + 1);
    setIsSaved(false);
    
    // Vibration feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const handleReset = () => {
    setCount(0);
    setIsSaved(false);
  };

  const handleSave = () => {
    const today = new Date().toDateString();
    const newDailyCount = dailyCount + count;
    const newTotalCount = totalCount + count;

    localStorage.setItem(storageKey, JSON.stringify({
      dailyCount: newDailyCount,
      totalCount: newTotalCount,
      lastDate: today
    }));

    setDailyCount(newDailyCount);
    setTotalCount(newTotalCount);
    setCount(0);
    setIsSaved(true);

    toast({
      title: "🙏 Jaap Saved",
      description: `${count} chants saved. Total: ${newTotalCount}`,
    });
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-primary/20">
      <div className="text-center">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
          Mantra Jaap Counter
        </h3>
        <p className="text-sm text-muted-foreground mb-4 font-medium">
          {mantra}
        </p>

        {/* Main Counter Button */}
        <button
          onClick={handleTap}
          disabled={isPaused}
          className={`w-36 h-36 mx-auto rounded-full flex flex-col items-center justify-center mb-6 transition-all duration-200 ${
            isPaused
              ? "bg-muted/50 cursor-not-allowed"
              : "bg-gradient-to-br from-primary to-accent shadow-glow hover:scale-105 active:scale-95 cursor-pointer"
          }`}
        >
          <span className="text-4xl font-heading font-bold text-primary-foreground">
            {count}
          </span>
          <span className="text-xs text-primary-foreground/80 mt-1">
            {isPaused ? "Paused" : "Tap to Count"}
          </span>
        </button>

        {/* Control Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={togglePause}
            className="flex items-center gap-2"
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={handleSave}
            disabled={count === 0}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Today's Count</p>
            <p className="text-lg font-heading font-semibold text-primary">
              {dailyCount + count}
            </p>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Total Count</p>
            <p className="text-lg font-heading font-semibold text-accent">
              {totalCount + count}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 italic">
          🙏 Chant with devotion for {deityName}'s blessings
        </p>
      </div>
    </Card>
  );
};

export default MantraJaapCounter;
