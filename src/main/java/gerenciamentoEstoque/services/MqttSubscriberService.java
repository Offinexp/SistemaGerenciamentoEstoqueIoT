package gerenciamentoEstoque.services;

import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MqttSubscriberService {

    @Autowired
    private MqttClient mqttClient;

    public void subscribe(String topic) throws MqttException {
        mqttClient.subscribe(topic, new IMqttMessageListener() {
            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                System.out.println("Mensagem recebida: " + new String(message.getPayload()));
                // Aqui você pode processar a mensagem recebida
            }
        });
    }
}
