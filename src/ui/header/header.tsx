import { FC } from "react";
import { Logo } from "..";
import styles from "./header.module.css";

type HeaderProps = {
  left?: React.JSX.Element;
  right?: React.JSX.Element;
};

export const Header: FC<HeaderProps> = ({ left = <Logo />, right }) => {
  return (
    <header className={styles["header"]}>
      {left}
      {right}
    </header>
  );
};
