package com.backend.Nalam.AI.controllers;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.backend.Nalam.AI.models.AuthModel;
import com.backend.Nalam.AI.models.ERole;
import com.backend.Nalam.AI.models.Role;
import com.backend.Nalam.AI.models.User;
import com.backend.Nalam.AI.payload.response.JwtResponse;
import com.backend.Nalam.AI.payload.response.MessageResponse;
import com.backend.Nalam.AI.repositories.RoleRepository;
import com.backend.Nalam.AI.repositories.UserRepository;
import com.backend.Nalam.AI.security.config.GoogleJwtVerifier;
import com.backend.Nalam.AI.security.config.JwtUtils;
import com.backend.Nalam.AI.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RequestMapping("/api/auth")
@RestController
public class GoogleAuthController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder encoder;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/google_sign_in")
    public ResponseEntity<?> sign_in(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        System.out.println("Received Token: " + token);

        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Token is missing or empty."));
        }

        DecodedJWT verifiedJwt = GoogleJwtVerifier.verifyGoogleToken(token);

        if (verifiedJwt == null) {
            System.err.println("Error: Token verification failed.");
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid Google token."));
        }

        String email = verifiedJwt.getClaim("email").asString();
        String name = verifiedJwt.getClaim("name").asString();
        System.out.println("✅ Verified! Email: " + email + ", Name: " + name);

        if (userRepository.existsByUsername(email)) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, "appanndnadbabdbed")
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateToken(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(e -> e.getAuthority()).collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping("/google_sign_up")
    public ResponseEntity<?> signUp(@Valid @RequestBody  AuthModel model){


        if (userRepository.existsByUsername(model.getEmail())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        User user = new User(model.getEmail(), encoder.encode("appanndnadbabdbed"), model.getName());


        Set<String> strRoles = new HashSet<>();
        strRoles.add("user");
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {

            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found!"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found!"));
                        roles.add(adminRole);
                        break;

                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found!"));
                        roles.add(modRole);
                        break;

                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found!"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        user.setRoles(roles);


        userRepository.save(user);

        logger.info("User registered successfully with google : {}", user.getUsername());
        return ResponseEntity.ok(new MessageResponse("User registered successfully! with Google"));



    }



}
