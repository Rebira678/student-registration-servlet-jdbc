package com.studentapp.controller;

import com.studentapp.dao.StudentDAO;
import com.studentapp.model.Student;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/showALL")  // Access via http://localhost:8080/StudentRegistrationApp_/showALL
public class StudentViewServlet extends HttpServlet {

    private StudentDAO studentDAO;

    @Override
    public void init() {
        studentDAO = new StudentDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Fetch all students
        List<Student> students = studentDAO.getAllStudents();

        // Set as request attribute
        request.setAttribute("students", students);

        // Forward to JSP
        request.getRequestDispatcher("showALL.jsp").forward(request, response);
    }
}
