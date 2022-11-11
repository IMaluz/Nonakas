package com.nonakas.cestas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CompraController {

	@RequestMapping(value="/compra/{codigo}")
	public String compra(@PathVariable("codigo") long codigo) {
		System.out.println(codigo);
		return "compra/compra";
	}

}
