import Home from '@/Pages/Home';
import SearchResult from '@/Pages/SearchResult';
import MedicineDetail from '@/Pages/MedicineDetail';
import DurPage from '@/Pages/DURPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SafetyLetter from '@/Pages/SafetyLetter';
import Signal from '@/Pages/SignalInfo';
import AdverseEventDomestic from '@/Pages/AdverseEventDomestic';
import ReliefPage from '@/Pages/Relief';
import MedicationGuide from '@/Pages/MedicationGuide';
import LocalCenter from '@/Pages/LocalCenter';
import KopsPage from '@/Pages/Kops';
import NimsPage from '@/Pages/NimsPage';
import AdverseReliefPage from '@/Pages/AdverseReliefPage';
import LawInfoPage from '@/Pages/LawInfo';
import AdminPage from '@/Pages/AdminPage';
import FdaPage from '@/Pages/FdaPage';
import MedicationSafetyInfo from '@/Pages/MedicationSafetyInfo';
import SafeMedicationProcess from '@/Pages/SafeMedicationProcess';
import ErrorReductionStrategy from '@/Pages/ErrorReductionStrategy';

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

        {/* 안전한 투약 관리 */}
        <Route
          path="/medication-safety-info"
          element={<MedicationSafetyInfo />}
        />
        <Route
          path="/safe-medication-process"
          element={<SafeMedicationProcess />}
        />
        <Route
          path="/error-reduction-strategy"
          element={<ErrorReductionStrategy />}
        />

        {/* 안전성 서한 및 실마리정보 */}
        <Route path="/safety-letter" element={<SafetyLetter />} />
        <Route path="/signal" element={<Signal />} />

        {/* 부작용 보고자료 */}
        <Route path="/domestic" element={<AdverseEventDomestic />} />
        <Route path="/fda" element={<FdaPage />} />
        <Route
          path="/who"
          element={<PlaceholderPage title="WHO 부작용 보고건수" />}
        />

        {/* 부작용보고 및 피해구제 */}
        <Route path="/relief" element={<ReliefPage />} />
        <Route path="/drug-adverse-relief" element={<AdverseReliefPage />} />
        <Route path="/local-center" element={<LocalCenter />} />
        <Route path="/medication-guide" element={<MedicationGuide />} />

        {/* 의약품 관련 사이트 */}
        <Route path="/kops" element={<KopsPage />} />
        <Route path="/nims" element={<NimsPage />} />
        <Route path="/lawinfo" element={<LawInfoPage />} />

        {/* 잘못된 경로 → 홈 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default Router;
