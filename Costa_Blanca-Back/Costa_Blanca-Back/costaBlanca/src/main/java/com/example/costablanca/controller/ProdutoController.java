package com.example.costablanca.controller;

import com.example.costablanca.DTO.QuantidadeDTO;
import com.example.costablanca.models.Produto;
import com.example.costablanca.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class ProdutoController {
    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity products(@RequestParam HashMap<String, String> filters) {
        try {
            if (filters.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(productService.findAllProducts());
            }
            return ResponseEntity.status(HttpStatus.OK).body(productService.getProdutosByFilters(filters));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao buscar os produtos");
        }
    }

    @PostMapping("/add")
    public ResponseEntity products(@RequestBody List<Produto> produtos) {
        try {
            productService.save(produtos);
            return ResponseEntity.status(HttpStatus.OK).body("Produtos salvos com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao salvar os produtos");
        }
    }

    @GetMapping("/product")
    public ResponseEntity products(@RequestParam(value = "id") Integer id) {
        try {
            var produto = productService.getProdutoByID(id);
            return ResponseEntity.status(HttpStatus.OK).body(produto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao buscar o produtos");
        }
    }

    @PutMapping("/updateProduct")
    public ResponseEntity update(@RequestBody List<Produto> produto) {
        try {
            productService.updateProduct(produto);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/quantidade")
    public ResponseEntity quantidade(@RequestBody QuantidadeDTO quantidade) {
        try {
            var produto = productService.getProdutoByID(quantidade.getId());
            produto.setQuantidade(quantidade.getQuantidade());
            List<Produto> produtoList = new ArrayList<>();
            produtoList.add(produto);
            productService.save(produtoList);
            return ResponseEntity.status(HttpStatus.OK).body(quantidade);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao atualizar a quantidade do produto");
        }
    }


}
