
import React, { useState } from "react";
import { Moon, Sun, ShieldCheck, Bell, User, LogOut, Languages, ChevronRight, HelpCircle, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [notifications, setNotifications] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Personal Information",
          action: "navigate",
          path: "/profile",
        },
        {
          icon: ShieldCheck,
          label: "Security",
          action: "navigate",
          path: "/security",
        },
        {
          icon: Bell,
          label: "Notifications",
          action: "toggle",
          state: notifications,
          setState: setNotifications,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Moon,
          label: "Dark Mode",
          action: "toggle",
          state: darkMode,
          setState: setDarkMode,
        },
        {
          icon: Languages,
          label: "Language",
          action: "navigate",
          path: "/language",
          info: "English",
        },
        {
          icon: Smartphone,
          label: "UPI Settings",
          action: "navigate",
          path: "/upi-settings",
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: ShieldCheck,
          label: "Biometric Authentication",
          action: "toggle",
          state: biometricAuth,
          setState: setBiometricAuth,
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          icon: HelpCircle,
          label: "Support",
          action: "navigate",
          path: "/support",
        },
        {
          icon: LogOut,
          label: "Logout",
          action: "danger",
          path: "/logout",
        },
      ],
    },
  ];
  
  const handleToggle = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState(prev => !prev);
  };
  
  return (
    <div className="h-full pb-24 px-5">
      {/* Header */}
      <header className="pt-6 pb-6">
        <h1 className="text-2xl font-bold text-piggy-text mb-6">Settings</h1>
        
        {/* User Profile */}
        <div className="flex items-center">
          <Avatar className="h-16 w-16 border-2 border-piggy-primary mr-4">
            <AvatarImage src="" />
            <AvatarFallback className="bg-piggy-card text-piggy-text text-xl">A</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-piggy-text">Alex Johnson</h2>
            <p className="text-sm text-piggy-textMuted">alex.johnson@example.com</p>
          </div>
        </div>
      </header>
      
      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-sm font-medium text-piggy-textMuted">{section.title}</h3>
            <div className="bg-piggy-card rounded-xl overflow-hidden border border-white/5">
              {section.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-piggy-background/50 flex items-center justify-center mr-3">
                        <item.icon size={18} className="text-piggy-primary" />
                      </div>
                      <span className="text-sm font-medium text-piggy-text">{item.label}</span>
                    </div>
                    
                    {item.action === "toggle" && (
                      <Switch
                        checked={item.state}
                        onCheckedChange={() => handleToggle(item.setState)}
                        className="data-[state=checked]:bg-piggy-primary"
                      />
                    )}
                    
                    {item.action === "navigate" && (
                      <div className="flex items-center">
                        {item.info && (
                          <span className="text-xs text-piggy-textMuted mr-2">{item.info}</span>
                        )}
                        <ChevronRight size={18} className="text-piggy-textMuted" />
                      </div>
                    )}
                    
                    {item.action === "danger" && (
                      <span className="text-red-400 text-sm">Logout</span>
                    )}
                  </div>
                  
                  {index < section.items.length - 1 && (
                    <Separator className="bg-white/5" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* App Info */}
      <div className="mt-8 text-center">
        <p className="text-xs text-piggy-textMuted">Piggy Bank v1.0.0</p>
        <p className="text-xs text-piggy-textMuted mt-1">© 2025 Piggy Bank App</p>
      </div>
    </div>
  );
};

export default SettingsPage;
