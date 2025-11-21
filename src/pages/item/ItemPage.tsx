import { useParams } from "react-router-dom";
import { MOCK_ADS } from "../../data/ads.ts";
import styles from "./ItemPage.module.css";

function ItemPage() {
  const { id } = useParams();
  const adId = Number(id);

  const ad = MOCK_ADS.find((item) => item.id === adId);

  if (!ad) {
    return <div className={styles.page}>Объявление не найдено</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <h1 className={styles.title}>{ad.title}</h1>

        <div className={styles.meta}>
          <p>{ad.price.toLocaleString()} ₽</p>
          <p>{ad.category}</p>
          <p>{ad.date}</p>
          <p>Статус: {ad.status}</p>
          <p>Приоритет: {ad.priority}</p>
        </div>

        {/* пока без деталей, просто вывод базовой инфы */}
      </div>
    </div>
  );
}

export default ItemPage;
