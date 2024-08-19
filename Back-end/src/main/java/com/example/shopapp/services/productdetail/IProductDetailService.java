package com.example.shopapp.services.productdetail;

import com.example.shopapp.dtos.ProductDetailDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.ProductDetail;
import com.example.shopapp.response.comment.CommentResponse;

import java.util.List;

public interface IProductDetailService {

    ProductDetail getProductDetailById(Long id);

    ProductDetail insertProductDetail(Long id, ProductDetailDTO productDetailDTO) throws DataNotFoundException;

    void deleteProductDetail(Long productDetailId) throws Exception;
    void updateProductDetail(Long id, ProductDetailDTO productDetailDTO) throws DataNotFoundException;


    void deleteAllByProductId(Long productId) throws Exception;


}
