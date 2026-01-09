const Button = ({
  children,
  variant = "primary",
  size,
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }
    if (variant === "ghost") {
      return "br-transparent text-[#818181]";
    }
    if (variant === "secondary") {
      return "bg-[#EEEEEE] text-[#35383E]";
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
