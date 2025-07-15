# 🐦 Twitter Clone

A full-stack Twitter clone built with modern web technologies, featuring real-time social media functionality, user authentication, and responsive design.

![Twitter Clone](https://img.shields.io/badge/Twitter-Clone-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing with bcrypt
- Cookie-based session management

### 👤 User Management
- User profiles with bio, links, and images
- Profile and cover image upload via Cloudinary
- User suggestions system
- Follow/Unfollow functionality
- User search and discovery

### 📝 Post Features
- Create posts with text and images
- Image upload and optimization
- Like and unlike posts
- Comment system
- Delete posts (own posts only)
- View user-specific posts
- Timeline feed (For You & Following)

### 🔔 Notifications
- Follow notifications
- Like notifications
- Comment notifications
- Real-time notification system

### 🎨 UI/UX
- Responsive design for all screen sizes
- Dark/Light theme support
- Modern Twitter-like interface
- Loading states and skeletons
- Toast notifications
- Smooth animations and transitions

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│    Frontend     │◄───┤    Backend      │◄───┤    Database     │
│   (React SPA)   │    │  (Express API)  │    │   (MongoDB)     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐              ┌───▼───┐              ┌────▼────┐
    │ Vite    │              │ JWT   │              │ Mongoose│
    │ Build   │              │ Auth  │              │ ODM     │
    │ Tool    │              │ System│              │ Models  │
    └─────────┘              └───────┘              └─────────┘
```

### Database Schema
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      User       │    │      Post       │    │  Notification   │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ _id: ObjectId   │    │ _id: ObjectId   │    │ _id: ObjectId   │
│ username: String│    │ user: ObjectId  │    │ from: ObjectId  │
│ fullname: String│    │ text: String    │    │ to: ObjectId    │
│ email: String   │    │ image: String   │    │ type: String    │
│ password: String│    │ likes: [ObjectId│    │ read: Boolean   │
│ profileImg: Str │    │ comments: [...]  │    │ createdAt: Date │
│ coverImg: String│    │ createdAt: Date │    └─────────────────┘
│ bio: String     │    │ updatedAt: Date │
│ link: String    │    └─────────────────┘
│ followers: [... │
│ following: [... │
│ likedPosts: [..│
│ createdAt: Date │
└─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 19.0.0** - UI Framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JSON Web Tokens (JWT)** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and optimization
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
twiter-clone/
├── 📁 backend/
│   ├── server.js                 # Main server file
│   ├── 📁 controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── user.controller.js    # User management
│   │   ├── post.controller.js    # Post operations
│   │   └── notification.controller.js
│   ├── 📁 models/
│   │   ├── user.model.js         # User schema
│   │   ├── post.model.js         # Post schema
│   │   └── notification.model.js
│   ├── 📁 routes/
│   │   ├── auth.routes.js        # Auth endpoints
│   │   ├── user.routes.js        # User endpoints
│   │   ├── post.routes.js        # Post endpoints
│   │   └── notification.routes.js
│   ├── 📁 middleware/
│   │   └── protectRoute.js       # Auth middleware
│   ├── 📁 libs/utils/
│   │   └── generateToken.js      # JWT utilities
│   └── 📁 db/
│       └── connectMongoDb.js     # Database connection
├── 📁 frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── 📁 src/
│   │   ├── App.jsx               # Main App component
│   │   ├── main.jsx              # App entry point
│   │   ├── index.css             # Global styles
│   │   ├── 📁 components/
│   │   │   ├── 📁 common/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── RightPanel.jsx
│   │   │   │   ├── Post.jsx
│   │   │   │   ├── Posts.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── 📁 skeletons/
│   │   │   │   ├── PostSkeleton.jsx
│   │   │   │   ├── ProfileHeaderSkeleton.jsx
│   │   │   │   └── RightPanelSkeleton.jsx
│   │   │   └── 📁 svgs/
│   │   │       └── X.jsx
│   │   ├── 📁 pages/
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📁 login/
│   │   │   │   │   └── LoginPage.jsx
│   │   │   │   └── 📁 signup/
│   │   │   │       └── SignUpPage.jsx
│   │   │   ├── 📁 home/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── CreatePost.jsx
│   │   │   │   ├── BookmarkButton.jsx
│   │   │   │   └── RepostButton.jsx
│   │   │   ├── 📁 profile/
│   │   │   │   ├── ProfilePage.jsx
│   │   │   │   └── EditProfileModel.jsx
│   │   │   └── 📁 notification/
│   │   │       └── NotificationPage.jsx
│   │   ├── 📁 hooks/
│   │   │   ├── useFollow.jsx
│   │   │   └── useUpdateProfile.jsx
│   │   └── 📁 utils/
│   │       └── 📁 date/
│   │           └── index.js
│   └── 📁 public/
│       ├── avatar-placeholder.png
│       ├── cover.png
│       └── 📁 avatars/
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MaximumCell/Twitter-clone.git
cd Twitter-clone
```

2. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/twitter-clone
JWT_SECRET=your-secret-key-here
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_CLOUD_API_KEY=your-api-key
CLOUDINARY_CLOUD_API_SECRET=your-api-secret
```

4. **Start the development servers**

For development (run both frontend and backend):
```bash
# Terminal 1: Start backend server
npm run dev

# Terminal 2: Start frontend server
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Production Build

1. **Build the application**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile/:username` - Get user profile
- `GET /api/users/suggested` - Get suggested users
- `POST /api/users/follow/:id` - Follow/unfollow user
- `POST /api/users/update` - Update user profile

### Posts
- `GET /api/posts/all` - Get all posts
- `GET /api/posts/following` - Get posts from following users
- `GET /api/posts/user/:username` - Get user's posts
- `GET /api/posts/likes/:id` - Get liked posts
- `POST /api/posts/create` - Create new post
- `POST /api/posts/like/:id` - Like/unlike post
- `POST /api/posts/comment/:id` - Comment on post
- `DELETE /api/posts/:id` - Delete post

### Notifications
- `GET /api/notifications` - Get user notifications
- `DELETE /api/notifications` - Delete all notifications

## 🎨 UI Components

### Component Architecture
```
App.jsx
├── Sidebar.jsx
├── Routes
│   ├── HomePage.jsx
│   │   ├── CreatePost.jsx
│   │   └── Posts.jsx
│   │       └── Post.jsx
│   ├── ProfilePage.jsx
│   │   └── EditProfileModel.jsx
│   ├── NotificationPage.jsx
│   ├── LoginPage.jsx
│   └── SignUpPage.jsx
└── RightPanel.jsx
```

### Key Features by Component
- **Sidebar**: Navigation, user info, quick actions
- **RightPanel**: User suggestions, trending topics
- **HomePage**: Feed switching, post creation
- **ProfilePage**: User details, posts, edit functionality
- **Post**: Interactive post with like, comment, delete
- **CreatePost**: Rich text editor with image upload

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing
- **Environment Variables**: Sensitive data protection
- **Protected Routes**: Authentication middleware
- **XSS Protection**: Input sanitization

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎯 Future Enhancements

- [ ] Real-time messaging system
- [ ] Video upload support
- [ ] Advanced search functionality
- [ ] Tweet scheduling
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Tweet analytics
- [ ] Hashtag system
- [ ] Trending topics
- [ ] Moments/Stories feature

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MaximumCell**
- GitHub: [@MaximumCell](https://github.com/MaximumCell)

## 🙏 Acknowledgments

- Twitter for UI/UX inspiration
- React community for excellent documentation
- MongoDB for robust database solutions
- Cloudinary for image management
- All contributors and supporters

---

<div align="center">
  <p>Made with ❤️ by MaximumCell</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
