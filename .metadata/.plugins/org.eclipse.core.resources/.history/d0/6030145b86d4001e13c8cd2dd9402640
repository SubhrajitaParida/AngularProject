package com.admin.serviceImpl;

import java.util.ArrayList;
import java.util.DoubleSummaryStatistics;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.admin.bean.Cart;
import com.admin.bean.Product;
import com.admin.bean.UserBean;
import com.admin.entity.CartEntity;
import com.admin.entity.ProductEntity;
import com.admin.exception.CartIdNotFoundException;
import com.admin.exception.CartListNotFoundException;
import com.admin.exception.UserIdNotFoundException;
import com.admin.repository.CartRepo;
import com.admin.repository.ProductRepository;
import com.admin.service.CartService;

@Service
public class CartServiceImpl implements CartService {
	
	private static Logger log = LoggerFactory
			.getLogger(CartServiceImpl.class.getSimpleName());
	
	@Autowired
	public CartRepo repo;
	
	@Autowired
	public ProductRepository productRepo;
		
	@Autowired
	public UserServiceImpl userService; 
	
	
	@Autowired
	public ProductServiceImplementation productService;
	

	@Override
	public Cart save(Cart cart) throws UserIdNotFoundException {
	
		log.info("Cart Service Implementation Save Method Start-> {}"+cart);
		
		if((cart.getUser()==null||cart.getProducts()==null)) {
			throw new IllegalArgumentException("User and Product properties cannot be null");
		}
		
		 UserBean userBean = userService.getUserBean(cart.getUser().getUserId());
		 
		 if(userBean==null) {
			 throw new UserIdNotFoundException("User Does Not Found By This Id "+cart.getUser().getUserId());
		 }
		 
		 CartEntity cartEntity = repo.getCartByUserId(userBean.getUserId());
		 if(cartEntity!=null) {
			 boolean result=cartEntity.getProducts().contains(cart.getProducts().get(0));
			 if(!result) {			 
				 cart.setUser(userBean);
				 cartEntity.setUserId(userBean.getUserId());
				 cartEntity = beanToEntity(cartEntity,cart);
				 productRepo.save(cartEntity.getProducts().get(0));
				 repo.save(cartEntity);
				 cart = entityToBean(cartEntity,cart);
			 }
		 }
		else {
			cartEntity = new CartEntity();
			 cart.setUser(userBean);
			 cartEntity.setUserId(userBean.getUserId());
			 cartEntity = beanToEntity(cartEntity,cart);
			 productRepo.save(cartEntity.getProducts().get(0));
			 repo.save(cartEntity);
			 cart = entityToBean(cartEntity,cart);
			
		 }
		
		
		 log.info("Cart Service Implementation Save Method  End  -> {}"+cart);
		 return cart;
		 
		
	}

	public CartEntity beanToEntity(CartEntity cartEntity, Cart cart) {
		
		log.info("Cart Service Implementation beanToEntity Method Start -> {}"+cart.getProducts());
		
		cartEntity.setStatus(cart.getStatus());			
		List<ProductEntity > products=new ArrayList<>();
		
		if(cartEntity.getProducts()!=null) {
			products = cartEntity.getProducts();
		}
		
		double total =0;		
		for(Product ele:cart.getProducts()) {
			
			ProductEntity obj = new ProductEntity();		
			obj.setDescription(ele.getDescription());
			obj.setName(ele.getName());
			obj.setPrice(ele.getPrice());
			obj.setQuantity(ele.getQuantity());
			obj.setQuantityProduct(ele.getQuantityProduct());
			obj.setProductId(ele.getProductId());
			obj.setCategory(ele.getCategory());
			obj.setImage(ele.getImage());
			obj.setStatus(ele.getStatus());
			products.add(obj);	
			
		}
		
		System.out.println("Before Set"+products);
	    HashSet<ProductEntity> set = new HashSet<>(products);
	    products=null;
	    products = new ArrayList<>(set);	
	    for(ProductEntity product:products) {
			total=(total+(product.getPrice()*product.getQuantityProduct()));
		}
		System.out.println("After Set "+products);
		
		System.out.println(total);
		cartEntity.setQuantity(set.size());		
		cartEntity.setAmount(total);		
		cartEntity.setProducts(products);
		
		log.info("Cart Service Implementation beanToEntity Method End -> {}"+cartEntity);
		return cartEntity;
	}

	public Cart entityToBean(CartEntity cartEntity, Cart cart) {
	log.info("Cart Service Implementation entityToBean Method Start -> {}"+cart);

		
		cart.setCartId(cartEntity.getCartId());
		cart.setStatus(cartEntity.getStatus());
		
		double total=0;
		List<Product > products = new ArrayList<>();
		if(cartEntity.getProducts()!=null) {
			for(ProductEntity ele:cartEntity.getProducts()) {
				
				Product obj = new Product();
				obj.setDescription(ele.getDescription());
				obj.setName(ele.getName());
				obj.setPrice(ele.getPrice());
				obj.setProductId(ele.getProductId());
				obj.setCategory(ele.getCategory());
				obj.setQuantity(ele.getQuantity());
				obj.setQuantityProduct(ele.getQuantityProduct());
				obj.setImage(ele.getImage());
				obj.setStatus(ele.getStatus());
				total=(total+(ele.getPrice()*ele.getQuantityProduct()));
				System.out.println(total);
				products.add(obj);			
				
			}
		}
		cart.setQuantity(cartEntity.getQuantity());
		cart.setAmount(total);
		cart.setProducts(products);			
		log.info("Cart Service Implementation entityToBean Method End -> {}"+cart);
		
		return cart;
	}

