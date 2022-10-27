package com.nonakas.cestas.respository;

import org.springframework.data.repository.CrudRepository;

import com.nonakas.cestas.models.Cliente;


public interface ClienteRepository extends CrudRepository<Cliente, String>{
	Cliente findByCodigo(long codigo);
	
}
