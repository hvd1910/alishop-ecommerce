package com.example.shopapp.dtos;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ContactDTO {

    private String name;
    private String email;
    private String message;
    private String reply;
    private String status;
}
