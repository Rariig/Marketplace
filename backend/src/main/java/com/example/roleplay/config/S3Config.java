package com.example.roleplay.config;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Bean
    public AmazonS3 amazonS3() {
        // The AWS SDK will automatically pick up the access key and secret key from environment variables, AWS config file, or IAM role.
        return AmazonS3ClientBuilder.standard()
                .withRegion("eu-north-1")  // Replace with your region if needed
                .build();
    }
}

