package com.admin.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
public class ProductEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Integer productId;

	@Column(name = "name")
	private String name;

	@Column(name = "price")
	private Double price;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	@Column(name = "description")
	private String description;
	
	@Column(name="product_quantity")
	private Integer quantityProduct;
	
	@Column(name="image")
	private String image;
	
	@ManyToOne
    @JoinColumn(name="category_id", referencedColumnName = "category_id")
	private CategoryEntity category;
	
	public ProductEntity() {
		
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public CategoryEntity getCategory() {
		return category;
	}

	public void setCategory(CategoryEntity category) {
		this.category = category;
	}

	
	
	public Integer getQuantityProduct() {
		return quantityProduct;
	}

	public void setQuantityProduct(Integer quantityProduct) {
		this.quantityProduct = quantityProduct;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "ProductEntity [productId=" + productId + ", name=" + name + ", price=" + price + ", quantity="
				+ quantity + ", description=" + description + ", quantityProduct=" + quantityProduct + ", image="
				+ image + ", category=" + category + "]";
	}
	@Override
	public boolean equals(Object obj) {
	    if (this == obj)
	        return true;
	    if (obj == null || getClass() != obj.getClass())
	        return false;
	    ProductEntity other = (ProductEntity) obj;
	    return Objects.equals(productId, other.productId);
	}

	@Override
	public int hashCode() {
	    return Objects.hash(productId);
	}
	
		
	

}
