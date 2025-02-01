# FinTrack

Mini Expense Tracker with Intelligent Insights

## 🚀 Overview

FinTrack is a **MERN stack** Mini Expense Tracker application designed to help users manage their expenses efficiently while providing intelligent insights into their spending patterns. The app allows users to securely authenticate, add, update, delete, and analyze their expenses with dynamic visualizations.

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite) | ShadCN for UI components | Tailwind CSS for styling | Recharts for data visualization
- **Backend:** Node.js | Express.js | MongoDB (Mongoose ORM)
- **Authentication:** JWT-based authentication with HTTP-only cookies
- **Deployment:** Vercel (Frontend) | Render (Backend)

---

## 🌟 Features

### 1️⃣ Authentication

- Secure JWT authentication with **HTTP-only cookies**
- User registration with **First Name, Last Name, Email, Password**
- Login and Logout functionality
- Token expiry handling with **automatic session refresh**
- Middleware-based authentication to **protect all routes**

### 2️⃣ Expense Management (CRUD)

- Users can **add, update, delete, and view expenses**
- Each expense includes:
  - **Amount** (numeric, required)
  - **Category** (Food, Travel, Bills, etc.)
  - **Date** (required)
  - **Description** (optional)
- Expenses are **paginated** and **filterable** by **date range and category**

### 3️⃣ Spending Insights & Analytics

- **Total spending per category**
- **Percentage distribution** of expenses across categories
- **Graphical representation using Recharts:**
- **Category-wise expense breakdown (Bar Chart)**
- **Most expensive category**
- **Total expenses over time (Line Chart)**
- **Expense growth rate over 7, 30, 90 days**

### 4️⃣ Dynamic & Responsive Dashboard

- Displays a **list of all expenses**
- Each expense **can be edited or deleted**
- **Popup UI** for each table row with **Edit and Delete buttons** for quick actions
- **Dark & Light mode support** 🌙✨

---

## 🎯 Approach & Implementation

### 🔹 Frontend (React.js + ShadCN + TailwindCSS)

- **Component-based architecture** with reusable UI elements
- **ShadCN for sleek UI elements** (buttons, modals, tables, form inputs)
- **Recharts for interactive charts & insights**
- **State management with React Hooks**
- **Responsive design** with Tailwind CSS

### 🔹 Backend (Node.js + Express.js + MongoDB)

- **RESTful API with Express.js**
- **Mongoose ORM** for MongoDB schema & queries
- **Authentication middleware (authMiddleware.js)** to protect routes
- **JWT authentication using HTTP-only cookies**
- **Optimized query performance for expense analytics**

### 🔹 Database (MongoDB + Mongoose)

- **User Schema:** Stores user details & hashed passwords
- **Expense Schema:** Stores user expenses linked via `userId`
- **Indexes & query optimizations** for faster data retrieval

---

## 🔒 Security & Authentication

- **Secure token storage** in HTTP-only cookies
- **Middleware-based access control**
- **Bcrypt.js for password hashing**
- **Environment variables for sensitive credentials**

---

## 🚀 Deployment

- **Frontend:** Deployed on **Vercel** for fast & scalable hosting
- **Backend:** Deployed on **Render** with an always-on server
- **MongoDB:** Hosted using **MongoDB Atlas**

---

## 📜 API Endpoints

### 🔹 Auth Routes

- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Authenticate user and set JWT in cookies
- `GET /api/auth/user` → Get authenticated user details
- `POST /api/auth/logout` → Logout and clear JWT

### 🔹 Expense Routes

- `POST /api/expenses` → Add new expense
- `GET /api/expenses` → Fetch all expenses (paginated & filterable)
- `GET /api/expenses/expense/:id` → Fetch a single expense (using the expense id)
- `PUT /api/expenses/:id` → Update an existing expense
- `DELETE /api/expenses/:id` → Delete an expense
- `GET /api/expenses/insights` → Fetch analytics (category-wise spending, total expense, growth rate)

---

## ✅ Evaluation Criteria

### 🔹 Code Quality

- Modular, clean, and well-structured **React components & Express routes**
- **Proper state management** & efficient API handling
- **Reusable UI components** for scalability

### 🔹 Problem-Solving & Performance Optimization

- **Efficient query handling** for spending insights
- **Pagination & filtering for expenses** to optimize data handling
- **Optimized authentication & authorization logic**

### 🔹 Frontend & UI/UX

- **Interactive, smooth, and modern UI**
- **Responsive design across devices**
- **Smooth user experience with modal popups & transitions**

### 🔹 Backend & API Design

- **RESTful API design with structured endpoints**
- **Middleware-based security** for protected routes
- **Efficient database schema & indexing for performance**

---

## 📌 Installation & Setup

### 🔹 Clone Repository

```sh
git clone https://github.com/yourusername/fintrack.git
cd fintrack
```

### 🔹 Backend Setup

```sh
cd backend
npm install
npm start
```

### 🔹 Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

## 💡 Future Improvements I will be looking into

✅ Add **income tracking** to balance expenses 💰
✅ Implement **AI-based insights** for smarter expense categorization 🧠
✅ Allow **exporting data to CSV or Excel** 📊
✅ Enable **multi-user support** for family/group expenses 🏠

---

## 📞 Contact

- **GitHub:** [github.com/Romildoescoding](https://github.com/Romildoescoding)
- **LinkedIn:** [linkedin.com/in/romildoescoding](https://www.linkedin.com/in/romildoescoding)
- **Email:** romilrajrana1@gmail.com

🚀 **Hope you like my project! Looking forward to the opportunity!** 😃
