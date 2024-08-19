package com.example.shopapp.controllers;

import com.example.shopapp.dtos.UpdateUserDTO;
import com.example.shopapp.dtos.UserDTO;
import com.example.shopapp.dtos.UserLoginDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.User;
import com.example.shopapp.response.Response;
import com.example.shopapp.response.order.OrderListResponse;
import com.example.shopapp.response.order.OrderResponse;
import com.example.shopapp.response.user.LoginResponse;
import com.example.shopapp.response.user.UserListResponse;
import com.example.shopapp.response.user.UserResponse;
import com.example.shopapp.services.user.IUserService;
import com.example.shopapp.components.LocalizationUtils;
import com.example.shopapp.utils.MassageKeys;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;
    private final LocalizationUtils localizationUtils;


    @PostMapping("/register")
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserDTO userDTO,
            BindingResult result
            ) throws Exception {

        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();


            return ResponseEntity.ok(new Response("error", "Register failed", null));
        }
        if (!userDTO.getPassword().equals(userDTO.getRetypePassword())) {
            return ResponseEntity.ok(new Response("error", "Password does not match", null));
        }
        User user = userService.createUser(userDTO);
        if (user != null) {
            return ResponseEntity.ok(new Response("success", "Register successfully", null));
        }
        return null;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody UserLoginDTO userLoginDTO
    ) {
        try {
            String token = userService.login(userLoginDTO.getPhoneNumber(),
                    userLoginDTO.getPassword(),
                    userLoginDTO.getRoleId() == null ? 1 : userLoginDTO.getRoleId());
                //return token
            return  ResponseEntity.ok(LoginResponse.builder()
                            .status("success")
                            .message(localizationUtils.getLocalizedMessage(MassageKeys.LOGIN_SUCCESSFULLY))
                            .token(token)
                    .build());
        }catch (Exception e ) {
            return  ResponseEntity.ok(LoginResponse.builder()
                    .status("error")
                    .message(localizationUtils.getLocalizedMessage(MassageKeys.LOGIN_FAILED))
                    .build());
        }
    }




    @GetMapping("/details")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String authorizationHeader) throws Exception {

            String extractedToken = authorizationHeader.substring(7); // Loại bỏ "Bearer" từ chuỗi token
            User user = userService.getUserDetailFromToken(extractedToken);
            return ResponseEntity.ok(new Response("success", "Get user successfully.", UserResponse.fromUser(user)));

    }


    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @PutMapping("/details/{userId}")
    public ResponseEntity<?> updateUserDetail(
            @PathVariable("userId") Long userId,
            @RequestBody UpdateUserDTO updatedUserDTO,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        try {
            String extractedToken = authorizationHeader.substring(7); // Loại bỏ "Bearer" từ chuỗi token
            User user = userService.getUserDetailFromToken(extractedToken);

            //
            if (user.getId() != userId) {
                return  ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            User updateUser = userService.updateUser(userId, updatedUserDTO);
            return ResponseEntity.ok(new Response("success", "Update user successfully.", UserResponse.fromUser(updateUser)));

        }catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public ResponseEntity<?> getUserAll(
            @RequestParam(defaultValue = "",required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "asc") String sort
    ) {
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(sort) ? Sort.Direction.ASC : Sort.Direction.DESC;

        PageRequest pageRequest = PageRequest.of(
                page, limit,
                Sort.by(sortDirection,"id")
        );
        Page<UserResponse> users = userService
                .getUsersAll(keyword, pageRequest)
                .map(UserResponse::fromUser);
        
        // Lấy tổng số trang
        int totalPages = users.getTotalPages();
        List<UserResponse> userResponses = users.getContent();
        return ResponseEntity.ok(new Response("success", "Get all orders successfully.", UserListResponse
                .builder()
                .users(userResponses)
                .totalPages(totalPages)
                .build()));
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get-by-id/{userId}")
    public ResponseEntity<?> getUserById(
            @PathVariable("userId") Long userId
            ) throws Exception {

        User user = userService.getUserById(userId);
        return ResponseEntity.ok(new Response("success", "Get user successfully.", UserResponse.fromUser(user)));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update-by-id/{userId}")
    public ResponseEntity<?> updateUserDetailAdmin(
            @PathVariable("userId") Long userId,
            @RequestBody UpdateUserDTO updatedUserDTO
    ) {
        try {

            User updateUser = userService.updateUserAdmin(userId, updatedUserDTO);
            return ResponseEntity.ok(new Response("success", "Update user successfully.", UserResponse.fromUser(updateUser)));

        }catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) throws DataNotFoundException {
        userService.deleteUser(id);
        return ResponseEntity.ok(new Response("success", "Delete user with id: " + id + " successfully", null));
    }
}
