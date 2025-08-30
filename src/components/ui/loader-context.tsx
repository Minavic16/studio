"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type LoaderContextType = {
  visible: boolean;
  show: (ms?: number) => void;
  hide: () => void;
} | null;

const LoaderContext = createContext<LoaderContextType>(null);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hide = useCallback(() => {
    setVisible(false);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const show = useCallback((ms = 20000) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setVisible(true);
    timeoutRef.current = window.setTimeout(() => setVisible(false), ms);
  }, []);

  return (
    <LoaderContext.Provider value={{ show, hide, visible }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("useLoader must be used within a LoaderProvider");
  return ctx;
}