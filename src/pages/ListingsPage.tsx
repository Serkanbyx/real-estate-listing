import { useListings } from '@/hooks/useListings';
import { ListingGrid, FilterForm, MobileFilterDrawer } from '@/components/listing';
import { Card, CardContent, Button } from '@/components/ui';
import { RefreshCw, AlertCircle } from 'lucide-react';

/**
 * Listings page - Main listing page
 * Fetches listings from API and displays them
 */
export function ListingsPage() {
  const { filteredListings, isLoading, error, refetch } = useListings();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Property Listings</h1>
          <p className="text-muted-foreground mt-1">
            {isLoading ? 'Loading...' : `${filteredListings.length} listings found`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={refetch}
            disabled={isLoading}
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <MobileFilterDrawer />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <div>
            <p className="font-medium text-destructive">Error</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={refetch} className="ml-auto">
            Try Again
          </Button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <FilterForm />
            </CardContent>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="flex-1 min-w-0">
          <ListingGrid />
        </div>
      </div>
    </div>
  );
}
