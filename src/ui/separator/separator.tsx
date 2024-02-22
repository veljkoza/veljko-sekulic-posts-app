import { useLogger } from "@/app/providers";
import { FC } from "react";
import { WithClassName } from "../types";
import styles from "./separator.module.css";

export type SeparatorSizeType = "small" | "medium" | "large";

export type SeparatorProps = {
  size?: SeparatorSizeType;
} & WithClassName;

const SIZES: Record<SeparatorSizeType, string> = {
  small: styles["separator--small"],
  medium: styles["separator--medium"],
  large: styles["separator--large"],
};

export const Separator: FC<SeparatorProps> = ({
  size = "medium",
  className = "",
}) => {
  // Not really recommended to couple pure UI
  // components to providers like this,
  // but it's okay for sake of this exercise
  const { logger } = useLogger();
  logger.log("Separator");

  const compoundClassName = `${styles.separator} ${SIZES[size]} ${className}`;
  return <div className={compoundClassName}></div>;
};
