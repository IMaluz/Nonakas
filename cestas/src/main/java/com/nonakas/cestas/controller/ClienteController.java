package com.nonakas.cestas.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.nonakas.cestas.functions.Data;
import com.nonakas.cestas.models.Cliente;
import com.nonakas.cestas.respository.ClienteRepository;


@Controller
public class ClienteController {
	
	@Autowired
	private ClienteRepository cr;
	
	
	@RequestMapping(value="/cadastro", method=RequestMethod.GET)
	public String form() {
		return "cliente/cadastro";
	}
	
	@RequestMapping(value="/cadastro", method=RequestMethod.POST)
	public String form(@Valid Cliente cliente, BindingResult result) {
		if(result.hasErrors()) {
			return "/cadastro";
		}
		else {
		cliente.setDataRegistro(Data.getDateTime());
		cr.save(cliente);
		}
		
		return "redirect:/cadastro";
	}
	@RequestMapping("/clientes")
	public ModelAndView listaClientes() {
		ModelAndView mv = new ModelAndView("cliente/clientes");
		Iterable<Cliente> clientes = cr.findAll();
		mv.addObject("clientes", clientes);
		return mv;
	}
	@RequestMapping("/deletarCliente/{codigo}")
	public String deletarCliente(@PathVariable("codigo") long codigo){
		Cliente cliente = cr.findByCodigo(codigo);
		cr.delete(cliente);
		return "redirect:/clientes";
	}
	@RequestMapping(value="/editarCliente/{codigo}", method=RequestMethod.GET)
	public ModelAndView editarCliente(@PathVariable("codigo") long codigo) {
		Cliente cliente = cr.findByCodigo(codigo);
		ModelAndView mv = new ModelAndView("cliente/editarCliente");
		mv.addObject("cliente", cliente);
		System.out.println(cliente);
		return mv;
	}
	
	@RequestMapping(value="/editar-cliente", method=RequestMethod.POST)
	public String edit(@Valid Cliente cliente, BindingResult result) {
		if(result.hasErrors()) {
			return "/clientes";
		}
		else {
		cr.save(cliente);
		}
		return "redirect:/clientes";
	}
}
