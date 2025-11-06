@echo off
REM API Testing Script for Spring Boot 3 Demo Application
REM Make sure the application is running before executing this script

echo ========================================
echo Spring Boot 3 API Testing Script
echo ========================================
echo.
echo Make sure the application is running on http://localhost:8080
echo Default credentials: admin / admin123
echo.
pause

echo.
echo ========================================
echo 1. Testing Health Endpoint (No Auth)
echo ========================================
curl http://localhost:8080/actuator/health
echo.
echo.

echo ========================================
echo 2. Getting All Users
echo ========================================
curl -u admin:admin123 http://localhost:8080/api/users
echo.
echo.

echo ========================================
echo 3. Getting All Products
echo ========================================
curl -u admin:admin123 http://localhost:8080/api/products
echo.
echo.

echo ========================================
echo 4. Getting Active Users
echo ========================================
curl -u admin:admin123 http://localhost:8080/api/users/active
echo.
echo.

echo ========================================
echo 5. Getting Available Products
echo ========================================
curl -u admin:admin123 http://localhost:8080/api/products/available
echo.
echo.

echo ========================================
echo 6. Creating a New User
echo ========================================
curl -u admin:admin123 -X POST http://localhost:8080/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"newuser\",\"email\":\"newuser@example.com\",\"fullName\":\"New User\",\"active\":true}"
echo.
echo.

echo ========================================
echo 7. Creating a New Product
echo ========================================
curl -u admin:admin123 -X POST http://localhost:8080/api/products ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Headphones\",\"description\":\"Noise-cancelling headphones\",\"price\":199.99,\"stockQuantity\":30,\"available\":true}"
echo.
echo.

echo ========================================
echo 8. Searching Products by Name
echo ========================================
curl -u admin:admin123 "http://localhost:8080/api/products/search?name=laptop"
echo.
echo.

echo ========================================
echo Testing Complete!
echo ========================================
pause

