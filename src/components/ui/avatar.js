export const Avatar = ({ className, children }) => {
  return <div className={`relative ${className}`}>{children}</div>;
};

export const AvatarImage = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

export const AvatarFallback = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};