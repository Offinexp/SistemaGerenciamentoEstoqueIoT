package gerenciamentoEstoque;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import gerenciamentoEstoque.services.MqttSubscriberService;

@SpringBootApplication
public class Main implements CommandLineRunner {

    @Autowired
    private MqttSubscriberService mqttSubscriberService;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) {
        try {
            mqttSubscriberService.subscribe("Stock");
            System.out.println("Subscrição realizada com sucesso!");
        } catch (MqttException e) {
            e.printStackTrace();
            System.out.println("Erro ao subscrever.");
        }
    }
}
