import { ReactNode } from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
  label?: string;
}

const Button = ({
  children,
  className,
  onClick,
  type,
  isDisabled,
  label,
}: ButtonProps) => {
  return (
    <button
      className={`${classes.Button} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      aria-label={label}
    >
      {children}
    </button>
  );
};

export default Button;
