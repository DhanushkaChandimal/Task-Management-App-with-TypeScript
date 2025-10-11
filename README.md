# 📝 Task Management App with TypeScript

A modern, feature-rich task management application built with React, TypeScript, and Bootstrap. This application provides a comprehensive solution for managing tasks with user authentication, responsive design, and persistent data storage.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Features

### Core Functionality
- ✅ **Create Tasks** - Add new tasks with title, description, priority, and due date
- ✏️ **Edit Tasks** - Modify existing tasks with inline editing
- 🗑️ **Delete Tasks** - Remove tasks with confirmation
- ✔️ **Toggle Completion** - Mark tasks as completed or pending
- 🔍 **Filter Tasks** - Filter by status (All, Pending, Completed) and priority (High, Medium, Low)
- 📊 **Progress Tracking** - Visual progress bar showing completion percentage

### User Experience
- 🔐 **Authentication** - Secure login/logout with Auth0 integration
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **Modern UI** - Clean, intuitive interface using React Bootstrap
- 🔔 **Toast Notifications** - Success/error messages for user actions
- 🚫 **404 Page** - Custom "Page Not Found" component with helpful navigation
- 💾 **Data Persistence** - Local storage integration for data retention

### Technical Features
- 🏗️ **Context API** - Global state management for tasks
- 🛣️ **React Router** - Client-side routing with protected routes
- 🎯 **TypeScript** - Full type safety and enhanced developer experience
- ⚡ **Vite** - Fast development and optimized builds
- 🧩 **Component Architecture** - Modular, reusable components

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth0Provider.tsx
│   ├── AuthenticationGuard.tsx
│   ├── Dashboard.tsx
│   ├── HomePage.tsx
│   ├── LoginButton.tsx
│   ├── LogoutButton.tsx
│   ├── NavBar.tsx
│   ├── NotFound.tsx
│   ├── PageLayout.tsx
│   └── TaskForm.tsx
├── context/
│   └── TaskContexts.tsx
├── assets/
│   └── react.svg
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 🏗️ Architecture

### Component Hierarchy
```
App
├── TaskProvider (Context)
├── Routes
    ├── HomePage
    ├── Dashboard (Protected)
    │   └── PageLayout
    │       ├── NavBar
    │       ├── Task List
    │       └── Toast Notifications
    ├── TaskForm (Protected)
    │   ├── Create Mode
    │   └── Edit Mode
    └── NotFound
```

### State Management
The application uses **React Context API** for global state management:

- **TaskContexts**: Manages all task-related state and operations
- **Local Storage**: Persists data between sessions
- **Toast State**: Handled at component level and passed via navigation state

### Data Flow
1. **Tasks** are stored in Context and localStorage
2. **Components** consume Context via useContext hook
3. **CRUD operations** update both Context and localStorage
4. **Navigation state** carries success/error messages between routes

## 🔧 Implementation Details

### Responsive Design
- **Mobile-first approach** using Bootstrap's grid system
- **Flexible layouts** with Container, Row, and Col components
- **Adaptive components** that stack on small screens
- **Touch-friendly** buttons and form controls

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1**
- **TypeScript 5.8.3**
- **React Bootstrap 2.10.10**
- **React Router DOM 7.9.3**

### Authentication
- **Auth0 React 2.5.0** - Authentication and authorization

### Development Tools
- **Vite 7.1.7** - Build tool and development server
- **ESLint 9.36.0** - Code linting and formatting
- **TypeScript ESLint 8.44.0** - TypeScript-specific linting rules

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Auth0 account for authentication setup

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/DhanushkaChandimal/Task-Management-App-with-TypeScript.git
   cd Task-Management-App-with-TypeScript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎯 Usage Guide

### Getting Started
1. **Authentication**: Click "Log In" on the homepage
2. **Dashboard**: View all your tasks with completion statistics
3. **Create Tasks**: Click "Add New Task" to create tasks
4. **Manage Tasks**: Edit, delete, or toggle completion status
5. **Filter Tasks**: Use dropdown to filter by status or priority

### Task Management
- **Priority Levels**: High (🔴), Medium (🟡), Low (🟢)
- **Due Dates**: Set deadlines for better organization
- **Descriptions**: Add detailed notes to tasks
- **Status Tracking**: Visual indicators for completed tasks

### Navigation
- **Protected Routes**: Dashboard and task forms require authentication
- **404 Handling**: Custom error page with helpful links

## 🔒 Security Features

- **Route Protection**: Authentication required for sensitive pages
- **Input Validation**: Form validation for data integrity
- **Secure Authentication**: OAuth 2.0 flow via Auth0

## 🎨 UI/UX Features

### Design Principles
- **Consistency**: Uniform color scheme and spacing
- **Accessibility**: Semantic HTML and ARIA labels
- **Feedback**: Visual feedback for all user actions
- **Responsiveness**: Optimized for all screen sizes

### Visual Elements
- **Color Coding**: Priority-based task coloring
- **Icons**: Intuitive emoji icons for actions
- **Progress Bars**: Visual completion tracking
- **Cards**: Clean, organized content layout

## 🧪 Testing & Development

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **ES6+ Features**: Full modern JavaScript support
- **CSS Grid/Flexbox**: Advanced layout support

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
