package com.admin.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.admin.bean.UserBean;
import com.admin.service.UserService;
import com.admin.structure.ResponseStructure;



@Service
public class UserServiceImpl  implements UserService{

	
	@Autowired
	private RestTemplate template;
	
	@Override
	public UserBean getUserBean(int id) {
		
		System.out.println("user service");
		
		String url = "http://localhost:8084/medicine/users/"+id;
		
		ParameterizedTypeReference<ResponseStructure<UserBean>> responseType =
		        new ParameterizedTypeReference<ResponseStructure<UserBean>>() {};
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> httpEntity = new HttpEntity<>(headers);

		ResponseEntity<ResponseStructure<UserBean>> responseEntity = template.exchange(url, HttpMethod.GET, httpEntity,responseType);
		
		System.out.println(responseEntity);
		ResponseStructure<UserBean> response = responseEntity.getBody();
		UserBean user = response.getData();
		
		System.out.println(user);	
		return user;
		
	}

}
