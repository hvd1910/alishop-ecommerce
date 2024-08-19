package com.example.shopapp.services.orderdetail;

import com.example.shopapp.dtos.OrderDetailDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Order;
import com.example.shopapp.models.OrderDetail;
import com.example.shopapp.models.Product;
import com.example.shopapp.repositories.OrderDetailRespository;
import com.example.shopapp.repositories.OrderRespository;
import com.example.shopapp.repositories.ProductRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DateTimeException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailService implements IOrderDetailService{
    private final OrderRespository orderRespository;
    private final OrderDetailRespository orderDetailRespository;
    private final ProductRespository productRespository;
    @Override
    @Transactional
    public OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO) throws Exception{
        // find by OrderId
        Order order = orderRespository.findById(orderDetailDTO.getOrderId())
                .orElseThrow(()-> new DataNotFoundException(
                        "Cannot find Order with id: " + orderDetailDTO.getOrderId()));
        // find Product by id
        Product product = productRespository.findById(orderDetailDTO.getProductId())
                .orElseThrow(()-> new DataNotFoundException(
                        "Cannot find Product with id: "+ orderDetailDTO.getProductId()));
        OrderDetail orderDetail = OrderDetail.builder()
                .order(order)
                .product(product)
                .numberOfProducts(orderDetailDTO.getNumberOfProducts())
                .price(orderDetailDTO.getPrice())
                .totalMoney(orderDetailDTO.getTotalMoney())
                .color(orderDetailDTO.getColor())
                .size(orderDetailDTO.getSize())
                .build();

        return orderDetailRespository.save(orderDetail);

    }

    @Override
    public OrderDetail getOrderDetail(Long id) throws DataNotFoundException {
        return orderDetailRespository.findById(id)
                .orElseThrow(()-> new DataNotFoundException("Cannot find OrderDetail with id: " + id));
    }

    @Override
    @Transactional
    public OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) throws DataNotFoundException{

        OrderDetail existingOrderDetail = orderDetailRespository.findById(id)
                .orElseThrow(()-> new DataNotFoundException("Cannot find OrderDetail with id:"+ id));
        Order existingOrder = orderRespository.findById(orderDetailDTO.getOrderId())
                .orElseThrow(()-> new DateTimeException("Cannot find Order with id: "+ orderDetailDTO.getOrderId()));
        Product existingProduct = productRespository.findById(orderDetailDTO.getProductId())
                .orElseThrow(()-> new DataNotFoundException("Cannot find Product with id: " + orderDetailDTO.getProductId()));

        existingOrderDetail.setPrice(orderDetailDTO.getPrice());
        existingOrderDetail.setNumberOfProducts(orderDetailDTO.getNumberOfProducts());
        existingOrderDetail.setTotalMoney(orderDetailDTO.getTotalMoney());
        existingOrderDetail.setColor(orderDetailDTO.getColor());
        existingOrderDetail.setOrder(existingOrder);
        existingOrderDetail.setProduct(existingProduct);
        return orderDetailRespository.save(existingOrderDetail);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        orderDetailRespository.deleteById(id);
    }

    @Override
    public List<OrderDetail> findByOrderId(Long orderId) {
        return orderDetailRespository.findByOrderId(orderId);
    }
}
