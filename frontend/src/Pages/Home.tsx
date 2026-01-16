import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

export default function Home() {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: '의약품 상세검색',
      desc: '제품명, 성분명으로 의약품 정보를 상세하게 검색해보세요.',
      path: '/search',
      color: 'bg-blue-50 text-blue-600',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      ),
    },
    {
      title: '의약품 안전정보(DUR)',
      desc: '병용금기, 임부금기 등 의약품 복용 시 주의사항을 확인하세요.',
      path: '/dur',
      color: 'bg-emerald-50 text-emerald-600',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
    },
    {
      title: '부작용 피해구제',
      desc: '의약품 부작용으로 인한 피해, 구제 절차를 안내해드립니다.',
      path: '/drug-adverse-relief',
      color: 'bg-rose-50 text-rose-600',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ),
    },
    {
      title: '안전성 속보',
      desc: '새로운 의약품 안전성 정보와 서한을 신속하게 알려드립니다.',
      path: '/safety-letter',
      color: 'bg-amber-50 text-amber-600',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.31 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="flex flex-col gap-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-3 py-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            의약품 정보, <span className="text-sky-700">쉽고 정확하게</span>
          </h1>
          <p className="text-gray-500 text-lg">
            의약품안전나라 데이터를 기반으로 신뢰할 수 있는 정보를 제공합니다.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {quickLinks.map((link) => (
            <button
              key={link.title}
              onClick={() => navigate(link.path)}
              className="group flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all text-left"
            >
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${link.color} group-hover:scale-105 transition-transform`}
              >
                {link.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-sky-700 transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  {link.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Information Section */}
        <div className="bg-sky-50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-3">
            <span className="bg-sky-100 text-sky-700 text-sm font-bold px-3 py-1 rounded-full">
              Safe Tips
            </span>
            <h3 className="text-2xl font-bold text-gray-800">
              올바른 약 복용이 건강을 지킵니다
            </h3>
            <p className="text-gray-600 leading-relaxed">
              약을 복용하기 전, 반드시 의사나 약사와 상담하세요.<br/>
              본인의 증상에 맞는 약인지, 함께 복용하면 안 되는 음식이나 약이 있는지 확인하는 습관이 중요합니다.
            </p>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

