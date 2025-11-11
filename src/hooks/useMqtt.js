import { useEffect, useState } from "react";
import Paho from "paho-mqtt";

export function useMqtt(brokerHost, brokerPort, topic) {
  const [distance, setDistance] = useState(null);
  const [weight, setWeight] = useState(null);
  const [status, setStatus] = useState("--");
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  useEffect(() => {
    const port = Number(brokerPort);

    const mqttClient = new Paho.Client(
      `wss://${brokerHost}:${port}/mqtt`, // ws para HiveMQ
      `client_${Math.random()}`
    );

    const onConnect = () => {
      console.log("✅ Conectado ao broker MQTT");
      setIsConnected(true);
      setConnectionAttempts(0);
      mqttClient.subscribe(topic, { qos: 0 });
    };

    const onFailure = (error) => {
      console.error("❌ Falha na conexão MQTT:", error);
      setIsConnected(false);
      setConnectionAttempts((prev) => prev + 1);
    };

    const onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.warn("⚠️ Conexão perdida:", responseObject.errorMessage);
        setIsConnected(false);
      }
    };

    const onMessageArrived = (message) => {
      try {
        const data = JSON.parse(message.payloadString);

        setDistance(data.distancia ?? null);
        setWeight(data.peso ?? null);
        setStatus(data.status ?? "--");
        setLastUpdate(new Date());
      } catch (error) {
        console.error(
          "Erro ao parsear JSON do MQTT:",
          error,
          message.payloadString
        );
      }
    };

    mqttClient.onConnectionLost = onConnectionLost;
    mqttClient.onMessageArrived = onMessageArrived;

    mqttClient.connect({
      onSuccess: onConnect,
      onFailure: onFailure,
      reconnect: true,
      useSSL: false,
    });

    return () => {
      if (mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, [brokerHost, brokerPort, topic]);

  return {
    weight,
    distance,
    status,
    isConnected,
    lastUpdate,
    connectionAttempts,
  };
}
