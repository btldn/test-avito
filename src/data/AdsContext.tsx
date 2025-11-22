import React, { createContext, useContext, useMemo, useState } from "react";
import { MOCK_ADS } from "./ads";
import type { Ad, ModerationDecision } from "./ads";


type ModerationPayload = {
  decision: ModerationDecision;
  moderator: string;
  comment?: string;
  reason?: string;
};

type AdsContextValue = {
  ads: Ad[];
  getAdById: (id: number) => Ad | undefined;
  moderateAd: (adId: number, payload: ModerationPayload) => void;
};

const AdsContext = createContext<AdsContextValue | null>(null);

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS);

  function getAdById(id: number) {
    return ads.find((a) => a.id === id);
  }

  function moderateAd(adId: number, payload: ModerationPayload) {
    setAds((prev) =>
      prev.map((ad) => {
        if (ad.id !== adId) return ad;

        const newHistoryItem = {
          id: ad.moderationHistory.length + 1,
          moderator: payload.moderator,
          dateTime: new Date().toLocaleString("ru-RU"),
          decision: payload.decision,
          comment: payload.comment,
          reason: payload.reason,
        };

        return {
          ...ad,
          status:
            payload.decision === "approved"
              ? "approved"
              : payload.decision === "rejected"
                ? "rejected"
                : "rework",
          moderationHistory: [newHistoryItem, ...ad.moderationHistory],
        };
      })
    );
  }

  const value = useMemo(
    () => ({ ads, getAdById, moderateAd }),
    [ads]
  );

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}

export function useAds() {
  const ctx = useContext(AdsContext);
  if (!ctx) {
    throw new Error("useAds must be used inside <AdsProvider />");
  }
  return ctx;
}
