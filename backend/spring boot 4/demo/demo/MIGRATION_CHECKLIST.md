# Spring Boot 3 to 4 Migration Checklist

## Overview
This checklist will guide you through the migration process from Spring Boot 3 to Spring Boot 4.

## Before Migration
- [x] Application is working correctly on Spring Boot 3.5.7
- [ ] All tests are passing
- [ ] Document current application behavior
- [ ] Create a backup branch in version control

## Migration Steps

### 1. Update Dependencies (build.gradle)

#### Update Spring Boot Version
```groovy
// FROM:
id 'org.springframework.boot' version '3.5.7'

// TO:
id 'org.springframework.boot' version '4.0.0' // Use latest 4.x version
```

#### Check Dependency Management
```groovy
// Ensure dependency management plugin is up to date
id 'io.spring.dependency-management' version '1.1.x'
```

### 2. Java Version
Spring Boot 4 requires Java 21 or later (already configured in this project).

### 3. Update Dependencies
After changing the Spring Boot version, check for:
- [ ] Lombok compatibility
- [ ] H2 database compatibility
- [ ] Jakarta EE namespace changes (if any)

### 4. Security Configuration Changes

#### Review SecurityFilterChain
Check if there are any changes to the security DSL in Spring Boot 4:
- [ ] `authorizeHttpRequests()` method
- [ ] `httpBasic()` configuration
- [ ] `csrf()` configuration
- [ ] `sessionManagement()` configuration

**File to review:** `src/main/java/com/example/demo/config/SecurityConfig.java`

### 5. JPA/Hibernate Changes

#### Check Hibernate Version
Spring Boot 4 may use Hibernate 7.x. Review:
- [ ] Entity annotations
- [ ] Repository queries
- [ ] `@PrePersist` and `@PreUpdate` callbacks
- [ ] Dialect configuration

**Files to review:**
- `src/main/java/com/example/demo/model/User.java`
- `src/main/java/com/example/demo/model/Product.java`

### 6. Validation Changes

#### Jakarta Validation
Ensure all validation annotations are compatible:
- [ ] `@NotBlank`
- [ ] `@NotNull`
- [ ] `@Email`
- [ ] `@Min`
- [ ] `@Size`

**Files to review:**
- `src/main/java/com/example/demo/dto/UserDto.java`
- `src/main/java/com/example/demo/dto/ProductDto.java`

### 7. Controller Changes

#### REST Controller Annotations
Review if there are any changes to:
- [ ] `@RestController`
- [ ] `@RequestMapping`
- [ ] `@PathVariable`
- [ ] `@RequestParam`
- [ ] `@RequestBody`
- [ ] `@Valid`

**Files to review:**
- `src/main/java/com/example/demo/controller/UserController.java`
- `src/main/java/com/example/demo/controller/ProductController.java`

### 8. Exception Handling

#### Global Exception Handler
Check if exception handling needs updates:
- [ ] `@RestControllerAdvice`
- [ ] `@ExceptionHandler`
- [ ] Error response structure

**File to review:** `src/main/java/com/example/demo/exception/GlobalExceptionHandler.java`

### 9. Application Properties

#### Review application.yaml
Check if any properties are deprecated or changed:
- [ ] Datasource configuration
- [ ] JPA properties
- [ ] Security properties
- [ ] Server configuration
- [ ] Actuator endpoints

**File to review:** `src/main/resources/application.yaml`

### 10. Actuator Changes

#### Endpoint Changes
Review if actuator endpoints have changed:
- [ ] Health endpoint
- [ ] Info endpoint
- [ ] Metrics endpoint

### 11. Build and Test

#### After making changes:
```bash
# Clean build
.\gradlew.bat clean build

# Run tests
.\gradlew.bat test

# Start application
.\gradlew.bat bootRun
```

### 12. Verify Functionality

#### Test all endpoints:
- [ ] GET /api/users
- [ ] GET /api/users/{id}
- [ ] POST /api/users
- [ ] PUT /api/users/{id}
- [ ] DELETE /api/users/{id}
- [ ] GET /api/products
- [ ] GET /api/products/{id}
- [ ] POST /api/products
- [ ] PUT /api/products/{id}
- [ ] DELETE /api/products/{id}
- [ ] GET /actuator/health
- [ ] H2 Console access

Use the `test-api.bat` script to verify endpoints.

### 13. Common Issues and Solutions

#### Issue: Build Failures
- Check Gradle compatibility with Spring Boot 4
- Verify Java version is 21+
- Clear Gradle cache: `.\gradlew.bat clean --refresh-dependencies`

#### Issue: Security Configuration Errors
- Review Spring Security 6.x documentation
- Check if method chaining has changed
- Verify lambda DSL syntax

#### Issue: JPA/Hibernate Errors
- Check Hibernate 7.x migration guide
- Review dialect configuration
- Verify entity annotations

#### Issue: Test Failures
- Update test dependencies
- Review security test configuration
- Check MockMvc setup

### 14. Performance Testing

After migration:
- [ ] Compare startup time
- [ ] Test response times
- [ ] Check memory usage
- [ ] Review logs for warnings

### 15. Documentation

Update documentation:
- [ ] README.md with new Spring Boot version
- [ ] Update API documentation
- [ ] Document any breaking changes
- [ ] Update dependency list

## Resources

### Official Documentation
- Spring Boot 4 Release Notes
- Spring Boot 4 Migration Guide
- Spring Framework 7.x Documentation
- Hibernate 7.x Migration Guide

### Testing Tools
- Postman or Insomnia for API testing
- JMeter for performance testing
- Spring Boot DevTools for development

## Notes
- Take incremental steps
- Test thoroughly after each change
- Keep the Spring Boot 3 version in a separate branch
- Document any custom changes or workarounds

---

**Good luck with your migration! 🚀**

