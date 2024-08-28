package com.example.shopapp.services.order;

import com.example.shopapp.dtos.CartItemDTO;
import com.example.shopapp.dtos.OrderDTO;
import com.example.shopapp.dtos.UpdateOrderDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.*;
import com.example.shopapp.repositories.*;
import com.example.shopapp.response.order.OrderResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService{
    private final UserRepository userRepository;
    private final OrderRespository orderRespository;
    private final ModelMapper modelMapper;
    private final ProductRespository productRespository;
    private final OrderDetailRespository orderDetailRespository;
    private final ProductDetailRespository productDetailRespository;
    private final CouponRepository couponRepository;
    @Override
    @Transactional
    public OrderResponse createOrder(OrderDTO orderDTO) throws Exception {

        // Tạo danh sách các đối tượng OrderDetail từ cartItems
        List<OrderDetail> orderDetails = new ArrayList<>();
        Map<String, ProductDetail> productDetailMap = new HashMap<>();
        Map<Long, Product> productMap = new HashMap<>();
        for (CartItemDTO cartItemDTO : orderDTO.getCartItems()){
            OrderDetail orderDetail = new OrderDetail();


            //Lấy thông tin sản phẩm từ cartItemDTO
            Long productId = cartItemDTO.getProductId();
            String color = cartItemDTO.getColor();
            String size = cartItemDTO.getSize();
            int quantity = cartItemDTO.getQuantity();

            // Tìm thông tin sản  phẩm từ SQL
            Product product = productRespository.findById(productId)
                    .orElseThrow(()-> new DataNotFoundException("Product not found with id: " + productId));

            // Tạo khóa duy nhất để lưu trữ ProductDetail trong Map
            String key = productId + "_" + color + "_" + size;


            ProductDetail productDetail = productDetailRespository.findByColorAndSizeAndProductId(color, size, productId);

            if(productDetail == null) {
                throw  new  DataNotFoundException("Some product attributes are inconsistent. Please try again");
            }
            if(productDetail.getQty() < quantity) {
                throw  new  DataNotFoundException("The quantity of products in stock is not enough, please try again.");
            }

            productMap.put(productId, product);
            productDetailMap.put(key, productDetail);


            // Đặt thông tin cho OrderDetail
            orderDetail.setProduct(product);
            orderDetail.setColor(color);
            orderDetail.setSize(size);
            orderDetail.setNumberOfProducts(quantity);
            orderDetail.setPrice(product.getPrice());
            orderDetail.setTotalMoney(quantity * product.getPrice());

            // Thêm OrderDetail vào danh sách
            orderDetails.add(orderDetail);
        }


        User user = userRepository
                .findById(orderDTO.getUserId())
                .orElseThrow(()-> new DataNotFoundException("Cannot find user with id: "+ orderDTO.getUserId()));


        // Convert orderDTO => Order
        // use libary ModelMapper
        //Tạo một luồng bảng ảnh xạ riêng để  kiểm soát  việc ánh xạ
        modelMapper.typeMap(OrderDTO.class, Order.class)
                .addMappings(mapper -> mapper.skip(Order::setId));
        // update các trường của đơn hàng từ orderDTO
        Order order = new Order();
        modelMapper.map(orderDTO, order);
        order.setUser(user);
        order.setOrderDate(LocalDate.now());
        order.setStatus(OrderStatus.PENDING);
        order.setActive(true);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setCoupon(null);


        if (orderDTO.getCouponCode() != null && !orderDTO.getCouponCode().trim().isEmpty()) {
            Coupon coupon = couponRepository.findByCode(orderDTO.getCouponCode())
                    .orElseThrow(() -> new DataNotFoundException("Cannot find coupon with code: " + orderDTO.getCouponCode()));

            // Cập nhật số lượng sử dụng của coupon
            if (coupon.getUsageLimit() > 0) {
                order.setCoupon(coupon);
                coupon.setUsageLimit(coupon.getUsageLimit() - 1);
                couponRepository.save(coupon); // Lưu lại coupon đã cập nhật
            } else {
                // Xử lý khi số lượng sử dụng đã đạt giới hạn, nếu cần
                throw new RuntimeException("Coupon usage limit exceeded");
            }
        }

        orderRespository.save(order);



            // Duyệt lại orderDetail và setsetOrder
        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.setOrder(order);
        }
        // Lưu danh sách OrderDetail vào CSDL
        orderDetailRespository.saveAll(orderDetails);





//        OrderDetail, duyệt qua để trừ số lượng sản phẩm trong ProductDetail
        for (OrderDetail orderDetail : orderDetails) {
            // Sử dụng lại ProductDetail từ Map thay vì truy vấn lại từ database
            String key = orderDetail.getProduct().getId() + "_" + orderDetail.getColor() + "_" + orderDetail.getSize();
            ProductDetail productDetail = productDetailMap.get(key);

            // Trừ đi số lượng sản phẩm đã mua
            productDetail.setQty(productDetail.getQty() - orderDetail.getNumberOfProducts());

            // Cập nhật lại ProductDetail
            productDetailRespository.save(productDetail);

            Product product = productMap.get(orderDetail.getProduct().getId());

            product.setTotalSales(product.getTotalSales() + orderDetail.getNumberOfProducts());

            product.setStock(product.getStock() - orderDetail.getNumberOfProducts());

            productRespository.save(product);
        }

        OrderResponse orderResponse = OrderResponse.fromOrder(order);
        return orderResponse;
    }

    @Override
    public Order getOrder(Long id) throws Exception {
        return orderRespository.findById(id).orElseThrow(()-> new DataNotFoundException(
                "Cannot find order with id: " + id));
    }

    @Override
    @Transactional
    public OrderResponse updateOrder(Long id, UpdateOrderDTO updateOrderDTO) throws DataNotFoundException{
        Order order = orderRespository.findById(id).orElseThrow(() ->
                new DataNotFoundException("Cannot find order with id: " + id));



        order.setFullName(updateOrderDTO.getFullName());
        order.setEmail(updateOrderDTO.getEmail());
        order.setPaymentMethod(updateOrderDTO.getPhoneNumber());
        order.setAddress(updateOrderDTO.getAddress());
        order.setStatus(updateOrderDTO.getStatus());
        order.setUpdatedAt(LocalDateTime.now());
        //Tạo một luòng bằng ánh xạ riêng để kiểm soát ánh xạ
//        modelMapper.typeMap(OrderDTO.class, Order.class)
//                .addMappings(mapper -> mapper.skip(Order::setId));
        //Cập nhật các trường của đơn hàng từ orderDTO
//        modelMapper.map(orderDTO, order);

        Order orderexisting = orderRespository.save(order);
        return OrderResponse.fromOrder(orderexisting);

    }


    @Override
    @Transactional
    public OrderResponse updateStatusOrder(Long id, String status) throws DataNotFoundException{
        Order order = orderRespository.findById(id).orElseThrow(() ->
                new DataNotFoundException("Cannot find order with id: " + id));

        if(status.equals(OrderStatus.SHIPPED)) {
            order.setShippingDate(LocalDate.now());
        }
        order.setStatus(status);

        Order orderexisting = orderRespository.save(order);
        return OrderResponse.fromOrder(orderexisting);

    }

    @Override
    public OrderResponse updateInfoPaymentOrder(Long id, String vnp_TransactionNo, String vnp_ResponseCode) throws DataNotFoundException {
        Order order = orderRespository.findById(id).orElseThrow(() ->
                new DataNotFoundException("Cannot find order with id: " + id));

        if (vnp_TransactionNo != null && !vnp_TransactionNo.isEmpty() && "00".equals(vnp_ResponseCode)) {
            order.setTransactionNumber(vnp_TransactionNo);
            order.setStatus(OrderStatus.PROCESSING);
        }


        Order orderexisting = orderRespository.save(order);
        return OrderResponse.fromOrder(orderexisting);
    }



    @Override
    @Transactional
    public void deleteOrder(Long id) {
        Order order = orderRespository.findById(id).orElse(null);

        if(order != null) {
            order.setActive(false);
            orderRespository.save(order);
        }
    }

    @Override
    public List<Order> findByUserId(Long userId) {
        return orderRespository.findByUserId(userId);
    }

    @Override
    public Page<Order> getOrdersByKeyword(String keyword, String status, Pageable pageable) {
        return orderRespository.findByKeyword(keyword, status, pageable);
    }
}
