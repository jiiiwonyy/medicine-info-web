import SearchBar from '@/components/SearchBar';
import { cn } from '@/shared/cn';

type Props = {
  logoSrc: string;
  query: string;
  onChangeQuery: (v: string) => void;
  onSearch: () => void;
  onClickLogo: () => void;
};

export default function HeaderTop({
  logoSrc,
  query,
  onChangeQuery,
  onSearch,
  onClickLogo,
}: Props) {
  return (
    <div className="w-full bg-surface shadow-sm p-10 flex xl:px-72 flex-col items-center border-b border-border">
      <img
        src={logoSrc}
        alt="로고"
        onClick={onClickLogo}
        className={cn('cursor-pointer')}
      />

      <div className="w-full max-w-xl">
        <SearchBar
          id="medicine-search-bar"
          value={query}
          onChange={onChangeQuery}
          onSearch={onSearch}
          placeholder="검색어를 입력하세요 (최소 2글자)"
        />
      </div>
    </div>
  );
}
