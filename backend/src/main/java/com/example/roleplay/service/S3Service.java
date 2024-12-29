package com.example.roleplay.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class S3Service {

    @Autowired
    private AmazonS3 amazonS3;

    private final String BUCKET_NAME = "roleplayimages"; // Replace with your actual S3 bucket name

    public String uploadFile(File file) {
        amazonS3.putObject(new PutObjectRequest(BUCKET_NAME, file.getName(), file));
        return amazonS3.getUrl(BUCKET_NAME, file.getName()).toString();
    }

    // You can add methods for downloading and deleting images as well
}
