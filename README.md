# Government Subsidy & Grant Disbursement Tracking System

## 📁 Organized Project Structure

The codebase is organized into clear **Frontend**, **Backend**, and **Docs** directories for easy navigation in File Explorer & IDEs:

```
Government-Subsidy-Tracking-System/
├── 📁 frontend/                               # React 18 + Vite Web Application
│   ├── 📁 public/                             # Public assets (favicon.svg emblem)
│   ├── 📁 src/                                # Frontend Source Code
│   │   ├── 📁 components/                     # Reusable UI Components (Sidebar, Navbar, Footer)
│   │   ├── 📁 pages/                          # Application Pages & Dashboards
│   │   │   ├── Login.jsx                      # Dual Citizen / Officer Portal Sign In
│   │   │   ├── Register.jsx                   # Account Registration
│   │   │   ├── Apply.jsx                      # Scheme Application Form & Score Gauge
│   │   │   ├── TrackStatus.jsx                # Step-by-Step Application Tracker
│   │   │   ├── FieldOfficerDashboard.jsx      # Level 1 Ground Check Queue
│   │   │   ├── DistrictOfficerDashboard.jsx   # Level 2 Scrutiny Queue
│   │   │   ├── FinanceOfficerDashboard.jsx    # Level 3 Disbursement Queue
│   │   │   ├── AdminDashboard.jsx             # System Control Panel & Scheme Controls
│   │   │   └── UtilizationReport.jsx          # Real Database Analytics & Export Reports
│   │   ├── 📁 services/                       # API Services (apiClient, authService, applicationService)
│   │   ├── 📁 layouts/                        # Dashboard Page Layouts
│   │   └── 📁 styles/                         # CSS Stylesheets
│   ├── index.html                             # Web Page Entrypoint
│   ├── package.json                           # React Frontend Dependencies
│   └── vite.config.js                         # Vite Build Configuration
│
├── 📁 backend/                                # Java Spring Boot REST API Service
│   ├── 📁 src/main/java/com/government/subsidy/
│   │   ├── 📁 config/                         # DataInitializer (Predefined Demo Accounts)
│   │   ├── 📁 controller/                     # REST API Controllers (Auth, Workflow, Application, Scheme)
│   │   ├── 📁 dto/                            # Data Transfer Objects (Login, Signup, Workflow)
│   │   ├── 📁 model/                          # Database Entities (User, Application, Scheme, DisbursementPlan)
│   │   ├── 📁 repository/                     # Spring Data JPA Repositories
│   │   ├── 📁 security/                       # WebSecurityConfig, JwtUtils, AuthTokenFilter
│   │   └── 📁 service/                        # Business Logic Services (ApplicationService, WorkflowService)
│   ├── 📁 src/main/resources/                 # application.properties (Database & JWT Secret)
│   ├── 📁 src/test/                           # Automated Integration Tests (18 Unit/Integration Tests)
│   ├── pom.xml                                # Maven Dependencies & Build Manifest
│   ├── mvnw & mvnw.cmd                        # Maven Wrapper Executables
│   └── schema.sql                             # SQL DDL Database Schema
│
└── 📁 docs/                                   # Documentation & Architecture
    ├── Government_Subsidy_Tracking_System_Architecture_and_Build.pptx  # 15-Slide Architecture Presentation
    ├── schema.sql                             # Relational Database Schema
    ├── PROJECT_ANALYSIS.md                    # Initial Codebase Inspection Audit
    └── CHANGES_MADE.md                        # Complete Change Log Documentation
```

---

## 🚀 Running the Project

### 1. Launch Backend (Java Spring Boot)
Navigating to the `backend` folder:
```bash
cd backend
.\mvnw.cmd spring-boot:run
```
*The REST API server will start on `http://localhost:8080`.*

### 2. Launch Frontend (React + Vite)
Navigating to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
*The web interface will start on `http://localhost:5173`.*

---

## 🔑 Predefined Demo Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **System Administrator** | `admin@gov.in` | `Password@123` |
| **Field Officer (Level 1)** | `field.officer@gov.in` | `Password@123` |
| **District Officer (Level 2)** | `district.officer@gov.in` | `Password@123` |
| **Finance Officer (Level 3)** | `finance.officer@gov.in` | `Password@123` |
| **Citizen Beneficiary** | `citizen@gov.in` | `Password@123` |
