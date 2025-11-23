import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAds } from "../../data/AdsContext";
import styles from "./ItemPage.module.css";

const REJECT_REASONS = [
  "Запрещённый товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

function ItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const adId = Number(id);

  const { ads, getAdById, moderateAd } = useAds();
  const ad = getAdById(adId);

  const [rejectReason, setRejectReason] = useState("");
  const [rejectComment, setRejectComment] = useState("");
  const [error, setError] = useState("");

  const currentIndex = useMemo(
    () => ads.findIndex((a) => a.id === adId),
    [ads, adId]
  );

  if (!ad) {
    return (
      <div className={styles.page}>
        <p>Объявление не найдено</p>
        <button onClick={() => navigate("/list")}>Назад к списку</button>
      </div>
    );
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "approved":
        return styles.badgeApproved;
      case "rejected":
        return styles.badgeRejected;
      case "requestChanges":
        return styles.badgeRework;
      default:
        return styles.badgePending;
    }
  }


  function resetRejectForm() {
    setRejectReason("");
    setRejectComment("");
    setError("");
  }

  async function handleApprove() {
    resetRejectForm();
    await moderateAd(ad.id, {
      decision: "approved",
      moderator: "Артём (модератор)",
    });
    goNext();
  }

  async function handleRework() {
    resetRejectForm();
    await moderateAd(ad.id, {
      decision: "requestChanges",
      moderator: "Артём (модератор)",
      comment: "Вернули на доработку",
    });
    goNext();
  }

  async function handleReject() {
    if (!rejectReason) {
      setError("Укажи причину отклонения");
      return;
    }
    if (rejectReason === "Другое" && !rejectComment.trim()) {
      setError("Опиши причину в комментарии");
      return;
    }

    setError("");

    await moderateAd(ad.id, {
      decision: "rejected",
      moderator: "Артём (модератор)",
      reason: rejectReason,
      comment: rejectComment.trim() || undefined,
    });

    goNext();
  }

  function goPrev() {
    if (currentIndex > 0) {
      navigate(`/item/${ads[currentIndex - 1].id}`);
    }
  }

  function goNext() {
    if (currentIndex >= 0 && currentIndex < ads.length - 1) {
      navigate(`/item/${ads[currentIndex + 1].id}`);
    }
  }

  function formatDateTime(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate("/list")}>
            ← Назад к списку
          </button>

          <div className={styles.header__main}>
            <h1 className={styles.title}>{ad.title}</h1>

            <div className={styles.meta}>
              <span className={styles.price}>
                {ad.price.toLocaleString()} ₽
              </span>
              <span className={styles.category}>
                {ad.category} • {formatDateTime(ad.createdAt)}
              </span>
            </div>
          </div>

          <div className={styles.badges}>
            {ad.priority === "urgent" && (
              <span className={styles.badgeUrgent}>Срочно</span>
            )}

            <span className={`${styles.badgeStatus} ${getStatusBadge(ad.status)}`}>
              {ad.status === "approved"
                ? "Одобрено"
                : ad.status === "rejected"
                ? "Отклонено"
                : ad.status === "requestChanges"
                ? "На доработку"
                : "На модерации"}
            </span>
          </div>

        </header>

        <main className={styles.content}>
          <div className={styles.left}>
            <section className={styles.section}>
              <h2 className={styles.section__title}>Фотографии</h2>

              <div className={styles.gallery}>
                {ad.images.map((src, i) => (
                  <div key={src} className={styles.gallery__item}>
                    <img src={src} alt={`photo-${i + 1}`} />
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.section__title}>Описание</h2>
              <p className={styles.desc}>
                {ad.description}
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.section__title}>Характеристики</h2>

              <div className={styles.specs}>
                {Object.entries(ad.characteristics).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <span className={styles.specKey}>{key}</span>
                    <span className={styles.specVal}>{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.right}>
            <section className={styles.section}>
              <h2 className={styles.section__title}>Продавец</h2>

              <div className={styles.seller}>
                <p className={styles.seller__name}>{ad.seller.name}</p>
                <p className={styles.seller__row}>Рейтинг: {ad.seller.rating}</p>
                <p className={styles.seller__row}>Объявлений: {ad.seller.totalAds}</p>
                <p className={styles.seller__row}>
                  На платформе с {formatDateTime(ad.seller.registeredAt)}
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.section__title}>История модерации</h2>

              <div className={styles.history}>
                {ad.moderationHistory.length === 0 && (
                  <p className={styles.historyEmpty}>Истории пока нет</p>
                )}

                {ad.moderationHistory.map((h) => (
                  <div key={h.id} className={styles.historyItem}>
                    <p className={styles.historyItem__title}>
                      {h.action === "approved" && "Одобрено"}
                      {h.action === "rejected" && "Отклонено"}
                      {h.action === "requestChanges" && "На доработку"}
                    </p>
                    <p className={styles.historyItem__meta}>
                      {h.moderatorName} • {formatDateTime(h.timestamp)}
                    </p>
                    {h.comment && (
                      <p className={styles.historyItem__comment}>{h.comment}</p>
                    )}
                    {h.reason && (
                      <p className={styles.historyItem__comment}>Причина: {h.reason}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.section__title}>Действия модератора</h2>

              <div className={styles.actions}>
                <button
                  className={styles.actions__approve}
                  onClick={handleApprove}
                >
                  Одобрить
                </button>

                <button
                  className={styles.actions__rework}
                  onClick={handleRework}
                >
                  Вернуть на доработку
                </button>

                <select
                  className={styles.actions__select}
                  value={rejectReason}
                  onChange={(e) => {
                    setRejectReason(e.target.value);
                    setError("");
                    if (e.target.value !== "Другое") setRejectComment("");
                  }}
                >
                  <option value="">Причина отклонения...</option>
                  {REJECT_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                {rejectReason === "Другое" && (
                  <input
                    className={styles.actions__input}
                    placeholder="Опиши причину"
                    value={rejectComment}
                    onChange={(e) => {
                      setRejectComment(e.target.value);
                      setError("");
                    }}
                  />
                )}

                {error && <p className={styles.actions__error}>{error}</p>}

                <button
                  className={styles.actions__reject}
                  onClick={handleReject}
                >
                  Отклонить
                </button>
              </div>
            </section>

            <section className={styles.quickNav}>
              <div className={styles.nav}>
                <button onClick={goPrev} disabled={currentIndex <= 0}>
                  ← Предыдущее
                </button>
                <button onClick={goNext} disabled={currentIndex >= ads.length - 1}>
                  Следующее →
                </button>
              </div>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default ItemPage;
