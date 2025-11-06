
**Happy Coding! 🚀**
# MySQL Database Setup Guide

## Prerequisites
- MySQL Server 8.0 or higher installed
- MySQL running on `localhost:3306`

## Configuration

### Update Application Properties
The default configuration in `application.yaml` is:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/springboot_demo?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: root
```

**⚠️ IMPORTANT: Update the username and password with your MySQL credentials!**

You can either:
1. Edit `src/main/resources/application.yaml`
2. Or create `application-local.yaml` with your credentials (recommended)

### Option 1: Edit application.yaml directly
```yaml
spring:
  datasource:
    username: your_mysql_username
    password: your_mysql_password
```

### Option 2: Create application-local.yaml (Recommended)
Create a new file: `src/main/resources/application-local.yaml`

```yaml
spring:
  datasource:
    username: your_mysql_username
    password: your_mysql_password
```

Then run with: `.\gradlew.bat bootRun --args='--spring.profiles.active=local'`

## Database Setup

### Method 1: Automatic (Recommended for Development)
The application is configured with:
```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: update
```

This will **automatically create** tables when the application starts. Just:

1. Make sure MySQL is running
2. Update credentials in `application.yaml`
3. Run the application: `.\gradlew.bat bootRun`

The database and tables will be created automatically!

### Method 2: Manual SQL Script

If you prefer to manually create the database and tables:

#### Step 1: Run the Setup Script
```bash
mysql -u root -p < database-setup.sql
```

Or using MySQL Workbench:
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open `database-setup.sql`
4. Execute the script

#### Step 2: Verify Database Creation
```sql
USE springboot_demo;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM products;
```

You should see:
- ✅ 2 tables created: `users` and `products`
- ✅ 3 sample users
- ✅ 5 sample products

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6)
);
```

### Products Table
```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6)
);
```

## Sample Data

### Users
- **johndoe** (john.doe@example.com) - Active
- **janedoe** (jane.doe@example.com) - Active
- **bobsmith** (bob.smith@example.com) - Inactive

### Products
- **Laptop** - $999.99 (25 in stock)
- **Wireless Mouse** - $29.99 (100 in stock)
- **USB-C Cable** - $14.99 (Out of stock)
- **Mechanical Keyboard** - $149.99 (50 in stock)
- **Monitor** - $399.99 (15 in stock)

## Hibernate DDL-Auto Options

You can change the `ddl-auto` setting in `application.yaml`:

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: <option>
```

### Options:
- **`update`** (Current): Creates tables if they don't exist, updates schema if needed. **Best for development.**
- **`create`**: Drops and recreates tables on every startup. **Use with caution!**
- **`create-drop`**: Creates tables on startup, drops on shutdown. **For testing only.**
- **`validate`**: Only validates schema, doesn't change anything. **Use in production.**
- **`none`**: Disables auto schema management. **Manual control.**

## Troubleshooting

### Issue: "Access denied for user"
- Check your MySQL username and password in `application.yaml`
- Verify the user has privileges: `GRANT ALL PRIVILEGES ON springboot_demo.* TO 'your_user'@'localhost';`

### Issue: "Communications link failure"
- Verify MySQL is running: `mysql --version`
- Check MySQL port (default: 3306)
- Update the connection URL if using a different port

### Issue: "Unknown database 'springboot_demo'"
- The application should create it automatically with `createDatabaseIfNotExist=true`
- Or manually create: `CREATE DATABASE springboot_demo;`

### Issue: "Table already exists"
- If you ran the SQL script and also have `ddl-auto: create`, change it to `update`

## Cleanup

To remove all data and start fresh:

### Option 1: Drop tables only
```bash
mysql -u root -p < database-cleanup.sql
```

### Option 2: Drop entire database
```sql
DROP DATABASE springboot_demo;
```

Then restart the application to recreate everything.

## Production Recommendations

For production environments:
1. ✅ Use `ddl-auto: validate` or `none`
2. ✅ Use database migration tools (Flyway or Liquibase)
3. ✅ Store credentials in environment variables
4. ✅ Use connection pooling (HikariCP is default)
5. ✅ Enable SSL for database connections
6. ✅ Regular backups

## Connection Pooling

HikariCP is automatically configured. You can customize in `application.yaml`:

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

## Verification

After setup, verify the application works:

```bash
# Start the application
.\gradlew.bat bootRun

# Test the API
curl -u admin:admin123 http://localhost:8080/api/users
curl -u admin:admin123 http://localhost:8080/api/products
```

You should see the sample data in the responses!

---

