





























# SchoolOS — Ghana Basic & JHS School Management System
A comprehensive, modern school management platform tailored specifically for Ghanaian Basic Schools and Junior High Schools (Primary 1–6 & JHS 1–3). Built with React 18, TypeScript, Tailwind CSS, and Vite.

---
## 🌟 Key Features

### 1. 📊 Executive Dashboard & KPIs
- Real-time student enrollment counters (Primary vs. JHS breakdown).
- Financial overview: Total school fees collected, pending arrears, and feeding fees tracking.
- Attendance analytics with daily percentage metrics.
- Quick action triggers: Register Student, Record Payment, Post Announcement, and Generate Terminal Report Cards.

### 2. 🎓 Student Management & Profiles
- Complete student directory with stage filtering (Primary / JHS) and search.
- Detailed student profile with photo, guardian details, and medical emergency notes.
- Individual fee balance and transaction history.
- Built-in Terminal Report Card generator and previewer

### 3. 💳 Ghanaian Fee & Payment Management
- **School Fees**: Configurable fee structures per class/term, automated balance tracking.
- **Feeding Fees**: Dedicated daily/weekly/termly feeding fee tracker tailored for Ghanaian school systems.
- **Multi-Channel Payments**: Support for Mobile Money (MoMo - MTN, Telecel, AT), Cash, Bank Transfer, and Cheques.
- **Printable Official Receipts**: Instant receipt generation with print styling (`#printable-receipt`).

### 4. 📝 Results & Terminal Report Cards
- Ghanaian assessment weighting: **30% Continuous Assessment** (Classwork 20% + Homework 10%) and **70% Examination**.
- Auto-calculated total scores, Stanine/BECE grading (Grade 1 to 9), and class positions.
- Printable, professional Terminal Report Cards formatted for termly distribution.

### 5. 📅 Attendance Register
- Daily marking for every class (Present, Absent, Late, Excused).
- Bulk "Mark All Present" convenience action.
- Real-time attendance rate calculation per student and per class.

### 6. 🚌 Operations & Fleet
- **Transport & Bus Routes**: Bus registration, driver contact info, designated pickup stops, and morning/afternoon route status.
- **Admissions Workflow**: Prospective student application tracker, interview scheduling, and acceptance pipeline.
- **Inventory & Assets**: Tracking textbooks, ICT equipment, science lab materials, and furniture condition.

### 7. 👥 Role-Based Portals & Personas
Switch roles dynamically in the top navigation bar:
- **School Admin**: Full administrative control over staff, students, and finances.
- **Teacher Portal**: Mark daily attendance, input student continuous assessments and exam marks.
- **Accountant Portal**: Record incoming payments, print receipts, and reconcile cash/MoMo collections.
- **Parent Portal**: View child's academic report card, attendance records, fee balances, and pay via MoMo.
- **Super Admin**: Multi-school platform overview, subscription monitoring, and system metrics.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Elijahamet/JHS-PROJECT.git
cd JHS-PROJECT

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
The application will be running at [http://localhost:3000](http://localhost:3000).

### Production Build
```bash
npm run build
```
Build output will be bundled in the `dist/` directory.

---

## 📁 Project Structure

```
JHS-PROJECT/
├── src/
│   ├── components/
│   │   ├── common/        # Reusable UI primitives (Buttons, Badges, Modals, StatCards)
│   │   ├── layout/        # Sidebar, Header, MobileNav, GlobalSearchModal
│   │   ├── modals/        # AddStudentModal, RecordPaymentModal, ReceiptModal, etc.
│   │   └── modules/       # Full view modules (Dashboard, Fees, Attendance, Results, Portals)
│   ├── context/           # AppContext state store (collections, auth, current view)
│   ├── data/              # Rich mock data tailored to Ghanaian Basic & JHS curriculum
│   ├── types/             # Comprehensive TypeScript data interfaces
│   ├── utils/             # Currency formatters (GHS) and date helpers
│   ├── App.tsx            # View router & layout orchestrator
│   ├── index.css          # Tailwind base + print media stylesheets
│   └── main.tsx           # React DOM root entry
├── index.html
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License
MIT License.
