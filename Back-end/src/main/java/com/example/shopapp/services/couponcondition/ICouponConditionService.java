package com.example.shopapp.services.couponcondition;

import com.example.shopapp.dtos.CouponConditionDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.CouponCondition;

import java.util.List;

public interface ICouponConditionService {

    CouponCondition createCouponCondition(CouponConditionDTO couponConditionDTO) throws DataNotFoundException;

    CouponCondition findById(Long id) throws DataNotFoundException;

    List<CouponCondition> findByCouponId(Long couponId);

    CouponCondition updateCouponCondition(Long id, CouponConditionDTO couponConditionDTO) throws DataNotFoundException;

    void deleteById(Long id) throws DataNotFoundException;
}
