package com.example.shopapp.components;

import com.example.shopapp.exceptions.InvalidParamException;
import com.example.shopapp.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.security.SecureRandom;
import java.util.*;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtTokenUtils {
    @Value("${jwt.expiration}")
    private  long expiration; // save to enviroment variable

    @Value("${jwt.secretKey}")
    private  String secretKey;
    public String generateToken(User user) throws  Exception {
        //properties => claims
        Map<String, Object>claims = new HashMap<>();
//        this.generateSecretKey();
        claims.put("phoneNumber", user.getPhoneNumber());
        claims.put("userId", user.getId());
        try {
            String token = Jwts.builder()
                    .setClaims(claims)
                    .setSubject(user.getPhoneNumber())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L))
                    .signWith(getSignKey(), SignatureAlgorithm.HS256)
                    .compact();
            return  token;
        }catch (Exception e) {
            // You can "inject" Loggoer, instead System.out.println
            throw  new InvalidParamException("Cannot create jwt" +e.getMessage());
        }
    }

    private Key getSignKey() {
        byte[] bytes = Decoders.BASE64.decode(secretKey); // OK4atljOR/9rgDmGiXWoqakIMI9kGTyzm/YoOtpqibY=
        return Keys.hmacShaKeyFor(bytes);
    }



    private String generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[32];
        random.nextBytes(keyBytes);
        String secretKey = Encoders.BASE64.encode(keyBytes);
        return secretKey;
    }

    private Claims extractAllClaims (String token){
        return  Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final  Claims claims = this.extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    //Check expiration
    public boolean isTokenExpired(String token) {
        Date expirationDate = this.extractClaim(token, Claims::getExpiration);
        return  expirationDate.before(new Date());
    }


    public String extractPhoneNumber(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean validateToken(String token , UserDetails userDetails) {
        String phoneNumber = extractPhoneNumber(token);
        return (phoneNumber.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
}
