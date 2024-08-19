package com.example.shopapp.response.comment;

import com.example.shopapp.models.BaseEntity;
import com.example.shopapp.models.Comment;
import com.example.shopapp.response.user.UserResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {
    @JsonProperty("content")
    private String content;

    private Long rating;

    //user's information
    @JsonProperty("user")
    private UserResponse userResponse;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    public static CommentResponse fromComment(Comment comment) {
        return CommentResponse.builder()
                .rating(comment.getRating())
                .content(comment.getContent())
                .userResponse(UserResponse.fromUser(comment.getUser()))
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}
