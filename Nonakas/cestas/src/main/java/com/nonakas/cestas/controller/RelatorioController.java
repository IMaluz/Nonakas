package com.nonakas.cestas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RelatorioController {
	
		@RequestMapping(value="/relatorio")
		public String relatorio() {
			return "relatorio/relatorio";
		}

}
