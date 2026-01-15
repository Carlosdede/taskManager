import { tv } from "tailwind-variants";

const Button = ({
  children,
  color = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75",
    variants: {
      colors: {
        primary: "bg-brand-primary text-white",
        ghost: "br-transparent text-brand-dark-gray",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-xl",
      },
    },
    defaultVariants: {
      colors: "primary",
      size: "smalll",
    },
  });

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  );
};

export default Button;
