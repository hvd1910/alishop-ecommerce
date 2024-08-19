package com.example.shopapp.services.contact;

import com.example.shopapp.dtos.ContactDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface IContactService {
    Page<Contact> getContact(String keyword, String status, Pageable pageable);

    Contact insertContact(ContactDTO contactDTO) throws DataNotFoundException;
    Contact getContactById(Long contactId) throws DataNotFoundException;

    Contact updateContact(Long contactId, ContactDTO contactDTO) throws DataNotFoundException;

    void deleteContact(Long contactId) throws DataNotFoundException;





}
