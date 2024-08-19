package com.example.shopapp.controllers;

import com.example.shopapp.dtos.CommentDTO;
import com.example.shopapp.dtos.ProductDetailDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.ProductDetail;
import com.example.shopapp.models.User;
import com.example.shopapp.response.Response;
import com.example.shopapp.response.comment.CommentResponse;
import com.example.shopapp.services.productdetail.ProductDetailService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${api.prefix}/product_details")
@RequiredArgsConstructor
public class ProductDetailController {
    private  final ProductDetailService productDetailService;


    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductDetail(@PathVariable("id") Long productDetailId){
        ProductDetail existingProductDetail = productDetailService.getProductDetailById(productDetailId);
        return ResponseEntity.ok(new Response("success", "Get product detail successfully.", existingProductDetail));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/{idProduct}")
    public ResponseEntity<?> insertProductDetail(
            @PathVariable("idProduct") Long productId,
            @Valid @RequestBody ProductDetailDTO productDetailDTO
    ) throws DataNotFoundException {
            ProductDetail newProductDetail = productDetailService.insertProductDetail(productId,productDetailDTO);
            return ResponseEntity.ok(new Response("success", "Add product detail successfully.", newProductDetail));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProductDetail(
            @PathVariable("id") Long productId,
            @Valid @RequestBody ProductDetailDTO productDetailDTO
    ) throws Exception {

            productDetailService.updateProductDetail(productId, productDetailDTO);
            return ResponseEntity.ok(new Response("success", "Update product detail successfully.", null));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProductDetail(
            @PathVariable("id") Long id) throws DataNotFoundException {
        productDetailService.deleteProductDetail(id);
        return ResponseEntity.ok(new Response("success", "Delete product detail successfully.", null));
    }


//    @DeleteMapping("/all/{id}")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    public ResponseEntity<?> deleteAllByProductId(
//            @PathVariable("id") Long productId) {
//        productDetailService.deleteAllByProductId(productId);
//        return ResponseEntity.ok(new Response("success", "Delete All product detail  successfully.", null));
//    }

}
