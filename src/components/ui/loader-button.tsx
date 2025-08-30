"use client";

import { Button } from "@/components/ui/button";
import { useLoader } from "@/components/ui/loader-context";
import type { ComponentProps } from "react";
import React from "react";

type LoaderButtonProps = ComponentProps<typeof Button> & {
  /** duration in milliseconds the global loader should remain visible */
  duration?: number;
};

export default function LoaderButton({ duration = 20000, onClick, children, ...props }: LoaderButtonProps) {
  const { show } = useLoader();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // show the global loader immediately for the requested duration
    show(duration);

    // Call user-provided onClick if present. Await if it returns a promise.
    try {
      const result = onClick?.(e as any);
      if (result && typeof (result as Promise<any>).then === "function") {
        await result;
      }
    } catch (err) {
      // swallow; loader will still hide after duration
      console.error(err);
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
