import Home from '@/Pages/Home';
import SearchResult from '@/Pages/SearchResult';
import MedicineDetail from '@/Pages/MedicineDetail';
import { Route, Routes, Navigate } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/medicines/:id" element={<MedicineDetail />} />
    </Routes>
  );
};

export default Router;
