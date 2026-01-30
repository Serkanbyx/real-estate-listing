import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Calendar, Heart, Scale } from 'lucide-react';
import type { Listing } from '@/types';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { formatPrice, formatArea, getPropertyTypeLabel, getStatusLabel } from '@/lib/utils';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCompareStore } from '@/store/compareStore';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
}

/**
 * Listing card component
 */
export function ListingCard({ listing }: ListingCardProps) {
  const statusVariant = listing.status === 'for-sale' || listing.status === 'for-rent' ? 'default' : 'secondary';
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isInCompare, toggleCompare, canAddMore } = useCompareStore();
  const isFav = isFavorite(listing.id);
  const isCompare = isInCompare(listing.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(listing.id);
  };

  return (
    <Link to={`/listing/${listing.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={statusVariant}>{getStatusLabel(listing.status)}</Badge>
            <Badge variant="outline" className="bg-white/90 dark:bg-background/90">
              {getPropertyTypeLabel(listing.type)}
            </Badge>
          </div>
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-1">
            {/* Compare Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'bg-white/90 dark:bg-background/90 hover:bg-white dark:hover:bg-background h-8 w-8 rounded-full',
                !isCompare && !canAddMore() && 'opacity-50'
              )}
              onClick={handleCompareClick}
              disabled={!isCompare && !canAddMore()}
              aria-label={isCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <Scale
                className={cn(
                  'h-4 w-4 transition-colors',
                  isCompare ? 'text-primary' : 'text-muted-foreground'
                )}
              />
            </Button>
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 dark:bg-background/90 hover:bg-white dark:hover:bg-background h-8 w-8 rounded-full"
              onClick={handleFavoriteClick}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={cn(
                  'h-4 w-4 transition-colors',
                  isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                )}
              />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Price */}
          <p className="text-xl font-bold text-primary mb-2">
            {formatPrice(listing.price, listing.currency)}
            {listing.status === 'for-rent' && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{listing.title}</h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {listing.address.district}, {listing.address.city}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto pt-3 border-t">
            {listing.features.rooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{listing.features.rooms} Beds</span>
              </div>
            )}
            {listing.features.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{listing.features.bathrooms} Bath</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{formatArea(listing.features.area)}</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Calendar className="h-3 w-3" />
            <span>{new Date(listing.createdAt).toLocaleDateString('en-US')}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
