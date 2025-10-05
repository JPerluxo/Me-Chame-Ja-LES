import { useState } from "react";
import { View, Text, FlatList, Pressable, Modal, Dimensions } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const trips = [
  {
    id: "1",
    origem: "Av. Paulista, 1000 - São Paulo",
    destino: "R. Augusta, 200 - São Paulo",
    tipoVeiculo: "Carro Hatch",
    categoria: "Produtos Pequenos",
    distancia: "3.2 km",
    tempo: "12 min",
    valor: "R$ 24,50",
  },
  {
    id: "2",
    origem: "R. das Rosas, 45 - Mogi das Cruzes",
    destino: "Av. Francisco Ferreira Lopes, 300 - Mogi",
    tipoVeiculo: "Moto",
    categoria: "Comida",
    distancia: "1.8 km",
    tempo: "8 min",
    valor: "R$ 12,00",
  },
];

const { height } = Dimensions.get("window");

export function TripList() {
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);

  return (
    <View className="w-full mt-4 relative">
      {/* Header */}
      <View className="flex-row items-center justify-between px-2 mb-3 bg-white rounded-xl shadow p-2">
        <Text className="text-base font-semibold text-[#5E60CE] m-auto">
          Corridas Disponíveis
        </Text>
      </View>

      {/* Lista de corridas */}
      <View className="bg-white rounded-2xl shadow-lg p-4">
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border-b border-gray-200 py-3">
              <Text className="font-semibold text-gray-800">
                {item.origem} ➜ {item.destino}
              </Text>

              <Text className="text-sm text-gray-500 mt-1">
                Tipo: {item.tipoVeiculo} | Categoria: {item.categoria}
              </Text>

              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-sm text-gray-600">
                  {item.distancia} • {item.tempo}
                </Text>

                <View className="flex-row gap-2">
                  <Pressable
                    onPress={() => setSelectedTrip(item)}
                    className="flex-row items-center bg-[#5E60CE] px-3 py-1 rounded-lg active:bg-[#4a56c9]"
                  >
                    <Feather name="eye" size={16} color="white" />
                    <Text className="text-white ml-2 text-sm">Ver Detalhes</Text>
                  </Pressable>

                  <Pressable className="flex-row items-center bg-green-600 px-3 py-1 rounded-lg active:bg-green-700">
                    <Ionicons name="checkmark-circle-outline" size={16} color="white" />
                    <Text className="text-white ml-2 text-sm">Aceitar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* Modal de detalhes com mapa via iframe */}
      <Modal visible={!!selectedTrip} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white w-11/12 rounded-2xl p-6 shadow-lg">
            <Text className="text-lg font-bold text-[#5E60CE] mb-4 text-center">
              Detalhes da Corrida
            </Text>

            {/* Mini mapa (iframe Google Maps) */}
            {selectedTrip && (
              <View
                style={{
                  width: "100%",
                  height: height * 0.25,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/directions?key=${
                    process.env.GOOGLE_MAPS_API_KEY
                  }&origin=${encodeURIComponent(selectedTrip.origem)}&destination=${encodeURIComponent(
                    selectedTrip.destino
                  )}&mode=driving`}
                />
              </View>
            )}

            {/* Infos */}
            <View className="mt-4">
              <Text className="text-gray-800 font-semibold mb-1">Origem:</Text>
              <Text className="text-gray-600 mb-2">{selectedTrip?.origem}</Text>

              <Text className="text-gray-800 font-semibold mb-1">Destino:</Text>
              <Text className="text-gray-600 mb-2">{selectedTrip?.destino}</Text>

              <Text className="text-gray-800 font-semibold mb-1">Tipo de Veículo:</Text>
              <Text className="text-gray-600 mb-2">{selectedTrip?.tipoVeiculo}</Text>

              <Text className="text-gray-800 font-semibold mb-1">Categoria:</Text>
              <Text className="text-gray-600 mb-2">{selectedTrip?.categoria}</Text>

              <Text className="text-gray-800 font-semibold mb-1">Distância / Tempo:</Text>
              <Text className="text-gray-600 mb-2">
                {selectedTrip?.distancia} • {selectedTrip?.tempo}
              </Text>

              <Text className="text-gray-800 font-semibold mb-1">Valor:</Text>
              <Text className="text-gray-600 mb-4">{selectedTrip?.valor}</Text>
            </View>

            {/* Botões do modal */}
            <View className="flex-row justify-end gap-3 mt-3">
              <Pressable
                onPress={() => setSelectedTrip(null)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                <Text className="text-gray-800 font-semibold">Fechar</Text>
              </Pressable>

              <Pressable className="bg-green-600 px-4 py-2 rounded-lg">
                <Text className="text-white font-semibold">Aceitar Corrida</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}