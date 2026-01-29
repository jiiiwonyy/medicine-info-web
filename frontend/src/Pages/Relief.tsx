import PageLayout from '@/components/PageLayout';

export default function KidsInfoPage() {
  return (
    <PageLayout>
      {/* 이상사례 보고하기 */}
      <div className="mb-10">
        <a
          href="https://kaers.drugsafe.or.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-blue-900 transition"
        >
          🔗 이상사례 보고하기
        </a>
      </div>

      {/* 보고 시 작성 항목 */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">보고 시 작성 항목</h3>
        <div className="mb-3">
          부작용 보고를 위해 사이트에 접속하면 아래와 같은 항목들을 입력하게
          됩니다.
        </div>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>환자 기본정보 (연령, 성별, 상태 등)</li>
          <li>의약품 정보 (제품명, 성분명, 투여 방법·기간)</li>
          <li>이상사례 내용 (발현 시점, 증상, 결과 등)</li>
          <li>보고자 정보 (보고자 유형: 의사·약사·간호사·환자·보호자 등)</li>
          <li>첨부자료 (검사결과, 진단서 등 필요 시 첨부 가능)</li>
        </ul>
      </div>
    </PageLayout>
  );
}
