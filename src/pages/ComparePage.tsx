import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Trash2, X, Bed, Bath, Maximize, MapPin, Calendar, Building } from 'lucide-react';
import { useCompareStore } from '@/store/compareStore';
import { useListingStore } from '@/store/listingStore';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { formatPrice, formatArea, getPropertyTypeLabel, getStatusLabel, cn } from '@/lib/utils';

/**
 * Compare page for side-by-side property comparison
 * Yan yana mülk karşılaştırma sayfası
 */
export function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const { listings } = useListingStore();

  // Filter listings to only show compared ones
  const compareListings = compareIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);

  // Comparison row component
  const CompareRow = ({
    label,
    values,
    highlight = false,
  }: {
    label: string;
    values: (string | number | React.ReactNode)[];
    highlight?: boolean;
  }) => (
    <div className={cn('grid gap-4 py-3 border-b', highlight && 'bg-muted/50')}>
      <div
        className="grid items-center"
        style={{ gridTemplateColumns: `200px repeat(${compareListings.length}, 1fr)` }}
      >
        <span className="font-medium text-muted-foreground">{label}</span>
        {values.map((value, index) => (
          <span key={index} className="text-center">
            {value}
          </span>
        ))}
      </div>
    </div>
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
            <Scale className="h-7 w-7 text-primary" />
            Compare Properties
          </h1>
          <p className="text-muted-foreground mt-1">
            {compareListings.length} {compareListings.length === 1 ? 'property' : 'properties'} selected
          </p>
        </div>

        {compareListings.length > 0 && (
          <Button
            variant="outline"
            onClick={clearCompare}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Content */}
      {compareListings.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Scale className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No properties to compare</h2>
            <p className="text-muted-foreground mb-6">
              Add properties to compare by clicking the compare button on listing cards.
            </p>
            <Link to="/">
              <Button>Browse Properties</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          {/* Property Images & Basic Info */}
          <div
            className="grid gap-4 mb-6"
            style={{ gridTemplateColumns: `200px repeat(${compareListings.length}, 1fr)` }}
          >
            <div /> {/* Empty cell for label column */}
            {compareListings.map((listing) =>
              listing ? (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/90 dark:bg-background/90 h-8 w-8 rounded-full hover:bg-white dark:hover:bg-background"
                      onClick={() => removeFromCompare(listing.id)}
                      aria-label="Remove from compare"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="absolute top-2 left-2">
                      <Badge>{getStatusLabel(listing.status)}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Link
                      to={`/listing/${listing.id}`}
                      className="font-semibold hover:text-primary line-clamp-2"
                    >
                      {listing.title}
                    </Link>
                  </CardContent>
                </Card>
              ) : null
            )}
          </div>

          {/* Comparison Table */}
          <Card>
            <CardContent className="p-6">
              <CompareRow
                label="Price"
                values={compareListings.map((listing) =>
                  listing ? (
                    <span className="font-bold text-primary text-lg">
                      {formatPrice(listing.price, listing.currency)}
                      {listing.status === 'for-rent' && (
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      )}
                    </span>
                  ) : (
                    '-'
                  )
                )}
                highlight
              />

              <CompareRow
                label="Property Type"
                values={compareListings.map((listing) =>
                  listing ? (
                    <Badge variant="outline">{getPropertyTypeLabel(listing.type)}</Badge>
                  ) : (
                    '-'
                  )
                )}
              />

              <CompareRow
                label="Location"
                values={compareListings.map((listing) =>
                  listing ? (
                    <span className="flex items-center justify-center gap-1 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {listing.address.city}
                    </span>
                  ) : (
                    '-'
                  )
                )}
              />

              <CompareRow
                label="Bedrooms"
                values={compareListings.map((listing) =>
                  listing ? (
                    <span className="flex items-center justify-center gap-1">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      {listing.features.rooms || '-'}
                    </span>
                  ) : (
                    '-'
                  )
                )}
              />

              <CompareRow
                label="Bathrooms"
                values={compareListings.map((listing) =>
                  listing ? (
                    <span className="flex items-center justify-center gap-1">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      {listing.features.bathrooms || '-'}
                    </span>
                  ) : (
                    '-'
                  )
                )}
              />

              <CompareRow
                label="Area"
                values={compareListings.map((listing) =>
                  listing ? (
                    <span className="flex items-center justify-center gap-1">
                      <Maximize className="h-4 w-4 text-muted-foreground" />
                      {formatArea(listing.features.area)}
                    </span>
                  ) : (
                    '-'
                  )
                )}
                highlight
              />

              <CompareRow
                label="Floor"
                values={compareListings.map((listing) =>
                  listing && listing.features.floor !== undefined ? (
                    <span className="flex items-center justify-center gap-1">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {listing.features.floor}/{listing.features.totalFloors}
                    </span>
                  ) : (
                    '-'
                  )
                )}
              />

              <CompareRow
                label="Building Age"
                values={compareListings.map((listing) =>
                  listing && listing.features.buildingAge !== undefined ? (
                    <span className="flex items-center justify-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {listing.features.buildingAge} years
                    </span>
                  ) : (
                    '-'
                  )
                )}
              />

              <CompareRow
                label="Heating"
                values={compareListings.map((listing) =>
                  listing?.features.heating || '-'
                )}
              />

              <CompareRow
                label="Parking"
                values={compareListings.map((listing) =>
                  listing?.features.parking ? (
                    <Badge variant="secondary">Yes</Badge>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )
                )}
              />

              <CompareRow
                label="Furnished"
                values={compareListings.map((listing) =>
                  listing?.features.furnished ? (
                    <Badge variant="secondary">Yes</Badge>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )
                )}
              />

              <CompareRow
                label="Balcony"
                values={compareListings.map((listing) =>
                  listing?.features.balcony ? (
                    <Badge variant="secondary">Yes</Badge>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )
                )}
              />

              <CompareRow
                label="Elevator"
                values={compareListings.map((listing) =>
                  listing?.features.elevator ? (
                    <Badge variant="secondary">Yes</Badge>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )
                )}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
