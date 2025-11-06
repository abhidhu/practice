    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6),

    INDEX idx_name (name),
    INDEX idx_available (available),
    INDEX idx_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert Sample Data - Users
-- ============================================
INSERT INTO users (username, email, full_name, active, created_at, updated_at) VALUES
('johndoe', 'john.doe@example.com', 'John Doe', TRUE, NOW(), NOW()),
('janedoe', 'jane.doe@example.com', 'Jane Doe', TRUE, NOW(), NOW()),
('bobsmith', 'bob.smith@example.com', 'Bob Smith', FALSE, NOW(), NOW());

-- ============================================
-- Insert Sample Data - Products
-- ============================================
INSERT INTO products (name, description, price, stock_quantity, available, created_at, updated_at) VALUES
('Laptop', 'High-performance laptop with 16GB RAM', 999.99, 25, TRUE, NOW(), NOW()),
('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 100, TRUE, NOW(), NOW()),
('USB-C Cable', '1-meter USB-C charging cable', 14.99, 0, FALSE, NOW(), NOW()),
('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 149.99, 50, TRUE, NOW(), NOW()),
('Monitor', '27-inch 4K monitor', 399.99, 15, TRUE, NOW(), NOW());

-- ============================================
-- Verify Data
-- ============================================
SELECT 'Users Table:' AS '';
SELECT * FROM users;

SELECT 'Products Table:' AS '';
SELECT * FROM products;

-- ============================================
-- Show Table Structures
-- ============================================
SELECT 'Users Table Structure:' AS '';
DESCRIBE users;

SELECT 'Products Table Structure:' AS '';
DESCRIBE products;
-- ============================================
-- Spring Boot 3 Demo Application - MySQL Setup
-- ============================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS springboot_demo
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE springboot_demo;

-- ============================================
-- Create Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6),

    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Create Products Table
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),

