import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_ADS } from "../../data/ads"; // общий массив из list
import styles from "./ItemPage.module.css";

function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const adId = Number(id);

  const ad = useMemo(
    () => MOCK_ADS.find((item) => item.id === adId),
    [adId]
  );

  // если вдруг не нашли
  if (!ad) {
    return (
      <div className={styles.page}>
        <div className={styles.page__container}>
          <p className={styles.empty}>Объявление не найдено</p>
          <button className={styles.backBtn} onClick={() => navigate("/list")}>
            ← Назад к списку
          </button>
        </div>
      </div>
    );
  }

  // временные плейсхолдеры для тех полей, которых пока нет в MOCK_ADS
  const images = [
    "https://placehold.co/640x480?text=Photo+1",
    "https://placehold.co/640x480?text=Photo+2",
    "https://placehold.co/640x480?text=Photo+3",
  ];

  const specs = [
    { key: "Характеристика 1", value: "Значение" },
    { key: "Характеристика 2", value: "Значение" },
    { key: "Характеристика 3", value: "Значение" },
  ];

  const history = [
    {
      id: 1,
      decision: "На доработку",
      moderator: "Модератор Анна",
      dateTime: "18.11.2025 12:10",
      comment: "Добавьте фото.",
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        {/* ===== Header ===== */}
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
                {ad.category} • {ad.date}
              </span>
            </div>
          </div>

          <div className={styles.badges}>
            <span className={styles.badge}>
              {ad.status === "pending" && "На модерации"}
              {ad.status === "approved" && "Одобрено"}
              {ad.status === "rejected" && "Отклонено"}
            </span>

            {ad.priority === "urgent" && (
              <span className={`${styles.badge} ${styles.badgeUrgent}`}>
                Срочное
              </span>
            )}
          </div>
        </header>

        {/* ===== Content ===== */}
        <main className={styles.content}>
          {/* ===== Left ===== */}
          <div className={styles.left}>
            {/* Gallery */}
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

            {/* Description */}
            <section className={styles.section}>
              <h2 className={styles.section__title}>Описание</h2>
              <p className={styles.desc}>
                {ad.description}
              </p>
            </section>

            {/* Specs */}
            <section className={styles.section}>
              <h2 className={styles.section__title}>Характеристики</h2>

              <div className={styles.specs}>
                {ad.specs.map((s) => (
                  <div key={s.key} className={styles.specRow}>
                    <span className={styles.specKey}>{s.key}</span>
                    <span className={styles.specVal}>{s.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ===== Right ===== */}
          <aside className={styles.right}>
            {/* Seller */}
            <section className={styles.section}>
              <h2 className={styles.section__title}>Продавец</h2>

              <div className={styles.seller}>
                <p className={styles.seller__name}>{ad.seller.name}</p>
                <p className={styles.seller__row}>Рейтинг: {ad.seller.rating}</p>
                <p className={styles.seller__row}>Объявлений: {ad.seller.adsCount}</p>
                <p className={styles.seller__row}>
                  На платформе с {ad.seller.registeredAt}
                </p>
              </div>
            </section>

            {/* Moderation history */}
            <section className={styles.section}>
              <h2 className={styles.section__title}>История модерации</h2>

              <div className={styles.history}>
                {ad.moderationHistory.length === 0 && (
                  <p className={styles.historyEmpty}>Истории пока нет</p>
                )}

                {ad.moderationHistory.map((h) => (
                  <div key={h.id} className={styles.historyItem}>
                    <p className={styles.historyItem__title}>
                      {h.decision === "approved" && "Одобрено"}
                      {h.decision === "rejected" && "Отклонено"}
                      {h.decision === "rework" && "На доработку"}
                    </p>
                    <p className={styles.historyItem__meta}>
                      {h.moderator} • {h.dateTime}
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

            {/* Actions */}
            <section className={styles.section}>
              <h2 className={styles.section__title}>Действия модератора</h2>

              <div className={styles.actions}>
                <button
                  className={`${styles.actionBtn} ${styles.actionBtnGreen}`}
                >
                  Одобрить
                </button>

                <button
                  className={`${styles.actionBtn} ${styles.actionBtnYellow}`}
                >
                  Вернуть на доработку
                </button>

                <div className={styles.rejectBlock}>
                  <select className={styles.rejectSelect}>
                    <option>Причина отклонения...</option>
                    <option>Запрещённый товар</option>
                    <option>Неверная категория</option>
                    <option>Некорректное описание</option>
                    <option>Проблемы с фото</option>
                    <option>Подозрение на мошенничество</option>
                    <option>Другое</option>
                  </select>

                  <input
                    className={styles.rejectInput}
                    placeholder="Опиши причину"
                  />

                  <button
                    className={`${styles.actionBtn} ${styles.actionBtnRed}`}
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            </section>

            {/* Quick nav */}
            <section className={styles.quickNav}>
              <button className={styles.quickNav__btn}>
                ← Предыдущее
              </button>
              <button className={styles.quickNav__btn}>
                Следующее →
              </button>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default ItemPage;
