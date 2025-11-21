import styles from "./AdCard.module.css";

type AdProps = {
  id: number;
  title: string;
  price: number;
  category: string;
  date: string;
  onOpen: (id: number) => void;
};

function AdCard(props: AdProps) {
  return (
    <div className={styles.card} onClick={() => props.onOpen(props.id)}>
      <div className={styles.card__image}></div>

      <div className={styles.card__info}>
        <p className={styles.card__title}>{props.title}</p>
        <p className={styles.card__price}>
          {props.price.toLocaleString()} ₽
        </p>
        <p className={styles.card__category}>
          {props.category} • {props.date}
        </p>
      </div>

      <button className={styles.card__btn}>Открыть →</button>
    </div>
  );
}

export default AdCard;
