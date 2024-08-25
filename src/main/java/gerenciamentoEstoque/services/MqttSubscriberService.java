package gerenciamentoEstoque.services;

import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import gerenciamentoEstoque.controller.ProdutoController;
import gerenciamentoEstoque.model.Produto;


@Service
public class MqttSubscriberService {

    @Autowired
    private MqttClient mqttClient;

    @Autowired
    private ProdutoController produtoController;

    private final ObjectMapper objectMapper = new ObjectMapper(); // Jackson ObjectMapper

    public void subscribe(String topic) throws MqttException {
        mqttClient.subscribe(topic, (receivedTopic, message) -> {
            try {
                String payload = new String(message.getPayload());
                System.out.println("Mensagem recebida: " + payload);

                // Parse JSON payload to Produto
                Produto produtoRecebido = objectMapper.readValue(payload, Produto.class);

                // Fetch existing Produto
                Produto produtoExistente = produtoController.getProdutoById(produtoRecebido.getId());

                if (produtoExistente != null) {
                    // Update quantidade and keep existing preco
                    produtoExistente.setQuantidade(produtoRecebido.getQuantidade());

                    // Save updated product
                    produtoController.atualizarProduto(produtoExistente.getId(), produtoExistente);
                    System.out.println("Produto atualizado com ID: " + produtoExistente.getId());
                } else {
                    System.out.println("Produto com ID " + produtoRecebido.getId() + " não encontrado.");
                }
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("Erro ao processar a mensagem.");
            }
        });
    }
}