import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdCard from "./components/AdCard";
import Filters from "./components/Filters";

import styles from "./ListPage.module.css";

type AdPriority = "normal" | "urgent";

type Ad = {
  id: number;
  title: string;
  price: number;
  category: string;
  createdAt: string;
  date: string;
  priority: AdPriority;
  status: string;
  image?: string;
};

const MOCK_ADS: Ad[] = [
  {
    id: 1,
    title: "iPhone 14 Pro 256GB",
    price: 95000,
    category: "Электроника",
    createdAt: "2025-11-18T10:15:00Z",
    date: "18.11.2025",
    priority: "urgent",
    status: "pending",
  },
  {
    id: 2,
    title: "Диван угловой",
    price: 35000,
    category: "Мебель",
    createdAt: "2025-11-17T09:00:00Z",
    date: "17.11.2025",
    priority: "normal",
    status: "approved",
  },
  {
    id: 3,
    title: "Игровая приставка PlayStation 5",
    price: 52000,
    category: "Электроника",
    createdAt: "2025-11-16T14:30:00Z",
    date: "16.11.2025",
    priority: "urgent",
    status: "pending",
  },
  {
    id: 4,
    title: "Шкаф-купе белый",
    price: 28000,
    category: "Мебель",
    createdAt: "2025-11-15T08:10:00Z",
    date: "15.11.2025",
    priority: "normal",
    status: "rejected",
  },
  {
    id: 5,
    title: "Смарт-часы Samsung Galaxy Watch 6",
    price: 21000,
    category: "Электроника",
    createdAt: "2025-11-14T11:55:00Z",
    date: "14.11.2025",
    priority: "urgent",
    status: "approved",
  },
  {
    id: 6,
    title: "Велосипед горный",
    price: 30000,
    category: "Спорт",
    createdAt: "2025-11-13T12:40:00Z",
    date: "13.11.2025",
    priority: "normal",
    status: "pending",
  },
  {
    id: 7,
    title: "Холодильник LG",
    price: 47000,
    category: "Бытовая техника",
    createdAt: "2025-11-12T09:25:00Z",
    date: "12.11.2025",
    priority: "normal",
    status: "approved",
  },
  {
    id: 8,
    title: "Ноутбук Lenovo IdeaPad 3",
    price: 43000,
    category: "Электроника",
    createdAt: "2025-11-11T17:05:00Z",
    date: "11.11.2025",
    priority: "urgent",
    status: "pending",
  },
  {
    id: 9,
    title: "Кроссовки Nike Air Max",
    price: 9000,
    category: "Одежда",
    createdAt: "2025-11-10T15:00:00Z",
    date: "10.11.2025",
    priority: "normal",
    status: "approved",
  },
  {
    id: 10,
    title: "Телевизор Samsung 55”",
    price: 62000,
    category: "Электроника",
    createdAt: "2025-11-09T18:20:00Z",
    date: "09.11.2025",
    priority: "urgent",
    status: "rejected",
  },
  {
    id: 11,
    title: "Стул офисный эргономичный",
    price: 6500,
    category: "Мебель",
    createdAt: "2025-11-08T08:50:00Z",
    date: "08.11.2025",
    priority: "normal",
    status: "pending",
  },
  {
    id: 12,
    title: "Графический планшет Wacom",
    price: 19000,
    category: "Электроника",
    createdAt: "2025-11-07T13:10:00Z",
    date: "07.11.2025",
    priority: "urgent",
    status: "approved",
  },
  {
    id: 13,
    title: "Кофеварка Philips",
    price: 8500,
    category: "Бытовая техника",
    createdAt: "2025-11-06T16:40:00Z",
    date: "06.11.2025",
    priority: "normal",
    status: "approved",
  },
  {
    id: 14,
    title: "Настольная лампа Xiaomi",
    price: 3200,
    category: "Бытовая техника",
    createdAt: "2025-11-05T10:15:00Z",
    date: "05.11.2025",
    priority: "urgent",
    status: "pending",
  },
  {
    id: 15,
    title: "Куртка зимняя мужская",
    price: 12000,
    category: "Одежда",
    createdAt: "2025-11-04T12:05:00Z",
    date: "04.11.2025",
    priority: "normal",
    status: "rejected",
  },
];




function ListPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc");
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);



  const PAGE_SIZE = 10;

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, categoryFilter, minPrice, maxPrice, sort]);


  function openDetails(id: number) {
    navigate(`/item/${id}`);
  }

  const sortedAds = useMemo(() => {
    let arr = [...MOCK_ADS];

    // --- поиск по названию ---
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter((ad) => ad.title.toLowerCase().includes(q));
    }

    // --- фильтр по статусу ---
    if (statusFilter !== "all") {
      arr = arr.filter((ad) => ad.status === statusFilter);
    }

    // --- фильтр по категории ---
    if (categoryFilter !== "all") {
      arr = arr.filter((ad) => ad.category === categoryFilter);
    }

    // --- фильтр по цене ---
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    if (min !== null) {
      arr = arr.filter((ad) => ad.price >= min);
    }
    if (max !== null) {
      arr = arr.filter((ad) => ad.price <= max);
    }

    // --- сортировка ---
    switch (sort) {
      case "date_desc":
        arr.sort((a, b) => {
          const d1 = new Date(a.createdAt).getTime();
          const d2 = new Date(b.createdAt).getTime();
          return d2 - d1 || a.id - b.id;
        });
        break;

      case "date_asc":
        arr.sort((a, b) => {
          const d1 = new Date(a.createdAt).getTime();
          const d2 = new Date(b.createdAt).getTime();
          return d1 - d2 || a.id - b.id;
        });
        break;

      case "price_asc":
        arr.sort((a, b) => a.price - b.price || a.id - b.id);
        break;

      case "price_desc":
        arr.sort((a, b) => b.price - a.price || a.id - b.id);
        break;

      case "priority_desc":
        arr.sort((a, b) => {
          const p1 = a.priority === "urgent" ? 1 : 0;
          const p2 = b.priority === "urgent" ? 1 : 0;
          const byPriority = p2 - p1;
          if (byPriority !== 0) return byPriority;

          const d1 = new Date(a.createdAt).getTime();
          const d2 = new Date(b.createdAt).getTime();
          return d2 - d1 || a.id - b.id;
        });
        break;
    }

    return arr;
  }, [search, statusFilter, categoryFilter, minPrice, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedAds.length / PAGE_SIZE));

  const pageAds = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedAds.slice(start, start + PAGE_SIZE);
  }, [sortedAds, page]);


  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <h1 className={styles.page__title}>Список объявлений</h1>

        <div className={styles.filters}>
          <Filters
            search={search}
            status={statusFilter}
            category={categoryFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sort={sort}

            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onCategoryChange={setCategoryFilter}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onSortChange={setSort}
          />
        </div>

        <div className={styles.list}>
          {pageAds.map((ad) => (
            <AdCard
              key={ad.id}
              id={ad.id}
              title={ad.title}
              price={ad.price}
              category={ad.category}
              date={ad.date}
              onOpen={openDetails}
            />
          ))}
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.pagination__arrow}
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Пред.
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={
                p === page ? `${styles.pagination__page} ${styles.pagination__pageActive}` : styles.pagination__page
              }
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className={styles.pagination__arrow}
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            След.
          </button>
        </div>
        <p className={styles.total}>Всего: {sortedAds.length} объявлений</p>
      </div>
    </div>
  );
}

export default ListPage
