
import React, { useState, useRef } from "react";
import { ArrowLeft, Info, Coins, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

const SavingsPage = () => {
  const [amount, setAmount] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [coinsCount, setCoinsCount] = useState<number[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };
  
  const handleAddMoney = () => {
    if (!amount || parseInt(amount) <= 0) return;
    
    // Generate random number of coins based on amount
    const numCoins = Math.min(Math.ceil(parseInt(amount) / 100), 10);
    setCoinsCount(Array.from({ length: numCoins }, (_, i) => i));
    setShowAnimation(true);
    
    // After animation completes
    setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
    
    // Reset after showing success
    setTimeout(() => {
      setShowAnimation(false);
      setAnimationComplete(false);
      setAmount("");
      navigate("/");
    }, 3000);
  };
  
  // Generate random X position for coins
  const getRandomX = () => {
    if (!containerRef.current) return 0;
    const width = containerRef.current.offsetWidth;
    return Math.random() * (width - 60); // Accounting for coin size
  };
  
  // Generate random delay for animation
  const getRandomDelay = () => {
    return Math.random() * 0.3;
  };
  
  return (
    <div className="h-full pb-24 px-5">
      {/* Header */}
      <header className="pt-2 pb-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-piggy-text"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold text-piggy-text ml-4">Add to Piggy Bank</h1>
      </header>
      
      <Tabs defaultValue="add" className="mb-6">
        <TabsList className="grid grid-cols-2 bg-piggy-card">
          <TabsTrigger value="add" className="data-[state=active]:bg-piggy-primary data-[state=active]:text-piggy-background">
            Add Money
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-piggy-primary data-[state=active]:text-piggy-background">
            Saving Goals
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="mt-4 space-y-4">
          {/* Piggy Bank Animation Container */}
          <div 
            ref={containerRef}
            className="relative h-64 bg-piggy-card/40 rounded-2xl border border-white/5 mb-6 overflow-hidden"
          >
            {/* Piggy Bank */}
            <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${animationComplete ? 'scale-110' : ''}`}>
              <div className="relative w-32 h-32">
                {/* Stylized Piggy Bank */}
                <div className="absolute inset-0 rounded-full bg-piggy-primary/20 flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-full bg-piggy-primary flex items-center justify-center ${animationComplete ? 'pulse-glow' : ''}`}>
                    <Coins size={40} className="text-piggy-background" />
                  </div>
                </div>
                
                {/* Success indicator */}
                {animationComplete && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="bg-piggy-primary text-piggy-background px-3 py-1 rounded-full text-sm font-medium animate-bounce">
                      Added!
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Falling Coins Animation */}
            {showAnimation && coinsCount.map((i) => (
              <div 
                key={i}
                className="absolute coin-drop"
                style={{
                  left: `${getRandomX()}px`, 
                  top: '0',
                  animationDelay: `${getRandomDelay()}s`
                }}
              >
                <div className="w-10 h-10 rounded-full bg-yellow-400 border-4 border-yellow-500 flex items-center justify-center text-yellow-800 font-bold shadow-lg">
                  ₹
                </div>
              </div>
            ))}
          </div>
          
          {/* Amount Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-piggy-text">
              Enter Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-piggy-text font-medium">₹</span>
              <Input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="pl-8 text-2xl font-bold bg-piggy-card border-white/5 text-piggy-text"
                placeholder="0"
              />
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[100, 500, 1000].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="bg-piggy-card/80 border-white/5 hover:bg-piggy-card hover:border-piggy-primary/30"
                >
                  ₹{quickAmount}
                </Button>
              ))}
            </div>
            
            <div className="bg-piggy-primary/10 rounded-lg p-3 flex items-start border border-piggy-primary/20">
              <Info size={18} className="text-piggy-primary mt-0.5 mr-2" />
              <p className="text-xs text-piggy-textMuted">Adding money to your piggy bank helps you reach your savings goals faster. Funds are securely stored.</p>
            </div>
            
            <Button
              onClick={handleAddMoney}
              disabled={!amount || parseInt(amount) <= 0 || showAnimation}
              className="w-full bg-piggy-primary text-piggy-background hover:bg-piggy-secondary neon-glow"
            >
              Add to Piggy Bank
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-4 space-y-4">
          <div className="bg-piggy-card/50 rounded-xl p-4 border border-white/5 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-md font-bold text-piggy-text">New Laptop</h3>
              <TrendingUp size={18} className="text-piggy-primary" />
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-piggy-textMuted">Progress</p>
                <p className="text-xs text-piggy-text">45%</p>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[45%] bg-piggy-primary rounded-full progress-bar-animation" />
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <p className="text-piggy-textMuted">Current: ₹45,000</p>
              <p className="text-piggy-textMuted">Target: ₹1,00,000</p>
            </div>
          </div>
          
          <div className="bg-piggy-card/50 rounded-xl p-4 border border-white/5 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-md font-bold text-piggy-text">Vacation</h3>
              <TrendingUp size={18} className="text-piggy-primary" />
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-piggy-textMuted">Progress</p>
                <p className="text-xs text-piggy-text">20%</p>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[20%] bg-piggy-primary rounded-full progress-bar-animation" />
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <p className="text-piggy-textMuted">Current: ₹10,000</p>
              <p className="text-piggy-textMuted">Target: ₹50,000</p>
            </div>
          </div>
          
          <Button className="w-full bg-piggy-card/80 border border-piggy-primary/30 text-piggy-text hover:bg-piggy-card">
            + Create New Goal
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavingsPage;
