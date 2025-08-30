package com.spring.batch.spring.batch.domain;


public class Product {
  private Long productId;
  private String productName;
  private String productDescription;
  private Double productPrice;

  public Product() {
    // Default constructor
  }

  public Product(Long productId, String productName, String productDescription, Double price) {
    this.productId = productId;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = price;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public String getProductDescription() {
    return productDescription;
  }

  public void setProductDescription(String productDescription) {
    this.productDescription = productDescription;
  }

  public Double getPrice() {
    return productPrice;
  }

  public void setPrice(Double price) {
    this.productPrice = price;
  }
}
