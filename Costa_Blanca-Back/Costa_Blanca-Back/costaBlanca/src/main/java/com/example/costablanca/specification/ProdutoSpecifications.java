package com.example.costablanca.specification;

import com.example.costablanca.models.Produto;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ProdutoSpecifications {

    public static Specification<Produto> withFilters(HashMap<String, String> filters) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            boolean hasFilter = false;

            for (Map.Entry<String, String> entry : filters.entrySet()) {
                String fieldName = entry.getKey();
                String value = entry.getValue();

                if (value != null) {
                    switch (fieldName) {
                        case "descricao" -> {
                            String descricao = "%" + value + "%";
                            Predicate condition = criteriaBuilder.like(root.get(fieldName), descricao);
                            predicates.add(condition);
                            hasFilter = true;
                        }
                        case "referencia", "codigoAuxiliar" -> {
                            Predicate condition = criteriaBuilder.equal(root.get(fieldName), value);
                            predicates.add(condition);
                            hasFilter = true;
                        }
                        case "setorId", "linhaId", "marcaId", "colecaoId", "fornecedorId", "tamanhoId", "corId" -> {
                            Predicate condition = criteriaBuilder.equal(root.get(fieldName), Integer.valueOf(value));
                            predicates.add(condition);
                            hasFilter = true;
                        }
                        case "precoVenda", "precoCusto" -> {
                            Predicate condition = criteriaBuilder.equal(root.get(fieldName), new BigDecimal(value));
                            predicates.add(condition);
                            hasFilter = true;
                        }
                        case "status" -> {
                            Predicate condition = criteriaBuilder.equal(root.get(fieldName), Boolean.valueOf(value));
                            predicates.add(condition);
                            hasFilter = true;
                        }
                        case "isRetirada" -> {
                            Predicate condition = criteriaBuilder.greaterThan(root.get("quantidade"), 0);
                            predicates.add(condition);
                            hasFilter = true;
                        }
                    }
                }
            }

            if (hasFilter) {
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            } else {
                return criteriaBuilder.conjunction();
            }
        };
    }
}

