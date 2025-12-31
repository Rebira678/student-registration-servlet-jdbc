<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Registration Portal 🎓</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</head>
<body>
<!-- Animated Background -->
<div class="bg-animation">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
</div>

<div class="container">
    <!-- Header -->
    <header class="header animate__animated animate__fadeInDown">
        <div class="logo">
            <i class="fas fa-graduation-cap"></i>
            <h1>Edu<span>Register</span> Pro</h1>
        </div>
        <nav>
            <a href="showALL" class="nav-btn">
                <i class="fas fa-users"></i> View Students
            </a>
            <a href="#register" class="nav-btn active">
                <i class="fas fa-user-plus"></i> Register
            </a>
        </nav>
    </header>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section class="hero animate__animated animate__fadeIn">
            <div class="hero-content">
                <h2>Welcome to the Future of Student Management </h2>
                <p>Register students with ease and style. Experience the most attractive student registration system ever built!</p>
                <div class="stats">
                    <div class="stat-card">
                        <i class="fas fa-user-graduate"></i>
                        <h3>500+</h3>
                        <p>Students Registered</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-university"></i>
                        <h3>50+</h3>
                        <p>Universities Trust Us</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-bolt"></i>
                        <h3>99.9%</h3>
                        <p>Uptime</p>
                    </div>
                </div>
            </div>
            <div class="hero-image">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Students studying together">
            </div>


        </section>

        <!-- Registration Form -->
        <section id="register" class="registration-section animate__animated animate__fadeInUp">
            <div class="section-header">
                <h2><i class="fas fa-edit"></i> Student Registration</h2>
                <p>Fill in the details below to register a new student</p>
            </div>

            <!-- Error Message -->
            <% if(request.getAttribute("error") != null) { %>
            <div class="alert alert-error animate__animated animate__shakeX">
                <i class="fas fa-exclamation-circle"></i>
                <%= request.getAttribute("error") %>
            </div>
            <% } %>

            <!-- Success Message -->
            <% if(request.getAttribute("success") != null) { %>
            <div class="alert alert-success animate__animated animate__bounceIn">
                <i class="fas fa-check-circle"></i>
                <%= request.getAttribute("success") %>
            </div>
            <% } %>




            <!-- Registration Form -->
            <form action="register" method="POST" class="registration-form" id="studentForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="name"><i class="fas fa-user"></i> Full Name</label>
                        <div class="input-with-icon">
                            <input type="text" id="name" name="name" required placeholder="Enter student's full name"
                            value="<%= request.getParameter("name") != null ? request.getParameter("name") : "" %>">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <small>Minimum 2 characters required</small>
                    </div>

                    <div class="form-group">
                        <label for="email"><i class="fas fa-envelope"></i> Email Address</label>
                        <div class="input-with-icon">
                            <input type="email" id="email" name="email" required placeholder="student@university.edu"
                            value="<%= request.getParameter("email") != null ? request.getParameter("email") : "" %>">
                            <i class="fas fa-at"></i>
                        </div>
                        <small>Enter a valid university email</small>
                    </div>

                    <div class="form-group">
                        <label for="year"><i class="fas fa-calendar-alt"></i> Admission Year</label>
                        <div class="input-with-icon">
                            <input type="number" id="year" name="year" required min="2000" max="2030" placeholder="2023"
                            value="<%= request.getParameter("year") != null ? request.getParameter("year") : "" %>">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <small>Year must be between 2000-2030</small>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-submit"><i class="fas fa-paper-plane"></i> Register Student</button>
                    <button type="reset" class="btn-reset"><i class="fas fa-redo"></i> Clear Form</button>
                </div>
            </form>

            <!-- Features Section -->
            <div class="features">
                <div class="feature">
                    <i class="fas fa-shield-alt"></i>
                    <h4>Secure Data</h4>
                    <p>Bank-level encryption</p>
                </div>
                <div class="feature">
                    <i class="fas fa-bolt"></i>
                    <h4>Fast Processing</h4>
                    <p>Instant registration</p>
                </div>
                <div class="feature">
                    <i class="fas fa-mobile-alt"></i>
                    <h4>Mobile Friendly</h4>
                    <p>Works on all devices</p>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3><i class="fas fa-graduation-cap"></i> EduRegister</h3>
                <p>Revolutionizing student management since 2024</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <a href="showALL"><i class="fas fa-arrow-right"></i> View All Students</a>
                <a href="#register"><i class="fas fa-arrow-right"></i> New Registration</a>
            </div>
            <div class="footer-section">
                <h4>Contact</h4>
                <p><i class="fas fa-envelope"></i> support@eduregister.com</p>
                <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 EduRegister Pro. All rights reserved. | Made with <i class="fas fa-heart"></i> for education</p>
        </div>
    </footer>
</div>

<!-- Floating Action Button -->
<a href="showALL" class="fab">
    <i class="fas fa-list"></i>
</a>

<!-- Confetti Canvas -->
<canvas id="confetti-canvas"></canvas>

<script src="js/script.js"></script>
</body>
</html>
