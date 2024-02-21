/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentProps, ComponentPropsWithRef } from "react";
import styles from "./typography.module.css";

const VARIANTS = {
  heading: styles["typography--heading"],
  subheading: styles["typography--subheading"],
  body: styles["typography--body"],
};

export type TypographyType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "p";

export type TypographyProps<K extends TypographyType> = {
  variant?: keyof typeof VARIANTS;
  as?: K;
  className?: string;
} & Omit<ComponentPropsWithRef<K>, "as" | "className">;

export const Typography = <T extends TypographyType>({
  variant = "body",
  className = "",
  as: component = "p" as T,
  ...props
}: TypographyProps<T>) => {
  const computedClassName = `${styles.typography} ${VARIANTS[variant]} ${className}`;
  const Component = component as ComponentProps<any>;
  return (
    <Component {...props} className={computedClassName}>
      {props.children}
    </Component>
  );
};
