package com.example.shopapp.repositories;

import com.example.shopapp.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRespository extends JpaRepository<Role, Long> {
}
