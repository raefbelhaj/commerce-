package com.commerce.commerce.repositories;

import com.commerce.commerce.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
