"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/ui/loader";
import { useLoader } from "@/components/ui/loader-context";

export default function PageLoader() {
  const pathname = usePathname();
  const { visible } = useLoader();
  const [internalLoading, setInternalLoading] = useState(false);

  useEffect(() => {
    // When pathname changes, show a short loader (800ms) to indicate navigation.
    setInternalLoading(true);
    const t = setTimeout(() => setInternalLoading(false), 2000);
    return () => clearTimeout(t);
  }, [pathname]);

  const loading = visible || internalLoading;

  if (!loading) return null;

  return (
    <div
      aria-hidden={!loading}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="rounded-lg bg-background/90 p-6 shadow-lg">
        <Loader />
      </div>
    </div>
  );
}