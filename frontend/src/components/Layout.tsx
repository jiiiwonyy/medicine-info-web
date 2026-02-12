import { Outlet } from 'react-router-dom';
import Header from '@/components/header/Header';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg">
      <Header />
      <div className="flex-1 xl:px-72">
        <Outlet />
      </div>
    </div>
  );
}
