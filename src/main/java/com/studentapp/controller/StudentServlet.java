package com.studentapp.controller;

import com.studentapp.dao.StudentDAO;
import com.studentapp.model.Student;
import com.studentapp.util.Validator;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/register")
public class StudentServlet extends HttpServlet {
    private StudentDAO studentDAO;

    @Override
    public void init() {
        studentDAO = new StudentDAO();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String yearStr = request.getParameter("year");

        boolean isValid = true;
        StringBuilder errorMessage = new StringBuilder();

        if (!Validator.isValidName(name)) {
            isValid = false;
            errorMessage.append("Invalid name. Must be at least 2 characters.<br>");
        }

        if (!Validator.isValidEmail(email)) {
            isValid = false;
            errorMessage.append("Invalid email format.<br>");
        }

        int year = 0;
        try {
            year = Integer.parseInt(yearStr);
            if (!Validator.isValidYear(year)) {
                isValid = false;
                errorMessage.append("Year must be between 2000 and current year + 5.<br>");
            }
        } catch (NumberFormatException e) {
            isValid = false;
            errorMessage.append("Year must be a valid number.<br>");
        }

        if (studentDAO.isEmailExists(email)) {
            isValid = false;
            errorMessage.append("Email already exists.<br>");
        }

        if (!isValid) {
            request.setAttribute("error", errorMessage.toString());
            request.getRequestDispatcher("/index.jsp").forward(request, response);
            return;
        }

        Student student = new Student(name, email, year);
        boolean success = studentDAO.insertStudent(student);

        if (success) {
            request.setAttribute("success", "Student registered successfully!");
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        } else {
            request.setAttribute("error", "Registration failed. Please try again.");
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("index.jsp");
    }
}
