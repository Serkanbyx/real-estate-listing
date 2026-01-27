# 🏠 UK Estates - Property Listing App

A modern and responsive UK property listing application built with React, TypeScript, and Tailwind CSS. Browse thousands of properties across the United Kingdom with advanced filtering, interactive maps, and a beautiful user interface.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)

## Features

- **Property Listings**: Browse apartments, villas, houses, land, offices, and shops with detailed information
- **Advanced Filtering**: Filter by city, price range, number of rooms, and property type
- **Responsive Design**: Mobile-first approach ensuring perfect display on all devices
- **Property Detail Page**: View property details, photo gallery, features, and agent information
- **Interactive Map View**: Leaflet-powered map with city markers and property locations
- **Contact Form**: Secure contact form with Zod validation for reaching property agents
- **State Management**: Efficient state handling with Zustand for seamless user experience
- **Modern UI Components**: Beautiful, accessible components built with shadcn/ui and Radix UI

## Live Demo

[🌐 View Live Demo](https://your-demo-url.netlify.app)

## Technologies

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with full TypeScript support
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Zustand**: Lightweight state management solution
- **React Hook Form**: Performant form handling with easy validation
- **Zod**: TypeScript-first schema validation
- **React Router v6**: Declarative routing for React applications
- **shadcn/ui**: High-quality, accessible UI components built on Radix UI
- **Lucide React**: Beautiful, consistent icon set
- **Leaflet + React Leaflet**: Interactive maps with markers and popups
- **JSONBin.io**: REST API for data storage and retrieval

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/Serkanbyx/real-estate-listing.git
cd real-estate-listing
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in your browser**

```
http://localhost:5173
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## Usage

1. **Browse Properties**: Visit the home page to see all available property listings in a grid layout
2. **Filter Listings**: Use the filter panel (sidebar on desktop, drawer on mobile) to narrow down results by city, price range, rooms, and property type
3. **View Details**: Click on any property card to see detailed information, photos, and features
4. **Explore Map**: Navigate to the Map View to see properties on an interactive map with city markers
5. **Contact Agent**: Use the contact form on the property detail page to reach out to the listing agent

## How It Works

### Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout components
│   ├── listing/         # ListingCard, FilterForm, ContactDialog
│   └── ui/              # Reusable UI components (Button, Input, Dialog, etc.)
├── data/
│   └── mockListings.ts  # Sample listing data for development
├── hooks/
│   └── useListings.ts   # Custom hooks for API calls and data fetching
├── lib/
│   ├── utils.ts         # Utility functions (cn, formatPrice, etc.)
│   └── validations.ts   # Zod validation schemas
├── pages/
│   ├── ListingsPage.tsx     # Main listing page with filters
│   ├── ListingDetailPage.tsx # Property detail page
│   └── MapPage.tsx          # Interactive map view
├── services/
│   └── api.ts           # API service layer for data fetching
├── store/
│   └── listingStore.ts  # Zustand store for global state
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Router configuration
├── main.tsx             # Application entry point
└── index.css            # Global styles and CSS variables
```

### State Management

The application uses Zustand for state management, providing a simple and efficient way to handle global state:

```typescript
// Example: Zustand store structure
const useListingStore = create((set) => ({
  listings: [],
  filters: {},
  setListings: (listings) => set({ listings }),
  setFilters: (filters) => set({ filters }),
}));
```

### Form Validation

All forms use Zod for type-safe validation:

```typescript
// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10).max(15),
  message: z.string().min(10).max(500),
});
```

## Customization

### Change Color Theme

Edit CSS variables in `src/index.css` to customize the color theme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other variables */
}
```

### Add New Property Listings

Add new listings to `src/data/mockListings.ts`. Each listing must conform to the `Listing` type:

```typescript
const newListing: Listing = {
  id: 'unique-id',
  title: 'Beautiful 3 Bedroom House',
  price: 450000,
  city: 'London',
  type: 'house',
  rooms: 3,
  bathrooms: 2,
  area: 1500,
  images: ['image1.jpg', 'image2.jpg'],
  // ... other required fields
};
```

### Configure API Settings

Edit `src/services/api.ts` to switch between mock data and real API:

```typescript
const API_CONFIG = {
  USE_MOCK_DATA: true,  // Set to false for real API
  BASE_URL: 'https://api.jsonbin.io/v3/b',
  BIN_ID: 'YOUR_BIN_ID',
  API_KEY: 'YOUR_API_KEY',
};
```

## Features in Detail

### Completed Features

✅ Property listing grid with responsive design  
✅ Advanced filtering (city, price, rooms, type)  
✅ Property detail page with photo gallery  
✅ Interactive map view with Leaflet  
✅ Contact form with validation  
✅ Mobile-responsive filter drawer  
✅ Loading skeletons for better UX  
✅ Zustand state management  
✅ TypeScript type safety  

### Future Features

- [ ] User authentication and favorites
- [ ] Property comparison feature
- [ ] Advanced search with more filters
- [ ] Property image carousel
- [ ] Agent dashboard
- [ ] Email notifications

## Deployment

### Netlify

1. Push your code to GitHub
2. Create a new site in Netlify
3. Connect your GitHub repository
4. Build settings will be auto-detected:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Manual Deploy

```bash
npm run build
# Upload the dist folder to your hosting service
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. **Commit** your changes with semantic commit messages

```bash
git commit -m 'feat: Add amazing feature'
```

4. **Push** to your branch

```bash
git push origin feature/amazing-feature
```

5. **Open** a Pull Request

### Commit Message Format

| Prefix | Description |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code style changes (formatting, etc.) |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance tasks |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

**Serkanby**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: serkanbyx1@gmail.com

## Acknowledgments

- [React](https://react.dev/) - The library for web and native user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Leaflet](https://leafletjs.com/) - Open-source JavaScript library for maps
- [Zustand](https://zustand-demo.pmnd.rs/) - Bear necessities for state management
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components

## Contact

- **Issues**: [GitHub Issues](https://github.com/Serkanbyx/real-estate-listing/issues)
- **Email**: serkanbyx1@gmail.com
- **Website**: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
