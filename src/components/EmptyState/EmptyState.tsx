import { ReactNode } from "react";
import classes from "./EmptyState.module.scss";

interface EmptyStateProps {
  children: ReactNode;
}

const EmptyState = ({ children }: EmptyStateProps) => {
  return (
    <div className={classes.EmptyState}>
      <div>{children}</div>
    </div>
  );
};

export default EmptyState;
