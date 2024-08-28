package com.example.shopapp.controllers;

import com.example.shopapp.dtos.CouponConditionDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.CouponCondition;
import com.example.shopapp.response.Response;
import com.example.shopapp.services.couponcondition.CouponConditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("${api.prefix}/couponconditions")
@RequiredArgsConstructor
public class CouponConditionController {
    private final CouponConditionService couponConditionService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createCouponCondition(@RequestBody CouponConditionDTO couponConditionDTO) throws DataNotFoundException {
        CouponCondition createdCouponCondition = couponConditionService.createCouponCondition(couponConditionDTO);
        return ResponseEntity.ok(new Response("success", "Create coupon condition successfully.", createdCouponCondition));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getCouponConditionById(@PathVariable Long id) throws DataNotFoundException {
        CouponCondition couponCondition = couponConditionService.findById(id);
        return ResponseEntity.ok(new Response("success", "Get coupon condition successfully.", couponCondition));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/coupon/{couponId}")
    public ResponseEntity<?> getCouponConditionsByCouponId(@PathVariable Long couponId) {
        List<CouponCondition> couponConditions = couponConditionService.findByCouponId(couponId);
        return ResponseEntity.ok(new Response("success", "Get coupon condition successfully.", couponConditions));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCouponCondition(
            @PathVariable Long id,
            @RequestBody CouponConditionDTO couponConditionDTO) throws DataNotFoundException {

        CouponCondition updatedCouponCondition = couponConditionService.updateCouponCondition(id, couponConditionDTO);
        return ResponseEntity.ok(new Response("success", "Update coupon condition successfully.", null));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCouponCondition(@PathVariable Long id) throws DataNotFoundException {
        couponConditionService.deleteById(id);
        return ResponseEntity.ok(new Response("success", "Delete coupon condition successfully.", null));
    }
}
