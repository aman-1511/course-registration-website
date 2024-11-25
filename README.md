Course Registration Website
This project is a comprehensive course registration platform built using modern web development technologies, including HTML, CSS, JavaScript, Node.js, and MongoDB. The platform also integrates Google Authentication for secure and seamless user login.

Features
Role-Based Access: Admin, Student, and Teacher dashboards with unique functionalities.
Google Authentication: Secure login using Google OAuth.
Dynamic User Management: Admins can create and manage users and courses.
Course Management: Students can enroll in courses; teachers can manage course content.
Responsive Frontend: Designed using HTML, CSS, and JavaScript for an interactive UI.
Technology Stack
Frontend
HTML, CSS, JavaScript
Separate CSS and JS files for admin, student, and teacher dashboards
Backend
Node.js with Express.js framework
MongoDB for database management
Mongoose for database modeling
JWT for authentication middleware
Authentication
Google OAuth for secure user login
Project Structure
Backend (/backend)
Main server file: server.js
Routes: API endpoints are categorized based on user roles:
authRoutes.js - Handles authentication
adminRoutes.js - Admin-specific operations
studentRoutes.js - Student-specific operations
teacherRoutes.js - Teacher-specific operations
Controllers: Core business logic for routes
Models: MongoDB schemas for User, Course, and Enrollment
Middleware: JWT-based authentication middleware
Configuration: MongoDB connection setup (db.js)
Frontend (/frontend)
HTML Pages:
index.html: Landing page
admin_dashboard.html: Admin interface
student_dashboard.html: Student interface
teacher_dashboard.html: Teacher interface
Assets: Contains images and logos
CSS: Styling files for different user roles
JS: Frontend interactivity scripts
Setup and Installation
Prerequisites
Node.js and npm installed
MongoDB installed and running
Google Cloud Console account for OAuth credentials
Steps
Clone the Repository

bash
Copy code
git clone https://github.com/your-repository/course-registration-website.git
cd course-registration-website
Backend Setup

Navigate to the backend directory:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Create a .env file with the following variables:
makefile
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
Frontend Setup

Ensure the frontend files are accessible via a local server or hosting platform.
Start the Server

In the backend directory, run:
bash
Copy code
npm start
Access the Website

Open http://localhost:3000 in your browser.
Usage
Admin

Log in via Google authentication.
Create and manage courses and users.
Students

Enroll in courses and view progress.
Teachers

Manage course materials and enrolled students.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.

