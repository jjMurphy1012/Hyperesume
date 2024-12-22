**Hyperesume - Summary Document**

Hyperesume is a full-featured resume builder application designed to help job seekers create professional, customized resumes. By using Hyperesume, users can streamline the resume-building process through a structured, user-friendly interface that enables them to add, edit, and manage various sections of their resumes, such as contact information, education, work experience, skills, and projects.

 

The application also supports multiple resume templates, allowing users to select a layout that best fits their professional profile. In addition, users can p review and export their resumes as PDFs for easy sharing with potential employers.

**Key Features**

- **User Registration and Authentication:** Users can sign up and log in. Authentication is managed     through session-based or JWT-based security.
- **Role-Based Access Control:** Distinguishes between `ROLE_USER` and `ROLE_ADMIN`.
- **Resume Management:** Users can create, edit, and manage multiple resumes. Each     resume can have various sections (education, experience, skills, etc.).
- **PDF Export:** Users can utilize the browser’s print feature to export their     resumes as PDFs.
- **Admin Dashboard:** Admins can view all users, edit their details, and remove     users if necessary.
- **Responsive Design:** The frontend is responsive, providing a seamless experience     across devices.
- **Object-Oriented Design & Patterns:** Incorporates SOLID principles, design patterns (Singleton,     Factory), Java features (Streams, Lambdas), and best coding practices     throughout the backend implementation.

**Tech Stack**

• **Backend:** Spring Boot 

• **Frontend:** Lucide-react, React Redux 

• **Languages:** Java/HTML/CSS 

• **Database:** MySQL 

• **ORM/Data Mapper:** MyBatis 

• **Build Tool:** Maven 

• **Version Control:** Git 

• **Additional Libraries:** 

o Jakarta Validation (for input validation) 

o BCryptPasswordEncoder (for password encryption)

 

**Project Structure**


```plaintext
hyperesume/
├── backend/                
│   ├── src/main/java
│   ├── src/main/resources
│   └── pom.xml
└── frontend/                
    ├── public
    ├── src
    └── package.json
```

 

 

**Installation**

 

**Backend Setup**

**1.Clone the repository:**

• git clone https://github.com/CSYE-6200-Concepts-of-OOD-Fall-2024-S3/final-project-group_8.git

• cd backend

**2. Install dependencies:**

• mvn clean install

**3. Configure application.properties:**

• Update the necessary database and application settings in src/main/resources/application.properties.

 

**4. Run the server:**

 **Option 1:**  mvn spring-boot:run

 **Option 2:** Run the **HyperesumeApplication** class directly Open your IDE (e.g., IntelliJ IDEA or Eclipse). Locate the HyperesumeApplication class under the service package. Right-click on the class and select Run 'HyperesumeApplication'.

 

**Frontend Setup**

**1.**  **Navigate to the frontend folder:**

• cd frontend

**2.**  **Install dependencies:**

• npm install

**3.**  **Start the development server:**

• npm start

 

**API Endpoints and Descriptions**

**Authentication and User Management**

