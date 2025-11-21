import { Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./pages/list/ListPage";
import StatsPage from "./pages/stats/StatsPage";
import ItemPage from "./pages/item/ItemPage.tsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/item/:id" element={<ItemPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
};
