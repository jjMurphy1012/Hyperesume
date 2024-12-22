package com.hyperesume.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is mandatory")
    @Column(name = "first_name")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    @Column(name = "last_name")
    private String lastName;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    private String phone;

    @Column(name = "user_id")
    private Long userId;

    @Column(columnDefinition = "json")
    private String education;

    @Column(columnDefinition = "json")
    private String skills;

    @Column(columnDefinition = "json")
    private String experience;

    @Column(columnDefinition = "json")
    private String projects;

    @Column(columnDefinition = "json")
    private String certifications;

    // Default constructor
    public Profile() {
        this.education = "[]";
        this.skills = "{}";
        this.experience = "[]";
        this.projects = "[]";
        this.certifications = "[]";
    }

    // Parameterized constructor
    public Profile(String firstName, String lastName, String email, String phone, Long userId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.userId = userId;
        // Initialize JSON fields
        this.education = "[]";
        this.skills = "{}";
        this.experience = "[]";
        this.projects = "[]";
        this.certifications = "[]";
    }

    // Getter and Setter methods for all fields

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEducation() {
        return education != null ? education : "[]";
    }

    public String getSkills() {
        return skills != null ? skills : "{}";
    }

    public String getExperience() {
        return experience != null ? experience : "[]";
    }

    public String getProjects() {
        return projects != null ? projects : "[]";
    }

    public String getCertifications() {
        return certifications != null ? certifications : "[]";
    }

    public void setEducation(String education) {
        this.education = education != null ? education : "[]";
    }

    public void setSkills(String skills) {
        this.skills = skills != null ? skills : "{}";
    }

    public void setExperience(String experience) {
        this.experience = experience != null ? experience : "[]";
    }

    public void setProjects(String projects) {
        this.projects = projects != null ? projects : "[]";
    }

    public void setCertifications(String certifications) {
        this.certifications = certifications != null ? certifications : "[]";
    }

}