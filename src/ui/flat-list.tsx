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
  return (
    <div>
      {data.map((item, i) => (
        <>
          {renderItem(item, i)}{" "}
          {i % 1 === 0 &&
            i <= data.length - 2 &&
            renderSeparator?.(item,i)}
        </>
      ))}
    </div>
  );
};
