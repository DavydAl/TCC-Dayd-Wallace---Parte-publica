package com.example.costablanca.repository;

import com.example.costablanca.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>, JpaSpecificationExecutor<Usuario> {
    @Query("select l from Usuario l where l.email = :email and l.senha = :senha and l.status = true")
    Usuario findByUser(String email, String senha);

    @Query("SELECT l FROM Usuario l WHERE l.email = :email AND l.cpf = :cpf")
    Usuario findByEmailAndCpf(@Param("email") String email, @Param("cpf") String cpf);

    List<Usuario> findByNome(String value);
    List<Usuario> findByCpf(String value);
    List<Usuario> findByStatus(Boolean value);
    List<Usuario> findByEmail(String value);
}
