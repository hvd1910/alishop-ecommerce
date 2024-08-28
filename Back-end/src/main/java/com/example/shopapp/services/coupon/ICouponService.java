package com.example.shopapp.services.coupon;


import com.example.shopapp.dtos.CouponDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Coupon;
import com.example.shopapp.response.Coupon.CouponCalResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICouponService {
    CouponCalResponse calculateCouponValue(String couponCode, double totalAmount) throws DataNotFoundException;

    Page<Coupon> getAllCoupons(String keyword, Pageable pageable);

    Coupon createCoupon(CouponDTO couponDTO) throws DataNotFoundException;
    Coupon updateCoupon(Long id, CouponDTO couponDTO) throws DataNotFoundException;
    Coupon getCouponById(Long id) throws DataNotFoundException;
    void deleteCoupon(Long id) throws DataNotFoundException;
}
