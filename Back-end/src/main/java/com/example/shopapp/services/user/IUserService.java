package com.example.shopapp.services.user;

import com.example.shopapp.dtos.UpdateUserDTO;
import com.example.shopapp.dtos.UserDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Order;
import com.example.shopapp.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    String login(String phoneNumber, String password, Long roleId) throws  Exception;
    User getUserDetailFromToken(String token ) throws Exception;

    User updateUser( Long userId, UpdateUserDTO userDTO) throws Exception;

    Page<User> getUsersAll(String keyword, Pageable pageable);

    User getUserById(Long id) throws Exception;

    User updateUserAdmin(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;

    void deleteUser(Long id) throws DataNotFoundException;
}
