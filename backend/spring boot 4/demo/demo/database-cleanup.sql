-- ============================================
-- Cleanup Script - Drop All Tables
-- ============================================

USE springboot_demo;

-- Drop tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Optionally, drop the entire database
-- DROP DATABASE IF EXISTS springboot_demo;

SELECT 'Database cleanup completed!' AS '';

