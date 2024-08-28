package com.example.shopapp.controllers;

import com.example.shopapp.dtos.CouponDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Coupon;
import com.example.shopapp.response.Coupon.CouponCalResponse;
import com.example.shopapp.response.Response;
import com.example.shopapp.services.coupon.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/coupons")
@RequiredArgsConstructor
public class CouponController {
    private final CouponService couponService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/calculate")
    public ResponseEntity<?> calculateCouponValue(
            @RequestParam("couponCode") String couponCode,
            @RequestParam("totalAmount") double totalAmount) throws DataNotFoundException {

            CouponCalResponse couponCalResponse = couponService.calculateCouponValue(couponCode, totalAmount);

            return ResponseEntity.ok(new Response("success", "", couponCalResponse));

    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public ResponseEntity<?> getAllCoupons(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String sort) {
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(sort) ? Sort.Direction.ASC : Sort.Direction.DESC;

        PageRequest pageRequest = PageRequest.of(
                page, limit,
                Sort.by(sortDirection,"id")
        );
        Page<Coupon> coupons = couponService.getAllCoupons(keyword, pageRequest);
        return ResponseEntity.ok(new Response("success", "Get all coupon successfully.", coupons));
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createCoupon(@RequestBody CouponDTO couponDTO) throws DataNotFoundException {

        Coupon newCoupon = couponService.createCoupon(couponDTO);
        return ResponseEntity.ok(new Response("success", "Create coupon successfully.", newCoupon));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoupon(
            @PathVariable("id") Long id,
            @RequestBody CouponDTO couponDTO) throws DataNotFoundException {

        Coupon coupon = couponService.updateCoupon(id, couponDTO);
        return ResponseEntity.ok(new Response("success", "Update coupon successfully.", null));

    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getCouponById(@PathVariable("id") Long id) throws DataNotFoundException {

        Coupon coupon = couponService.getCouponById(id);
        return ResponseEntity.ok(new Response("success", "Get coupon successfully.", coupon));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable("id") Long id) throws DataNotFoundException {

        couponService.deleteCoupon(id);
        return ResponseEntity.ok(new Response("success", "Delete coupon successfully.", null));

    }
}
