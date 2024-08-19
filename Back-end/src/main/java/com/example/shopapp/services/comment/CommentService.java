package com.example.shopapp.services.comment;

import com.example.shopapp.dtos.CommentDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Comment;
import com.example.shopapp.models.Product;
import com.example.shopapp.models.User;
import com.example.shopapp.response.comment.CommentResponse;
import com.example.shopapp.repositories.CommentRespository;
import com.example.shopapp.repositories.ProductRespository;
import com.example.shopapp.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService implements ICommentService{
    private final CommentRespository commentRepository;
    private final UserRepository userRepository;
    private final ProductRespository productRepository;
    @Override
    @Transactional
    public Comment insertComment(CommentDTO commentDTO) throws DataNotFoundException {
        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(()-> new DataNotFoundException("Cannot find user with id: "+ commentDTO.getUserId()));

        Product product = productRepository.findById(commentDTO.getProductId())
                .orElseThrow(()-> new DataNotFoundException("Cannot find product with id: "+ commentDTO.getProductId()));

        List<Comment> comment = commentRepository.findByUserIdAndProductId(commentDTO.getUserId(), commentDTO.getProductId());
        if(!comment.isEmpty()) {
            throw new DataNotFoundException("Cannot review alread exists.");
        }
        Comment newComment = Comment.builder()
                .user(user)
                .name(user.getFullName())
                .product(product)
                .rating(commentDTO.getRating())
                .content(commentDTO.getContent())
                .build();
        return commentRepository.save(newComment);
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    @Transactional
    public void updateComment(Long id, CommentDTO commentDTO) throws DataNotFoundException {
        Comment existingComment = commentRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Comment not found."));
        existingComment.setContent(commentDTO.getContent());
        commentRepository.save(existingComment);
    }

    @Override
    public List<CommentResponse> getCommentsByUserAndProduct(Long userId, Long productId) {
        List<Comment> comments = commentRepository.findByUserIdAndProductId(userId, productId);
        return comments.stream()
                .map(comment -> CommentResponse.fromComment(comment))
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentResponse> getCommentsByProduct(Long productId) {
        List<Comment> comments = commentRepository.findByProductId(productId);
        return comments.stream()
                .map(comment -> CommentResponse.fromComment(comment))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteAllByProductId(Long productId) {
        commentRepository.deleteAllByProductId(productId);
    }


}
