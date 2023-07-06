package com.example.costablanca.controller;

import com.example.costablanca.models.Usuario;
import com.example.costablanca.services.EmailService;
import com.example.costablanca.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/login")
    public String login(@RequestHeader(value = "email") String email, @RequestHeader("password") String password) {
        try {
            var response = usuarioService.findByUser(email, password);
            if (response != null){
                return response.getId().toString();
            }else {
                return "";
            }
        } catch (NoSuchElementException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/cadastraUsuario")
    public ResponseEntity cadastrar(@RequestBody Usuario usuario) {
        try {
            var userId = usuarioService.save(usuario);
            return ResponseEntity.status(HttpStatus.OK).body(userId);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario já cadastrado");
        }
    }


    @PutMapping("/updateUsuario")
    public ResponseEntity updateCadastro(@RequestBody Usuario usuario) {
        try {
            usuarioService.updateUsuario(usuario);
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.updateUsuario(usuario).get().getId());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao Atualizar o Usuario");
        }
    }

    @GetMapping("/listUser")
    public ResponseEntity listAllUser(@RequestParam HashMap<String, String> filters) {
        try {
            if (filters.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAllUsers());
            }
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.getUsuariosByFilters(filters));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao Filtrar o Usuario");
        }
    }

    @GetMapping("/user")
    public ResponseEntity findUser(@RequestParam(value = "id") Integer id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao buscar o Usuario");
        }
    }

    @PutMapping("/updatePassword")
    public ResponseEntity updatePassword(@RequestParam(value = "id") Integer id, @RequestParam(value = "nova_senha") String novaSenha) {
        try {
            usuarioService.updatePassword(id, novaSenha);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/inativarUsuario")
    public ResponseEntity inativarUsuario(@RequestHeader(value = "id") Integer id) {
        try {
            usuarioService.inativar(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private final EmailService emailService;

    @Autowired
    public UsuarioController(EmailService emailService) {
        this.emailService = emailService;
    }


    @GetMapping("/email")
    public ResponseEntity user(@RequestParam HashMap<String, String> params) {
        try {
            var usuario = usuarioService.getUser(params.get("email"), params.get("cpf"));
            if (usuario != null) {
                emailService.enviarEmail(params.get("email"), "Recuperar Senha", usuario);
                return ResponseEntity.status(HttpStatus.OK).body("Email enviado com Sucesso");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario nao encontrado");
            }

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao buscar o Usuario");
        }
    }

}
