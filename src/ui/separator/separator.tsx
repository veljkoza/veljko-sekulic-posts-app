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

export const Separator: FC<SeparatorProps> = ({ size = "medium", className = "" }) => {
  const compoundClassName = `${styles.separator} ${SIZES[size]} ${className}`;
  return <div className={compoundClassName}></div>;
};
