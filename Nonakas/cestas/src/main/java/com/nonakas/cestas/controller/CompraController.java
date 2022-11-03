package com.nonakas.cestas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CompraController {

	@RequestMapping(value="/compra")
	public String compra() {
		return "compra/compra";
	}

}
