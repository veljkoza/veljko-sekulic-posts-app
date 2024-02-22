import { ComponentPropsWithRef, FC } from "react";
import styles from "./input.module.css";

type InputProps = ComponentPropsWithRef<"input">;

export const Input: FC<InputProps> = (props) => {
  const computedClassName = `${styles["input"]} ${props.className}`;
  return <input {...props} className={computedClassName} />;
};
