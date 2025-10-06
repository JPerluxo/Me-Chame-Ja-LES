import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Pressable, ScrollView } from "react-native";
import axios from "axios";
import { FeedbackModal } from "~/components/feedbackModal";

type TripDetailsProps = {
  deliveryId: number;
  onVoltar?: () => void;
};

export function TripDetails({ deliveryId, onVoltar }: TripDetailsProps) {
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(true);

  const carregarEntrega = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/delivery/${deliveryId}`);
      if (res.data?.data) setDelivery(res.data.data);
    } catch (error) {
      console.error("❌ Erro ao carregar entrega:", error);
      setFeedbackMessage("Erro ao carregar dados da entrega.");
      setFeedbackSuccess(false);
      setFeedbackVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza a cada 5 segundos
  useEffect(() => {
    carregarEntrega();
    const interval = setInterval(carregarEntrega, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <View className="w-full mt-4 bg-white rounded-2xl shadow-lg p-8 items-center justify-center">
        <ActivityIndicator size="large" color="#5E60CE" />
        <Text className="mt-2 text-gray-600">Carregando entrega...</Text>
      </View>
    );

  if (!delivery)
    return (
      <View className="bg-white rounded-2xl shadow-lg p-6 mt-4 items-center">
        <Text className="text-gray-600">Entrega não encontrada.</Text>
      </View>
    );

  // Caso concluída → exibe pagamento
  if (delivery.status === "concluida") {
    const fakePixLink = `https://pagamento.pix/${delivery.id}-${delivery.value}`;
    return (
      <View className="bg-white rounded-2xl shadow-lg p-6 mt-4 items-center">
        <Text className="text-lg font-bold text-[#5E60CE] mb-4 text-center">
          Entrega Concluída
        </Text>

        <Image
          source={{
            uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${fakePixLink}`,
          }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />

        <Text className="text-gray-800 text-center mb-3">Valor da Entrega:</Text>
        <Text className="text-xl font-bold text-[#5E60CE] mb-4">
          R$ {parseFloat(delivery.value || 0).toFixed(2)}
        </Text>

        <Text className="text-gray-500 text-center mb-4">{fakePixLink}</Text>

        <Pressable
          onPress={onVoltar}
          className="bg-[#5E60CE] px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Voltar</Text>
        </Pressable>
      </View>
    );
  }

  // Exibe detalhes pendente / aceita
  return (
    <ScrollView className="bg-white rounded-2xl shadow-lg p-6 mt-4">
      <Text className="text-lg font-bold text-[#5E60CE] mb-4 text-center">
        {delivery.status === "pendente" ? "Entrega Pendente" : "Entrega Aceita"}
      </Text>

      <Text className="text-gray-800 font-semibold mb-1">Origem:</Text>
      <Text className="text-gray-600 mb-2">{delivery.originAddress}</Text>

      <Text className="text-gray-800 font-semibold mb-1">Destino:</Text>
      <Text className="text-gray-600 mb-2">{delivery.destinationAddress}</Text>

      <Text className="text-gray-800 font-semibold mb-1">Tipo de Item:</Text>
      <Text className="text-gray-600 mb-2">
        {delivery.type?.replaceAll("_", " ") || "Não informado"}
      </Text>

      <Text className="text-gray-800 font-semibold mb-1">Valor:</Text>
      <Text className="text-gray-600 mb-4">
        R$ {parseFloat(delivery.value || 0).toFixed(2)}
      </Text>

      {delivery.status === "aceita" && delivery.driver && (
        <>
          <Text className="text-gray-800 font-semibold mb-1">Motorista:</Text>
          <Text className="text-gray-600 mb-2">{delivery.driver.name}</Text>

          <Text className="text-gray-800 font-semibold mb-1">Veículo:</Text>
          <Text className="text-gray-600 mb-2">
            {delivery.driver.vehicleType || "Não informado"}
          </Text>

          <Text className="text-gray-800 font-semibold mb-1">Contato:</Text>
          <Text className="text-gray-600 mb-2">{delivery.driver.phone}</Text>
        </>
      )}

      {delivery.status === "pendente" && (
        <Text className="text-center text-gray-500 mt-3">
          Aguardando um motorista aceitar sua entrega...
        </Text>
      )}

      <FeedbackModal
        visible={feedbackVisible}
        message={feedbackMessage}
        success={feedbackSuccess}
        onClose={() => setFeedbackVisible(false)}
      />
    </ScrollView>
  );
}