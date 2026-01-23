import { SlidersHorizontal } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Button,
} from '@/components/ui';
import { FilterForm } from './FilterForm';
import { useState } from 'react';

/**
 * Mobile filter drawer component
 */
export function MobileFilterDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DrawerTrigger>
      <DrawerContent side="left" className="p-0">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto flex-1">
          <FilterForm onClose={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
