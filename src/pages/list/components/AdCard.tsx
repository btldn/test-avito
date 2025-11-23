import styles from "./AdCard.module.css";

type AdProps = {
  id: number;
  title: string;
  price: number;
  category: string;
  createdAt: string;
  onOpen: (id: number) => void;
};


function AdCard(props: AdProps) {

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
    <div className={styles.card} onClick={() => props.onOpen(props.id)}>
      <div className={styles.card__image}></div>

      <div className={styles.card__info}>
        <p className={styles.card__title}>{props.title}</p>
        <p className={styles.card__price}>
          {props.price.toLocaleString()} ₽
        </p>
        <p className={styles.card__category}>
          {props.category} • {formatDateTime(props.createdAt)}
        </p>
      </div>

      <button className={styles.card__btn}>Открыть →</button>
    </div>
  );
}

export default AdCard;
