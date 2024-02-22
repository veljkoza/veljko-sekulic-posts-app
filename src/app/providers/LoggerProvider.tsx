import { env } from "@/env";
import { PropsWithChildren, createContext, useContext } from "react";

export type LoggerContextValue = {
  logger: {
    log: (text: string) => void;
  };
};
const LoggerContext = createContext<LoggerContextValue>(
  {} as LoggerContextValue,
);

const LOGGER_PREFIX = env.LOGGER_PREFIX;

export const LoggerProvider = (props: PropsWithChildren) => {
  const log = (text: string) => console.log(`${LOGGER_PREFIX}${text}`);
  const logger = { log };
  log("LoggerProvider");

  return (
    <LoggerContext.Provider value={{ logger }}>
      {props.children}
    </LoggerContext.Provider>
  );
};

export const useLogger = () => useContext(LoggerContext);