	@Override
	public Cart update(Cart cart,Integer productId) throws CartIdNotFoundException{
		
		log.info("Cart service implementation update method {}"+cart);
		
		 Optional<CartEntity> optional = repo.findById(cart.getCartId());
		if(optional.isEmpty()) {
			throw new CartIdNotFoundException("Cart Not Found By This Id "+cart.getCartId());
		}
		
		CartEntity cartEntity = optional.get();
		List<ProductEntity> products =cartEntity.getProducts();

		for(ProductEntity product :products) {
			if(product.getProductId()==productId) {
				product.setQuantityProduct(cart.getProducts().get(0).getQuantityProduct());		
				System.out.println(product.getQuantityProduct());
				productRepo.save(product);
				break;
			}	
		}
		
		
		UserBean userBean = userService.getUserBean(cartEntity.getUserId());
		cartEntity = beanToEntity(cartEntity, cart);
		repo.save(cartEntity);
		cart = entityToBean(cartEntity, cart);
		cart.setUser(userBean);
		
		log.info("Cart service implementation update method End{}"+cart);
		return cart;
	}

	@Override
	public Cart delete(Integer cartId,Integer productId) throws CartIdNotFoundException {
		
		log.info("Cart Service Implementation delete Method Start->");
		if(cartId==0){
			throw new IllegalArgumentException("Cart Id Cannot Be Empty");
		}		
		Optional<CartEntity> optional = repo.findById(cartId);
		double total =0;
		if(optional.isPresent()){
			CartEntity cartEntity = optional.get();
			List<ProductEntity> products = cartEntity.getProducts();
			int temp=-1;
			for(ProductEntity product:products) {
				temp++;
				if(product.getProductId()==productId) {
					cartEntity.setQuantity(cartEntity.getQuantity()-1);
					total=(product.getPrice()*product.getQuantityProduct());
					product.setQuantityProduct(1);
					product.setStatus("Add To Cart");
					productRepo.save(product);
					break;
				}
			}			
			products.remove(temp);
			cartEntity.setAmount(cartEntity.getAmount()-total);
			Cart cart = new Cart();
			repo.save(cartEntity);
			cart = entityToBean(cartEntity, cart);			
			return cart;
		}else{
			log.info("Cart Service Implementation delete If else Method End->");
			throw new CartIdNotFoundException("Cart Not Found By This Id"+cartId);
		}	
	}


	@Override
	public List<Cart> getCartDetails() throws CartListNotFoundException{
		log.info("Cart sevice implementation getCartDetails method start -> ");
		List<CartEntity> cartList = repo.findAll();
		List<Cart> beanCartList = new ArrayList<>();
		
		
		if(!cartList.isEmpty()){		
			
			for(CartEntity cart : cartList){
				Cart bean = new Cart();
				
				UserBean userBean = userService.getUserBean(cart.getUserId());
				bean.setUser(userBean);
				bean = entityToBean(cart, bean);
				beanCartList.add(bean);
			}
			
		}else{
			throw new CartListNotFoundException("Cart Is Empty");
		}

		log.info("Cart sevice implementation getCartDetails method End -> ");
		return beanCartList;
	}

	@Override
	public Cart  getCartById(Integer userId) throws CartIdNotFoundException, UserIdNotFoundException, CartListNotFoundException {
		
		log.info("Cart sevice implementation getCartById method start -> {}"+userId);
		if(userId==null){
			throw new IllegalArgumentException("UserId Cannot Be Empty");
		}		
		UserBean bean = userService.getUserBean(userId);
		if(bean==null) {
			
			throw new UserIdNotFoundException("User Does Not Having Cart By This Id"+userId);
		}
		CartEntity cartEntity = repo.getCartByUserId(bean.getUserId());
		if(cartEntity==null) {
			throw new CartListNotFoundException("Cart is Empty");
		}
			
		Cart cart = new Cart();
		
		cart.setUser(bean);
		cart= entityToBean(cartEntity, cart);
			
		log.info("Cart sevice implementation getCartById method  End -> {}"+cart,userId);			
		return cart;
			
	}
	
	@Override
	public Cart updateCartStatus(Cart cart) throws CartIdNotFoundException {
		log.info("Cart Service Implementation Update Cart Status Start"+cart.getCartId());
		if(cart==null) {
			throw new IllegalArgumentException("Cart Id Cannot be Empty");
		}
		
		Optional<CartEntity> optional = repo.findById(cart.getCartId());
		if(optional.isPresent()) {
			CartEntity cartEntity = optional.get();
			List<ProductEntity> products = cartEntity.getProducts();
			
			for(ProductEntity product:products) {
				product.setQuantityProduct(1);
				product.setStatus("Add To Cart");
				productRepo.save(product);
			}
			products=null;
			cartEntity.setProducts(products);
			cartEntity.setAmount(0.0);
			cartEntity.setQuantity(0);
			cartEntity.setStatus("Deactivated");
			cartEntity = repo.save(cartEntity);
			System.out.println(cartEntity);
			cart=entityToBean(cartEntity, cart);
		log.info("Cart Service Implementation Update Cart Status End"+cart);

			return cart;
		}else {
			throw new CartIdNotFoundException("Cart Not Found By This Id"+cart.getCartId());
		}
	
	}

	
	
}