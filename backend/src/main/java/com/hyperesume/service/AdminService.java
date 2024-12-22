package com.hyperesume.service;

import com.hyperesume.model.User;
import com.hyperesume.model.Profile;
import com.hyperesume.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AdminService {
    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private ProfileService profileService;

    @Transactional
    public User updateUserAsAdmin(User user) {
        // Get existing user and profile data
        User existingUser = adminMapper.getUserById(user.getId());
        if (existingUser == null) {
            throw new RuntimeException("User not found");
        }

        // Preserve the existing password
        user.setPassword(existingUser.getPassword());

        // Update user basic info
        adminMapper.updateUser(user);

        // Update profile if it exists in the request
        if (user.getProfile() != null) {
            // Get existing profile
            Profile existingProfile = existingUser.getProfile();
            Profile updatedProfile = user.getProfile();

            if (existingProfile != null) {
                // Only update the fields that are being modified
                // Keep existing values for fields that aren't in the update request
                if (updatedProfile.getFirstName() != null) {
                    existingProfile.setFirstName(updatedProfile.getFirstName());
                }
                if (updatedProfile.getLastName() != null) {
                    existingProfile.setLastName(updatedProfile.getLastName());
                }
                if (updatedProfile.getEmail() != null) {
                    existingProfile.setEmail(updatedProfile.getEmail());
                }
                if (updatedProfile.getPhone() != null) {
                    existingProfile.setPhone(updatedProfile.getPhone());
                }

                // Preserve existing data for fields that shouldn't be modified
                user.setProfile(existingProfile);
                adminMapper.updateProfile(user);
            } else {
                // If no profile exists yet, create new one
                adminMapper.createProfile(user);
            }
        }

        return adminMapper.getUserById(user.getId());
    }

    @Transactional
    public void deleteUserAsAdmin(Long id, String currentAdminUsername) {
        User userToDelete = adminMapper.getUserById(id);
        if (userToDelete == null) {
            throw new RuntimeException("User not found");
        }

        // Prevent self-deletion
        if (userToDelete.getUsername().equals(currentAdminUsername)) {
            throw new RuntimeException("Cannot delete your own account");
        }

        // Check if last admin
        if ("ROLE_ADMIN".equals(userToDelete.getRole()) && countAdmins() <= 1) {
            throw new RuntimeException("Cannot delete the last admin account");
        }

        // Delete in correct order:
        // 1. Delete role associations first
        adminMapper.deleteUserRoles(id);

        // 2. Delete profile if exists
        profileService.deleteProfileByUserId(id);

        // 3. Finally delete the user
        adminMapper.deleteUser(id);
    }

    private long countAdmins() {
        return getAllUsers().stream()
                .filter(user -> "ROLE_ADMIN".equals(user.getRole()))
                .count();
    }

    public List<User> getAllUsers() {
        return adminMapper.getAllUsers();
    }

    public User getUserById(Long id) {
        return adminMapper.getUserById(id);
    }
}