# 🏛️Development of Digital Subsidy & Grant Administration Platform
<div align="center">

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=java)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-6DB33F?style=flat-square&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A comprehensive full-stack government subsidy management platform built with modern technologies for transparent, multi-level approval workflows and beneficiary tracking.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [API Docs](#-api-documentation)

</div>

---

## 📋 Overview

The **Government Subsidy & Grant Disbursement Tracking System** is an enterprise-grade web application designed to streamline government subsidy disbursement processes. It provides a transparent, multi-tier approval workflow system that enables citizens to apply for subsidies while government officers can verify, review, and approve applications at different administrative levels.

### Key Use Cases
- 👥 **Citizens** browse schemes, submit applications, and track their status
- 🔍 **Field Officers** perform ground-level verification
- 📊 **District Officers** conduct secondary scrutiny
- 💰 **Finance Officers** approve final disbursement
- 🛡️ **Administrators** manage schemes and monitor system analytics

---

## ✨ Features

### 🎯 Core Functionality
- **Multi-Role Access Control**: Distinct portals for citizens, field officers, district officers, finance officers, and administrators
- **Application Lifecycle Management**: Complete workflow from submission through approval to disbursement
- **Real-Time Status Tracking**: Visual workflow stepper for application progress monitoring
- **Dynamic Scheme Catalog**: Browse, filter, and manage government subsidy schemes
- **Eligibility Scoring**: Automatic eligibility calculation based on beneficiary information
- **Beneficiary Profiles**: Manage citizen profiles with role-specific information

### 🔐 Security & Authentication
- JWT-based stateless authentication
- Spring Security with role-based access control (RBAC)
- Secure password hashing and validation
- CORS protection and API security best practices

### 📱 User Experience
- Responsive React SPA with modern UI/UX
- Role-based dashboard customization
- Comprehensive form validation (client & server-side)
- Intuitive navigation with Sidebar and Navbar components
- Loading states and error handling

### 📊 Analytics & Reporting
- Dashboard statistics and metrics
- Application analytics by status and scheme
- Scheme utilization reports
- Export functionality (Excel, PDF)
- Real-time data visualization

---

## 🛠️ Tech Stack

### Backend
| Component | Technology |
|-----------|-----------|
| **Language** | Java 17 |
| **Framework** | Spring Boot 3.2.0 |
| **Web Layer** | Spring Web MVC |
| **Persistence** | Spring Data JPA + Hibernate |
| **Security** | Spring Security + JWT |
| **Database** | H2 (default) / MySQL (configurable) |
| **Build Tool** | Maven 3.6+ |
| **Testing** | JUnit 5, Spring Boot Test, MockMvc |

### Frontend
| Component | Technology |
|-----------|-----------|
| **Library** | React 19.2.7 |
| **Build Tool** | Vite 8.1.1 |
| **Routing** | React Router DOM 7.18.1 |
| **Styling** | CSS3 + Custom Properties |
| **Icons** | React Icons 5.7.0 |
| **HTTP Client** | Fetch API |
| **Package Manager** | npm |

### DevOps & Tools
- Maven Wrapper (mvnw)
- Vite development server
- Spring Boot embedded Tomcat
- Git version control

---

## 📋 Prerequisites

Before running the project, ensure you have:

- **Java 17** or higher ([Download](https://www.oracle.com/java/technologies/downloads/#java17))
- **Node.js 16+** and npm 7+ ([Download](https://nodejs.org/))
- **Git** for version control
- **Maven 3.6+** (or use the included Maven Wrapper)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/govt-subsidy-g2.git
cd govt-subsidy-g2
```

### 2️⃣ Setup Backend (Java Spring Boot)

```bash
# Build the project
mvn clean package

# Run the Spring Boot application
mvn spring-boot:run
# OR using Maven Wrapper on Windows
.\mvnw.cmd spring-boot:run
# OR using Maven Wrapper on Linux/Mac
./mvnw spring-boot:run
```

**Backend will be available at:** `http://localhost:8080`

**API Documentation:** `http://localhost:8080/swagger-ui.html` (if Swagger is configured)

### 3️⃣ Setup Frontend (React + Vite)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

**Frontend will be available at:** `http://localhost:5173`

---

## 🔑 Demo Credentials

Access the system using these predefined accounts:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| 👨‍💼 **Admin** | `admin@gov.in` | `Password@123` | /admin |
| 🔍 **Field Officer** | `field.officer@gov.in` | `Password@123` | /field-officer |
| 📋 **District Officer** | `district.officer@gov.in` | `Password@123` | /district-officer |
| 💵 **Finance Officer** | `finance.officer@gov.in` | `Password@123` | /finance-officer |
| 👤 **Beneficiary** | `citizen@gov.in` | `Password@123` | /dashboard |

---

## 📁 Project Structure

```
govt-subsidy-g2/
├── 📁 src/
│   ├── main/
│   │   ├── java/com/government/subsidy/
│   │   │   ├── config/              # Spring Boot Configuration & Initialization
│   │   │   ├── controller/          # REST API Endpoints (Auth, Application, Scheme)
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── model/               # JPA Entities (User, Application, Scheme)
│   │   │   ├── repository/          # Spring Data JPA Repositories
│   │   │   ├── security/            # JWT & Security Configuration
│   │   │   ├── service/             # Business Logic Layer
│   │   │   └── exception/           # Custom Exception Handling
│   │   └── resources/               # application.properties, schema.sql
│   ├── test/                        # Unit & Integration Tests
│   └── webapp/                      # Frontend React Application
│       ├── 📁 components/           # Reusable UI Components (Navbar, Sidebar, Footer)
│       ├── 📁 pages/                # Page Components (Login, Dashboard, Apply)
│       ├── 📁 services/             # API Integration Services
│       ├── 📁 layouts/              # Layout Components
│       ├── 📁 styles/               # CSS Stylesheets
│       ├── index.html               # HTML Entry Point
│       ├── package.json             # npm Dependencies
│       └── vite.config.js           # Vite Configuration
├── 📁 docs/                         # Documentation & Architecture Diagrams
│   ├── FRONTEND_DOCUMENTATION.md    # Frontend Technical Specification
│   ├── BACKEND_DOCUMENTATION.md     # Backend Technical Specification
│   └── Agile\ Documentation.md      # Agile & Project Planning
├── pom.xml                          # Maven Build Configuration
├── schema.sql                       # Database Schema
├── mvnw / mvnw.cmd                  # Maven Wrapper
└── README.md                        # This file
```

---

## 🏗️ Architecture

### System Architecture
```
┌─────────────────────┐
│   Web Browser       │
│  (React 19 + Vite)  │
└──────────┬──────────┘
           │ HTTP/REST
           ▼
┌─────────────────────────────────────┐
│   Frontend Application              │
│  ├─ Pages (Dashboard, Apply, etc)   │
│  ├─ Components (UI Elements)        │
│  ├─ Services (API Integration)      │
│  └─ Styles (CSS)                    │
└──────────┬──────────────────────────┘
           │ JSON/REST
           ▼
┌─────────────────────────────────────┐
│   Spring Boot Backend (8080)        │
│  ├─ Controllers                     │
│  ├─ Services                        │
│  ├─ Repositories (JPA)              │
│  └─ Security (JWT)                  │
└──────────┬──────────────────────────┘
           │ SQL
           ▼
┌─────────────────────┐
│   Database (H2/MySQL)   │
│  • Users            │
│  • Applications     │
│  • Schemes          │
│  • Workflow History │
└─────────────────────┘
```

### Workflow Layers
```
1. BENEFICIARY SUBMISSION
   ↓
2. FIELD OFFICER VERIFICATION (Level 1)
   ↓
3. DISTRICT OFFICER REVIEW (Level 2)
   ↓
4. FINANCE OFFICER APPROVAL (Level 3)
   ↓
5. DISBURSEMENT PROCESSING
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api/v1
```

### Authentication Endpoints

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@gov.in",
  "password": "Password@123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "admin@gov.in",
  "role": "ADMIN"
}
```

#### Register
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "newuser@gov.in",
  "password": "Password@123",
  "fullName": "John Doe",
  "phoneNumber": "9876543210"
}
```

### Application Endpoints

#### Submit Application
```http
POST /api/v1/applications/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "schemeId": 1,
  "incomeCategory": "LOW",
  "aadhaarNumber": "123456789012"
}
```

#### Get My Applications
```http
GET /api/v1/applications/my-applications
Authorization: Bearer {token}
```

#### Get Application by ID
```http
GET /api/v1/applications/{applicationId}
Authorization: Bearer {token}
```

### Scheme Endpoints

#### Get All Schemes
```http
GET /api/v1/schemes
```

#### Get Scheme Details
```http
GET /api/v1/schemes/{schemeId}
```

#### Create Scheme (Admin Only)
```http
POST /api/v1/schemes
Authorization: Bearer {token}
Content-Type: application/json
```

For complete API documentation, refer to [BACKEND_DOCUMENTATION.md](docs/Backend%20Documentation.md)

---

## 🧪 Testing

### Run Backend Tests
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=ApplicationServiceTest

# Run with coverage
mvn test jacoco:report
```

### Run Frontend Tests
```bash
# Run with Vitest (when configured)
npm run test

# Run with coverage
npm run test:coverage
```

Current test coverage:
- ✅ 18+ Integration Tests (Backend)
- ✅ Authentication & Authorization Tests
- ✅ Application Workflow Tests
- ✅ Exception Handling Tests

---

## 🔧 Configuration

### Backend Configuration (application.properties)
```properties
# Server Port
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# Logging
logging.level.com.government.subsidy=DEBUG
```

### Frontend Configuration (.env)
```
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_NAME=Government Subsidy Tracking
```

---

## 🚢 Deployment

### Docker Deployment (Optional)

Create `Dockerfile` for backend:
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:
```bash
docker build -t govt-subsidy-backend .
docker run -p 8080:8080 govt-subsidy-backend
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow Spring Boot and React best practices
- Add tests for new features
- Update documentation accordingly
- Ensure code passes linting checks

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📚 Additional Documentation

- [Frontend Technical Specification](docs/Frontend%20Documentation.md)
- [Backend Technical Specification](docs/Backend%20Documentation.md)
- [Agile & Project Planning](docs/Agile%20Documentation.md)
- [Database Schema](schema.sql)

---

## 💬 Support & Contact

For questions, issues, or feedback:

- 📧 **Email**: support@govsubsidy.in
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/yourusername/govt-subsidy-g2/issues)
- 💡 **Suggestions**: Create a discussion thread

---

## 🙏 Acknowledgments

- Spring Boot Framework Team
- React Core Team
- Government of India (for the use case)
- All contributors and maintainers

---

<div align="center">

**[⬆ Back to Top](#-government-subsidy--grant-disbursement-tracking-system)**

Built with ❤️ for transparent government processes

</div>
