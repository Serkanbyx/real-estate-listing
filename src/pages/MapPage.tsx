import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import { ExternalLink, Loader2 } from 'lucide-react';
import { useListings } from '@/hooks/useListings';
import type { Listing } from '@/types';
import { Button, Badge } from '@/components/ui';
import { formatPrice, getStatusLabel, getPropertyTypeLabel } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-expect-error - Leaflet icon fix
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// UK center coordinates
const UK_CENTER: [number, number] = [54.0, -2.0];
const DEFAULT_ZOOM = 6;

/**
 * Create custom marker icon with listing count
 */
function createClusterIcon(count: number): DivIcon {
  return new DivIcon({
    html: `
      <div class="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full shadow-lg border-2 border-white font-bold text-sm">
        ${count}
      </div>
    `,
    className: 'custom-marker-cluster',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
}

/**
 * Map page - Interactive map view
 * Displays listings on an interactive Leaflet map centered on UK
 */
export function MapPage() {
  const { listings, isLoading } = useListings();
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // City coordinates for UK
  const cityCoordinates: Record<string, [number, number]> = {
    London: [51.5074, -0.1278],
    Manchester: [53.4808, -2.2426],
    Birmingham: [52.4862, -1.8904],
    Leeds: [53.8008, -1.5491],
    Liverpool: [53.4084, -2.9916],
    Bristol: [51.4545, -2.5879],
    Sheffield: [53.3811, -1.4701],
    Edinburgh: [55.9533, -3.1883],
    Brighton: [50.8225, -0.1372],
    Cambridge: [52.2053, 0.1218],
    Guildford: [51.2362, -0.5704],
  };

  // Group listings by city
  const listingsByCity = listings.reduce(
    (acc, listing) => {
      const city = listing.address.city;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(listing);
      return acc;
    },
    {} as Record<string, Listing[]>
  );

  // Get marker position for a city
  const getMarkerPosition = (city: string, listing: Listing): [number, number] => {
    if (listing.coordinates) {
      return [listing.coordinates.lat, listing.coordinates.lng];
    }
    return cityCoordinates[city] || UK_CENTER;
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-background border-b p-4 z-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Map View</h1>
          <p className="text-muted-foreground">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </span>
            ) : (
              `${listings.length} listings in ${Object.keys(listingsByCity).length} cities`
            )}
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="font-medium">Loading map...</span>
            </div>
          </div>
        )}

        {/* Leaflet Map */}
        <MapContainer
          center={UK_CENTER}
          zoom={DEFAULT_ZOOM}
          className="h-full w-full z-0"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* City Markers */}
          {Object.entries(listingsByCity).map(([city, cityListings]) => {
            const position = getMarkerPosition(city, cityListings[0]);
            
            return (
              <Marker
                key={city}
                position={position}
                icon={createClusterIcon(cityListings.length)}
                eventHandlers={{
                  click: () => setSelectedListing(cityListings[0]),
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-bold text-lg mb-2">{city}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {cityListings.length} listings available
                    </p>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {cityListings.slice(0, 3).map((listing) => (
                        <Link
                          key={listing.id}
                          to={`/listing/${listing.id}`}
                          className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <p className="font-medium text-sm line-clamp-1">
                            {listing.title}
                          </p>
                          <p className="text-primary font-bold text-sm">
                            {formatPrice(listing.price, listing.currency)}
                          </p>
                        </Link>
                      ))}
                      {cityListings.length > 3 && (
                        <p className="text-xs text-muted-foreground text-center pt-2">
                          +{cityListings.length - 3} more listings
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg z-10 max-w-[200px]">
          <h3 className="font-semibold mb-2">Cities</h3>
          <div className="space-y-1 text-sm max-h-[200px] overflow-y-auto">
            {Object.entries(listingsByCity)
              .sort((a, b) => b[1].length - a[1].length)
              .map(([city, cityListings]) => (
                <div key={city} className="flex items-center justify-between gap-2">
                  <span className="truncate">{city}</span>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {cityListings.length}
                  </Badge>
                </div>
              ))}
          </div>
        </div>

        {/* Selected Listing Card */}
        {selectedListing && (
          <div className="absolute bottom-4 right-4 left-4 md:left-auto md:w-96 bg-white rounded-lg shadow-xl z-10 p-4">
            <button
              onClick={() => setSelectedListing(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>

            <div className="flex gap-4">
              <img
                src={selectedListing.images[0]}
                alt={selectedListing.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {getStatusLabel(selectedListing.status)}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {getPropertyTypeLabel(selectedListing.type)}
                  </Badge>
                </div>
                <h3 className="font-semibold line-clamp-1">{selectedListing.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {selectedListing.address.district}, {selectedListing.address.city}
                </p>
                <p className="text-lg font-bold text-primary mt-1">
                  {formatPrice(selectedListing.price, selectedListing.currency)}
                </p>
              </div>
            </div>

            <Link to={`/listing/${selectedListing.id}`} className="block mt-4">
              <Button className="w-full" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
