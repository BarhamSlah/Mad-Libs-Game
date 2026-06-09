import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

function MadLibsGame() {
  const [adjective, setAdjective] = useState("");
  const [name1, setName1] = useState("");
  const [pastVerb, setPastVerb] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  const isFormComplete = adjective && name1 && pastVerb && name2 && name3;

  const handleReveal = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete) {
      setIsRevealed(true);
    }
  };

  const handleReset = () => {
    setAdjective("");
    setName1("");
    setPastVerb("");
    setName2("");
    setName3("");
    setIsRevealed(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="max-w-2xl w-full card-retro relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl text-primary mb-2 transform -rotate-1">Mad Libs</h1>
          <p className="text-xl text-muted-foreground font-bold font-sans">A pleasantly chaotic word game</p>
        </div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleReveal} 
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="adjective" className="font-display text-lg text-foreground">An adjective (describing word):</label>
                  <input 
                    id="adjective"
                    type="text" 
                    value={adjective} 
                    onChange={(e) => setAdjective(e.target.value)} 
                    placeholder="e.g. squishy"
                    className="input-retro"
                    data-testid="input-adjective"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name1" className="font-display text-lg text-foreground">A person's name:</label>
                  <input 
                    id="name1"
                    type="text" 
                    value={name1} 
                    onChange={(e) => setName1(e.target.value)} 
                    placeholder="e.g. Gertrude"
                    className="input-retro"
                    data-testid="input-name1"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="pastVerb" className="font-display text-lg text-foreground">A past tense verb (action word):</label>
                  <input 
                    id="pastVerb"
                    type="text" 
                    value={pastVerb} 
                    onChange={(e) => setPastVerb(e.target.value)} 
                    placeholder="e.g. leaped"
                    className="input-retro"
                    data-testid="input-pastVerb"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name2" className="font-display text-lg text-foreground">Another person's name:</label>
                  <input 
                    id="name2"
                    type="text" 
                    value={name2} 
                    onChange={(e) => setName2(e.target.value)} 
                    placeholder="e.g. Barnaby"
                    className="input-retro"
                    data-testid="input-name2"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name3" className="font-display text-lg text-foreground">One last person's name:</label>
                  <input 
                    id="name3"
                    type="text" 
                    value={name3} 
                    onChange={(e) => setName3(e.target.value)} 
                    placeholder="e.g. Mildred"
                    className="input-retro"
                    data-testid="input-name3"
                  />
                </div>
              </div>

              <div className="pt-8 text-center">
                <button 
                  type="submit" 
                  disabled={!isFormComplete}
                  className="button-retro bg-primary text-primary-foreground w-full md:w-auto"
                  data-testid="button-reveal"
                >
                  Reveal Story!
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="story"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="text-center space-y-8"
            >
              <div className="bg-accent/20 p-8 rounded-2xl border-4 border-accent space-y-6 text-xl md:text-2xl leading-relaxed text-foreground font-sans font-bold">
                <p>
                  "I am very <span className="word-highlight">{adjective}</span> today."
                </p>
                <p>
                  "I saw <span className="word-highlight mx-1">{name1}</span> yesterday."
                </p>
                <p>
                  "A little while ago I <span className="word-highlight mx-1">{pastVerb}</span> to <span className="word-highlight mx-1">{name2}</span>."
                </p>
                <p>
                  "<span className="word-highlight mx-1">{name3}</span> is very funny just like you."
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleReset}
                  className="button-retro bg-secondary text-secondary-foreground"
                  data-testid="button-reset"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={MadLibsGame} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
