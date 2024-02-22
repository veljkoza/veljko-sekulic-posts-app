import type { ComponentProps } from "react";
import styles from "./button.module.css";
const SIZE = {
  mini: styles["button--mini"],
  default: styles["button--default"],
  paddingless: styles["button--paddingless"],
};
const VARIANT = {
  plain: styles["button--plain"],
  primary: styles["button--primary"],
};

export const Button = ({
  className = "",
  size = "default",
  variant = "primary",
  href,
  ...props
}: {
  size?: keyof typeof SIZE;
  variant?: keyof typeof VARIANT;
  href?: string;
} & ComponentProps<"button">) => {
  const computedClassName = `${styles.button} ${SIZE[size]} ${VARIANT[variant]} ${className}`;
  if (href)
    return (
      <a href={href} className={computedClassName}>
        {props.children}
      </a>
    );
  return (
    <button {...props} className={computedClassName}>
      {props.children}
    </button>
  );
};
