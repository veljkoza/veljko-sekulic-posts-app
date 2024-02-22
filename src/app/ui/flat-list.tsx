/* eslint-disable @typescript-eslint/no-explicit-any */
export type FlatListProps<T extends any[]> = {
  data: T;
  renderItem: (item: T[number]) => React.JSX.Element;
  renderSeparator?: (item: T[number]) => React.JSX.Element;
};

export const FlatList = <T extends any[]>({
  data,
  renderItem,
  renderSeparator,
}: FlatListProps<T>) => {
  return (
    <div>
      {data.map((item, index) => (
        <>
          {renderItem(item)}{" "}
          {index % 1 === 0 &&
            index <= data.length - 2 &&
            renderSeparator?.(item)}
        </>
      ))}
    </div>
  );
};
