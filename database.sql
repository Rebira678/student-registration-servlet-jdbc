CREATE DATABASE IF NOT EXISTS student_registration_db;
USE student_registration_db;

CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Insert some sample data
INSERT INTO students (name, email, year) VALUES
('John Doe', 'john@example.com', 2023),
('Jane Smith', 'jane@example.com', 2024),
('Bob Johnson', 'bob@example.com', 2022);
