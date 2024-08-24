package gerenciamentoEstoque.Repository;


import gerenciamentoEstoque.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}