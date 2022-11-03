package com.nonakas.cestas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EstoqueController {
	
	@RequestMapping(value="/estoque")
	public String estoque() {
		return "estoque/estoque";
	}

}
