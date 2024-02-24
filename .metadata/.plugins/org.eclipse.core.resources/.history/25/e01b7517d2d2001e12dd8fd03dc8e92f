package com.admin.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.Product;
import com.admin.entity.CategoryEntity;
import com.admin.entity.ProductEntity;
import com.admin.exception.CategoryNotFoundException;
import com.admin.exception.ProductNotFoundException;
import com.admin.repository.ProductRepository;
import com.admin.service.ProductService;

@Service
public class ProductServiceImplementation implements ProductService{

	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public Product insert(Product product)  {
		ProductEntity entity=new ProductEntity();
		entity.setProductId(product.getProductId());
		entity.setName(product.getName());
		entity.setPrice(product.getPrice());
		entity.setQuantity(product.getQuantity());
		entity.setDescription(product.getDescription());
		entity.setQuantityProduct(product.getQuantityProduct());
		entity.setImage(product.getImage());
		CategoryEntity categoryEntity=new CategoryEntity();
		categoryEntity.setCategoryId(product.getCategory().getCategoryId());
		entity.setCategory(categoryEntity);
		if(entity!=null) {
		productRepository.save(entity);
		}
		else {
			throw new ProductNotFoundException("The Product fields are null");
		}
		return product;
	
	}

	@Override
	public Product getProductById(Integer productId) {
	    Optional<ProductEntity> productOptional = productRepository.findById(productId);
	    if (productOptional.isPresent()) {
	        ProductEntity productEntity = productOptional.get();
	        Product product = new Product();
	        product.setProductId(productEntity.getProductId());
	        product.setName(productEntity.getName());
	        product.setPrice(productEntity.getPrice());
	        product.setQuantity(productEntity.getQuantity());
	        product.setDescription(productEntity.getDescription());
	        product.setQuantityProduct(productEntity.getQuantityProduct());
	        product.setImage(productEntity.getImage());

	        CategoryEntity category = new CategoryEntity();
	        category.setCategoryId(productEntity.getCategory().getCategoryId());
	        category.setCategoryName(productEntity.getCategory().getCategoryName());

	        product.setCategory(category);

	        return product;
	    } else {
	    	throw new ProductNotFoundException("Product not found with Id- " + productId);
	    }
	}


	@Override
	public List<Product> getAll() {
		List<ProductEntity> productEntities=productRepository.findAll();
		List<Product> products = entityToBean(productEntities);
		
		return products;
	}
	
public 	List<Product> entityToBean(List<ProductEntity> productEntities) {
		
		List<Product> products = new ArrayList<>();
		
		for(ProductEntity entity:productEntities) {
			Product product=new Product();
			product.setProductId(entity.getProductId());	
			product.setName(entity.getName());	
			product.setPrice(entity.getPrice());	
			product.setQuantity(entity.getQuantity());	
			product.setDescription(entity.getDescription());
			product.setQuantityProduct(entity.getQuantityProduct());
			product.setImage(entity.getImage());
			CategoryEntity category = new CategoryEntity();
	        category.setCategoryId(entity.getCategory().getCategoryId());
	        category.setCategoryName(entity.getCategory().getCategoryName());

	        product.setCategory(category);
			
			products.add(product);
		}
		return products;
		
		
		
	}

   public void beanToEntity(Product product, ProductEntity entity) {
	   entity.setProductId(product.getProductId());
	   entity.setName(product.getName());
	   entity.setPrice(product.getPrice());
	   entity.setQuantity(product.getQuantity());
	   entity.setQuantityProduct(product.getQuantityProduct());
	   entity.setDescription(product.getDescription());
	   entity.setImage(product.getImage());
	   CategoryEntity category=new CategoryEntity();
	   category.setCategoryId(product.getCategory().getCategoryId());
	   category.setCategoryName(product.getCategory().getCategoryName());
	   product.setCategory(category);
   }

	@Override
	public void update(Integer productId, Product product) throws ProductNotFoundException {
	Optional<ProductEntity> productOptional=productRepository.findById(productId);
		if(productOptional.isPresent()) {
		ProductEntity productEntity =productOptional.get();
		beanToEntity(product, productEntity);
			productRepository.save(productEntity);
		}
		else {
			
			throw new ProductNotFoundException("Product not found with Id- "+productId);
			
		}
	}

	
	@Override
	public void delete(Integer productId) throws ProductNotFoundException {
		Optional<ProductEntity> productOptional=productRepository.findById(productId);
		if(productOptional.isPresent()) {
		ProductEntity productEntity =productOptional.get();
			productRepository.delete(productEntity);
		}
		else {
				throw new ProductNotFoundException("Product not found with Id- "+productId);
				  
		}
		
	}
	
	
	@Override
	public List<Product> searchProductByCategory(Optional<Integer> categoryId) {
		List<ProductEntity> productEntities=productRepository.findByCategory(categoryId);
		List<Product> products=entityToBean(productEntities);
		return products;
	}

	@Override
	public List<Product> searchSimilarProducts(String productName) throws ProductNotFoundException {
	    List<ProductEntity> allProductEntities = productRepository.findAll();
	    List<Product> allProducts = entityToBean(allProductEntities);

	    // List to store similar products
	    List<Product> similarProducts = new ArrayList<>();

	    // Iterate through all products and check if the name contains the search query
	    for (Product product : allProducts) {
	        if (product.getName().toLowerCase().contains(productName.toLowerCase())) {
	            // Found a similar product
	            similarProducts.add(product);
	        }
	    }
	    if(!(similarProducts.isEmpty())) {
	    	 return similarProducts;

	    }
	    else {
	    	throw new ProductNotFoundException("Product Not found with name: "+productName);
	    }

	   	}

	@Override
	public List<Product> getProductsByCategoryName(String categoryName) throws CategoryNotFoundException {
		
		List<ProductEntity> productEntities = productRepository.findByCategoryName(categoryName);
	    if (!productEntities.isEmpty()) {
	        return entityToBean(productEntities);
	    } else {
	        throw new CategoryNotFoundException("Category Not found with name: " + categoryName);
	    }

		
	}

	}
