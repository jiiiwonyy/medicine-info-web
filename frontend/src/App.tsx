// App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MedicineDetail from './Pages/MedicineDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/medicines/:id" element={<MedicineDetail />} />
    </Routes>
  );
}
