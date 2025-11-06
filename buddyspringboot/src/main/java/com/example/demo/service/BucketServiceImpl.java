package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.BucketEntity;
import com.example.demo.repository.BucketRepository;

@Service
public class BucketServiceImpl implements BucketService {

    @Autowired
    private BucketRepository repo;

    public BucketEntity addBucket(BucketEntity bucket) {
        return repo.save(bucket);
    }

    public List<BucketEntity> getAllBuckets() {
        return repo.findAll();
    }

    public BucketEntity getBucketById(int id) {
        return repo.findById(id).orElse(null);
    }

    public BucketEntity updateBucket(BucketEntity bucket) {
        return repo.save(bucket);
    }

    public void deleteBucketById(int id) {
        repo.deleteById(id);
    }

    public List<BucketEntity> getBucketsByStatus(String status) {
        return repo.findByStatus(status);
    }
}
