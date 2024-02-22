import { MutableRefObject, useEffect, useState } from "react";

export const useVisible = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: MutableRefObject<any>,
  options?: {
    onIntersect?: (entry: IntersectionObserverEntry) => void;
  } & IntersectionObserverInit,
) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    onIntersect,
    rootMargin = "100px",
    root = null,
    threshold = 0.1,
  } = options || {};
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
        root,
        rootMargin,
        threshold,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return { isVisible };
};
