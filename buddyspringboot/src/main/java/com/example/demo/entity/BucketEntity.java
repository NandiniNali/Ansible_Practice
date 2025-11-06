package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bucket_table")
public class BucketEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "goal", nullable = false, length = 100)
    private String goal;

    @Column(name = "goal_description", nullable = false, length = 255)
    private String goalDescription;

    @Column(name = "friend_name", nullable = false, length = 50)
    private String friendName;

    @Column(name = "status", nullable = false, length = 10)
    private String status; // Done / Pending

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getGoalDescription() {
        return goalDescription;
    }

    public void setGoalDescription(String goalDescription) {
        this.goalDescription = goalDescription;
    }

    public String getFriendName() {
        return friendName;
    }

    public void setFriendName(String friendName) {
        this.friendName = friendName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
