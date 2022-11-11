// variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de produtos na modal
let quantProdutos = 1

let cart = [] // carrinho

// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0 // transparente
    seleciona('.produtoWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.produtoWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.produtoWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.produtoInfo--cancelButton, .produtoInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDosProdutos = (produtoItem, item, index) => {
    // setar um atributo para identificar qual elemento foi clicado
	produtoItem.setAttribute('data-key', index)
    produtoItem.querySelector('.produto-item--img img').src = item.img
    produtoItem.querySelector('.produto-item--price').innerHTML = formatoReal(item.price)
    produtoItem.querySelector('.produto-item--name').innerHTML = item.name
    produtoItem.querySelector('.produto-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.img
    seleciona('.produtoInfo h1').innerHTML = item.name
    seleciona('.produtoInfo--desc').innerHTML = item.description
    seleciona('.produtoInfo--actualPrice').innerHTML = formatoReal(item.price)
}

const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .produto-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.produto-item').getAttribute('data-key')
    console.log('Produto clicada ' + key)
    console.log(produtoJson[key])

    // garantir que a quantidade inicial de produtos é 1
    quantProdutos = 1

    // Para manter a informação de qual produto foi clicada
    modalKey = key

    return key
}


const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.produtoInfo--qtmais').addEventListener('click', () => {
        quantProdutos++
        seleciona('.produtoInfo--qt').innerHTML = quantProdutos
    })

    seleciona('.produtoInfo--qtmenos').addEventListener('click', () => {
        if(quantProdutos > 1) {
            quantProdutos--
            seleciona('.produtoInfo--qt').innerHTML = quantProdutos	
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.produtoInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        // pegar dados da janela modal atual
    	// qual produto? pegue o modalKey para usar produtoJson[modalKey]
    	console.log("Produto " + modalKey)
	    // quantidade
    	console.log("Quant. " + quantProdutos)
        // preco
        let price = seleciona('.produtoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')

        let identificador = produtoJson[modalKey].id

        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantProdutos
        } else {
            // adicionar objeto produto no carrinho
            let produto = {
                identificador,
                id: produtoJson[modalKey].id,
                qt: quantProdutos,
                price: parseFloat(price) // price: price
            }
            cart.push(produto)
            console.log(produto)
            console.log('Sub total R$ ' + (produto.qt * produto.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		seleciona('aside').classList.add('show')

		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let produtoItem = produtoJson.find( (item) => item.id == cart[i].id )
			console.log(produtoItem)

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let produtoName = `${produtoItem.name}`

			// preencher as informacoes
			cartItem.querySelector('img').src = produtoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = produtoName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

// MAPEAR produtoJson para gerar lista de produtos
produtoJson.map((item, index ) => {
    //console.log(item)
    let produtoItem = document.querySelector('.models .produto-item').cloneNode(true)
    //console.log(produtoItem)
    //document.querySelector('.produto-area').append(produtoItem)
    seleciona('.produto-area').append(produtoItem)

    // preencher os dados de cada produto
    preencheDadosDosProdutos(produtoItem, item, index)
    
    // produto clicado
    produtoItem.querySelector('.produto-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou no produto')

        let chave = pegarKey(e)
   

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

		// definir quantidade inicial como 1
		seleciona('.produtoInfo--qt').innerHTML = quantProdutos


    })

    botoesFechar()

}) // fim do MAPEAR produtoJson para gerar lista de produtos

// mudar quantidade com os botoes + e -
mudarQuantidade()



adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
