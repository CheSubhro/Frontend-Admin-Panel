
# ✍️ AdminPanel - Professional Admin Panel Frontend

A modern, highly responsive, and feature-rich Admin Dashboard built with **React**, **Vite**, and **Chakra UI v3**. This panel is designed for seamless platform management, featuring a real-time system health monitor, user control matrix, and full dark mode integration.

---

## 🚀 Features

- **🌓 Seamless Theme Switching**: Implementation of reload-free, state-driven Light and Dark mode using Chakra UI v3 semantic tokens.
- **📊 Interactive Dashboard**: A holistic overview showing total sales, active products, pending orders, and beautiful analytics graphs.
- **🖥️ Server Status & System Health**: Real-time hardware monitoring widget displaying CPU load, RAM usage, API response times, and system uptime.
- **👥 Advanced User Management**: Complete tabular view to monitor customer behavior, lifetime values, system roles (Admin, Moderator, Vendor), and account statuses (Active, Suspended).
- **⚙️ Configurable Settings**: Dedicated settings hub consisting of profile adjustments, application maintenance mode triggers, and email alert switches.
- **⚡ Performance First**: Powered by Vite for blazing-fast Hot Module Replacement (HMR) and optimized build bundles.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (v18+)
- **Build Tool:** Vite
- **UI & Styling Component Library:** Chakra UI v3 & React Icons
- **State Management:** Redux Toolkit (RTK)
- **Routing:** React Router DOM

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── common/         # Reusable UI components (Cards, Buttons)
│   └── layout/         # Layout essentials (Navbar, Sidebar)
├── pages/              # Page views (Dashboard, User Management, Settings)
├── store/              # Redux Toolkit store & slices (Auth, System)
├── theme/              # Custom design tokens, typography, and semantic colors
├── App.jsx             # Application core routing and layout wrapper
└── main.jsx            # Application entry point & provider tree


npm install
npm run dev
npm run build

<img width="1366" height="641" alt="screencapture-localhost-5173-admin-users-2026-06-08-10_40_45" src="https://github.com/user-attachments/assets/e60ca032-cd23-4171-8a7f-9f1b4e2f48ba" />
<img width="1366" height="728" alt="screencapture-localhost-5173-admin-settings-2026-06-08-10_59_21" src="https://github.com/user-attachments/assets/08b9ad27-eb40-4913-bf12-92ae0ef89c54" />
<img width="1366" height="682" alt="screencapture-localhost-5173-login-2026-06-08-10_34_28" src="https://github.com/user-attachments/assets/316ce262-aba6-4da0-ae85-1acee68f549e" />
<img width="1366" height="712" alt="screencapture-localhost-5173-signup-2026-06-08-10_35_15" src="https://github.com/user-attachments/assets/a98f896e-395e-43ac-a635-bb93c9025373" />
<img width="1366" height="682" alt="screencapture-localhost-5173-forgot-password-2026-06-08-10_36_02" src="https://github.com/user-attachments/assets/2704a6c7-5ade-429b-8c74-f07cadcb805c" />
<img width="1366" height="819" alt="screencapture-localhost-5173-admin-2026-06-08-10_36_56" src="https://github.com/user-attachments/assets/0c6fd1e7-d28f-4586-b957-db82cad449ec" />
<img width="1366" height="808" alt="screencapture-localhost-5173-admin-categories-2026-06-08-10_37_21" src="https://github.com/user-attachments/assets/9395d907-0769-49e3-83ce-16e72e319bd1" />
<img width="1366" height="1280" alt="screencapture-localhost-5173-admin-products-2026-06-08-10_37_34" src="https://github.com/user-attachments/assets/e7731b30-8da5-42cb-8285-756e5b599977" />
<img width="1366" height="751" alt="screencapture-localhost-5173-admin-orders-2026-06-08-10_37_53" src="https://github.com/user-attachments/assets/fe491b88-17fb-4539-ba05-def08cba5880" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-orders-2026-06-08-10_38_11" src="https://github.com/user-attachments/assets/6c8672f5-c48d-4ec2-9a4d-9e0876d627b1" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-products-2026-06-08-10_38_30" src="https://github.com/user-attachments/assets/fd567d50-64d9-41c2-9faa-dc9a1b0c2491" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-categories-2026-06-08-10_39_04" src="https://github.com/user-attachments/assets/64f3de1c-fbd9-4bfc-8b74-7b267cf32ea1" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-categories-2026-06-08-10_39_19" src="https://github.com/user-attachments/assets/fcecd353-2d98-4530-a230-cbbb68de826e" />
<img width="1366" height="979" alt="screencapture-localhost-5173-admin-coupons-2026-06-08-10_39_46" src="https://github.com/user-attachments/assets/501940b2-10f5-43c0-81e9-1fd78e4f93ab" />
<img width="1366" height="854" alt="screencapture-localhost-5173-admin-coupons-2026-06-08-10_40_07" src="https://github.com/user-attachments/assets/a05482be-e713-424d-9c92-b712ab366a01" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-coupons-2026-06-08-10_40_22" src="https://github.com/user-attachments/assets/73080e62-44af-493d-a453-62a0164d3563" />
<img width="1366" height="811" alt="screencapture-localhost-5173-admin-users-2026-06-08-10_40_34" src="https://github.com/user-attachments/assets/c93bbfe6-c580-45a6-a02f-eae5af4f7ff6" />

Developed with 💙 by CheSubhro
