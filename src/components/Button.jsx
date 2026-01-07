const Button = ({ children, variant, ...rest }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }
    if (variant === "ghost") {
      return "br-transparent text-[#818181]";
    }
  };
  return (
    <button
      {...rest}
      className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-70 ${getVariantClasses()}`}
    >
      {children}
    </button>
  );
};

export default Button;
