package com.nonakas.cestas.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.nonakas.cestas.functions.Data;
import com.nonakas.cestas.models.Produto;
import com.nonakas.cestas.respository.ProdutoRepository;

@Controller
public class ProdutoController {
	
	@Autowired
	private ProdutoRepository pr;
	
	@RequestMapping(value="/produto", method=RequestMethod.GET)
	public String form() {
		return "estoque/produto";
	}
	
	@RequestMapping(value="/produto", method=RequestMethod.POST)
	public String form(@Valid Produto produto, BindingResult result) {
		if(result.hasErrors()) {
			return "/produto";
		}
		
		produto.setDataRegistro(Data.getDateTime());
		pr.save(produto);
		
		return "redirect:/produto";
	}
	
	@RequestMapping("/produto")
	public ModelAndView listaProdutos() {
		ModelAndView mv = new ModelAndView("estoque/produto");
		Iterable<Produto> produtos = pr.findAll();
		mv.addObject("produto", produtos);
		return mv;
	}

}
