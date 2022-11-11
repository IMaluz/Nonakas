package com.nonakas.cestas.respository;

import org.springframework.data.repository.CrudRepository;

import com.nonakas.cestas.models.Produto;

public interface ProdutoRepository extends CrudRepository<Produto, String> {
	Produto findByCodigo(long codigo);
}
