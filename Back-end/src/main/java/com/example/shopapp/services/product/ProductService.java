package com.example.shopapp.services.product;

import com.example.shopapp.dtos.ProductDTO;
import com.example.shopapp.dtos.ProductImageDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.exceptions.InvalidParamException;
import com.example.shopapp.models.Category;
import com.example.shopapp.models.OrderDetail;
import com.example.shopapp.models.Product;
import com.example.shopapp.models.ProductImage;
import com.example.shopapp.response.product.ProductResponse;
import com.example.shopapp.response.product.ProductResponseByCart;
import com.example.shopapp.repositories.CategoryRepository;
import com.example.shopapp.repositories.OrderDetailRespository;
import com.example.shopapp.repositories.ProductImageRespository;
import com.example.shopapp.repositories.ProductRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{

    private final ProductRespository productRespository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRespository productImageRespository;
    private final OrderDetailRespository orderDetailRespository;
    private static String UPLOADS_FOLDER = "uploads";

    @Override
    @Transactional
    public Product createProduct(ProductDTO productDTO) throws DataNotFoundException {
        Product product = productRespository.findProductByNameAndCategoryId(productDTO.getName(), productDTO.getCategoryId());
        if(product != null) {
            throw  new DataNotFoundException("Product already exists.");
        }
        Category existingCategory = categoryRepository
                .findById(productDTO.getCategoryId())
                .orElseThrow(()->
                        new DataNotFoundException(
                                "Cannot find category with id: "+ productDTO.getCategoryId()));
        Product newProduct = Product.builder()
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .discount(productDTO.getDiscount())
                .description(productDTO.getDescription())
                .category(existingCategory)
                .totalSales(0)
                .stock(0)
                .active(true)
                .build();
        return productRespository.save(newProduct);
    }

    @Override
    public Product getProductById(long productId) throws Exception {
        return productRespository.findById(productId)
                .orElseThrow(()-> new DataNotFoundException(
                        "Cannot find product with id: " + productId));
    }


    @Override
    public Page<ProductResponse> getAllProductsAdmin(String keyword, Long categoryId, Integer page,
                                                Integer limit, String sort) {


        Pageable pageable = PageRequest.of(page, limit);


        // Lấy danh sách sản phẩm theo trang (page) và giới hạn (limit) và categoryId nếu có
        List<Product> products = productRespository.searchProductsAdmin(categoryId, keyword);

        List<Product> sortedProducts = new ArrayList<>(products);
        sortedProducts.sort((p1, p2) -> {
            return switch (sort) {
                case "price_low" -> p1.getPrice().compareTo(p2.getPrice());
                case "price_high" -> p2.getPrice().compareTo(p1.getPrice());
                case "stock_low" -> Integer.compare(p1.getStock(), p2.getStock());
                case "stock_high" -> Integer.compare(p2.getStock(), p1.getStock());
                default -> p1.getId().compareTo(p2.getId());
            };
        });
        // Chuyển đổi danh sách sản phẩm đã lọc thành danh sách ProductResponse
        List<ProductResponse> filteredProductResponses = sortedProducts.stream()
                .map(ProductResponse::fromProduct)
                .collect(Collectors.toList());

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), filteredProductResponses.size());

        List<ProductResponse> pageContent = filteredProductResponses.subList(startIndex, endIndex);

        return new PageImpl<>(pageContent, pageable, filteredProductResponses.size());
    }



    @Override
    public Page<ProductResponse> getAllProducts(String keyword, List<String> colors, List<String> sizes,
                                                Float minPrice, Float maxPrice, Integer minDiscount,
                                                Long categoryId, Integer page, Integer limit, String sort) {


        Pageable pageable = PageRequest.of(page, limit);


        // Lấy danh sách sản phẩm theo trang (page) và giới hạn (limit) và categoryId nếu có
        List<Product> products = productRespository.searchProducts(categoryId, minPrice,
                maxPrice, minDiscount, keyword);

        // Kiểm tra xem danh sách màu sắc và kích thước có rỗng hay không
        boolean hasColors = !colors.isEmpty();
        boolean hasSizes = !sizes.isEmpty();

        // Nếu danh sách kích thước không rỗng, lọc theo kích thước
        if (hasSizes) {
            products = products.stream()
                    .filter(p -> p.getProductDetails() != null && p.getProductDetails().stream()
                            .anyMatch(detail -> sizes.stream().anyMatch(s -> s.equalsIgnoreCase(detail.getSize()))))
                    .collect(Collectors.toList());
        }

        // Nếu danh sách màu sắc không rỗng, lọc theo màu sắc
        if (hasColors) {
            products = products.stream()
                    .filter(p -> p.getProductDetails() != null && p.getProductDetails().stream()
                            .anyMatch(detail -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(detail.getColor()))))
                    .collect(Collectors.toList());
        }


        List<Product> sortedProducts = new ArrayList<>(products);
        sortedProducts.sort((p1, p2) -> {
            return switch (sort) {
                case "price_low" -> p1.getPrice().compareTo(p2.getPrice());
                case "price_high" -> p2.getPrice().compareTo(p1.getPrice());
                case "stock_low" -> Integer.compare(p1.getStock(), p2.getStock());
                case "stock_high" -> Integer.compare(p2.getStock(), p1.getStock());
                case "id_high" -> Long.compare(p2.getId(), p1.getId());
                default -> p1.getId().compareTo(p2.getId());
            };
        });
        // Chuyển đổi danh sách sản phẩm đã lọc thành danh sách ProductResponse
        List<ProductResponse> filteredProductResponses = sortedProducts.stream()
                .map(ProductResponse::fromProduct)
                .collect(Collectors.toList());

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), filteredProductResponses.size());

        List<ProductResponse> pageContent = filteredProductResponses.subList(startIndex, endIndex);

        return new PageImpl<>(pageContent, pageable, filteredProductResponses.size());
    }





    @Override
    @Transactional
    public Product updateProduct(long id,
                                 ProductDTO productDTO
    ) throws Exception {
        Product existngProduct = getProductById(id);
        if (existngProduct != null) {

            Product product = productRespository.findProductByNameAndCategoryId(productDTO.getName(), productDTO.getCategoryId());
            if(product != null && product.getId() != id) {
                throw  new DataNotFoundException("Product already exists.");
            }
            // Có thể sử dụng ModelMapper
            Category existingCategory = categoryRepository
                    .findById(productDTO.getCategoryId())
                    .orElseThrow(()->
                            new DataNotFoundException(
                                    "Cannot find category with id: "+ productDTO.getCategoryId()));
            existngProduct.setName(productDTO.getName());
            existngProduct.setCategory(existingCategory);
            existngProduct.setPrice(productDTO.getPrice());
            existngProduct.setDiscount(productDTO.getDiscount());
            existngProduct.setDescription(productDTO.getDescription());
            existngProduct.setActive(productDTO.isActive());
            return productRespository.save(existngProduct);
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteProduct(long id) throws DataNotFoundException {
        Optional<Product> optionalProduct = productRespository.findById(id);
        if (optionalProduct.isPresent()){
            Optional<OrderDetail> orderDetail = orderDetailRespository.findOrderDetailByProduct(optionalProduct.get());
            if (orderDetail.isEmpty()) {
                optionalProduct.ifPresent(productRespository::delete);
            }else {

                throw new DataNotFoundException("Product has generated purchase cannot be deleted.");
            }
        }else {
            throw new DataNotFoundException("Product not found.");
        }


    }

    @Override
    public boolean existsByName(String name) {
        return productRespository.existsByName(name);
    }

    @Override
    @Transactional
    public ProductImage createProductImage (
            Long productId,
            ProductImageDTO productImageDTO
    ) throws Exception {
        Product existingProduct = productRespository
                .findById(productId)
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: " + productImageDTO.getProductId()));
        ProductImage newProductImage = ProductImage.builder()
                .product(existingProduct)
                .imageUrl(productImageDTO.getImageUrl())
                .build();
        // Ko cho insert quá 5 ảnh cho 1 sản phẩm
        int size = productImageRespository.findByProductId(productId).size();
        if (size >= ProductImage.MAXIMUM_IMAGES_PER_PRODUCT) {
            throw new InvalidParamException("Number of images must be <= " +
                    ProductImage.MAXIMUM_IMAGES_PER_PRODUCT);
        }
        return productImageRespository.save(newProductImage);
    }

    @Override
    public void deleteFile(String filename) throws Exception {
        // Đường dẫn đến thư mục chứa file
        java.nio.file.Path uploadDir = Paths.get(UPLOADS_FOLDER);
        // Đường dẫn đầy đủ đến file cần xóa
        java.nio.file.Path filePath = uploadDir.resolve(filename);

        // Kiểm tra xem file tồn tại hay không
        if (Files.exists(filePath)) {
            // Xóa file
            Files.delete(filePath);
        } else {
            throw new FileNotFoundException("File not found: " + filename);
        }
    }

    @Override
    public List<ProductResponseByCart> findProductsByIds(List<Long> productIds) {
        List<ProductResponseByCart> productResponseByCarts = productRespository.findProductsByIds(productIds)
                .stream().map(ProductResponseByCart::fromProduct).collect(Collectors.toList());
        return productResponseByCarts;
    }
}
