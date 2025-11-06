# Spring Boot 3 to 4 Migration Practice Project

This is a **fully functional Spring Boot 3.5.7 application** designed for practicing migration to Spring Boot 4.

## 📋 Project Overview

This application is a RESTful API service that manages Users and Products with the following features:

### Features Implemented
- ✅ **REST API** with CRUD operations
- ✅ **Spring Data JPA** with H2 in-memory database
- ✅ **Bean Validation** with Jakarta Validation
- ✅ **Spring Security** with HTTP Basic Authentication
- ✅ **Global Exception Handling** with custom exceptions
- ✅ **Lombok** for reducing boilerplate code
- ✅ **Spring Boot Actuator** for monitoring
- ✅ **H2 Console** for database management
- ✅ **Layered Architecture** (Controller → Service → Repository)
- ✅ **Sample Data Initialization** on startup

## 🛠️ Technology Stack

- **Java**: 21
- **Spring Boot**: 3.5.7
- **Database**: H2 (in-memory)
- **Build Tool**: Gradle
- **ORM**: Hibernate/JPA
- **Security**: Spring Security 6.x
- **Validation**: Jakarta Validation 3.x

## 🚀 Getting Started

### Prerequisites
- Java 21 or higher
- No additional setup required (uses embedded H2 database)

### Running the Application

**Using Gradle Wrapper (Windows):**
```bash
gradlew.bat bootRun
```

**Or build and run the JAR:**
```bash
gradlew.bat build
java -jar build\libs\demo-0.0.1-SNAPSHOT.jar
```

The application will start on **http://localhost:8080**

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 📚 API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| GET | `/api/users/username/{username}` | Get user by username |
| GET | `/api/users/active` | Get all active users |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/products/available` | Get available products |
| GET | `/api/products/search?name={name}` | Search products by name |
| GET | `/api/products/price-range?minPrice=X&maxPrice=Y` | Get products by price range |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

### Other Endpoints

| Endpoint | Description | Auth Required |
|----------|-------------|---------------|
| `/h2-console` | H2 Database Console | No |
| `/actuator/health` | Health check | No |
| `/actuator/info` | Application info | No |
| `/actuator/metrics` | Metrics | No |

## 🧪 Testing the API

### Using cURL (with authentication)

**Get all users:**
```bash
curl -u admin:admin123 http://localhost:8080/api/users
```

**Create a new user:**
```bash
curl -u admin:admin123 -X POST http://localhost:8080/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"fullName\":\"Test User\",\"active\":true}"
```

**Get all products:**
```bash
curl -u admin:admin123 http://localhost:8080/api/products
```

**Search products:**
```bash
curl -u admin:admin123 "http://localhost:8080/api/products/search?name=laptop"
```

### Sample Request Bodies

**User:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "active": true
}
```

**Product:**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "stockQuantity": 50,
  "available": true
}
```

## 🗄️ Database Access

### H2 Console
- **URL**: http://localhost:8080/h2-console
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`

## 📦 Project Structure

```
src/main/java/com/example/demo/
├── SpringBoot4MigrationApplication.java  # Main application class
├── config/
│   ├── CorsConfig.java                   # CORS configuration
│   ├── DataInitializer.java              # Sample data initialization
│   └── SecurityConfig.java               # Security configuration
├── controller/
│   ├── ProductController.java            # Product REST endpoints
│   └── UserController.java               # User REST endpoints
├── dto/
│   ├── ProductDto.java                   # Product data transfer object
│   └── UserDto.java                      # User data transfer object
├── exception/
│   ├── DuplicateResourceException.java   # Custom exception
│   ├── ErrorResponse.java                # Error response model
│   ├── GlobalExceptionHandler.java       # Global exception handler
│   └── ResourceNotFoundException.java    # Custom exception
├── model/
│   ├── Product.java                      # Product entity
│   └── User.java                         # User entity
├── repository/
│   ├── ProductRepository.java            # Product repository
│   └── UserRepository.java               # User repository
└── service/
    ├── ProductService.java               # Product business logic
    └── UserService.java                  # User business logic
```

## 🎯 Sample Data

The application initializes with sample data:

**Users:**
- johndoe (john.doe@example.com) - Active
- janedoe (jane.doe@example.com) - Active
- bobsmith (bob.smith@example.com) - Inactive

**Products:**
- Laptop - $999.99
- Wireless Mouse - $29.99
- USB-C Cable - $14.99 (Out of stock)
- Mechanical Keyboard - $149.99
- Monitor - $399.99

## 🔄 Migration to Spring Boot 4

This application is ready for migration practice. Key areas to focus on during migration:

1. **Dependency Updates**
   - Update Spring Boot version to 4.x
   - Update related dependencies

2. **Jakarta EE Changes**
   - Namespace changes (if any in Spring Boot 4)

3. **Security Configuration**
   - Review security DSL changes
   - Update authentication/authorization patterns

4. **JPA/Hibernate Changes**
   - Check for Hibernate 7.x changes
   - Review entity mapping changes

5. **Deprecated APIs**
   - Replace any deprecated Spring Boot 3 APIs
   - Update to new recommended approaches

6. **Testing**
   - Ensure all endpoints work after migration
   - Verify database operations
   - Test security configurations

## 📝 Notes

- The application uses **HTTP Basic Authentication** for simplicity
- **H2 database** data is lost on restart (in-memory)
- **CSRF is disabled** for easier API testing
- All timestamps are in the system's local timezone
- Validation errors return detailed field-level messages

## 🐛 Troubleshooting

**Port already in use:**
Change the port in `application.yaml`:
```yaml
server:
  port: 8081
```

**Database issues:**
The H2 database is recreated on each startup (ddl-auto: create-drop)

## 📄 License

This is a demo project for educational purposes.

---

**Happy Learning! 🚀**

When you're ready, start migrating this application to Spring Boot 4!

