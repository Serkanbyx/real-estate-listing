import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Building,
  Calendar,
  Flame,
  Car,
  Sofa,
  Wind,
  Phone,
  Mail,
  Heart,
  ChevronLeft,
  ChevronRight,
  Expand,
} from 'lucide-react';
import { useListing } from '@/hooks/useListings';
import { ContactDialog, ShareButton } from '@/components/listing';
import { Button, Badge, Card, CardContent, Skeleton, Lightbox } from '@/components/ui';
import { formatPrice, formatArea, getPropertyTypeLabel, getStatusLabel, cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useRecentStore } from '@/store/recentStore';

/**
 * Listing detail page
 * Fetches a single listing from API and displays details
 */
export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { listing: selectedListing } = useListing(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Favorites
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = id ? isFavorite(id) : false;

  // Recent views tracking
  const { addRecentView } = useRecentStore();

  useEffect(() => {
    // Small delay to show loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  // Track recent view when listing is loaded
  useEffect(() => {
    if (id && selectedListing) {
      addRecentView(id);
    }
  }, [id, selectedListing, addRecentView]);

  // Reset image index when listing changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedListing?.id]);

  const nextImage = () => {
    if (selectedListing) {
      setCurrentImageIndex((prev) =>
        prev === selectedListing.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedListing) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedListing.images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading || !selectedListing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-[16/9] w-full rounded-lg" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!selectedListing && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The listing you are looking for does not exist or has been removed.
        </p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Listings
        </Button>
      </div>
    );
  }

  const { features } = selectedListing;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src={selectedListing.images[currentImageIndex]}
              alt={selectedListing.title}
              className="w-full aspect-[16/9] object-cover cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            />
            
            {/* Expand Button */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="View full screen"
            >
              <Expand className="h-5 w-5" />
            </button>
            
            {/* Image Navigation */}
            {selectedListing.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedListing.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge>{getStatusLabel(selectedListing.status)}</Badge>
              <Badge variant="outline" className="bg-white/90 dark:bg-background/90">
                {getPropertyTypeLabel(selectedListing.type)}
              </Badge>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {selectedListing.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {selectedListing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${selectedListing.title} - ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Title & Price */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{selectedListing.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {selectedListing.address.street}, {selectedListing.address.district},{' '}
                {selectedListing.address.city}
              </span>
            </div>
          </div>

          {/* Key Features */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.rooms > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-medium">{features.rooms}</p>
                    </div>
                  </div>
                )}
                {features.bathrooms > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bath className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-medium">{features.bathrooms}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Maximize className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="font-medium">{formatArea(features.area)}</p>
                  </div>
                </div>
                {features.floor !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Floor</p>
                      <p className="font-medium">
                        {features.floor}/{features.totalFloors}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Features */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Additional Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.buildingAge !== undefined && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Building Age: {features.buildingAge} years</span>
                  </div>
                )}
                {features.heating && (
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-muted-foreground" />
                    <span>{features.heating}</span>
                  </div>
                )}
                {features.parking && (
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span>Parking</span>
                  </div>
                )}
                {features.furnished && (
                  <div className="flex items-center gap-2">
                    <Sofa className="h-4 w-4 text-muted-foreground" />
                    <span>Furnished</span>
                  </div>
                )}
                {features.balcony && (
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-muted-foreground" />
                    <span>Balcony</span>
                  </div>
                )}
                {features.elevator && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>Elevator</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {selectedListing.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <p className="text-3xl font-bold text-primary mb-1">
                {formatPrice(selectedListing.price, selectedListing.currency)}
              </p>
              {selectedListing.status === 'for-rent' && (
                <p className="text-muted-foreground">/month</p>
              )}

              <div className="flex gap-2 mt-6">
                <Button className="flex-1" onClick={() => setIsContactOpen(true)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Agent
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => id && toggleFavorite(id)}
                  aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    className={cn(
                      'h-4 w-4 transition-colors',
                      isFav ? 'fill-red-500 text-red-500' : ''
                    )}
                  />
                </Button>
                <ShareButton title={selectedListing.title} />
              </div>

              {/* Agent Info */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Agent</h3>
                <div className="flex items-center gap-3">
                  {selectedListing.agent.avatar && (
                    <img
                      src={selectedListing.agent.avatar}
                      alt={selectedListing.agent.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{selectedListing.agent.name}</p>
                    <a
                      href={`tel:${selectedListing.agent.phone}`}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" />
                      {selectedListing.agent.phone}
                    </a>
                  </div>
                </div>
                <a
                  href={`mailto:${selectedListing.agent.email}`}
                  className="flex items-center gap-2 mt-3 text-sm text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  {selectedListing.agent.email}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Dialog */}
      <ContactDialog
        listing={selectedListing}
        open={isContactOpen}
        onOpenChange={setIsContactOpen}
      />

      {/* Lightbox */}
      <Lightbox
        images={selectedListing.images}
        initialIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        alt={selectedListing.title}
      />
    </div>
  );
}
