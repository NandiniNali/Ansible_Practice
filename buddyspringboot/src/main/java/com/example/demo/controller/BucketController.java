package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.BucketEntity;
import com.example.demo.service.BucketService;

@RestController
@RequestMapping("/bucketapi")
@CrossOrigin(origins = "*")
public class BucketController {

    @Autowired
    private BucketService bucketService;

    @GetMapping("/")
    public String home() {
        return "BuddyBucket API is running!";
    }

    // Add new bucket entry
    @PostMapping("/add")
    public ResponseEntity<BucketEntity> addBucket(@RequestBody BucketEntity bucket) {
        BucketEntity saved = bucketService.addBucket(bucket);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Get all bucket entries
    @GetMapping("/all")
    public ResponseEntity<List<BucketEntity>> getAllBuckets() {
        List<BucketEntity> list = bucketService.getAllBuckets();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // Get bucket entries by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<BucketEntity>> getBucketsByStatus(@PathVariable String status) {
        List<BucketEntity> list = bucketService.getBucketsByStatus(status);
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // Update bucket entry
    @PutMapping("/update")
    public ResponseEntity<?> updateBucket(@RequestBody BucketEntity bucket) {
        BucketEntity existing = bucketService.getBucketById(bucket.getId());
        if (existing != null) {
            BucketEntity updated = bucketService.updateBucket(bucket);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Bucket entry with ID " + bucket.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Delete bucket entry
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBucket(@PathVariable int id) {
        BucketEntity existing = bucketService.getBucketById(id);
        if (existing != null) {
            bucketService.deleteBucketById(id);
            return new ResponseEntity<>("Bucket entry with ID " + id + " deleted.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Bucket entry with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
