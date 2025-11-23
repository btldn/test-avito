import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

export type ModerationDecision = "approved" | "rejected" | "requestChanges";
export type AdStatus = "pending" | "approved" | "rejected" | "requestChanges";

type AdsContextValue = {
  ads: Ad[];
  isLoading: boolean;
  error: string;
  getAdById: (id: number) => Ad | undefined;
  loadAds: () => void;

  moderateAd: (
    id: number,
    payload: {
      decision: ModerationDecision;
      moderator: string;
      reason?: string;
      comment?: string;
    }
  ) => Promise<void>;
};

export interface ModerationHistoryItem {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: ModerationDecision;
  reason: string | null;
  comment: string | null;
  timestamp: string;
}

export interface Seller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
}

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  priority: "normal" | "urgent";
  status: AdStatus;
  createdAt: string;
  updatedAt: string;
  images: string[];
  characteristics: Record<string, string>;
  seller: Seller;
  moderationHistory: ModerationHistoryItem[];
}

const AdsContext = createContext<AdsContextValue | null>(null);

const BASE_URL = "http://localhost:3001/api/v1";

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAds() {
    try {
      setError("");
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/ads`);
      const data = await res.json();

      // сервер отдаёт { ads, pagination }
      setAds(data.ads || []);
    } catch (e) {
      console.log(e);
      setError("Не удалось загрузить объявления");
    } finally {
      setIsLoading(false);
    }
  }

  async function moderateAd(
    id: number,
    payload: {
      decision: ModerationDecision;
      moderator: string;
      reason?: string;
      comment?: string;
    }
  ) {
    const { decision, ...body } = payload;

    const endpoint =
      decision === "approved"
        ? `/ads/${id}/approve`
        : decision === "rejected"
          ? `/ads/${id}/reject`
          : `/ads/${id}/request-changes`;

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Bad response");

      const data = await res.json();
      const updated = data.ad;

      // локально обновляем одно объявление
      setAds((prev) =>
        prev.map((a) => (a.id === id ? updated : a))
      );
    } catch (e) {
      console.log(e);
      setError("Ошибка модерации");
    }
  }

  useEffect(() => {
    loadAds();
  }, []);

  function getAdById(id: number) {
    return ads.find((a) => a.id === id);
  }

  const value = useMemo(
    () => ({ ads, isLoading, error, getAdById, loadAds, moderateAd }),
    [ads, isLoading, error]
  );
  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}

export function useAds() {
  const ctx = useContext(AdsContext);
  if (!ctx) throw new Error("useAds must be used inside <AdsProvider />");
  return ctx;
}
