import { useLogger } from "@/app/providers";
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
  // Not really recommended to couple pure UI
  // components to providers like this,
  // but it's okay for sake of this exercise
  const { logger } = useLogger();
  logger.log("Header");
  return (
    <header className={styles["header"]}>
      {left}
      {right}
    </header>
  );
};
