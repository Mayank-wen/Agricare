export const Button = ({ children, variant = "default", className = "", ...props }) => {
    const baseStyle = "px-4 py-2 transition-colors duration-200";
    const variants = {
      default: "bg-black text-white hover:bg-gray-800",
      outline: "border-2 border-black text-black hover:bg-black hover:text-white"
    };
  
    return (
      <button 
        className={`${baseStyle} ${variants[variant]} ${className}`} 
        {...props}
      >
        {children}
      </button>
    );
  };
  
