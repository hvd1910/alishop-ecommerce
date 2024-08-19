package com.example.shopapp.services.productdetail;

import com.example.shopapp.dtos.ProductDetailDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Product;
import com.example.shopapp.models.ProductDetail;
import com.example.shopapp.repositories.ProductDetailRespository;
import com.example.shopapp.repositories.ProductRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductDetailService implements IProductDetailService {

    private final ProductDetailRespository productDetailRespository;
    private final ProductRespository productRespository;

    @Override
    public ProductDetail getProductDetailById(Long id) {
        return productDetailRespository.findById(id).orElseThrow(null);
    }

    @Override
    @Transactional
    public ProductDetail insertProductDetail(Long id, ProductDetailDTO productDetailDTO) throws DataNotFoundException {
        Product product = productRespository.findById(id).orElseThrow(null);

       if(product == null) {
           throw new DataNotFoundException("Product not found.");
       }
       ProductDetail productDetail =  productDetailRespository.findByColorAndSizeAndProductId(productDetailDTO.getColor(), productDetailDTO.getSize(), id);
       if (productDetail != null) {
           throw new DataNotFoundException("Product detail already exists.");
        }


       ProductDetail newProductDetail = ProductDetail.builder()
               .color(productDetailDTO.getColor())
               .size(productDetailDTO.getSize())
               .qty(productDetailDTO.getQty())
               .product(product)
               .build();

       ProductDetail productDetail1 = productDetailRespository.save(newProductDetail);

       product.setStock(product.getStock() + productDetail1.getQty());
       productRespository.save(product);

       return  productDetail1;
    }

    @Override
    @Transactional
    public void deleteProductDetail(Long productDetailId) throws DataNotFoundException {
            Optional<ProductDetail> productDetail = productDetailRespository.findById(productDetailId);
            if (productDetail.isPresent()) {
                productDetailRespository.deleteById(productDetailId);

                Product product = productDetail.get().getProduct();
                product.setStock(product.getStock() - productDetail.get().getQty());
                productRespository.save(product);
            }else {
                throw new DataNotFoundException("Product details do not exist.");
            }


    }

    @Override
    @Transactional
    public void updateProductDetail(Long id, ProductDetailDTO productDetailDTO) throws DataNotFoundException {
        ProductDetail existingProductDetail = productDetailRespository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Product detail not found."));
        ProductDetail productDetail =  productDetailRespository.findByColorAndSizeAndProductId(productDetailDTO.getColor(), productDetailDTO.getSize(), id);
        if (productDetail != null) {
            throw new DataNotFoundException("Product detail already exists.");
        }
            int qtyNew = productDetailDTO.getQty() - existingProductDetail.getQty();

            existingProductDetail.setColor(productDetailDTO.getColor());
            existingProductDetail.setSize(productDetailDTO.getSize());
            existingProductDetail.setQty(productDetailDTO.getQty());
            productDetailRespository.save(existingProductDetail);

            Product product = existingProductDetail.getProduct();
            product.setStock(product.getStock() + qtyNew);
    }

    @Override
    @Transactional
    public void deleteAllByProductId(Long productId) {
        productDetailRespository.deleteAllByProductId(productId);
    }


}
