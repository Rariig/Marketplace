package com.example.marketplace.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ProductTest {

    @Test
    public void testProductCreation() {
        // Arrange
        Product product = new Product();
        product.setName("Laptop");
        product.setDescription("A high-performance laptop");
        product.setPrice(1200.00);
        product.setStockQuantity(100);

        // Act
        String name = product.getName();
        String description = product.getDescription();
        Double price = product.getPrice();
        Integer stockQuantity = product.getStockQuantity();

        // Assert
        assertEquals("Laptop", name);
        assertEquals("A high-performance laptop", description);
        assertEquals(1200.00, price);
        assertEquals(100, stockQuantity);
    }
}
