import { MutableRefObject, useEffect, useState } from "react";

export const useVisible = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: MutableRefObject<any>,
  options?: {
    onIntersect?: (entry: IntersectionObserverEntry) => void;
    rootMargin?: string;
  },
) => {
  const [isVisible, setIsVisible] = useState(false);
  const { onIntersect, rootMargin = "100px" } = options || {};
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (!entry.isIntersecting) return;
          onIntersect?.(entry);
        });
      },
      {
        root: null,
        rootMargin,
        threshold: 1.0,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return { isVisible };
};
