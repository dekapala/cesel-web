"use client";

import { useEffect, useState } from "react";

/** True for touch-first devices (including large touchscreens), where a
 * custom cursor and full-fidelity WebGL rendering buy nothing and just cost
 * battery/frame time. */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return coarse;
}
