
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

<img width="1366" height="641" alt="screencapture-localhost-5173-admin-categories-2026-06-08-10_39_04" src="https://github.com/user-attachments/assets/250de8dc-8be4-4d5e-8d89-552aa09539f4" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-categories-2026-06-08-10_39_19" src="https://github.com/user-attachments/assets/2eec85f9-f42a-4d17-8663-3b1ba6c13d76" />
<img width="1366" height="979" alt="screencapture-localhost-5173-admin-coupons-2026-06-08-10_39_46" src="https://github.com/user-attachments/assets/236ff7d1-f928-4a85-b259-bd2c29117219" />
<img width="1366" height="854" alt="screencapture-localhost-5173-admin-coupons-2026-06-08-10_40_07" src="https://github.com/user-attachments/assets/1be4e182-d19f-40b9-987a-ac0e4e68158a" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-coupons-2026-06-08-10_40_22" src="https://github.com/user-attachments/assets/20cc9cb4-715d-4ead-8766-393d1cddc5a6" />
<img width="1366" height="811" alt="screencapture-localhost-5173-admin-users-2026-06-08-10_40_34" src="https://github.com/user-attachments/assets/d0052bad-37e0-4b63-8a78-8cfaac1dd10f" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-users-2026-06-08-10_40_45" src="https://github.com/user-attachments/assets/a5912b5c-6f64-4311-8402-885af099f073" />
<img width="1366" height="728" alt="screencapture-localhost-5173-admin-settings-2026-06-08-10_59_21" src="https://github.com/user-attachments/assets/59b1f5d6-cf6e-4ecb-b47a-a065c36300e1" />
<img width="1366" height="682" alt="screencapture-localhost-5173-login-2026-06-08-10_34_28" src="https://github.com/user-attachments/assets/0521de6e-1cfd-4e57-9b2c-f06c4591c973" />
<img width="1366" height="712" alt="screencapture-localhost-5173-signup-2026-06-08-10_35_15" src="https://github.com/user-attachments/assets/ca1e1d7c-de17-4ddf-81cc-658f34248cd4" />
<img width="1366" height="682" alt="screencapture-localhost-5173-forgot-password-2026-06-08-10_36_02" src="https://github.com/user-attachments/assets/c306cb55-306b-452a-9914-63b1672869d0" />
<img width="1366" height="819" alt="screencapture-localhost-5173-admin-2026-06-08-10_36_56" src="https://github.com/user-attachments/assets/bb89cf84-76ba-406a-a782-67cd034c45e4" />
<img width="1366" height="808" alt="screencapture-localhost-5173-admin-categories-2026-06-08-10_37_21" src="https://github.com/user-attachments/assets/20aab91c-84cf-4541-9b2c-e53ed60bd747" />
<img width="1366" height="1280" alt="screencapture-localhost-5173-admin-products-2026-06-08-10_37_34" src="https://github.com/user-attachments/assets/6cd06f85-d1e7-41d9-b83b-0c47dd14427e" />
<img width="1366" height="751" alt="screencapture-localhost-5173-admin-orders-2026-06-08-10_37_53" src="https://github.com/user-attachments/assets/8ef51987-627d-46df-8295-6dbad54c26f4" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-orders-2026-06-08-10_38_11" src="https://github.com/user-attachments/assets/57fb6fb1-b92c-4bfb-a02f-2d18ea035bc0" />
<img width="1366" height="641" alt="screencapture-localhost-5173-admin-products-2026-06-08-10_38_30" src="https://github.com/user-attachments/assets/5c6b9b02-3a50-4b0b-8e52-2aa993869078" />



npm install
npm run dev
npm run build

Developed with 💙 by CheSubhro
