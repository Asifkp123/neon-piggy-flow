
import React from "react";
import { Wallet, ArrowUpRight, QrCode, Plus, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [hideBalance, setHideBalance] = React.useState(false);
  
  // Example data
  const totalSavings = 12580;
  const savingsGoal = 20000;
  const savingsProgress = (totalSavings / savingsGoal) * 100;
  
  const quickActions = [
    { name: "Scan QR", icon: QrCode, link: "/scan", color: "bg-purple-500" },
    { name: "Add Money", icon: Plus, link: "/savings", color: "bg-blue-500" },
    { name: "Invest", icon: TrendingUp, link: "/invest", color: "bg-green-500" },
  ];
  
  // Mock recent transactions
  const recentTransactions = [
    { id: 1, name: "Coffee Shop", amount: -180, date: "Today", icon: "/placeholder.svg" },
    { id: 2, name: "Salary", amount: 45000, date: "Yesterday", icon: "/placeholder.svg" },
    { id: 3, name: "Grocery Store", amount: -1200, date: "Mar 15", icon: "/placeholder.svg" },
  ];
  
  return (
    <div className="h-full pb-24 px-5">
      {/* Header */}
      <header className="flex justify-between items-center mt-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-piggy-text">Hey, Alex!</h2>
          <p className="text-sm text-piggy-textMuted">Welcome back</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-piggy-card flex items-center justify-center border border-white/10">
          <span className="text-piggy-text font-medium">A</span>
        </div>
      </header>
      
      {/* Balance Card */}
      <div className="relative card-gradient rounded-2xl p-5 mb-6 neon-border">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-piggy-primary/10 via-piggy-accent/5 to-transparent" />
        <div className="flex justify-between items-start">
          <div>
            <p className="text-piggy-textMuted text-sm mb-1">Total Balance</p>
            <div className="flex items-center">
              {hideBalance ? (
                <div className="h-7 w-28 bg-white/10 rounded-md animate-pulse" />
              ) : (
                <h1 className="text-2xl font-bold text-piggy-text">₹{totalSavings.toLocaleString()}</h1>
              )}
              <button
                onClick={() => setHideBalance(!hideBalance)}
                className="ml-2 text-piggy-textMuted hover:text-piggy-text transition-colors"
              >
                {hideBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>
          <div className="float">
            <Wallet className="h-10 w-10 text-piggy-primary neon-text" />
          </div>
        </div>
        
        {/* Savings Progress */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-piggy-textMuted">Savings Goal</p>
            <p className="text-sm text-piggy-text font-medium">{Math.round(savingsProgress)}%</p>
          </div>
          <div className="relative">
            <Progress value={savingsProgress} className="h-2 bg-white/10" />
            <div className="progress-bar-animation absolute inset-0" />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xs text-piggy-textMuted">₹{totalSavings.toLocaleString()}</p>
            <p className="text-xs text-piggy-textMuted">₹{savingsGoal.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-piggy-text">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.name}
              variant="outline"
              className="flex flex-col items-center justify-center h-24 bg-piggy-card/80 hover:bg-piggy-card border-white/5 hover:border-piggy-primary/50 hover:neon-glow transition-all duration-300"
              asChild
            >
              <a href={action.link}>
                <div className={`${action.color} w-10 h-10 rounded-full flex items-center justify-center mb-2`}>
                  <action.icon size={20} className="text-white" />
                </div>
                <span className="text-sm text-piggy-text">{action.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-piggy-text">Recent Transactions</h2>
          <a href="/transactions" className="text-piggy-primary text-sm flex items-center">
            See All <ArrowUpRight size={14} className="ml-1" />
          </a>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center p-3 bg-piggy-card/80 rounded-xl border border-white/5">
              <div className="h-10 w-10 rounded-full bg-white/10 mr-3 flex items-center justify-center">
                <img src={transaction.icon} alt="" className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-piggy-text">{transaction.name}</h3>
                <p className="text-xs text-piggy-textMuted">{transaction.date}</p>
              </div>
              <div className={`text-sm font-medium ${transaction.amount >= 0 ? "text-piggy-primary" : "text-red-400"}`}>
                {transaction.amount >= 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
