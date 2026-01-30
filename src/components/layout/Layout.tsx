import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CompareBar } from '@/components/listing';

/**
 * Main layout component with header and footer
 * Başlık ve alt bilgi ile ana düzen bileşeni
 */
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-[160px]">
        <Outlet />
      </main>
      <Footer />
      <CompareBar />
    </div>
  );
}
