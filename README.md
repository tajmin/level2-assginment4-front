# 📚 Library Management System

A full-stack library management web application built with **React**, **Redux Toolkit**, **RTK Query**, **TypeScript**, and **Node.js**. Users can manage books and borrowing records efficiently via a clean and responsive UI.

---

## 🔧 Tech Stack

### Frontend

- React 19 with Vite
- TypeScript
- Redux Toolkit & RTK Query
- React Hook Form + Yup
- Tailwind CSS
- ShadCN UI + Radix UI
- Sonner (toast notifications)
- React Router v7

### Backend

- Node.js & Express
- TypeScript
- Mongoose & MongoDB
- Zod for validation
- Custom error handling

---

## 🚀 Features

### 🗂 Books

- Create, Read, Update, Delete (CRUD) operations of book
- Validation for book fields (e.g., ISBN, copies)
- Book availability based on borrow records

### 📦 Borrow

- Borrow books with due date
- Validation: cannot borrow more than available copies
- Borrow summary with aggregation (total borrowed per book)

### 🎨 UI & UX

- Fully responsive layout
- Modal-based forms (Edit, Delete, Borrow)
- Toast notifications for success/error
- Loading and error states

---

## 🛠 Installation

```bash
# Clone repo
git clone git@github.com:tajmin/level2-assginment4-front.git
cd level2-assginment4-front

# Install dependencies
cd frontend
npm install

```

## Live

[Hosted on Vercel](https://level2-assginment4-front.vercel.app/)
