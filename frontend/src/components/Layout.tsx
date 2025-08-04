import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen  flex flex-col bg-white">
      <Header />
      <div className="flex-1 xl:px-72">
        <Outlet />
      </div>
    </div>
  );
}
