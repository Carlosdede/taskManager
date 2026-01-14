const Button = ({
  children,
  variant = "brand-primary",
  size,
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "brand-primary") {
      return "bg-brand-primary text-white";
    }
    if (variant === "ghost") {
      return "br-transparent text-brand-dark-gray";
    }
    if (variant === "secondary") {
      return "bg-brand-light-gray text-brand-dark-blue";
    }
  };
  const getSizeClasses = () => {
    if (size === "small") {
      return "py-1 text-xs ";
    }

    if (size === "large") {
      return "py-2 text-xl ";
    }
  };
  return (
    <button
      {...rest}
      className={`flex items-center justify-center gap-1 rounded-md p-1 px-3 font-semibold transition hover:opacity-70 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
