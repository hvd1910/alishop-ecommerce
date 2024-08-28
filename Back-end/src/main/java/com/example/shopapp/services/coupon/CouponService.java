package com.example.shopapp.services.coupon;

import com.example.shopapp.dtos.CouponDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Coupon;
import com.example.shopapp.models.CouponCondition;
import com.example.shopapp.models.Order;
import com.example.shopapp.repositories.CouponConditionRepository;
import com.example.shopapp.repositories.CouponRepository;
import com.example.shopapp.repositories.OrderRespository;
import com.example.shopapp.response.Coupon.CouponCalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponService implements ICouponService{
    private final CouponRepository couponRepository;
    private final CouponConditionRepository couponConditionRepository;
    private final OrderRespository orderRespository;


    @Override
    public CouponCalResponse calculateCouponValue(String couponCode, double totalAmount) throws DataNotFoundException {
        Coupon coupon = couponRepository.findByCode(couponCode)
                .orElseThrow(() -> new DataNotFoundException("Coupon not found."));
        if(!coupon.isActive()) {
            throw  new IllegalArgumentException("Coupon is not active.");
        }

        List<Order> orders = orderRespository.findOrderByCoupon(coupon);
        if(orders.size() >= coupon.getUsageLimit()) {
            throw new IllegalArgumentException("Coupon usage limit exceeded.");
        }

        double discount = calculateDiscount(coupon, totalAmount);
        double finalAmount = totalAmount - discount;

        CouponCalResponse couponCalResponse = CouponCalResponse.builder()
                .CouponId(coupon.getId())
                .totalAmount(finalAmount)
                .build();
        return couponCalResponse;
    }

    private double calculateDiscount(Coupon coupon, double totalAmount) {
        List<CouponCondition> conditions = couponConditionRepository
                .findByCouponId(coupon.getId());
        double discount = 0.0;
        double updatedTotalAmount = totalAmount;
        for (CouponCondition condition : conditions) {

            String attribute = condition.getAttribute();
            String operator = condition.getOperator();
            String value = condition.getValue();

            double percentDiscount = Double.valueOf(
                    String.valueOf(condition.getDiscountAmount()));

            if (attribute.equals("minimum_amount")) {
                if (operator.equals(">") && updatedTotalAmount > Double.parseDouble(value)) {
                    discount += updatedTotalAmount * percentDiscount / 100;
                }
            } else if (attribute.equals("applicable_date")) {
                LocalDate applicableDate = LocalDate.parse(value);
                LocalDate currentDate = LocalDate.now();
                if (operator.equalsIgnoreCase("BETWEEN")
                        && currentDate.isEqual(applicableDate)) {
                    discount += updatedTotalAmount * percentDiscount / 100;
                }
            }

            //còn nhiều nhiều điều kiện khác nữa
            updatedTotalAmount = updatedTotalAmount - discount;
        }
        return discount;
    }

    @Override
    public Page<Coupon> getAllCoupons(String keyword, Pageable pageable) {
        return couponRepository.findByCouponAll(keyword, pageable);
    }

    @Override
    @Transactional
    public Coupon createCoupon(CouponDTO couponDTO) throws DataNotFoundException {
        Optional<Coupon> coupon = couponRepository.findByCode(couponDTO.getCode());
        if(coupon.isPresent()) {
            throw new DataNotFoundException("Coupon already exists.");
        }
        Coupon newCoupon = Coupon.builder()
                .code(couponDTO.getCode())
                .usageLimit(couponDTO.getUsageLimit())
                .active(true)
                .build();
        return couponRepository.save(newCoupon);
    }

    @Override
    @Transactional
    public Coupon updateCoupon(Long id, CouponDTO couponDTO) throws DataNotFoundException {
        Coupon couponExisting = couponRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Coupon not found."));
        Optional<Coupon> couponValid = couponRepository.findByCode(couponDTO.getCode());
        if (couponValid.isPresent() && !couponValid.get().getId().equals(id)) {
            throw new DataNotFoundException("Code Coupon already exists.");
        }

        couponExisting.setCode(couponDTO.getCode());
        couponExisting.setUsageLimit(couponDTO.getUsageLimit());
        couponExisting.setActive(couponDTO.isActive());

        return couponRepository.save(couponExisting);
    }

    @Override
    public Coupon getCouponById(Long id) throws DataNotFoundException {
        return couponRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Coupon not found."));
    }

    @Override
    @Transactional
    public void deleteCoupon(Long id) throws DataNotFoundException {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));
        List<Order> orders = orderRespository.findOrderByCoupon(coupon);
        if (!orders.isEmpty()) {
            coupon.setActive(false);
            couponRepository.save(coupon);
            throw new DataNotFoundException("Cannot delete coupon linked to existing orders.");
        }
        List<CouponCondition> couponConditions = couponConditionRepository.findByCouponId(id);
        couponConditionRepository.deleteAll(couponConditions);
        couponRepository.delete(coupon);
    }




}
