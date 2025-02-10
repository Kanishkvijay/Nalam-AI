package com.backend.Nalam.AI.security.services;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigInteger;
import java.security.interfaces.RSAPublicKey;
import java.security.KeyFactory;

import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.Map;

public class GoogleKeyUtils {

    public static RSAPublicKey getGooglePublicKey(String kid, Map<String, Object> keys) throws Exception {
        System.out.println("Inside getGooglePublicKey() - Looking for key ID: " + kid);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode keysNode = objectMapper.valueToTree(keys).get("keys");



        if (keysNode == null) {
            System.out.println("No 'keys' field found in Google's public keys response.");
            throw new Exception("Google public keys response is invalid.");
        }

        if (keysNode.isArray()) {
            for (JsonNode key : keysNode) {
                System.out.println("Checking key with kid: " + key.get("kid").asText());

                if (kid.equals(key.get("kid").asText())) {
                    System.out.println("Matching key found! Decoding...");

                    String n = key.get("n").asText();  // Modulus
                    String e = key.get("e").asText();  // Exponent
                    System.out.println("Modulus (n): " + n);
                    System.out.println("Exponent (e): " + e);


                    byte[] modulusBytes = Base64.getUrlDecoder().decode(n);
                    byte[] exponentBytes = Base64.getUrlDecoder().decode(padBase64(e));

                    BigInteger modulus = new BigInteger(1, modulusBytes);
                    BigInteger exponent = new BigInteger(1, exponentBytes);

                    RSAPublicKeySpec spec = new RSAPublicKeySpec(modulus, exponent);
                    KeyFactory factory = KeyFactory.getInstance("RSA");

                    System.out.println("Generated RSA public key successfully.");
                    return (RSAPublicKey) factory.generatePublic(spec);
                }
            }
            System.out.println("No matching key found for kid: " + kid);
        }

        throw new Exception("Public key not found for key ID: " + kid);
    }


    private static String padBase64(String base64) {
        while (base64.length() % 4 != 0) {
            base64 += "=";  // Ensure proper padding
        }
        return base64;
    }
}
