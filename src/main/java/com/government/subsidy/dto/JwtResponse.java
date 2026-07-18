package com.government.subsidy.dto;

import com.government.subsidy.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String email;
    private String fullName;
    private Role role;
}
