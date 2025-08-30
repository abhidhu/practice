package com.spring.batch.spring.batch.config;

import javax.annotation.processing.Processor;
import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.spring.batch.spring.batch.domain.Product;

@Configuration
public class BatchConfig {

  @Bean
  public Job jobBean(JobRepository jobRepository, JobComplitionNotificationImpl listener, Step steps) {
    return new JobBuilder("myJob", jobRepository)
        .listener(listener)
        .start(steps).build();
  }

  @Bean
  public Step steps(JobRepository jobRepository, DataSourceTransactionManager transactionManager, FlatFileItemReader<Product> reader,
      ItemProcessor<Product, Product> processor, ItemWriter<Product> writer) {
    return new StepBuilder("jobStep", jobRepository)
        .<Product, Product>chunk(5, transactionManager )
        .reader(reader)
        .processor(processor)
        .writer(writer)
        .build();
  }

  // Reader
  @Bean
  public FlatFileItemReader<Product> reader() {
    return new FlatFileItemReaderBuilder<Product>()
        .name("itemREader")
        .resource(new ClassPathResource("data.csv"))
        .delimited()
        .names("productId", "productName", "productPrice")
        .targetType(Product.class)
        .build();
  }

//writter
@Bean
public ItemWriter<Product> itemWriter(DataSource dataSource) {
  return new JdbcBatchItemWriterBuilder<Product>().sql("insert into products(product_id, product_name, product_price) values (:productId, :productName, :productPrice)").dataSource(dataSource)
      .beanMapped().build();
}

  //Processor
  @Bean
  public ItemProcessor<Product, Product> itomProcessor(){
    return new CustomItomProcessor();
  }
}
