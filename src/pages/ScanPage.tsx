
import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const [scanComplete, setScanComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  
  // Simulate scan completion after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setScanComplete(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle scan completion
  React.useEffect(() => {
    if (scanComplete) {
      const timer = setTimeout(() => {
        setShowConfirmation(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [scanComplete]);
  
  const handleConfirm = () => {
    // In a real app this would handle the payment confirmation
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  
  return (
    <div className="h-full relative bg-piggy-background pb-24">
      {/* Header */}
      <header className="pt-2 px-5 pb-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-piggy-text"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold text-piggy-text ml-4">Scan to Pay</h1>
      </header>
      
      {/* Scanner Area */}
      <div className="px-5">
        <div className="aspect-square relative rounded-3xl overflow-hidden border-2 border-piggy-primary/50 neon-glow">
          {/* QR Scanner Viewport */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm">
            {/* Scanner animation line */}
            {!scanComplete && <div className="scan-line" />}
            
            {/* Scanner Corner Markers */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-piggy-primary" />
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-piggy-primary" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-piggy-primary" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-piggy-primary" />
            
            {/* QR Code Placeholder - in real app this would be camera feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              {scanComplete ? (
                <div className="text-piggy-primary animate-pulse">
                  <CheckCircle2 size={80} className="animate-scale-in" />
                </div>
              ) : (
                <div className="w-1/2 h-1/2 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4/5 h-4/5 bg-black grid grid-cols-4 grid-rows-4 gap-1">
                    {/* Simulate QR code pattern */}
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${Math.random() > 0.5 ? "bg-black" : "bg-white"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-center text-piggy-textMuted mt-4">
          {scanComplete
            ? "QR code detected!"
            : "Position the QR code within the frame to scan"}
        </p>
      </div>
      
      {/* Payment Confirmation */}
      {showConfirmation && (
        <div className="absolute inset-x-0 bottom-24 px-5 animate-fade-in">
          <div className="bg-piggy-card rounded-2xl p-5 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold text-piggy-text">UPI Payment</h2>
                <p className="text-sm text-piggy-textMuted">Coffee Shop</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center neon-border">
                <img src="/placeholder.svg" alt="UPI" className="w-8 h-8" />
              </div>
            </div>
            
            <div className="bg-piggy-background/50 rounded-xl p-3 mb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-piggy-textMuted">Amount</p>
                <p className="text-xl font-bold text-piggy-text">₹180.00</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <ShieldCheck size={20} className="text-piggy-primary mr-2" />
              <p className="text-xs text-piggy-textMuted">Secured by UPI SafePay</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="bg-transparent border-white/10 text-piggy-text hover:bg-piggy-card/90"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                className="bg-piggy-primary text-black hover:bg-piggy-secondary neon-glow"
                onClick={handleConfirm}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
