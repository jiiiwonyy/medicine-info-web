import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { Card } from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import ItemTitle from '@/components/ui/ItemTitle';
import vigiAccessHome from '@/assets/who-adverse/vigiacess_home.png';
import searchDrug from '@/assets/who-adverse/search_drug.png';
import resultGraphic from '@/assets/who-adverse/result_graphic.png';
import resultReportedPotential from '@/assets/who-adverse/result_reported_potential.png';
import LinkButton from '@/components/ui/LinkButton';

const VIGIACCESS_URL = 'https://www.vigiaccess.org/';

function SearchDatabaseButton() {
  return (
    <button
      disabled
      style={{
        backgroundColor: '#00719f',
        borderColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '4px',
        color: '#fff',
        cursor: 'default',
        padding: 'calc(0.5em - 1px) 1em',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.95rem',
        height: '2.5em',
        lineHeight: '1.5',
        userSelect: 'none',
        verticalAlign: 'middle',
      }}
      title="실제 사이트의 Search database 버튼"
    >
      Search database
    </button>
  );
}

export default function VigiAccessGuideSection() {
  return (
    <div className="mt-12 space-y-10">
      {/* 섹션 타이틀 */}
      <SectionTitle>전 세계 부작용 보고 자료 검색 방법</SectionTitle>

      {/* 안내 문장 + 체크박스·버튼 예시 이미지 + 사이트 링크 */}
      <div className="space-y-4">
        <p className={cn(textStyles.bodyMd, 'leading-relaxed text-fg')}>
          아래 사이트에 접속하여 하단에 체크하고 <SearchDatabaseButton /> 를
          누르면 의약품에 대한 부작용 보고자료를 검색할 수 있습니다.
        </p>
        <LinkButton
          href={VIGIACCESS_URL}
          text={VIGIACCESS_URL}
          variant="white"
        />
        {/* 체크박스 + Search database 버튼 화면 이미지 */}
        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src={vigiAccessHome}
            alt="VigiAccess 체크박스 및 Search database 버튼 화면"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* 검색창 안내 */}
      <div className="space-y-4">
        <p className={cn(textStyles.bodyMd, 'text-fg')}>
          검색창에 약물 이름을 넣으면 전 세계에서 보고된 부작용 결과가 나옵니다.
        </p>

        {/* 검색창 이미지 */}
        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src={searchDrug}
            alt="VigiAccess 약물 이름 검색창"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* allopurinol 검색 예시 */}
      <div className="space-y-4">
        <ItemTitle className="text-fg">💊 "allopurinol" 검색한 예시</ItemTitle>

        <Card variant="muted" padding="lg" className="space-y-4">
          {/* 부작용 목록 결과 */}
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={resultReportedPotential}
              alt="allopurinol VigiAccess 검색 결과 - 부작용 목록"
              className="w-full h-auto"
            />
          </div>
          {/* 통계 차트 결과 */}
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={resultGraphic}
              alt="allopurinol VigiAccess 검색 결과 - 통계 차트"
              className="w-full h-auto"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
