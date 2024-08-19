package com.example.shopapp.services.role;

import com.example.shopapp.models.Role;
import com.example.shopapp.repositories.RoleRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService{
    private final RoleRespository roleRespository;

    @Override
    public List<Role> getAllRoles() {
        return roleRespository.findAll();
    }
}
