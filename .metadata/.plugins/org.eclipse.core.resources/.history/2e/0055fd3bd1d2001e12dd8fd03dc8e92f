package com.admin.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.admin.bean.Cart;
import com.admin.exception.CartIdNotFoundException;
import com.admin.exception.CartListNotFoundException;
import com.admin.exception.UserIdNotFoundException;
import com.admin.service.CartService;

@RestController
public class CartController {
	
	private static Logger log = LoggerFactory
			.getLogger(CartController.class.getSimpleName());
	
	
	@Autowired
	private CartService service;
	
	
	@PostMapping("/cart")
	public ResponseEntity<Cart> saveCart(@RequestBody Cart cart) throws UserIdNotFoundException{		
		log.info("CartController saveCart Start => {} ",cart);
		try {
		  cart = service.save(cart);
		}catch (IllegalArgumentException e) {			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		log.info("CartController End => {} ",cart);
		return 	ResponseEntity.status(HttpStatus.OK).body(cart);
	}	
	
	@GetMapping("/cart/{userId}")
	public ResponseEntity<Cart>  getCartById(@PathVariable Integer userId) throws CartIdNotFoundException, UserIdNotFoundException, CartListNotFoundException {
		log.info("CartController getCartById Start => {} ",userId);
		Cart cart=null; 
		try {
			  cart = service.getCartById(userId);
		}catch (IllegalArgumentException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		log.info("CartController getCartById End => {} ",userId);
		return 	ResponseEntity.status(HttpStatus.OK).body(cart) ;

	}
	
	@DeleteMapping("/cart/delete/{cartId}/{productId}")
	public ResponseEntity<Cart> delete(@PathVariable Integer cartId,@PathVariable Integer productId) throws CartIdNotFoundException {
		
		log.info("Cart controller delete cart method start "+cartId,productId);
		try {
			Cart cart=service.delete(cartId,productId);
			log.info("Cart controller delete produtc in cart method end try block {} "+cartId);
			return ResponseEntity.status(HttpStatus.OK).body(cart);
		}catch (IllegalArgumentException e) {
			log.info("Cart controller delete cart method end catch block {} "+e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@GetMapping("/cart")
	public ResponseEntity<List<Cart>> getCartDetails() throws CartListNotFoundException{
		log.info("Cart controller getCartDetails method start");
		List<Cart> cartDetails =service.getCartDetails();
		log.info("Cart controller getCartDetails method End");
		return ResponseEntity.status(HttpStatus.OK).body(cartDetails);
	}

	
	@PutMapping("/cart/update/{productId}")
	public ResponseEntity<Cart> update(@RequestBody Cart cart,@PathVariable int productId) throws CartIdNotFoundException{
		
		log.info("Cart contoller  update method {}  "+cart);
		cart  = service.update(cart, productId);
		return ResponseEntity.status(HttpStatus.OK).body(cart);
	
	}
}
