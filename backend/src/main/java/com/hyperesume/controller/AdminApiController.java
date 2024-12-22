package com.hyperesume.controller;

import com.hyperesume.model.User;
import com.hyperesume.model.ErrorResponse;
import com.hyperesume.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminApiController {

    private static final Logger logger = LoggerFactory.getLogger(AdminApiController.class);

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            logger.debug("Fetching all users");
            List<User> users = adminService.getAllUsers();

            if (users == null) {
                logger.error("getAllUsers returned null");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

            logger.debug("Found {} users", users.size());
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error fetching all users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            logger.debug("Fetching user with id: {}", id);
            User user = adminService.getUserById(id);

            if (user == null) {
                logger.debug("No user found with id: {}", id);
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.error("Error fetching user with id: " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user, Principal principal) {
        try {
            logger.debug("Updating user with id: {}", id);

            if (user.getRole() == null || user.getRole().isEmpty()) {
                logger.warn("Attempt to update user {} with empty role", id);
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Role cannot be empty"));
            }

            user.setId(id);
            User updatedUser = adminService.updateUserAsAdmin(user);
            logger.debug("Successfully updated user with id: {}", id);
            return ResponseEntity.ok(updatedUser);

        } catch (RuntimeException e) {
            logger.error("Runtime error updating user with id: " + id, e);
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error updating user with id: " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("An unexpected error occurred"));
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Principal principal) {
        try {
            logger.debug("Deleting user with id: {}", id);
            adminService.deleteUserAsAdmin(id, principal.getName());
            logger.debug("Successfully deleted user with id: {}", id);
            return ResponseEntity.ok(id);

        } catch (RuntimeException e) {
            logger.error("Runtime error deleting user with id: " + id, e);
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error deleting user with id: " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("An unexpected error occurred"));
        }
    }
}