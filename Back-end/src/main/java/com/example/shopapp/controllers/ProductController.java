package com.example.shopapp.controllers;

import com.example.shopapp.components.LocalizationUtils;
import com.example.shopapp.dtos.ProductDTO;
import com.example.shopapp.dtos.ProductImageDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Product;
import com.example.shopapp.models.ProductImage;
import com.example.shopapp.response.Response;
import com.example.shopapp.response.product.ProductListResponse;
import com.example.shopapp.response.product.ProductResponse;
import com.example.shopapp.response.product.ProductResponseAll;
import com.example.shopapp.response.product.ProductResponseByCart;
import com.example.shopapp.services.product.IProductService;
import com.github.javafaker.Faker;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;




    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createProduct(
            @Valid @RequestBody ProductDTO productDTO,
            BindingResult result
            ) throws Exception {

            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return  ResponseEntity.badRequest().body(errorMessages);

            }
            Product newProduct = productService.createProduct(productDTO);
            return ResponseEntity.ok(new Response("success", "Add products successfully.", newProduct));

}




    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(value = "uploads/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImages(
            @PathVariable("id") Long productId,
            @ModelAttribute("files") List<MultipartFile> files
    ) {
        try{

            Product existingProduct = productService.getProductById(productId);
            files = files == null ? new ArrayList<MultipartFile>() : files;
            if(files.size() > ProductImage.MAXIMUM_IMAGES_PER_PRODUCT) {
                return  ResponseEntity.badRequest().body("You can only upload maximum 5 images");
            }
            List<ProductImage> productImages = new ArrayList<>();
            for (MultipartFile file : files) {
                if (file.getSize() == 0) {
                    continue;
                }
                // Kiểm tra kích thước file và định dạng
                if (file.getSize() > 10 * 1024 * 1024) { // Kích thước  > 10MB
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body("File is too large! Maximum size is 10MB");
                }

                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body("File must be an image");
                }
                // Lưu file và cập nhật thumbnail trong DTO
                String filename = storeFile(file); // Thay thế hàm này với code của bạn để lưu file
                // Lưu vào đối tượng product trong DB
                ProductImage productImage = productService.createProductImage(
                        existingProduct.getId(),
                        ProductImageDTO.builder()
                                .imageUrl(filename)
                                .build()
                );
                productImages.add(productImage);
            }
            return  ResponseEntity.ok(new Response("success", "Add image product successfully.", productImages));
        }catch (Exception e) {
            return ResponseEntity.ok(new Response("error", "Add Image products failure.", null));
        }

    }
    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("/image");
    }

    private String storeFile(MultipartFile file) throws IOException {
        if(isImageFile(file) || file.getOriginalFilename() == null) {
            throw new IOException("Invalid image format");
        }

        String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        // Thêm UUID vào trước tên file để đảm bảo tên file là duy nhất
        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;
        // Đường dẫn đến thư mục mà bạn muốn lưu file
        Path updlodDir  = Paths.get("uploads");
        // Kiểm tra và tạo thư mục nếu nó không tồn tại
        if (!Files.exists(updlodDir)) {
            Files.createDirectories(updlodDir);
        }
        //Đường dẫn đầy đủ đến file
        Path destination = Paths.get(updlodDir.toString(), uniqueFilename);
        //Sao chép file vào thư mục đích
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return  uniqueFilename;
    }



    private List<String> convertList(String chain) {
        if (chain == null || chain.isEmpty()) {
            return Collections.emptyList();
        }
        if (chain.contains(",")) {
            return Arrays.asList(chain.split(","));
        }
        return Collections.singletonList(chain);
    }


    @GetMapping("")
    public ResponseEntity<?> getProducts(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0", name = "categoryId") Long  categoryId,
            @RequestParam(defaultValue = "") String  color,
            @RequestParam(defaultValue = "") String  size,
            @RequestParam(defaultValue = "0") Float minPrice,
            @RequestParam(defaultValue = "100000000") Float maxPrice,
            @RequestParam(defaultValue = "0") Integer minDiscount,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String sort

            ) {
        // Tạo Pageable từ thông tin trang  và giới hạn



        Page<ProductResponse> productPage = productService.getAllProducts(keyword, convertList(color), convertList(size), minPrice,
                maxPrice, minDiscount, categoryId, page, limit, sort);
        // Lấy tổng số trang
        int totalPages = productPage.getTotalPages();
        List<ProductResponse> products = productPage.getContent();
        return ResponseEntity.ok(new Response("success", "Get all products successfully", ProductListResponse
                .builder()
                .products(products)
                .totalPages(totalPages)
                .build()));
    }



    @GetMapping("/admin")
    public ResponseEntity<?> getProductsAdmin(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0", name = "categoryId") Long  categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String sort

    ) {

        Page<ProductResponse> productPage = productService.getAllProductsAdmin(keyword, categoryId, page, limit, sort);
        // Lấy tổng số trang
        int totalPages = productPage.getTotalPages();
        List<ProductResponse> products = productPage.getContent();
        return ResponseEntity.ok(new Response("success", "Get all products successfully", ProductListResponse
                .builder()
                .products(products)
                .totalPages(totalPages)
                .build()));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(
            @PathVariable("id") Long productId
    ) throws Exception {

            Product exsitingProduct = productService.getProductById(productId);
            return ResponseEntity.ok(new Response("success", "Get product successfully", ProductResponseAll.fromProduct(exsitingProduct)));

    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable("id") Long productId
    ) throws DataNotFoundException {

            productService.deleteProduct(productId);
            return ResponseEntity.ok(new Response("success", "Product with id = %d deleted successfully",null));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable("id") Long productId,
            @RequestBody ProductDTO productDTO
    ) throws Exception {

            Product updateProduct = productService.updateProduct(productId, productDTO);
            return ResponseEntity.ok(new Response("success", "Update product successfully.", updateProduct));

    }

    @GetMapping("/by-ids")
    public ResponseEntity<?> getProductsByIds(@RequestParam("ids") String ids) {

            //Tách chuổi ids thành một mảng các số nguyên
            List<Long> productIds = Arrays.stream(ids.split(","))
                    .map(Long::parseLong)
                    .toList();
            List<ProductResponseByCart> products = productService.findProductsByIds(productIds);
            return ResponseEntity.ok(new Response("success", "Get products successfully.", products));
    }



    @RequestMapping("/images/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable("imageName") String imageName) {
        try {
            java.nio.file.Path imagePath = Paths.get("uploads/"+imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("uploads/notFound.png").toUri()));
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }



    //@PostMapping("/generateFakeProducts")
    private ResponseEntity<String> generateFakeProducts() {
        Faker faker = new Faker();
        for (int i = 0; i < 1_000_000; i++) {
            String productName = faker.commerce().productName();
            if(productService.existsByName(productName)) {
                continue;
            }
            ProductDTO productDTO = ProductDTO.builder()
                    .name(productName)
                    .price((float)faker.number().numberBetween(10, 90_000_000))
                    .description(faker.lorem().sentence())
                    .categoryId((long)faker.number().numberBetween(2, 5))
                    .build();
            try {
                productService.createProduct(productDTO);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.ok("Fake Products created successfully");
    }




}
