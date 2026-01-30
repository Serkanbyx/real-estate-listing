import { Link } from 'react-router-dom';
import { Scale, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCompareStore, MAX_COMPARE } from '@/store/compareStore';
import { useListingStore } from '@/store/listingStore';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * Floating compare bar component
 * Shows selected properties for comparison at bottom of screen
 */
export function CompareBar() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const { listings } = useListingStore();
  const [isExpanded, setIsExpanded] = useState(true);

  // Get compare listings
  const compareListings = compareIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);

  // Don't render if no items
  if (compareIds.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50 transition-transform duration-300',
        !isExpanded && 'translate-y-[calc(100%-48px)]'
      )}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          <span className="font-medium">
            Compare ({compareIds.length}/{MAX_COMPARE})
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearCompare();
                }}
              >
                Clear All
              </Button>
              <Link to="/compare" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" disabled={compareIds.length < 2}>
                  Compare Now
                </Button>
              </Link>
            </>
          )}
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="flex gap-4 overflow-x-auto">
            {compareListings.map((listing) =>
              listing ? (
                <div
                  key={listing.id}
                  className="flex-shrink-0 relative bg-muted rounded-lg overflow-hidden w-48"
                >
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-24 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 bg-white/90 dark:bg-background/90 rounded-full hover:bg-white dark:hover:bg-background"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCompare(listing.id);
                    }}
                    aria-label="Remove from compare"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{listing.title}</p>
                    <p className="text-xs text-primary font-bold">
                      {new Intl.NumberFormat('en-GB', {
                        style: 'currency',
                        currency: listing.currency,
                        maximumFractionDigits: 0,
                      }).format(listing.price)}
                    </p>
                  </div>
                </div>
              ) : null
            )}

            {/* Empty slots */}
            {Array.from({ length: MAX_COMPARE - compareIds.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="flex-shrink-0 w-48 h-[132px] border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center"
              >
                <span className="text-sm text-muted-foreground">Add property</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
