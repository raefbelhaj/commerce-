package com.commerce.commerce.Service;


import com.commerce.commerce.Models.Product;

import com.commerce.commerce.dtos.ProductDTO;
import com.commerce.commerce.repositories.CategoryRepository;
import com.commerce.commerce.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Integer id) {
        return productRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public ProductDTO updateProduct(Integer id, ProductDTO productDTO) {
        if (productRepository.existsById(id)) {
            Product product = convertToEntity(productDTO);
            product.setId(id);
            Product updatedProduct = productRepository.save(product);
            return convertToDTO(updatedProduct);
        }
        return null;
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setCategoryId(product.getCategory().getId());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStatus(product.getStatus());
        return dto;
    }

    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setCategory(categoryRepository.findById(dto.getCategoryId()).orElse(null));
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStatus(dto.getStatus());
        return product;
    }
}