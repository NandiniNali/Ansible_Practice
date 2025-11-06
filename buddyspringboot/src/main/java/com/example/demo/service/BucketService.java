package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.BucketEntity;

public interface BucketService {
    BucketEntity addBucket(BucketEntity bucket);
    List<BucketEntity> getAllBuckets();
    BucketEntity getBucketById(int id);
    BucketEntity updateBucket(BucketEntity bucket);
    void deleteBucketById(int id);
    List<BucketEntity> getBucketsByStatus(String status);
}
