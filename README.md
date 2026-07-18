# Government Subsidy & Grant Disbursement Tracking System - Backend

This is the Spring Boot backend for the Government Subsidy & Grant Disbursement Tracking System. It provides RESTful APIs for managing users, schemes, beneficiary profiles, applications, and multi-level approval workflows.

## Technologies Used
- **Java 17**
- **Spring Boot 3.x** (Web, Data JPA, Security, Validation)
- **MySQL** (Relational Database)
- **JSON Web Tokens (JWT)** (Stateless Authentication)
- **Lombok** (Reduces boilerplate code)

## Modules Implemented
Based on the research and development report, the following core modules have been generated:

1. **Authentication Module:** Secure login and registration using JWT. Implements Role-Based Access Control (RBAC) with roles: `CITIZEN`, `FIELD_OFFICER`, `DISTRICT_OFFICER`, `FINANCE_OFFICER`, and `ADMIN`.
2. **Scheme Management Module:** CRUD operations for government subsidy schemes.
3. **Beneficiary Module:** Management of citizen profiles, linking Aadhaar and bank details.
4. **Application Module:** Endpoints for citizens to submit applications for specific schemes.
5. **Approval Workflow Module:** Multi-level state machine for application status transitions (e.g., `SUBMITTED` -> `FIELD_VERIFIED` -> `APPROVED_FOR_PAYMENT`).
6. **Payment & Audit Modules:** Entities to track successful disbursements and log system activities.

## Prerequisites
Before running this application, ensure you have the following installed on your machine:
- **Java Development Kit (JDK) 17** or higher. *(Note: A JRE is not sufficient for compilation)*.
- **Maven** (optional, as the project includes a Maven wrapper `mvnw`).
- **MySQL Server**.

## Database Setup
1. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or CLI).
2. Create an empty database named `subsidy_db`:
   ```sql
   CREATE DATABASE subsidy_db;
   ```
3. The application is configured to connect using the default username `root` with no password on `localhost:3306`. If your MySQL credentials differ, update them in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```

## How to Run
1. Open a terminal or command prompt and navigate to this `backend` directory.
2. Compile and run the application using the Maven wrapper:
   
   **On Windows:**
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
   **On Mac/Linux:**
   ```bash
   ./mvnw spring-boot:run
   ```
3. The server will start on port `8080`.

## API Endpoints Overview
*Note: Most endpoints require a valid JWT `Authorization: Bearer <token>` header.*

**Auth (`/api/auth`)**
- `POST /login` - Authenticate a user and receive a JWT.
- `POST /signup` - Register a new user.

**Schemes (`/api/schemes`)**
- `GET /` - List all active schemes.
- `POST /` - Create a new scheme (Requires `ADMIN` role).
- `PUT /{id}` - Update a scheme (Requires `ADMIN` role).

**Beneficiaries (`/api/beneficiaries`)**
- `POST /{userId}` - Create a beneficiary profile for a citizen.
- `GET /{userId}` - Retrieve a beneficiary profile.

**Applications (`/api/applications`)**
- `POST /` - Submit a new application (Requires `CITIZEN` role).
- `GET /` - List all applications (For Officers/Admins).
- `PUT /{id}/status` - Update the status of an application (For Officers).
