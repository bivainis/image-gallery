import { ReactNode } from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  isDisabled?: boolean;
}

const Button = ({ children, onClick, isDisabled }: ButtonProps) => {
  return (
    <button className={classes.Button} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
