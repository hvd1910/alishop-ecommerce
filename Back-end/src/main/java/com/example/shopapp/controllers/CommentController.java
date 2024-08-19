package com.example.shopapp.controllers;


import com.example.shopapp.dtos.CommentDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.User;
import com.example.shopapp.response.Response;
import com.example.shopapp.response.comment.CommentResponse;
import com.example.shopapp.services.comment.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("${api.prefix}/comments")
//@Validated
//Dependency Injection
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("")
    public ResponseEntity<List<CommentResponse>> getAllComments(
            @RequestParam(value = "user_id", required = false) Long userId,
            @RequestParam("product_id") Long productId
    ) {
        List<CommentResponse> commentResponses;
        if (userId == null) {
            commentResponses = commentService.getCommentsByProduct(productId);
        } else {
            commentResponses = commentService.getCommentsByUserAndProduct(userId, productId);
        }
        return ResponseEntity.ok(commentResponses);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> updateComment(
            @PathVariable("id") Long commentId,
            @Valid @RequestBody CommentDTO commentDTO
    ) {
        try {
            User loginUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!Objects.equals(loginUser.getId(), commentDTO.getUserId())) {
                return ResponseEntity.badRequest().body("You cannot update another user's comment");
            }
            commentService.updateComment(commentId, commentDTO);
            return ResponseEntity.ok("Update comment successfully.");
        } catch (Exception e) {
            // Handle and log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during comment update.");
        }
    }
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> insertComment(
            @Valid @RequestBody CommentDTO commentDTO
    ) throws DataNotFoundException {

            commentService.insertComment(commentDTO);
            return ResponseEntity.ok(new Response("success", "Sent review successfully", null));

    }

//    @DeleteMapping("/all/{id}")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    public ResponseEntity<?> deleteAllByProductId(
//            @PathVariable("id") Long productId) {
//        commentService.deleteAllByProductId(productId);
//        return ResponseEntity.ok(new Response("success", "Delete all comments  successfully.", null));
//    }
}
