package com.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.admin.bean.Product;
import com.admin.entity.ProductEntity;
import com.admin.exception.CategoryNotFoundException;
import com.admin.exception.ProductNotFoundException;

@Service
public interface ProductService {

	public Product insert(Product product);
	
	public ProductEntity get(Integer productId);
	
	public List<Product> getProductsByCategoryName(String categoryName) throws CategoryNotFoundException;
	
    public List<Product> getAll();
	
	public void update(Integer productId, Product product) throws ProductNotFoundException;
	
	public void delete(Integer productId) throws ProductNotFoundException;

	public List<Product> searchProductByCategory(Optional<Integer> categoryId);
		
	List<Product> searchSimilarProducts(String productName) throws ProductNotFoundException;
	
	
}
