package gerenciamentoEstoque.controller;

import gerenciamentoEstoque.Repository.ProdutoRepository;
import gerenciamentoEstoque.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produto")
@CrossOrigin(origins = "http://localhost:4200") // Adicione o URL do seu frontend Angular
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping("/adicionar")
    public Produto adicionarProduto(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletarProduto(@PathVariable Long id) {
        produtoRepository.deleteById(id);
    }

    @PutMapping("/atualizar/{id}")
    public Produto atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoDetalhes) {
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produto.setNome(produtoDetalhes.getNome());
        produto.setDescricao(produtoDetalhes.getDescricao());
        produto.setPreco(produtoDetalhes.getPreco());
        produto.setQuantidade(produtoDetalhes.getQuantidade());
        return produtoRepository.save(produto);
    }

    @GetMapping
    public List<Produto> getAllProdutos() {
        return produtoRepository.findAll();
    }


    @GetMapping("/{id}")
    public Produto getProdutoById(@PathVariable Long id) {
        return produtoRepository.findById(id).orElse(null);
    }
}