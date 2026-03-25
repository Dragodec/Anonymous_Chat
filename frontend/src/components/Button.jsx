import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer";
  
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 focus:ring-slate-500",
    outline: "bg-transparent text-violet-400 border border-violet-500/50 hover:bg-violet-500/10 focus:ring-violet-500"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
