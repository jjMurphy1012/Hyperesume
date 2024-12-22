package com.hyperesume.controller;

import com.hyperesume.model.User;
import com.hyperesume.service.AdminService;
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
public class AdminController {

    // @Autowired
    // private AdminService adminService;

    // @GetMapping("/users")
    // public ResponseEntity<List<User>> getAllUsers() {
    // try {
    // return ResponseEntity.ok(adminService.getAllUsers());
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    // }
    // }

    // @GetMapping("/users/{id}")
    // public ResponseEntity<User> getUser(@PathVariable Long id) {
    // try {
    // User user = adminService.getUserById(id);
    // return user != null ? ResponseEntity.ok(user) :
    // ResponseEntity.notFound().build();
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    // }
    // }

    // @PutMapping("/users/{id}")
    // public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User
    // user, Principal principal) {
    // try {
    // if (!id.equals(user.getId())) {
    // return ResponseEntity.badRequest().body("ID mismatch");
    // }
    // User updatedUser = adminService.updateUserAsAdmin(user);
    // return ResponseEntity.ok(updatedUser);
    // } catch (RuntimeException e) {
    // return ResponseEntity.badRequest().body(e.getMessage());
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    // .body("An unexpected error occurred");
    // }
    // }

    // @DeleteMapping("/users/{id}")
    // public ResponseEntity<?> deleteUser(@PathVariable Long id, Principal
    // principal) {
    // try {
    // adminService.deleteUserAsAdmin(id, principal.getName());
    // return ResponseEntity.ok().build();
    // } catch (RuntimeException e) {
    // return ResponseEntity.badRequest().body(e.getMessage());
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    // .body("An unexpected error occurred");
    // }
    // }

    // @GetMapping("/auth/validate")
    // public ResponseEntity<?> validateAdminAccess(Principal principal) {
    // try {
    // User user = userService.findByUsername(principal.getName());
    // if (user != null && user.getRole().equals("ROLE_ADMIN")) {
    // return ResponseEntity.ok(user);
    // }
    // return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    // .body("Authorization validation failed");
    // }
    // }
}