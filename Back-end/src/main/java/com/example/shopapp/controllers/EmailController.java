package com.example.shopapp.controllers;

import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Email;
import com.example.shopapp.response.Response;
import com.example.shopapp.services.email.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("${api.prefix}/email")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @PostMapping("")
    public ResponseEntity<?> sendEmail(@Valid @RequestBody Email email) throws DataNotFoundException {
        emailService.sendEmail(email);
        return ResponseEntity.ok(new Response("success", " thành công", null));

    }

}
