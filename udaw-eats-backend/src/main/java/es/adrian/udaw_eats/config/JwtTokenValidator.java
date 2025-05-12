package es.adrian.udaw_eats.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

/**
 * JWT Token Validator Filter
 * <p>
 * This filter intercepts all incoming HTTP requests and validates JWT tokens in the Authorization header.
 * It's a critical security component that:
 * <ul>
 *   <li>Extracts the JWT token from the request header</li>
 *   <li>Validates the token signature using the application's secret key</li>
 *   <li>Extracts user claims (email and authorities) from the token</li>
 *   <li>Creates an Authentication object and sets it in the SecurityContext</li>
 * </ul>
 * <p>
 * This enables authenticated users to access protected resources based on their roles.
 * The filter is part of the Spring Security filter chain and runs once per request.
 */
public class JwtTokenValidator extends OncePerRequestFilter {
    /**
     * Core method that processes each HTTP request to validate JWT tokens.
     * <p>
     * The method follows these steps:
     * <ol>
     *   <li>Extract the JWT token from the Authorization header</li>
     *   <li>If a token exists, validate it using the application's secret key</li>
     *   <li>Extract user email and authorities from the token claims</li>
     *   <li>Create an Authentication object with the extracted information</li>
     *   <li>Set the Authentication in the SecurityContext</li>
     *   <li>If token validation fails, throw a BadCredentialsException</li>
     * </ol>
     * <p>
     * After processing, the request continues through the filter chain regardless of
     * whether a valid token was found or not. Subsequent security filters will handle
     * authorization based on the SecurityContext.
     *
     * @param request     The HTTP request being processed
     * @param response    The HTTP response associated with the request
     * @param filterChain The filter chain for additional processing
     * @throws ServletException If a servlet error occurs
     * @throws IOException      If an I/O error occurs
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        //

        if (jwt != null){
            jwt = jwt.substring(7); // Bearer *token  -> The reason of that substring(7) is the position of that *

            try{
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
                Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();

                String email =String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));

                // ROLE_COSTUMER,ROLE_ADMIN

                List<GrantedAuthority> auth = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auth);
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }catch (Exception e){
                throw new BadCredentialsException("invalid token......");
            }
        }

        filterChain.doFilter(request,response);

    }
}
