"use client";

import dynamic from "next/dynamic";
import React from "react";

const ChartContainer = dynamic(() => import("@/components/ui/chart").then((m) => m.ChartContainer), {
  ssr: false,
});

const Recharts = dynamic(() => import("recharts"), { ssr: false });

export default function DynamicBarChart({ data, config, children }: any) {
  const BarChart = React.useMemo(() => Recharts.then((r) => r.BarChart), []);
  // We will render the children via a client-side dynamic import of recharts components.
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      {/* Render children (which should use recharts primitives) */}
      {children}
    </ChartContainer>
  );
}
