import styles from "./Filters.module.css";

type Props = {
  search: string;
  status: string;
  category: string;

  minPrice: string;
  maxPrice: string;
  sort: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

function Filters(props: Props) {
  return (
    <div className={styles.filters}>
      <div className={styles.filtersWrapper}>
        <h3 className={styles.filters__title}>Фильтры:</h3>

        <div className={styles.filters__row}>
          <select
            className={styles.filters__select}
            value={props.status}
            onChange={(e) => props.onStatusChange(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="pending">На модерации</option>
            <option value="approved">Одобрено</option>
            <option value="rejected">Отклонено</option>
          </select>

          <select
            className={styles.filters__select}
            value={props.category}
            onChange={(e) => props.onCategoryChange(e.target.value)}
          >
            <option value="all">Все категории</option>

            {props.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number"
            className={styles.filters__input}
            placeholder="Цена от..."
            value={props.minPrice}
            onChange={(e) => props.onMinPriceChange(e.target.value)}
          />

          <input
            type="number"
            className={styles.filters__input}
            placeholder="Цена до..."
            value={props.maxPrice}
            onChange={(e) => props.onMaxPriceChange(e.target.value)}
          />

          <select
            className={styles.filters__select}
            value={props.sort}
            onChange={(e) => props.onSortChange(e.target.value)}
          >
            <option value="date_desc">Сначала новые</option>
            <option value="date_asc">Сначала старые</option>
            <option value="price_asc">Цена ↑</option>
            <option value="price_desc">Цена ↓</option>
            <option value="priority_desc">Срочные сверху</option>
          </select>

          <input
            type="text"
            className={styles.filters__search}
            placeholder="Поиск по названию..."
            value={props.search}
            onChange={(e) => props.onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters
