import { useEffect, useState } from "react";
import type { DetailedPet } from "@/features/pets/types/pet";

type PetEvent = DetailedPet["events"][number];

export const getScheduledTimestamp = (event: PetEvent) => {
  if (!event.scheduledFor) return 0;

  if (event.metadata?.hasTime) {
    return new Date(event.scheduledFor).getTime();
  }

  return new Date(`${event.scheduledFor.slice(0, 10)}T23:59:59.999`).getTime();
};

export const useEventRollover = (events?: DetailedPet["events"]) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const nextEventTimestamp = Math.min(
      ...(events ?? [])
        .map(getScheduledTimestamp)
        .filter((timestamp) => timestamp > now),
    );

    if (!Number.isFinite(nextEventTimestamp)) return;

    const timeout = window.setTimeout(
      () => setNow(Date.now()),
      Math.min(nextEventTimestamp - now + 50, 2_147_483_647),
    );

    return () => window.clearTimeout(timeout);
  }, [events, now]);

  return now;
};
