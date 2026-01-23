# 🏠 UK Estates - Property Listing App

A modern and responsive UK property listing application built with React, TypeScript, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)

## ✨ Features

- **Property Listings**: Apartments, villas, houses, land, offices, and shops
- **Advanced Filtering**: City, price range, rooms, property type filters
- **Responsive Design**: Mobile-first approach with perfect display on all devices
- **Detail Page**: Property details, photo gallery, agent information
- **Interactive Map**: Leaflet map with city markers and property locations
- **Contact Form**: Secure form submission with validation

## 🛠️ Technologies

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 + Vite |
| **Language** | TypeScript |
| **State Management** | Zustand |
| **Form Handling** | React Hook Form |
| **Validation** | Zod |
| **Routing** | React Router v6 |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui (Radix UI) |
| **Icons** | Lucide React |
| **Map** | Leaflet + React Leaflet |
| **API** | JSONBin.io / REST API |

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── listing/         # ListingCard, FilterForm, ContactDialog
│   └── ui/              # Button, Input, Dialog, Drawer, etc.
├── data/
│   └── mockListings.ts  # Sample listing data
├── hooks/
│   └── useListings.ts   # Custom hooks for API calls
├── lib/
│   ├── utils.ts         # Utility functions
│   └── validations.ts   # Zod schemas
├── pages/
│   ├── ListingsPage.tsx     # Main listing page
│   ├── ListingDetailPage.tsx # Property detail page
│   └── MapPage.tsx          # Interactive map view
├── services/
│   └── api.ts           # API service layer
├── store/
│   └── listingStore.ts  # Zustand store
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Router configuration
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/username/real-estate-listing.git
cd real-estate-listing
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint code check |

## 🌐 Deployment

### Netlify

1. Push to GitHub
2. Create new site in Netlify
3. Connect GitHub repository
4. Build settings will be auto-detected:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Manual Deploy

```bash
npm run build
# Upload dist folder to your hosting service
```

## 📱 Pages

### Home Page (`/`)
- Property listings in grid view
- Filter panel on the left (desktop)
- Filter drawer on mobile

### Property Detail (`/listing/:id`)
- Photo gallery
- Detailed features
- Agent information
- Contact form

### Map View (`/map`)
- Interactive Leaflet map
- City markers with listing counts
- Quick preview cards
- Click to view details

## 🎨 Customization

### Color Theme

Edit CSS variables in `src/index.css` to change the color theme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... other variables */
}
```

### Adding New Listings

Add new listings to `src/data/mockListings.ts`. Each listing must conform to the `Listing` type.

## 🔌 API Integration

The project is configured to fetch data from an external API.

### API Configuration

Edit `src/services/api.ts` to configure API settings:

```typescript
const API_CONFIG = {
  USE_MOCK_DATA: true,  // true: mock data, false: real API
  BASE_URL: 'https://api.jsonbin.io/v3/b',
  BIN_ID: 'YOUR_BIN_ID',
  API_KEY: '',
};
```

### Using JSONBin.io

1. Create an account at [JSONBin.io](https://jsonbin.io)
2. Copy the content from `api-data.json`
3. Create a new bin and paste the JSON data
4. Set the Bin ID in `API_CONFIG.BIN_ID`

## 🔒 Form Validation

### Filter Form
- Price min/max validation
- Room count range validation

### Contact Form
- Name: Minimum 2 characters
- Email: Valid format required
- Phone: 10-15 characters
- Message: 10-500 characters

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

⭐ Star this project if you find it helpful!
