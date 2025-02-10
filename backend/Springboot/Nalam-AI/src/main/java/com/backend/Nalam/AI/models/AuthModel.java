package com.backend.Nalam.AI.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private Long id;

    private String email;
    private String name;

    public int getAge() {
        return age;
    }

    public String getNumber() {
        return number;
    }


    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }



    private String number;
    private int age;

}
