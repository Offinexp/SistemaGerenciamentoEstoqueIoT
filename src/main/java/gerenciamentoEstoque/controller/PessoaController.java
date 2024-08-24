package gerenciamentoEstoque.controller;

import gerenciamentoEstoque.Repository.PessoaRepository;
import gerenciamentoEstoque.model.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pessoa")
@CrossOrigin(origins = "http://localhost:4200")
public class PessoaController {

    @Autowired
    private PessoaRepository pessoaRepository;

    // Criar uma nova pessoa (POST)
    @PostMapping
    public Pessoa adicionarPessoa(@RequestBody Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

    // Listar todas as pessoas (GET)
    @GetMapping
    public List<Pessoa> getAllPessoas() {
        return pessoaRepository.findAll();
    }

    // Buscar pessoa por ID (GET)
    @GetMapping("/{id}")
    public Pessoa getPessoaById(@PathVariable Long id) {
        return pessoaRepository.findById(id).orElse(null);
    }

    // Atualizar pessoa por ID (PUT)
    @PutMapping("/{id}")
    public Pessoa atualizarPessoa(@PathVariable Long id, @RequestBody Pessoa pessoaDetalhes) {
        Pessoa pessoa = pessoaRepository.findById(id).orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
        pessoa.setNome(pessoaDetalhes.getNome());
        pessoa.setEmail(pessoaDetalhes.getEmail());
        pessoa.setSenha(pessoaDetalhes.getSenha());
        return pessoaRepository.save(pessoa);
    }

    // Deletar pessoa por ID (DELETE)
    @DeleteMapping("/{id}")
    public void deletarPessoa(@PathVariable Long id) {
        pessoaRepository.deleteById(id);
    }
}
