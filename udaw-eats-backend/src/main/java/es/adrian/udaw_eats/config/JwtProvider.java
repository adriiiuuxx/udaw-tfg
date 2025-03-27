package es.adrian.udaw_eats.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.*;

@Component
public class JwtProvider  {

    private final SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth){
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);

        Instant now = Instant.now();
        Instant expiration = now.plusSeconds(86400); // 24 hours

        return Jwts.builder()
                .subject(auth.getName()) // Equivalent to setSubject()
                .claims(Map.of(
                        "authorities", roles,
                        "email", auth.getName(),
                        "iat", now.getEpochSecond(), // issued at (iat)
                        "exp", expiration.getEpochSecond() // expiration (exp)
                ))
                .signWith(key)
                .compact();
    }

    public String getEmailFromJwtToken (String jwt){
        jwt = jwt.substring(7);

        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();

        return String.valueOf(claims.get("email"));

    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities){
        Set<String> auths = new HashSet<>();

        for (GrantedAuthority authority: authorities){
            auths.add(authority.getAuthority());
        }

        return String.join(",",auths);
    }
}
