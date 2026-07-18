package com.government.subsidy.dto;

import com.government.subsidy.model.Role;
import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String password;
    private String fullName;
    private Role role;
}
