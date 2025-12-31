<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.studentapp.model.Student" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Students - EduRegister Pro 🎓</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@800;900&display=swap" rel="stylesheet">
</head>
<body>
    <div class="bg-animation">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>

    <div class="container">
        <header class="header">
            <div class="logo">
                <i class="fas fa-graduation-cap"></i>
                <h1>Student <span>Directory</span></h1>
            </div>
            <nav>
                <a href="index.jsp" class="nav-btn">
                    <i class="fas fa-home"></i> Home
                </a>
                <a href="#register" class="nav-btn active">
                    <i class="fas fa-users"></i> All Students
                </a>
            </nav>
        </header>

        <main>
            <div class="table-container">
                <div class="table-header">
                    <h2><i class="fas fa-user-graduate"></i> Registered Students</h2>
                    <div class="table-info">
                        <span class="badge">
                            <i class="fas fa-users"></i>
                            Total: ${students.size()} Students
                        </span>
                        <a href="index.jsp" class="btn-add">
                            <i class="fas fa-user-plus"></i> Add New
                        </a>
                    </div>
                </div>

                <%
                    List<Student> students = (List<Student>) request.getAttribute("students");
                    if (students == null || students.isEmpty()) {
                %>
                    <div class="empty-state">
                        <i class="fas fa-user-slash fa-4x"></i>
                        <h3>No Students Found</h3>
                        <p>No students have been registered yet. Be the first to add one!</p>
                        <a href="index.jsp" class="btn-primary">
                            <i class="fas fa-user-plus"></i> Register First Student
                        </a>
                    </div>
                <% } else { %>
                    <div class="table-wrapper">
                        <table class="students-table">
                            <thead>
                                <tr>
                                    <th>
                                        <i class="fas fa-hashtag"></i> ID
                                    </th>
                                    <th>
                                        <i class="fas fa-user"></i> Name
                                    </th>
                                    <th>
                                        <i class="fas fa-envelope"></i> Email
                                    </th>
                                    <th>
                                        <i class="fas fa-calendar-alt"></i> Year
                                    </th>
                                    <th>
                                        <i class="fas fa-clock"></i> Registered On
                                    </th>
                                    <th>
                                        <i class="fas fa-cogs"></i> Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <% for (Student student : students) {
                                    String rowClass = "";
                                    if (student.getYear() == 2024) rowClass = "current-year";
                                    else if (student.getYear() < 2024) rowClass = "past-year";
                                    else rowClass = "future-year";
                                %>
                                <tr class="<%= rowClass %>">
                                    <td>
                                        <span class="student-id">#<%= student.getId() %></span>
                                    </td>
                                    <td>
                                        <div class="student-info">
                                            <div class="avatar">
                                                <%= student.getName().charAt(0) %>
                                            </div>
                                            <div>
                                                <strong><%= student.getName() %></strong>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="mailto:<%= student.getEmail() %>" class="email-link">
                                            <i class="fas fa-envelope"></i> <%= student.getEmail() %>
                                        </a>
                                    </td>
                                    <td>
                                        <span class="year-badge year-<%= student.getYear() %>">
                                            <i class="fas fa-graduation-cap"></i> <%= student.getYear() %>
                                        </span>
                                    </td>
                                    <td>
                                        <%= student.getCreatedAt() != null ?
                                            student.getCreatedAt().toString().substring(0, 10) : "N/A" %>
                                    </td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="action-btn view" title="View Profile">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="action-btn edit" title="Edit">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="action-btn delete" title="Delete">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <% } %>
                            </tbody>
                        </table>
                    </div>

                    <!-- Stats Summary -->
                    <div class="stats-summary">
                        <div class="stat-card">
                            <h4>Year Distribution</h4>
                            <div class="year-stats">
                                <%
                                    int currentYear = java.time.Year.now().getValue();
                                    int past = 0, current = 0, future = 0;
                                    for (Student s : students) {
                                        if (s.getYear() < currentYear) past++;
                                        else if (s.getYear() == currentYear) current++;
                                        else future++;
                                    }
                                %>
                                <div class="year-stat">
                                    <span class="dot past"></span>
                                    <span>Past Years: <%= past %></span>
                                </div>
                                <div class="year-stat">
                                    <span class="dot current"></span>
                                    <span>Current Year: <%= current %></span>
                                </div>
                                <div class="year-stat">
                                    <span class="dot future"></span>
                                    <span>Future Years: <%= future %></span>
                                </div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <h4>Export Data</h4>
                            <div class="export-options">
                                <button class="export-btn">
                                    <i class="fas fa-file-csv"></i> CSV
                                </button>
                                <button class="export-btn">
                                    <i class="fas fa-file-pdf"></i> PDF
                                </button>
                                <button class="export-btn">
                                    <i class="fas fa-print"></i> Print
                                </button>
                            </div>
                        </div>
                    </div>
                <% } %>
            </div>
        </main>

        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <h3><i class="fas fa-database"></i> Student Database</h3>
                    <p>Real-time student information system</p>
                </div>
                <div class="footer-section">
                    <h4>Actions</h4>
                    <a href="index.jsp"><i class="fas fa-plus-circle"></i> Add New Student</a>
                    <a href="#"><i class="fas fa-download"></i> Export All Data</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Showing <%= students != null ? students.size() : 0 %> student records | Last updated: <%= new java.util.Date() %></p>
            </div>
        </footer>
    </div>

    <!-- Back to Top -->
    <a href="#" class="back-to-top">
        <i class="fas fa-arrow-up"></i>
    </a>

    <script src="js/script.js"></script>
</body>
</html>