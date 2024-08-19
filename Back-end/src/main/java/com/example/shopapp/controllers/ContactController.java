package com.example.shopapp.controllers;

import com.example.shopapp.dtos.ContactDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Contact;
import com.example.shopapp.response.Response;
import com.example.shopapp.services.contact.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public ResponseEntity<?> getContacts(
            @RequestParam(value = "keyword",  defaultValue = "") String keyword,
            @RequestParam(value = "status",  defaultValue = "") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String sort
           ) {
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(sort) ? Sort.Direction.ASC : Sort.Direction.DESC;
        PageRequest pageRequest = PageRequest.of(
                page, limit,
                Sort.by(sortDirection,"createdAt")
        );
        Page<Contact> contacts = contactService.getContact(keyword, status, pageRequest);
        return  ResponseEntity.ok(new Response("success", "Get all contact successfully.", contacts));
    }


    @PostMapping("")
    public ResponseEntity<?> createContact(@RequestBody ContactDTO contactDTO) throws DataNotFoundException {
        Contact contact = contactService.insertContact(contactDTO);
        return  ResponseEntity.ok(new Response("success", "Sent contact successfully.", null));


    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{contactId}")
    public ResponseEntity<?> getContactById(@PathVariable Long contactId) throws DataNotFoundException {
            Contact contact = contactService.getContactById(contactId);
        return  ResponseEntity.ok(new Response("success", "Get contact successfully.", contact));
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{contactId}")
    public ResponseEntity<?> updateContact(
            @PathVariable Long contactId, @RequestBody ContactDTO contactDTO) throws DataNotFoundException {

            Contact updatedContact = contactService.updateContact(contactId, contactDTO);
        return  ResponseEntity.ok(new Response("success", "Reply contact successfully.", updatedContact));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{contactId}")
    public ResponseEntity<?> deleteContact(@PathVariable Long contactId) throws DataNotFoundException {
            contactService.deleteContact(contactId);
        return  ResponseEntity.ok(new Response("success", "Delete contact successfully.", null));

    }
}
