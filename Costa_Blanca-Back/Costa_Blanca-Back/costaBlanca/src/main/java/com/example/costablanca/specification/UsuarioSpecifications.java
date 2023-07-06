package com.example.costablanca.specification;

import com.example.costablanca.models.Fornecedor;
import com.example.costablanca.models.Usuario;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UsuarioSpecifications {
    public static Specification<Usuario> withFilters(HashMap<String, String> filters) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            boolean hasFilter = false;

            for (Map.Entry<String, String> entry : filters.entrySet()) {
                String fieldName = entry.getKey();
                String value = entry.getValue();

                if (value != null) {
                    switch (fieldName) {
                        case "nome" -> {
                            String descricao = "%" + value + "%";
                            Predicate condition = criteriaBuilder.like(root.get(fieldName), descricao);
                            predicates.add(condition);
                            hasFilter = true;
                        }
                        case "cpf", "email" -> {
                            Predicate condition = criteriaBuilder.equal(root.get(fieldName), value);
                            predicates.add(condition);
                            hasFilter = true;
                        }
                        case "id" -> {
                            Predicate condition = criteriaBuilder.equal(root.get(fieldName), Integer.valueOf(value));
                            predicates.add(condition);
                            hasFilter = true;
                        }
                        case "status" -> {
                            Predicate condition = criteriaBuilder.equal(root.get(fieldName), Boolean.valueOf(value));
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
