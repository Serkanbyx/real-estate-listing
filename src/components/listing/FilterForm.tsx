import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X, RotateCcw } from 'lucide-react';
import { useListingStore, getUniqueCities } from '@/store/listingStore';
import { filterSchema, type FilterFormData } from '@/lib/validations';
import { propertyTypes, listingStatuses } from '@/data/mockListings';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

interface FilterFormProps {
  onClose?: () => void;
}

// Special value for "All" option since Radix Select doesn't allow empty string
const ALL_VALUE = '__all__';

/**
 * Filter form component with React Hook Form + Zod validation
 */
export function FilterForm({ onClose }: FilterFormProps) {
  const { listings, filters, setFilters, resetFilters } = useListingStore();
  const cities = getUniqueCities(listings);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: filters.search,
      city: filters.city || ALL_VALUE,
      type: filters.type || ALL_VALUE,
      status: filters.status || ALL_VALUE,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      roomsMin: filters.roomsMin,
      roomsMax: filters.roomsMax,
    },
  });

  // Convert special ALL_VALUE to empty string for filters
  const normalizeValue = (value: string | undefined): string => {
    return value === ALL_VALUE ? '' : (value || '');
  };

  const onSubmit = (data: FilterFormData) => {
    setFilters({
      search: data.search || '',
      city: normalizeValue(data.city),
      type: normalizeValue(data.type) as FilterFormData['type'],
      status: normalizeValue(data.status) as FilterFormData['status'],
      priceMin: data.priceMin ?? null,
      priceMax: data.priceMax ?? null,
      roomsMin: data.roomsMin ?? null,
      roomsMax: data.roomsMax ?? null,
    });
    onClose?.();
  };

  const handleReset = () => {
    reset({
      search: '',
      city: ALL_VALUE,
      type: ALL_VALUE,
      status: ALL_VALUE,
      priceMin: null,
      priceMax: null,
      roomsMin: null,
      roomsMax: null,
    });
    resetFilters();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search listings..."
            className="pl-9"
            {...register('search')}
          />
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ALL_VALUE}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>All</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <Label htmlFor="type">Property Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ALL_VALUE}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>All</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Listing Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ALL_VALUE}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>All</SelectItem>
                {listingStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Min"
              {...register('priceMin', { valueAsNumber: true })}
            />
            {errors.priceMin && (
              <p className="text-xs text-destructive mt-1">{errors.priceMin.message}</p>
            )}
          </div>
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Max"
              {...register('priceMax', { valueAsNumber: true })}
            />
            {errors.priceMax && (
              <p className="text-xs text-destructive mt-1">{errors.priceMax.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Rooms Range */}
      <div className="space-y-2">
        <Label>Number of Rooms</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            className="flex-1"
            {...register('roomsMin', { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="Max"
            className="flex-1"
            {...register('roomsMax', { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          <Search className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        {onClose && (
          <Button type="button" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
