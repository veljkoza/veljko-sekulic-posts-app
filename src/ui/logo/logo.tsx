import { useLogger } from "@/app/providers";
import { Typography } from "../typography";

export const Logo = () => {
  // Not really recommended to couple pure UI
  // components to providers like this,
  // but it's okay for sake of this exercise
  const { logger } = useLogger();
  logger.log("Logo");
  
  return <Typography variant="heading">Ꮍ</Typography>;
};
