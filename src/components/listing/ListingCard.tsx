import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Calendar } from 'lucide-react';
import type { Listing } from '@/types';
import { Card, CardContent, Badge } from '@/components/ui';
import { formatPrice, formatArea, getPropertyTypeLabel, getStatusLabel } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
}

/**
 * Listing card component
 */
export function ListingCard({ listing }: ListingCardProps) {
  const statusVariant = listing.status === 'for-sale' || listing.status === 'for-rent' ? 'default' : 'secondary';

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
            <Badge variant="outline" className="bg-white/90">
              {getPropertyTypeLabel(listing.type)}
            </Badge>
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
