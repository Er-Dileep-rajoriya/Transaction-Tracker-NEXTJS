# 💰 Personal Finance Visualizer

A simple and responsive web application for tracking personal finances, built using **Next.js**, **React**, **shadcn/ui**, **Recharts**, and **MongoDB**. This app allows users to track their income and expenses, visualize their spending trends, and set category-wise budgets.

> 🚫 Note: This project does **not** include any authentication functionality, as per the guidelines.

---

## 🚀 Live Demo

🔗 [Live Deployment URL](https://transaction-tracker-nextjs-emu33yg1v-dileep-rajoriyas-projects.vercel.app/)  
📂 [GitHub Repository](https://github.com/Er-Dileep-rajoriya/Transaction-Tracker-NEXTJS)

---

## 🛠️ Tech Stack

- **Framework**: Next.js, React
- **UI Library**: shadcn/ui
- **Charts**: Recharts
- **Database**: MongoDB(Mongoose)
- **Language**: TypeScript

---

## 📌 Features

### ✅ Stage 1: Basic Transaction Tracking

- Add, edit, and delete transactions (amount, date, description)
- Transaction list view
- Monthly expenses bar chart using Recharts
- Basic form validation and error states

### ✅ Stage 2: Categories

- All Stage 1 features
- Predefined transaction categories (e.g., Food, Rent, Utilities)
- Category-wise pie chart
- Dashboard with summary cards:
  - Total expenses
  - Category breakdown
  - Most recent transactions

### ✅ Stage 3: Budgeting

- All Stage 2 features
- Set monthly budgets for each category
- Budget vs actual spending comparison chart
- Simple spending insights and recommendations

---

## 📷 Screenshots

> Add screenshots or a short GIF here showing the dashboard, charts, and transaction form.

---

## 🧪 Installation & Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/personal-finance-visualizer.git
   cd personal-finance-visualizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env.local` file:
   ```
   MONGODB_URI=your-mongodb-connection-string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ Requirements Met

- [x] Responsive Design
- [x] Form Validation and Error States
- [x] MongoDB Integration
- [x] Recharts for Data Visualization
- [x] No Authentication (as required)

---

## 📦 Deployment

Deployed using [Vercel](https://vercel.com/) for seamless Next.js support.  
Make sure to set the `MONGODB_URI` environment variable in your Vercel dashboard.

---

## 📄 License

MIT License

---

## 🙌 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [MongoDB](https://www.mongodb.com/)
- [Next.js](https://nextjs.org/)

---

Feel free to reach out for improvements, contributions, or feedback!