**REQUEST /api**  
**Description:** Retrieves or performs actions related to /api (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api (Please provide detailed response information).

---

**POST /login**  
**Description:** Retrieves or performs actions related to /login (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /login (Please provide detailed response information).

---

**POST /login**  
**Description:** Retrieves or performs actions related to /login (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /login (Please provide detailed response information).

---

**POST /register**  
**Description:** Retrieves or performs actions related to /register (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /register (Please provide detailed response information).

---

**GET /users**  
**Description:** Retrieves or performs actions related to /users (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users (Please provide detailed response information).

---

**POST /logout**  
**Description:** Retrieves or performs actions related to /logout (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /logout (Please provide detailed response information).

---

**GET /me**  
**Description:** Retrieves or performs actions related to /me (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /me (Please provide detailed response information).

---

**GET /admin/auth/validate**  
**Description:** Retrieves or performs actions related to /admin/auth/validate (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /admin/auth/validate (Please provide detailed response information).

---

**GET /admin/session**  
**Description:** Retrieves or performs actions related to /admin/session (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /admin/session (Please provide detailed response information).

---

**GET /register**  
**Description:** Retrieves or performs actions related to /register (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /register (Please provide detailed response information).

---

**POST /register**  
**Description:** Retrieves or performs actions related to /register (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /register (Please provide detailed response information).

---

**GET /dynamicRedirect**  
**Description:** Retrieves or performs actions related to /dynamicRedirect (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /dynamicRedirect (Please provide detailed response information).

---

**GET /login**  
**Description:** Retrieves or performs actions related to /login (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /login (Please provide detailed response information).

---

**POST /api/register**  
**Description:** Retrieves or performs actions related to /api/register (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/register (Please provide detailed response information).

---

**REQUEST /api**  
**Description:** Retrieves or performs actions related to /api (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api (Please provide detailed response information).



**Admin Endpoints**

**REQUEST /api/admin**  
**Description:** Retrieves or performs actions related to /api/admin (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/admin (Please provide detailed response information).

---

**GET /users**  
**Description:** Retrieves or performs actions related to /users (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users (Please provide detailed response information).

---

**GET /users/{id}**  
**Description:** Retrieves or performs actions related to /users/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users/{id} (Please provide detailed response information).

---

**PUT /users/{id}**  
**Description:** Retrieves or performs actions related to /users/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users/{id} (Please provide detailed response information).

---

**DELETE /users/{id}**  
**Description:** Retrieves or performs actions related to /users/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users/{id} (Please provide detailed response information).

---

**REQUEST /api/admin**  
**Description:** Retrieves or performs actions related to /api/admin (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/admin (Please provide detailed response information).

---

**GET /users**  
**Description:** Retrieves or performs actions related to /users (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users (Please provide detailed response information).

---

**GET /users/{id}**  
**Description:** Retrieves or performs actions related to /users/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users/{id} (Please provide detailed response information).

---

**PUT /users/{id}**  
**Description:** Retrieves or performs actions related to /users/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users/{id} (Please provide detailed response information).

---

**DELETE /users/{id}**  
**Description:** Retrieves or performs actions related to /users/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /users/{id} (Please provide detailed response information).

---

**GET /auth/validate**  
**Description:** Retrieves or performs actions related to /auth/validate (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /auth/validate (Please provide detailed response information).



**Resume Management Endpoints**

**REQUEST /api/certifications**  
**Description:** Retrieves or performs actions related to /api/certifications (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/certifications (Please provide detailed response information).

---

**GET /get**  
**Description:** Retrieves or performs actions related to /get (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /get (Please provide detailed response information).

---

**POST /create**  
**Description:** Retrieves or performs actions related to /create (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /create (Please provide detailed response information).

---

**PUT /edit/{id}**  
**Description:** Retrieves or performs actions related to /edit/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /edit/{id} (Please provide detailed response information).

---

**DELETE /delete/{id}**  
**Description:** Retrieves or performs actions related to /delete/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /delete/{id} (Please provide detailed response information).

---

**REQUEST /api/education**  
**Description:** Retrieves or performs actions related to /api/education (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/education (Please provide detailed response information).

---

**GET /get**  
**Description:** Retrieves or performs actions related to /get (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /get (Please provide detailed response information).

---

**POST /create**  
**Description:** Retrieves or performs actions related to /create (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /create (Please provide detailed response information).

---

**PUT /edit/{id}**  
**Description:** Retrieves or performs actions related to /edit/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /edit/{id} (Please provide detailed response information).

---

**DELETE /delete/{id}**  
**Description:** Retrieves or performs actions related to /delete/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /delete/{id} (Please provide detailed response information).

---

**REQUEST /experience**  
**Description:** Retrieves or performs actions related to /experience (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /experience (Please provide detailed response information).

---

**GET /add**  
**Description:** Retrieves or performs actions related to /add (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /add (Please provide detailed response information).

---

**POST /add**  
**Description:** Retrieves or performs actions related to /add (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /add (Please provide detailed response information).

---

**GET /edit/{id}**  
**Description:** Retrieves or performs actions related to /edit/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /edit/{id} (Please provide detailed response information).

---

**POST /edit/{id}**  
**Description:** Retrieves or performs actions related to /edit/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /edit/{id} (Please provide detailed response information).

---

**GET /delete/{id}**  
**Description:** Retrieves or performs actions related to /delete/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /delete/{id} (Please provide detailed response information).

---

**REQUEST /api/profile**  
**Description:** Retrieves or performs actions related to /api/profile (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/profile (Please provide detailed response information).

---

**REQUEST /api/projects**  
**Description:** Retrieves or performs actions related to /api/projects (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/projects (Please provide detailed response information).

---

**GET /get**  
**Description:** Retrieves or performs actions related to /get (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /get (Please provide detailed response information).

---

**POST /create**  
**Description:** Retrieves or performs actions related to /create (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /create (Please provide detailed response information).

---

**PUT /edit/{id}**  
**Description:** Retrieves or performs actions related to /edit/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /edit/{id} (Please provide detailed response information).

---

**DELETE /delete/{id}**  
**Description:** Retrieves or performs actions related to /delete/{id} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /delete/{id} (Please provide detailed response information).

---

**REQUEST /api/skills**  
**Description:** Retrieves or performs actions related to /api/skills (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/skills (Please provide detailed response information).

---

**GET /get**  
**Description:** Retrieves or performs actions related to /get (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /get (Please provide detailed response information).

---

**POST /createCategory**  
**Description:** Retrieves or performs actions related to /createCategory (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /createCategory (Please provide detailed response information).

---

**POST /createASkill/{categoryId}**  
**Description:** Retrieves or performs actions related to /createASkill/{categoryId} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /createASkill/{categoryId} (Please provide detailed response information).

---

**DELETE /deleteCategory/{categoryId}**  
**Description:** Retrieves or performs actions related to /deleteCategory/{categoryId} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /deleteCategory/{categoryId} (Please provide detailed response information).

---

**DELETE /deleteASkill/{categoryId}/{skillId}**  
**Description:** Retrieves or performs actions related to /deleteASkill/{categoryId}/{skillId} (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /deleteASkill/{categoryId}/{skillId} (Please provide detailed response information).

---

**Testing**

**GET /api/test**  
**Description:** Retrieves or performs actions related to /api/test (Please provide the detailed description for this endpoint).  
**Request Body:** None (Update if a request body is required).  
**Response:** Description of the response for /api/test (Please provide detailed response information).





**Frontend Workflow**

**Registration & Login**

- Users      visit `/signup` to create a new account. After successful registration, they      are redirected to `/login`.
- On the `/login` page, users provide      credentials. The frontend sends a POST request to `/api/login`.
- If login      succeeds, user details and role are stored in Redux state. Based on the      role:

- `ROLE_ADMIN` redirects the user to `/api/admin`.
- `ROLE_USER` redirects the user to `/profile`.

**Profile Management**

- Authenticated      users access `/profile` to view and edit personal details and experiences.
- Changes      are submitted to the backend (`POST /profile`), updating the user’s data in the database.

**Resume Creation & Management**

- From the      main page or after login, users can navigate to `/templates` to select a resume      template.
- Clicking      on a template navigates them to `/resume-builder/{templateId}`.
- In the      Resume Builder page, users can add and edit resume sections (education,      experience, skills).
- Users can      save their resume by calling the backend endpoints or keep data locally      (in testing scenarios).
- Once the      resume is ready, users employ the browser’s print functionality to export      the page as a PDF. No html2pdf.js is used due to quality concerns; the      built-in print-to-PDF feature is preferred.

**Admin Operations**

- An admin      user navigates to `/api/admin` to view all registered users.
- Admins      can edit user details, delete users, and manage roles via provided      endpoints.
- All admin      actions are protected by role-based access control on the backend.

**State Management & Navigation**

- Frontend      uses React Router for seamless navigation without page reloads.
- Redux      manages user authentication state and stores user data for easy access      across components.
- The      navigation bar (Navbar) dynamically shows different links depending on      whether the user is authenticated and their role.

**PDF Export**

- The user      is instructed to use the browser’s native print functionality.
- The user      can open the print dialog (Ctrl+P or Cmd+P in most browsers) and choose      “Save as PDF” to export the resume.

 

**Additional Considerations**

- **Error Handling:** The backend returns HTTP error statuses and messages for     unauthorized access, invalid input, or failed operations. The frontend     displays these messages to the user.
- **Security:**     Spring Security and role-based access ensure that only authorized users or     admins can access certain endpoints.
- **Design Patterns & Principles:** The codebase applies SOLID design principles, uses patterns     like Singleton (for database connections) and Factory (for object     creation), and adopts Streams and Lambdas for concise, functional-style     operations.

 

**Important Functionalities**

The project includes the following functionalities as required:

- Object-oriented     principles: Applied through classes, data types, strings, and enums.
- Inheritance     and Polymorphism: Utilized in service interfaces and API abstraction.
- Generics and     Collections: Used in list-based data handling and sorting algorithms.
- Inner Classes,     Exception Handling, File I/O: Applied for utility functions, handling     errors, and file operations.
- SOLID Design     Principles: Ensured in service and controller structure.
- Singleton     Pattern and Object Factories: Implemented in database connection     management and object creation.
- Lambda     Expressions and Anonymous Classes: Used in stream operations and event     handling.
- Comparators     and Comparable Interface: Applied for sorting user or resume data.
- Stream API and     Functional Programming: Used for efficient data processing.
- Queue and     Stack Data Structures: Utilized for recent actions and request handling.

**Milestone Contributions Overview**

Milestone 1: Establishing Core Functionality and Security Framework

• Problem Statement Identified: Highlighted the need for an efficient, user-friendly resume creation platform.

• Key Features Defined: Laid the foundation for registration, authentication, profile management, and role-based access control.

• Tech Stack Setup: Spring Boot, React, MySQL, MyBatis, and supporting libraries.

• Object-Oriented Concepts Introduced: Encapsulation, abstraction, polymorphism, association, dependency injection, and inheritance.

• Contributions:

• Implemented secure user registration and login with hashed passwords.

• Set up database schema for users, roles, and profiles.

• Designed basic frontend pages and backend structure.

 

Milestone 2: Building a User-Centric Design and Admin Capabilities

• Functional Features Delivered:

• Functioning sign-in and authentication.

• Responsive frontend with a navigation bar.

• Integrated frontend with backend services.

• Basic admin dashboard functionality.

• Object-Oriented Principles Strengthened: Continued use of encapsulation, abstraction, and dependency injection in managing user profiles and admin roles.

• Tech Improvements: Added React Redux for state management and improved frontend components.

• Contributions:

• Enhanced admin dashboard with basic user management (view, edit, delete users).

• Resolved routing and security issues.

• Created and tested homepage, login, and signup features.

 

Milestone 3: Enabling Comprehensive Resume and Profile Management

• Functionalities Enhanced:

• Full admin dashboard with advanced user management capabilities (edit/delete accounts).

• User profile management: Added features to create and edit profiles and experiences.

• Resume compilation: Allowed users to compile resumes from profile items and export/download them.

• Object-Oriented Practices Expanded: Applied principles to resume components, with optimized page interactions and backend APIs.

• Debugging and Testing:

• Fixed bugs in security configuration and routing.

• Debugged resume backend APIs and ensured seamless integration.

• Contributions:

• Enabled resume deletion, download, and optimized resume preview interactions.

• Updated database schemas and tested data operations.

• Improved application security and authentication mechanisms.