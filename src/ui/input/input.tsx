import { ComponentPropsWithRef, FC } from "react";
import styles from "./input.module.css";
import { useLogger } from "@/app/providers";

type InputProps = ComponentPropsWithRef<"input">;

export const Input: FC<InputProps> = (props) => {
  // Not really recommended to couple pure UI
  // components to providers like this,
  // but it's okay for sake of this exercise
  const { logger } = useLogger();
  logger.log("Input");
  const computedClassName = `${styles["input"]} ${props.className}`;
  return <input {...props} className={computedClassName} />;
};
