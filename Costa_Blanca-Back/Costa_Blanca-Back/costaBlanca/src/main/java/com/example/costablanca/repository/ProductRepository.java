package com.example.costablanca.repository;

import com.example.costablanca.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Produto,Integer> , JpaSpecificationExecutor<Produto> {
    List<Produto> findByStatus(Boolean value);
    @Query("SELECT IFNULL(SUM(quantidade),0) FROM Produto WHERE YEAR(dataCadastro) = :ano AND MONTH(dataCadastro) = :mes AND status = true")
    Integer getTotalProduto(@Param("ano") int ano, @Param("mes") int mes);
    @Query("SELECT p FROM Produto p WHERE p.id = :id")
    Produto getQuantidade(@Param("id") int id);
    @Query("SELECT COUNT(p.id) FROM Produto p WHERE YEAR(p.dataCadastro) = :ano AND MONTH(p.dataCadastro) = :mes AND p.retirado = false")
    Integer getProdutosParados(@Param("ano") int ano, @Param("mes") int mes);

}
