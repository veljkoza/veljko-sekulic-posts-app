import { useLogger } from "@/app/providers";
import { Fragment } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FlatListProps<T extends any[]> = {
  data: T;
  renderItem: (item: T[number], i: number) => React.JSX.Element;
  renderSeparator?: (item: T[number], i: number) => React.JSX.Element;
};

export const FlatList = <T extends any[]>({
  data,
  renderItem,
  renderSeparator,
}: FlatListProps<T>) => {
  // Not really recommended to couple pure UI
  // components to providers like this,
  // but it's okay for sake of this exercise
  const { logger } = useLogger();
  logger.log("FlatList");

  return (
    <div>
      {data.map((item, i) => (
        <Fragment key={i + 9999}>
          {renderItem(item, i)}{" "}
          {i % 1 === 0 && i <= data.length - 2 && renderSeparator?.(item, i)}
        </Fragment>
      ))}
    </div>
  );
};
