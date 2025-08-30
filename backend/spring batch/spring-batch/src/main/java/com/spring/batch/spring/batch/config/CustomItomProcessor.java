package com.spring.batch.spring.batch.config;

import org.springframework.batch.item.ItemProcessor;

import com.spring.batch.spring.batch.domain.Product;

public class CustomItomProcessor implements ItemProcessor<Product, Product> {

  @Override
  public Product process(Product item) throws Exception {
    return item;
  }

}
