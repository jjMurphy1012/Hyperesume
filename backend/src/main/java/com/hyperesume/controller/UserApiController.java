// src/main/java/com/hyperesume/controller/UserApiController.java

package com.hyperesume.controller;

import com.hyperesume.model.User;
import com.hyperesume.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserApiController {

    @Autowired
    private UserService userService;

}
