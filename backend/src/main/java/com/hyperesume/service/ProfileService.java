package com.hyperesume.service;

import com.hyperesume.model.Profile;
import com.hyperesume.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    // Fetch profile by userId
    public Optional<Profile> getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }

    // Save profile
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    // Delete profile by userId
    public void deleteProfileByUserId(Long userId) {
        profileRepository.deleteByUserId(userId);
    }

    // Update profile
    public Profile updateProfile(Long userId, Profile profile) {
        Optional<Profile> existingProfile = getProfileByUserId(userId);
        if (existingProfile.isPresent()) {
            Profile updatedProfile = existingProfile.get();
            updatedProfile.setFirstName(profile.getFirstName());
            updatedProfile.setLastName(profile.getLastName());
            updatedProfile.setEmail(profile.getEmail());
            updatedProfile.setPhone(profile.getPhone());
            return profileRepository.save(updatedProfile);
        } else {
            // If no profile exists, create new one
            profile.setUserId(userId);
            return profileRepository.save(profile);
        }
    }
}