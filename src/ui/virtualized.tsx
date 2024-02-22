import { PropsWithChildren, useRef } from "react";
import { useVisible } from ".";

export const Virtualized = (props: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isVisible } = useVisible(ref, { threshold: 0, rootMargin: "1000px" });

  return <div ref={ref}>{isVisible && props.children}</div>;
};
