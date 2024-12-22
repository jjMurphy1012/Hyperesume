package com.hyperesume.controller;

import com.fasterxml.jackson.databind.ObjectMapper; // Add this import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Add this import
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.hyperesume.model.Profile;
import com.hyperesume.service.ProfileService;
import com.hyperesume.service.UserService;
import jakarta.validation.Valid;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<Profile> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            Long userId = userService.findByUsername(userDetails.getUsername()).getId();
            Optional<Profile> optionalProfile = profileService.getProfileByUserId(userId);

            Profile profile = optionalProfile.orElseGet(() -> {
                // Create a new profile with non-null values for required fields
                Profile newProfile = new Profile();
                newProfile.setUserId(userId);
                // Set default values for required fields using the username
                String username = userDetails.getUsername();
                newProfile.setFirstName(username); // Set a default value
                newProfile.setLastName("User"); // Changed from empty string to "User"
                newProfile.setEmail(username + "@example.com"); // Set a default value
                newProfile.setPhone(""); // Optional field

                // Initialize JSON fields with empty arrays/objects
                newProfile.setEducation("[]");
                newProfile.setSkills("{}");
                newProfile.setExperience("[]");
                newProfile.setProjects("[]");
                newProfile.setCertifications("[]");

                return profileService.saveProfile(newProfile);
            });

            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Profile> saveProfile(
            @Valid @RequestBody Profile profile,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            Long userId = userService.findByUsername(userDetails.getUsername()).getId();
            if (!userId.equals(profile.getUserId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            // Validate JSON strings only if they're not null
            try {
                if (profile.getEducation() != null) {
                    objectMapper.readTree(profile.getEducation());
                }
                if (profile.getSkills() != null) {
                    objectMapper.readTree(profile.getSkills());
                }
                if (profile.getExperience() != null) {
                    objectMapper.readTree(profile.getExperience());
                }
                if (profile.getProjects() != null) {
                    objectMapper.readTree(profile.getProjects());
                }
                if (profile.getCertifications() != null) {
                    objectMapper.readTree(profile.getCertifications());
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(null);
            }

            Profile savedProfile = profileService.saveProfile(profile);
            return ResponseEntity.ok(savedProfile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}