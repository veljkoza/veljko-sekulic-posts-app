import { routes } from "@/app/router";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Logo } from "..";
import styles from "./header.module.css";

type HeaderProps = {
  left?: React.JSX.Element;
  right?: React.JSX.Element;
};

export const Header: FC<HeaderProps> = ({
  left = (
    <Link to={routes.root.path}>
      <Logo />
    </Link>
  ),
  right,
}) => {
  return (
    <header className={styles["header"]}>
      {left}
      {right}
    </header>
  );
};
