package com.example.shopapp.repositories;

import com.example.shopapp.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRespository extends JpaRepository<Comment, Long> {

    List<Comment> findByUserIdAndProductId(@Param("userId") Long userId,
                                           @Param("productId") Long productId);
    List<Comment> findByProductId(@Param("productId") Long productId);

    @Modifying
    @Query("DELETE FROM Comment c WHERE c.product.id = :productId")
    void deleteAllByProductId(@Param("productId") Long productId);
}
