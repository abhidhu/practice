package com.spring.batch.spring.batch.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.stereotype.Component;

@Component
public class JobComplitionNotificationImpl implements JobExecutionListener {

  private Logger logger = LoggerFactory.getLogger(JobComplitionNotificationImpl.class);

  @Override
  public void beforeJob(org.springframework.batch.core.JobExecution jobExecution) {
    // Logic to execute before the job starts
    logger.info("Job started");
  }

  @Override
  public void afterJob(org.springframework.batch.core.JobExecution jobExecution) {
    // Logic to execute after the job completes
    if (jobExecution.getStatus().isUnsuccessful()) {
      logger.error("Job failed with status: " + jobExecution.getStatus());
      logger.error("Job failed with exception: " + jobExecution.getAllFailureExceptions());
    } else {
      logger.info("Job completed successfully with status: " + jobExecution.getStatus());
    }
  }
}
