import Home from '@/Pages/Home';
import SearchResult from '@/Pages/SearchResult';
import MedicineDetail from '@/Pages/MedicineDetail';
import DurPage from '@/Pages/DURPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SafetyLetter from '@/Pages/SafetyLetter';
import Signal from '@/Pages/SignalInfo';
import AdverseEventDomestic from '@/Pages/AdverseEventDomestic';

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-10 text-center">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-600">페이지 준비 중입니다.</p>
  </div>
);

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 홈 */}
        <Route path="/" element={<Home />} />

        {/* 의약품정보 */}
        <Route path="/search" element={<SearchResult />} />
        <Route path="/medicines/:id" element={<MedicineDetail />} />
        <Route path="/dur" element={<DurPage />} />
        <Route
          path="/medicines/safe"
          element={<PlaceholderPage title="의약품 안전 정보" />}
        />

        {/* 안전성 서한 및 실마리정보 */}
        <Route path="/safety-letter" element={<SafetyLetter />} />
        <Route path="/signal" element={<Signal />} />

        {/* 부작용 보고자료 */}
        <Route path="/domestic" element={<AdverseEventDomestic />} />
        <Route
          path="/fda"
          element={<PlaceholderPage title="미국 FDA 부작용 보고건수" />}
        />
        <Route
          path="/who"
          element={<PlaceholderPage title="WHO 부작용 보고건수" />}
        />

        {/* 부작용보고 및 피해구제 */}
        <Route
          path="/relief"
          element={<PlaceholderPage title="피해구제 제도 안내" />}
        />
        <Route
          path="/local-center"
          element={<PlaceholderPage title="지역의약품안전센터" />}
        />
        <Route
          path="/medication-guide"
          element={<PlaceholderPage title="복약지도서" />}
        />

        {/* 의약품 관련 사이트 */}
        <Route
          path="/kops"
          element={<PlaceholderPage title="KOPS (한국의약품안전관리원)" />}
        />
        <Route
          path="/narcotics"
          element={<PlaceholderPage title="마약류 종합 시스템" />}
        />

        {/* 잘못된 경로 → 홈 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default Router;
