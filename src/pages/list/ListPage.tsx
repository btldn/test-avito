import { useAds } from "../../data/AdsContext";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdCard from "./components/AdCard";
import Filters from "./components/Filters";

import styles from "./ListPage.module.css";

function ListPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc");
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const { ads, isLoading, error } = useAds();
  const PAGE_SIZE = 10;

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, categoryFilter, minPrice, maxPrice, sort]);

  function openDetails(id: number) {
    navigate(`/item/${id}`);
  }

  const sortedAds = useMemo(() => {
    let arr = [...ads];

    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter((ad) => ad.title.toLowerCase().includes(q));
    }

    if (statusFilter !== "all") {
      arr = arr.filter((ad) => ad.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      arr = arr.filter((ad) => ad.category === categoryFilter);
    }

    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    if (min !== null) {
      arr = arr.filter((ad) => ad.price >= min);
    }
    if (max !== null) {
      arr = arr.filter((ad) => ad.price <= max);
    }

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
  }, [ads, search, statusFilter, categoryFilter, minPrice, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedAds.length / PAGE_SIZE));

  const pageAds = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedAds.slice(start, start + PAGE_SIZE);
  }, [sortedAds, page]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    ads.forEach(ad => set.add(ad.category));
    return Array.from(set);
  }, [ads]);


  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <h1 className={styles.page__title}>Список объявлений</h1>

        <div className={styles.filters}>
          <Filters
            search={search}
            status={statusFilter}
            category={categoryFilter}
            categories={categories}
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

        {error && <p className={styles.error}>{error}</p>}
        {isLoading && <p className={styles.loading}>Загрузка...</p>}

        <div className={styles.list}>
          {pageAds.map((ad) => (
            <AdCard
              key={ad.id}
              id={ad.id}
              title={ad.title}
              price={ad.price}
              category={ad.category}
              createdAt={ad.createdAt}
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
