import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { ListingsPage, ListingDetailPage, MapPage, FavoritesPage, ComparePage } from '@/pages';

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
        
        {/* Favorites Page */}
        <Route path="/favorites" element={<FavoritesPage />} />
        
        {/* Compare Page */}
        <Route path="/compare" element={<ComparePage />} />
        
        {/* 404 - Redirect to home */}
        <Route path="*" element={<ListingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
