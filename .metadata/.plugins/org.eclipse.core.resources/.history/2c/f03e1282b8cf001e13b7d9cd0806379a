package com.admin.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.bean.Product;
import com.admin.entity.ProductEntity;
import com.admin.exception.CategoryNotFoundException;
import com.admin.exception.ProductNotFoundException;
import com.admin.service.ProductService;

@RestController
@RequestMapping("/productController")
public class ProductController {

	private static Logger log = LoggerFactory
			.getLogger(ProductController.class.getSimpleName());
	
	@Autowired
	private ProductService productService;
	
	@PostMapping
	public ResponseEntity<Product> save(@RequestBody Product product)
	{
		
	      	log.info("Start Product Controller:insert()");
	      	log.info("Products{}",product);
			Product product2=productService.insert(product);
			
			log.info("End Product Controller:insert()");
			return ResponseEntity.status(HttpStatus.OK).body(product2);			
	}
	
	@GetMapping("/getById/{productId}")
	public ResponseEntity<Product> getById(@PathVariable Integer productId){
		log.info("Start::ProductController::getProductById");
		Product product=productService.getProductById(productId);
		log.info("Product Details of id{}",product);
		log.info("End::ProductController::getProductById");
		return ResponseEntity.status(HttpStatus.OK).body(product);
		
		
		
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<List<Product>> getAll(){
		List<Product> products=productService.getAll();
		log.info("Product Details {}", products);
		ResponseEntity<List<Product>>entity=new ResponseEntity<List<Product>>(products,HttpStatus.OK);
		return entity;
	}
	
	@PutMapping("/update/{productId}")
	public ResponseEntity<Product> update(@RequestBody Product product,
			@PathVariable Integer productId) {
		log.info("Start Product Controller:update()");
  
			productService.update(productId, product);
		
			log.info("End Product Controller:update()");
			return ResponseEntity.status(HttpStatus.OK).body(product);
		
	}
	
	@DeleteMapping("/delete/{productId}")
	public ResponseEntity<String> delete(@PathVariable Integer productId){
		log.info("Start Product Controller:delete()");
			try {
				productService.delete(productId);
			return new ResponseEntity<String>("Deleting the product with Id "+productId,HttpStatus.ACCEPTED);
			
			} catch (ProductNotFoundException e) {
				log.error("Handling Exception in ProductControl::delete() ");
				log.info("End Product Controller:delete()");
				return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
			}
		
	}
	
	@GetMapping("/searchByCategory/{categoryId}")
	public ResponseEntity<List<Product>> searchByCategory(@PathVariable Optional<Integer> categoryId){
		log.info(" Start::Product controller:searchByCategory::categoryId"+categoryId);
		List<Product> products=productService.searchProductByCategory(categoryId);
		ResponseEntity<List<Product>> entity=new ResponseEntity<List<Product>>(products,HttpStatus.OK);
		log.info(" End::Product controller:searchByCategory::Product details"+products);

		return entity;
		
	}
	
	@GetMapping("/searchSimilarProducts/{productName}")
	public ResponseEntity<List<Product>> searchSimilarProducts(@PathVariable (value = "productName") String productName) {
		log.info("Start::ProductController:searchSimilarProducts::productName"+productName);
		List<Product> similarProducts = productService.searchSimilarProducts(productName);
		log.info("End::ProductController:searchSimilarProducts");
		return ResponseEntity.status(HttpStatus.OK).body(similarProducts);
					      	    
	}
	
	@GetMapping("/searchProductByCategoryName/{categoryName}")
	public ResponseEntity<List<Product>> searchProductByCategoryName(@PathVariable(value = "categoryName") String categoryName){
		log.info("Start::ProductController:searchProductByCategoryName::categoryName"+categoryName);
		List<Product> list=null;
			list = productService.getProductsByCategoryName(categoryName);
			log.info("End::ProductController:searchProductByCategoryName");
		return ResponseEntity.status(HttpStatus.OK).body(list);

		
	}
}
