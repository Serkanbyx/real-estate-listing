import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { ListingsPage, ListingDetailPage, MapPage } from '@/pages';

/**
 * Main App component with routing
 * Ana uygulama bileşeni ve yönlendirme
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home - Listings Page */}
        <Route path="/" element={<ListingsPage />} />
        
        {/* Listing Detail Page */}
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        
        {/* Map View Page */}
        <Route path="/map" element={<MapPage />} />
        
        {/* 404 - Redirect to home */}
        <Route path="*" element={<ListingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
