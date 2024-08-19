package com.example.shopapp.services.email;

import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Email;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendEmail(Email email) throws DataNotFoundException {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);




            helper.setFrom("alishop.brands@gmail.com");
            helper.setTo(email.getToEmail());
            helper.setSubject(email.getSubject());
            // Đọc nội dung tệp HTML từ thư mục resources/templates
            String htmlTemplate = new String(Files.readAllBytes(Paths.get(new ClassPathResource("templates/EmailOrder.html").getURI())));


            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = LocalDateTime.now().format(formatter);

            // Thay thế các phần tử động trong nội dung HTML
            htmlTemplate = htmlTemplate.replace("${fullName}", email.getOrderDTO().getFullName());
            htmlTemplate = htmlTemplate.replace("${email}", email.getToEmail());
            htmlTemplate = htmlTemplate.replace("${phone}", email.getOrderDTO().getPhoneNumber());
            htmlTemplate = htmlTemplate.replace("${orderDate}", formattedDateTime);
            htmlTemplate = htmlTemplate.replace("${address}", email.getOrderDTO().getAddress());
            htmlTemplate = htmlTemplate.replace("${paymentMessage}", email.getSubject());
            htmlTemplate = htmlTemplate.replace("${subtotal}", email.getOrderDTO().getTotalMoney().toString());
            htmlTemplate = htmlTemplate.replace("${total}", email.getOrderDTO().getTotalMoney().toString());

            helper.setText(htmlTemplate, true); // true để chỉ định nội dung là HTML
            mailSender.send(message);
        } catch (Exception e) {
            throw new DataNotFoundException("Send Email Failed.");
        }
    }


    public void sendEmailReplyContact(String toEmail,  String reply) throws DataNotFoundException {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("alishop.brands@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject("Thank You for Contacting Ali Shop – Here's Our Response");
            helper.setText(reply);
            mailSender.send(message);
        } catch (Exception e) {
            throw new DataNotFoundException("Send Email Failed.");
        }
    }


}
