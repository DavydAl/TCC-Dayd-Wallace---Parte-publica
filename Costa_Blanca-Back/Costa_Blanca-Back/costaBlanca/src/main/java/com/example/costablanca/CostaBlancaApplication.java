package com.example.costablanca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class CostaBlancaApplication {

    public static void main(String[] args) {
        TimeZone defaultTimeZone = TimeZone.getDefault();
        System.out.println("Fuso horário padrão: " + defaultTimeZone.getID());
        SpringApplication.run(CostaBlancaApplication.class, args);
    }

}
