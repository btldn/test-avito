import { useMemo, useState } from "react";
import { useAds } from "../../data/AdsContext";
import styles from "./StatsPage.module.css";

// если recharts не хочешь — скажешь, я переделаю на простые div-бары
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type Period = "today" | "7d" | "30d";

function StatsPage() {
  const { ads } = useAds();
  const [period, setPeriod] = useState<Period>("7d");

  const now = new Date();

  function parseRuDateTime(dt: string) {
    // у тебя dateTime кладётся через toLocaleString("ru-RU")
    // обычно это "dd.mm.yyyy, hh:mm:ss"
    const [datePart, timePart] = dt.split(",").map((s) => s.trim());
    if (!datePart) return null;

    const [dd, mm, yyyy] = datePart.split(".").map(Number);
    if (!dd || !mm || !yyyy) return null;

    const [hh = 0, min = 0, ss = 0] = (timePart || "")
      .split(":")
      .map(Number);

    return new Date(yyyy, mm - 1, dd, hh, min, ss);
  }

  function startOfDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function isSameDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function getPeriodStart() {
    if (period === "today") return startOfDay(now);

    const days = period === "7d" ? 7 : 30;
    const d = new Date(now);
    d.setDate(d.getDate() - (days - 1));
    return startOfDay(d);
  }

  const periodStart = useMemo(getPeriodStart, [period]);

  // Берём "события модерации" из history по всем объявлениям
  const moderationEvents = useMemo(() => {
    const events: {
      adId: number;
      category: string;
      decision: "approved" | "rejected" | "rework";
      date: Date;
    }[] = [];

    ads.forEach((ad) => {
      ad.moderationHistory.forEach((h) => {
        const d = parseRuDateTime(h.dateTime);
        if (!d) return;

        // фильтр по периоду
        if (d < periodStart) return;

        events.push({
          adId: ad.id,
          category: ad.category,
          decision: h.decision,
          date: d,
        });
      });
    });

    return events;
  }, [ads, periodStart]);

  // Уникальные объявления, которые вообще модератор трогал в периоде
  const moderatedAdIds = useMemo(() => {
    return new Set(moderationEvents.map((e) => e.adId));
  }, [moderationEvents]);

  const totalModerated = moderatedAdIds.size;

  const decisionStats = useMemo(() => {
    const counts = { approved: 0, rejected: 0, rework: 0 };

    moderationEvents.forEach((e) => {
      counts[e.decision] += 1;
    });

    const totalDecisions =
      counts.approved + counts.rejected + counts.rework;

    const approvedPct = totalDecisions
      ? Math.round((counts.approved / totalDecisions) * 100)
      : 0;
    const rejectedPct = totalDecisions
      ? Math.round((counts.rejected / totalDecisions) * 100)
      : 0;

    return { counts, totalDecisions, approvedPct, rejectedPct };
  }, [moderationEvents]);

  // Среднее время проверки одного объявления
  // Считаем как: разница между первым и последним решением по одному ad внутри периода
  const avgReviewTimeMin = useMemo(() => {
    const byAd = new Map<number, Date[]>();

    moderationEvents.forEach((e) => {
      const arr = byAd.get(e.adId) || [];
      arr.push(e.date);
      byAd.set(e.adId, arr);
    });

    let sumMs = 0;
    let n = 0;

    byAd.forEach((dates) => {
      if (dates.length < 2) return;
      dates.sort((a, b) => a.getTime() - b.getTime());
      const diff = dates[dates.length - 1].getTime() - dates[0].getTime();
      sumMs += diff;
      n += 1;
    });

    if (!n) return 0;
    return Math.round(sumMs / n / 60000); // минуты
  }, [moderationEvents]);

  // Активность по дням (последние 7 дней от periodStart)
  const activityByDay = useMemo(() => {
    const days =
      period === "today" ? 1 : period === "7d" ? 7 : 30;

    const arr: { label: string; count: number; date: Date }[] = [];

    for (let i = 0; i < days; i++) {
      const d = new Date(periodStart);
      d.setDate(d.getDate() + i);

      const label = d.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
      });

      arr.push({ label, count: 0, date: d });
    }

    moderationEvents.forEach((e) => {
      const slot = arr.find((x) => isSameDay(x.date, e.date));
      if (slot) slot.count += 1;
    });

    return arr.map(({ label, count }) => ({ label, count }));
  }, [moderationEvents, period, periodStart]);

  const pieData = useMemo(() => {
    const { counts } = decisionStats;
    return [
      { name: "Одобрено", value: counts.approved },
      { name: "Отклонено", value: counts.rejected },
      { name: "На доработку", value: counts.rework },
    ];
  }, [decisionStats]);

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    moderationEvents.forEach((e) => {
      map.set(e.category, (map.get(e.category) || 0) + 1);
    });

    return Array.from(map.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [moderationEvents]);

  const COLORS = ["#22c55e", "#ef4444", "#f59e0b"]; // можно вынести в css, но так проще

  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <h1 className={styles.page__title}>Статистика модератора</h1>

        <div className={styles.period}>
          <button
            className={
              period === "today"
                ? `${styles.period__btn} ${styles.period__btnActive}`
                : styles.period__btn
            }
            onClick={() => setPeriod("today")}
          >
            Сегодня
          </button>

          <button
            className={
              period === "7d"
                ? `${styles.period__btn} ${styles.period__btnActive}`
                : styles.period__btn
            }
            onClick={() => setPeriod("7d")}
          >
            7 дней
          </button>

          <button
            className={
              period === "30d"
                ? `${styles.period__btn} ${styles.period__btnActive}`
                : styles.period__btn
            }
            onClick={() => setPeriod("30d")}
          >
            30 дней
          </button>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metricCard}>
            <p className={styles.metricCard__label}>Проверено объявлений</p>
            <p className={styles.metricCard__value}>{totalModerated}</p>
          </div>

          <div className={styles.metricCard}>
            <p className={styles.metricCard__label}>% одобрено</p>
            <p className={styles.metricCard__value}>
              {decisionStats.approvedPct}%
            </p>
          </div>

          <div className={styles.metricCard}>
            <p className={styles.metricCard__label}>% отклонено</p>
            <p className={styles.metricCard__value}>
              {decisionStats.rejectedPct}%
            </p>
          </div>

          <div className={styles.metricCard}>
            <p className={styles.metricCard__label}>
              Среднее время проверки
            </p>
            <p className={styles.metricCard__value}>
              {avgReviewTimeMin} мин
            </p>
          </div>
        </div>

        <div className={styles.charts}>
          <section className={styles.chartSection}>
            <h2 className={styles.chartSection__title}>
              Активность по дням
            </h2>

            <div className={styles.chartBox}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={activityByDay}>
                  <XAxis dataKey="label" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={styles.chartSection}>
            <h2 className={styles.chartSection__title}>
              Распределение решений
            </h2>

            <div className={styles.chartBox}>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={styles.chartSection}>
            <h2 className={styles.chartSection__title}>
              По категориям
            </h2>

            <div className={styles.chartBox}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={categoryData} layout="vertical">
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
