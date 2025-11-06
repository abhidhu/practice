package com.example.demo.config;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    public CommandLineRunner initializeData(UserRepository userRepository, ProductRepository productRepository) {
        return args -> {
            log.info("Initializing sample data...");

            // Create sample users
            User user1 = new User();
            user1.setUsername("johndoe");
            user1.setEmail("john.doe@example.com");
            user1.setFullName("John Doe");
            user1.setActive(true);
            userRepository.save(user1);

            User user2 = new User();
            user2.setUsername("janedoe");
            user2.setEmail("jane.doe@example.com");
            user2.setFullName("Jane Doe");
            user2.setActive(true);
            userRepository.save(user2);

            User user3 = new User();
            user3.setUsername("bobsmith");
            user3.setEmail("bob.smith@example.com");
            user3.setFullName("Bob Smith");
            user3.setActive(false);
            userRepository.save(user3);

            log.info("Created {} users", userRepository.count());

            // Create sample products
            Product product1 = new Product();
            product1.setName("Laptop");
            product1.setDescription("High-performance laptop with 16GB RAM");
            product1.setPrice(new BigDecimal("999.99"));
            product1.setStockQuantity(25);
            product1.setAvailable(true);
            productRepository.save(product1);

            Product product2 = new Product();
            product2.setName("Wireless Mouse");
            product2.setDescription("Ergonomic wireless mouse");
            product2.setPrice(new BigDecimal("29.99"));
            product2.setStockQuantity(100);
            product2.setAvailable(true);
            productRepository.save(product2);

            Product product3 = new Product();
            product3.setName("USB-C Cable");
            product3.setDescription("1-meter USB-C charging cable");
            product3.setPrice(new BigDecimal("14.99"));
            product3.setStockQuantity(0);
            product3.setAvailable(false);
            productRepository.save(product3);

            Product product4 = new Product();
            product4.setName("Mechanical Keyboard");
            product4.setDescription("RGB mechanical keyboard with blue switches");
            product4.setPrice(new BigDecimal("149.99"));
            product4.setStockQuantity(50);
            product4.setAvailable(true);
            productRepository.save(product4);

            Product product5 = new Product();
            product5.setName("Monitor");
            product5.setDescription("27-inch 4K monitor");
            product5.setPrice(new BigDecimal("399.99"));
            product5.setStockQuantity(15);
            product5.setAvailable(true);
            productRepository.save(product5);

            log.info("Created {} products", productRepository.count());
            log.info("Sample data initialization completed!");
        };
    }
}

