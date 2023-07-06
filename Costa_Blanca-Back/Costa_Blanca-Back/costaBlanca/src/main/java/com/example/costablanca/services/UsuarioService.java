package com.example.costablanca.services;

import com.example.costablanca.models.Usuario;
import com.example.costablanca.repository.UsuarioRepository;
import com.example.costablanca.specification.UsuarioSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Integer save(Usuario usuario) {
        try {
            return usuarioRepository.save(usuario).getId();
        } catch (DataIntegrityViolationException e) {
            throw e;
        }
    }

    public Usuario findByUser(String email, String password) {
        return usuarioRepository.findByUser(email, password);
    }

    public Optional<Usuario> updateUsuario(Usuario usuario) {
        Optional<Usuario> existUser = usuarioRepository.findById(usuario.getId());
        if (existUser.isPresent()) {
            if (!usuario.equals(existUser)) {
                usuario.setId(existUser.get().getId());
            }
        }
        usuarioRepository.save(usuario);
        return existUser;
    }

    public Boolean updatePassword(Integer id, String novaSenha) {
        //TODO: Conferir se a senha anterior bate com a do banco
        Usuario existUser = usuarioRepository.findById(id).orElse(null);
        if (existUser != null) {
            existUser.setSenha(novaSenha);
        } else {
            return false;
        }
        usuarioRepository.save(existUser);
        return true;
    }

    public Boolean inativar(Integer id) {
        Usuario existUser = usuarioRepository.findById(id).orElse(null);
        if (existUser != null) {
            existUser.setStatus(false);
        } else {
            return false;
        }
        usuarioRepository.save(existUser);
        return true;
    }

    public Usuario getUser(String email, String cpf) {
        return usuarioRepository.findByEmailAndCpf(email, cpf);
    }


    public List<Usuario> getUsuariosByFilters(HashMap<String, String> filters) {
        Specification<Usuario> spec = UsuarioSpecifications.withFilters(filters);
        return usuarioRepository.findAll(spec);
    }

    public List<Usuario> findAllUsers() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}
