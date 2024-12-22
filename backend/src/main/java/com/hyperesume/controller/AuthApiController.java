package com.hyperesume.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContext;

import com.hyperesume.model.User;
import com.hyperesume.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthApiController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // @PostMapping("/login")
    // @ResponseBody
    // public ResponseEntity<?> loginUser(@RequestBody User user) {
    // User existingUser = userService.findByUsername(user.getUsername());
    //
    // if (existingUser == null) {
    // return ResponseEntity.badRequest().body("User not found");
    // }
    //
    // if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
    // {
    // return ResponseEntity.badRequest().body("Invalid Password");
    // }
    //
    // UsernamePasswordAuthenticationToken authRequest =
    // new UsernamePasswordAuthenticationToken(user.getUsername(),
    // user.getPassword());
    //
    // Authentication authentication =
    // authenticationManager.authenticate(authRequest);
    // SecurityContextHolder.getContext().setAuthentication(authentication);
    // System.out.println("Authenticated user: "
    // + SecurityContextHolder.getContext().getAuthentication().getName()
    // + "Authority: " +
    // SecurityContextHolder.getContext().getAuthentication().getAuthorities()
    // );
    //
    //// Authentication auth =
    // SecurityContextHolder.getContext().getAuthentication();
    //// System.out.println("Authenticated user: " + auth.getName());
    //// auth.getAuthorities().forEach(a -> System.out.println("Authority: " +
    // a.getAuthority()));
    //
    //
    // Map<String, Object> userData = new HashMap<>();
    // userData.put("id", existingUser.getId());
    // userData.put("username", existingUser.getUsername());
    // userData.put("role", existingUser.getRole());
    //
    // return ResponseEntity.ok(userData);
    // }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest, HttpServletRequest request) {
        try {
            System.out.println("Login attempt for user: " + loginRequest.getUsername());

            // Create authentication token
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword());

            // Authenticate the user
            System.out.println("Attempting authentication...");
            Authentication authentication = authenticationManager.authenticate(authToken);
            System.out.println("Authentication successful");

            // Create a new session and store the security context
            HttpSession session = request.getSession(true);
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
            session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);

            // Get the user details
            User user = userService.findByUsername(loginRequest.getUsername());
            System.out.println("Found user with role: " + user.getRole());
            System.out.println("Session ID: " + session.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("role", user.getRole());
            response.put("sessionId", session.getId());

            // More permissive cookie settings for development
            String cookieHeader = String.format(
                    "JSESSIONID=%s; Path=/; HttpOnly; SameSite=Lax",
                    session.getId());

            return ResponseEntity.ok()
                    .header("Set-Cookie", cookieHeader)
                    .body(response);

        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid username or password"));
        }
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<?> registerUserAPI(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        System.out.println("User details: " + user.getUsername() + ", " + user.getRole());

        // Just call the service, do not encode here
        try {
            userService.saveUser(user);
            System.out.println("UserService.saveUser completed successfully.");
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception while saving user: " + e.getMessage());
            return ResponseEntity.badRequest().body("User registration failed: " + e.getMessage());
        }

    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String username = authentication.getName();
        User user = userService.findByUsername(username);
        if (user == null || !user.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        List<User> users = userService.getAllUsers();
        users.forEach(u -> u.setPassword(null)); // Exclude passwords

        return ResponseEntity.ok(users);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        try {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            SecurityContextHolder.clearContext();

            // Force the cookie to expire immediately
            return ResponseEntity.ok()
                    .header("Set-Cookie", "JSESSIONID=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax")
                    .body("Logged out successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during logout");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication, HttpServletRequest request) {
        System.out.println("Getting current user...");
        System.out.println(
                "Session ID: " + request.getSession(false) != null ? request.getSession(false).getId() : "No session");
        System.out.println("Authentication present: " + (authentication != null));
        System.out.println("Is authenticated: " + (authentication != null && authentication.isAuthenticated()));

        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("No authentication found or not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = authentication.getName();
        System.out.println("Username from authentication: " + username);

        User user = userService.findByUsername(username);
        if (user == null) {
            System.out.println("No user found for username: " + username);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        System.out.println("Found user with role: " + user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/auth/validate")
    public ResponseEntity<?> validateAdminAccess(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Not authenticated"));
        }

        User admin = userService.findByUsername(authentication.getName());
        if (admin == null || !admin.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized for admin access"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", admin.getId());
        response.put("username", admin.getUsername());
        response.put("role", admin.getRole());
        System.out.println("Admin validation successful for: " + admin.getUsername());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/session")
    public ResponseEntity<?> getAdminSessionInfo(Authentication authentication, HttpServletRequest request) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Not authenticated"));
        }

        User admin = userService.findByUsername(authentication.getName());
        if (admin == null || !admin.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Not authorized for admin access"));
        }

        HttpSession session = request.getSession(false);
        Map<String, Object> sessionInfo = new HashMap<>();
        sessionInfo.put("sessionId", session != null ? session.getId() : null);
        sessionInfo.put("username", authentication.getName());
        sessionInfo.put("role", admin.getRole());
        sessionInfo.put("authorities", authentication.getAuthorities());

        return ResponseEntity.ok(sessionInfo);
    }

}
