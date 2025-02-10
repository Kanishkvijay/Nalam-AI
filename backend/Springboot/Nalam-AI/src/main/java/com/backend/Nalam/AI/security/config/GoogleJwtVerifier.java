package com.backend.Nalam.AI.security.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.backend.Nalam.AI.security.services.GoogleKeyUtils;
import org.springframework.web.client.RestTemplate;
import java.security.interfaces.RSAPublicKey;
import java.util.Map;

public class GoogleJwtVerifier {
    private static final String GOOGLE_KEYS_URL = "https://www.googleapis.com/oauth2/v3/certs";

    public static DecodedJWT verifyGoogleToken(String token) {
        try {


            // Remove quotes if present
            token = token.replace("\"", "");




            DecodedJWT jwt = JWT.decode(token);


            String kid = jwt.getKeyId();  // Key ID


            // Fetch Google's public keys
            RestTemplate restTemplate = new RestTemplate();
            Map<String, Object> keys = restTemplate.getForObject(GOOGLE_KEYS_URL, Map.class);

            // Get the correct public key from Google's key set
            RSAPublicKey publicKey = GoogleKeyUtils.getGooglePublicKey(kid, keys);

            // Verify JWT using the correct public key
            return JWT.require(Algorithm.RSA256(publicKey, null))
                    .withIssuer("https://accounts.google.com")
                    .build()
                    .verify(token);
        } catch (Exception e) {
            System.err.println("Token verification failed: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

}

