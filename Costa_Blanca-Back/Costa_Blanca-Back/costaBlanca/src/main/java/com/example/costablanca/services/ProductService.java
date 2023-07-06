package com.example.costablanca.services;

import com.example.costablanca.models.Produto;
import com.example.costablanca.repository.ProductRepository;
import com.example.costablanca.specification.ProdutoSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Produto> getProdutosByFilters(HashMap<String, String> filters) {
        Specification<Produto> spec = ProdutoSpecifications.withFilters(filters);
        return productRepository.findAll(spec);
    }

    public void save(List<Produto> produtos) {
        productRepository.saveAll(produtos);
    }
    public Produto getProdutoByID(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    public void updateProduct(List<Produto> produtos) {
        productRepository.saveAll(produtos);
    }

    public List<Produto> findAllProducts() {
        return productRepository.findAll();
    }
}
