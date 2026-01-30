import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useListingStore } from '@/store/listingStore';
import { ListingCard } from '@/components/listing';
import { Button, Card, CardContent } from '@/components/ui';

/**
 * Favorites page displaying user's saved properties
 * Kullanıcının kaydettiği mülkleri gösteren favoriler sayfası
 */
export function FavoritesPage() {
  const { favoriteIds, clearFavorites } = useFavoritesStore();
  const { listings } = useListingStore();

  // Filter listings to only show favorites
  const favoriteListings = listings.filter((listing) =>
    favoriteIds.includes(listing.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Heart className="h-7 w-7 text-red-500" />
            My Favorites
          </h1>
          <p className="text-muted-foreground mt-1">
            {favoriteListings.length} {favoriteListings.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {favoriteListings.length > 0 && (
          <Button
            variant="outline"
            onClick={clearFavorites}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Content */}
      {favoriteListings.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring properties and save your favorites by clicking the heart icon.
            </p>
            <Link to="/">
              <Button>
                Browse Properties
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
