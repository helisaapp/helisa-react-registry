import { Sparkles } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold overflow-x-hidden">
      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Helisa
      </span>
    </div>
  );
};

export default Logo;
