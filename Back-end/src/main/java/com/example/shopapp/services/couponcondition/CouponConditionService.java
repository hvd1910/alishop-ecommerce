package com.example.shopapp.services.couponcondition;

import com.example.shopapp.dtos.CouponConditionDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Coupon;
import com.example.shopapp.models.CouponCondition;
import com.example.shopapp.repositories.CouponConditionRepository;
import com.example.shopapp.repositories.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponConditionService implements ICouponConditionService {
    private final CouponRepository couponRepository;
    private final CouponConditionRepository couponConditionRepository;
    @Override
    @Transactional
    public CouponCondition createCouponCondition(CouponConditionDTO couponConditionDTO) throws DataNotFoundException {
        Coupon coupon = couponRepository.findById(couponConditionDTO.getCouponId())
                .orElseThrow(() -> new DataNotFoundException("Coupon not found."));

            CouponCondition couponCondition = CouponCondition.builder()
                    .coupon(coupon)
                    .attribute(couponConditionDTO.getAttribute())
                    .operator(couponConditionDTO.getOperator())
                    .value(couponConditionDTO.getValue())
                    .discountAmount(couponConditionDTO.getDiscountAmount())
                    .build();

        return couponConditionRepository.save(couponCondition);
    }

    @Override
    public CouponCondition findById(Long id) throws DataNotFoundException {
        return couponConditionRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Coupon Condition not found"));    }

    @Override
    public List<CouponCondition> findByCouponId(Long couponId) {
        return couponConditionRepository.findByCouponId(couponId);
    }

    @Override
    @Transactional
    public CouponCondition updateCouponCondition(Long id, CouponConditionDTO couponConditionDTO) throws DataNotFoundException {
        CouponCondition existingCouponCondition = couponConditionRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Coupon Condition not found"));

        Coupon coupon = couponRepository.findById(couponConditionDTO.getCouponId())
                .orElseThrow(() -> new DataNotFoundException("Coupon not found"));

        existingCouponCondition.setCoupon(coupon);
        existingCouponCondition.setAttribute(couponConditionDTO.getAttribute());
        existingCouponCondition.setOperator(couponConditionDTO.getOperator());
        existingCouponCondition.setValue(couponConditionDTO.getValue());
        existingCouponCondition.setDiscountAmount(couponConditionDTO.getDiscountAmount());

        return couponConditionRepository.save(existingCouponCondition);
    }

    @Override
    @Transactional
    public void deleteById(Long id) throws DataNotFoundException {
        CouponCondition couponCondition = couponConditionRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Coupon Condition not found"));
        couponConditionRepository.delete(couponCondition);
    }
}
