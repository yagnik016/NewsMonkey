# NewsMonkey - Modern News Platform

A comprehensive news platform built with Next.js frontend and NestJS backend, featuring live blogging, real-time scores, and scalable architecture.

## 🚀 Features

- **Modern News Platform**: Complete news management system
- **Live Blogging**: Real-time live coverage and updates
- **Live Scores**: Sports scores and statistics
- **Breaking News**: Real-time breaking news alerts
- **Category Management**: Organized news by categories
- **Search Functionality**: Advanced search with filters
- **Responsive Design**: Mobile-first responsive UI
- **SEO Optimized**: Built-in SEO features
- **Scalable Architecture**: Designed for future growth
- **Monetization Ready**: Built-in monetization features

## 🛠 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management
- **Responsive Design**: Mobile-first approach

### Backend
- **NestJS**: Progressive Node.js framework
- **MongoDB**: NoSQL database with Mongoose
- **TypeScript**: Type-safe backend development
- **Swagger/OpenAPI**: API documentation
- **JWT Authentication**: Secure authentication system
- **Validation**: Request validation with class-validator

### Database
- **MongoDB**: Primary database
- **Mongoose**: MongoDB object modeling
- **Indexes**: Optimized for performance

## 📁 Project Structure

```
newsmonkey/
├── fe/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                 # App router pages
│   │   ├── components/          # Reusable components
│   │   ├── lib/                 # Utility libraries
│   │   ├── types/               # TypeScript types
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/               # Utility functions
│   └── public/                  # Static assets
├── be/                          # Backend (NestJS)
│   ├── src/
│   │   ├── modules/             # Feature modules
│   │   │   ├── news/            # News management
│   │   │   ├── auth/            # Authentication
│   │   │   ├── users/           # User management
│   │   │   └── live-scores/     # Live scores
│   │   ├── common/              # Shared utilities
│   │   └── config/              # Configuration
│   └── .env                     # Environment variables
└── README.md                    # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newsmonkey
   ```

2. **Backend Setup**
   ```bash
   cd be
   npm install
   cp .env.example .env
   # Update .env with your configuration
   npm run start:dev
   ```

3. **Frontend Setup**
   ```bash
   cd fe
   npm install
   npm run dev
   ```

4. **Database Setup**
   - Install MongoDB
   - Create database: `newsmonkey`
   - Update connection string in `.env`

### Environment Variables

#### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/newsmonkey

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# API
API_PREFIX=api/v1
CORS_ORIGIN=http://localhost:3000

# External APIs
NEWS_API_KEY=your-news-api-key
NEWS_API_BASE_URL=https://newsapi.org/v2
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:3001/api/docs`
- **API Base URL**: `http://localhost:3001/api/v1`

### Main Endpoints

#### News
- `GET /news` - Get all news with pagination
- `GET /news/breaking` - Get breaking news
- `GET /news/featured` - Get featured news
- `GET /news/live-blogs` - Get live blogs
- `GET /news/search` - Search news
- `GET /news/:id` - Get specific news article
- `POST /news` - Create news article
- `PUT /news/:id` - Update news article
- `DELETE /news/:id` - Delete news article

#### Categories
- `GET /news/categories` - Get all categories
- `POST /news/categories` - Create category
- `GET /news/categories/:id` - Get specific category
- `PUT /news/categories/:id` - Update category
- `DELETE /news/categories/:id` - Delete category

## 🎨 Frontend Features

### Components
- **NewsCard**: Reusable news article card
- **BreakingNews**: Animated breaking news banner
- **CategoryNav**: Category navigation
- **FeaturedNews**: Featured articles section

### Pages
- **Homepage**: Main landing page with featured content
- **News Listing**: Paginated news articles
- **Article Detail**: Individual news article view
- **Category Pages**: News filtered by category
- **Live Blogs**: Real-time live coverage
- **Live Scores**: Sports scores and statistics

## 🔧 Development

### Backend Commands
```bash
cd be
npm run start:dev    # Development mode
npm run build        # Build for production
npm run start:prod   # Production mode
npm run test         # Run tests
```

### Frontend Commands
```bash
cd fe
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Production server
npm run lint         # Run linter
```

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Start production server: `npm run start:prod`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration for live updates
- **User Authentication**: JWT-based authentication system
- **Admin Dashboard**: Content management interface
- **Analytics**: User behavior tracking
- **Monetization**: Ad integration and subscription system
- **Mobile App**: React Native mobile application
- **AI Integration**: Automated content generation
- **Social Features**: Comments, likes, and sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**NewsMonkey** - Your trusted source for breaking news, live updates, and comprehensive coverage. 