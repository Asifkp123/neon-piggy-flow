
import React, { useState } from "react";
import { Calendar, Search, ShoppingCart, ArrowDown, ArrowUp, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TransactionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Example transactions data
  const transactions = [
    {
      id: 1,
      type: "expense",
      name: "Coffee Shop",
      description: "Cappuccino",
      amount: 180,
      date: "Today, 9:30 AM",
      icon: "/placeholder.svg",
      paymentMethod: "UPI"
    },
    {
      id: 2,
      type: "income",
      name: "Salary",
      description: "Monthly salary",
      amount: 45000,
      date: "Yesterday, 10:00 AM",
      icon: "/placeholder.svg",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 3,
      type: "expense",
      name: "Grocery Store",
      description: "Weekly groceries",
      amount: 1200,
      date: "Mar 15, 6:45 PM",
      icon: "/placeholder.svg",
      paymentMethod: "UPI"
    },
    {
      id: 4,
      type: "expense",
      name: "Movie Tickets",
      description: "Avengers: Infinity War",
      amount: 500,
      date: "Mar 14, 7:30 PM",
      icon: "/placeholder.svg",
      paymentMethod: "Credit Card"
    },
    {
      id: 5,
      type: "income",
      name: "Freelance Payment",
      description: "UI Design Project",
      amount: 15000,
      date: "Mar 12, 3:15 PM",
      icon: "/placeholder.svg",
      paymentMethod: "PayPal"
    },
    {
      id: 6,
      type: "expense",
      name: "Uber Ride",
      description: "Trip to office",
      amount: 350,
      date: "Mar 10, 9:10 AM",
      icon: "/placeholder.svg",
      paymentMethod: "UPI"
    }
  ];
  
  // Filter transactions based on tab and search
  const filterTransactions = (tab: string) => {
    let filtered = transactions;
    
    // Apply tab filter
    if (tab === "income") {
      filtered = filtered.filter(t => t.type === "income");
    } else if (tab === "expense") {
      filtered = filtered.filter(t => t.type === "expense");
    }
    
    // Apply search filter if any
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        t => t.name.toLowerCase().includes(query) || 
             t.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  return (
    <div className="h-full pb-24 px-5">
      {/* Header */}
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-piggy-text mb-2">Transactions</h1>
        <p className="text-sm text-piggy-textMuted">Track your money flow</p>
      </header>
      
      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-piggy-textMuted w-4 h-4" />
          <Input
            type="text"
            placeholder="Search transactions"
            className="pl-10 bg-piggy-card border-white/5 text-piggy-text placeholder:text-piggy-textMuted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-piggy-textMuted hover:text-piggy-text"
          >
            <Filter size={18} />
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-3 bg-piggy-card">
          <TabsTrigger value="all" className="data-[state=active]:bg-piggy-primary data-[state=active]:text-piggy-background">
            All
          </TabsTrigger>
          <TabsTrigger value="income" className="data-[state=active]:bg-piggy-primary data-[state=active]:text-piggy-background">
            Income
          </TabsTrigger>
          <TabsTrigger value="expense" className="data-[state=active]:bg-piggy-primary data-[state=active]:text-piggy-background">
            Expense
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4 space-y-4">
          {filterTransactions("all").map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </TabsContent>
        
        <TabsContent value="income" className="mt-4 space-y-4">
          {filterTransactions("income").map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </TabsContent>
        
        <TabsContent value="expense" className="mt-4 space-y-4">
          {filterTransactions("expense").map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </TabsContent>
      </Tabs>
      
      {/* Date Grouping */}
      <div className="flex items-center mb-3">
        <Calendar size={16} className="text-piggy-textMuted mr-2" />
        <h3 className="text-sm font-medium text-piggy-textMuted">Recent Transactions</h3>
      </div>
    </div>
  );
};

// Transaction Item Component
const TransactionItem = ({ transaction }: { transaction: any }) => {
  return (
    <div className="flex items-center p-4 bg-piggy-card rounded-xl border border-white/5 hover:border-piggy-primary/30 transition-all duration-300">
      <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-4">
        {transaction.type === "expense" ? (
          <ArrowUp size={20} className="text-red-400" />
        ) : (
          <ArrowDown size={20} className="text-piggy-primary" />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-piggy-text">{transaction.name}</h3>
          <p className={`text-sm font-semibold ${
            transaction.type === "income" ? "text-piggy-primary" : "text-red-400"
          }`}>
            {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
          </p>
        </div>
        
        <div className="flex justify-between mt-1">
          <p className="text-xs text-piggy-textMuted">{transaction.description}</p>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-white/20 mr-1.5 flex items-center justify-center">
              {transaction.paymentMethod === "UPI" ? (
                <span className="text-[6px] font-bold text-white">UPI</span>
              ) : (
                <ShoppingCart size={6} className="text-white" />
              )}
            </div>
            <p className="text-xs text-piggy-textMuted">{transaction.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
