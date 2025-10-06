import { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Modal, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type VehicleCardProps = {
  onAddVehicle: () => void;
};

export function VehicleCard({ onAddVehicle }: VehicleCardProps) {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSelectModal, setShowSelectModal] = useState(false);

  // Carrega os veículos do motorista logado
  useEffect(() => {
    const carregarVeiculos = async () => {
      try {
        const userData = await AsyncStorage.getItem("usuarioLogado");
        if (!userData) return;

        const user = JSON.parse(userData);
        if (user?.type !== "motorista") return;

        const response = await axios.get("http://localhost:3000/vehicle/getAll");

        const allVehicles = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        // Filtra apenas veículos do motorista logado
        const userVehicles = allVehicles.filter((v: any) => v.userId === user.id);
        setVehicles(userVehicles);

        // Recupera o veículo selecionado anteriormente, se existir
        const savedVehicleId = await AsyncStorage.getItem("veiculoSelecionado");
        if (savedVehicleId) {
          const found = userVehicles.find((v: { id: number; }) => v.id === Number(savedVehicleId));
          if (found) setSelectedVehicle(found);
        } else if (userVehicles.length > 0) {
          // Se não houver salvo, seleciona o primeiro
          setSelectedVehicle(userVehicles[0]);
        }

      } catch (error) {
        console.error("Erro ao carregar veículos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarVeiculos();
  }, []);

  // Salva no AsyncStorage o veículo selecionado
  const handleSelectVehicle = async (vehicle: any) => {
    setSelectedVehicle(vehicle);
    await AsyncStorage.setItem("veiculoSelecionado", vehicle.id.toString());
    setShowSelectModal(false);
  };

  return (
    <View className="w-full mt-4">
      {/* Header */}
      <View className="flex-row items-center justify-between px-2 mb-3 bg-white rounded-xl shadow p-2">
        <Text className="text-base font-semibold text-[#5E60CE] m-auto">
          Meu Veículo
        </Text>
      </View>

      {/* Card */}
      <View className="bg-white rounded-2xl shadow-lg p-5">
        {loading ? (
          <View className="flex items-center justify-center py-8">
            <ActivityIndicator size="large" color="#5E60CE" />
            <Text className="mt-2 text-gray-600">Carregando veículo...</Text>
          </View>
        ) : selectedVehicle ? (
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-gray-800">
              {selectedVehicle.manufacturer} {selectedVehicle.model} ({selectedVehicle.year})
            </Text>
            <Text className="text-gray-600">Placa: {selectedVehicle.licensePlate}</Text>
            <Text className="text-gray-600 capitalize">Tipo: {selectedVehicle.type}</Text>
            <Text className="text-gray-600">Capacidade: {selectedVehicle.capacity} kg</Text>
          </View>
        ) : (
          <View className="items-center py-6">
            <Text className="text-gray-500">Nenhum veículo selecionado</Text>
          </View>
        )}

        {/* Botão de selecionar veículo */}
        {vehicles.length >= 0 && (
          <Pressable
            onPress={() => setShowSelectModal(true)}
            className="flex-row items-center justify-center bg-[#4EA8DE] mt-5 py-3 rounded-xl active:bg-[#3b8bcc]"
          >
            <Feather name="list" size={18} color="white" />
            <Text className="text-white font-semibold ml-2">Selecionar Veículo</Text>
          </Pressable>
        )}

        {/* Botão de adicionar novo veículo */}
        <Pressable
          onPress={onAddVehicle}
          className="flex-row items-center justify-center bg-[#5E60CE] mt-3 py-3 rounded-xl active:bg-[#4a56c9]"
        >
          <Feather name="plus-circle" size={18} color="white" />
          <Text className="text-white font-semibold ml-2">Adicionar Veículo</Text>
        </Pressable>
      </View>

      {/* Modal de seleção de veículo */}
      <Modal
        visible={showSelectModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSelectModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-6">
          <View className="w-full max-w-2xl bg-white rounded-2xl p-5 max-h-[80%] shadow-lg">
            <Text className="text-lg font-bold text-[#5E60CE] mb-4 text-center">
              Selecione seu veículo
            </Text>

            <ScrollView>
              {vehicles.map((v) => (
                <Pressable
                  key={v.id}
                  onPress={() => handleSelectVehicle(v)}
                  className={`p-3 rounded-xl mb-2 border ${
                    selectedVehicle?.id === v.id
                      ? "border-[#5E60CE] bg-violet-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <Text className="text-base font-semibold text-gray-800">
                    {v.manufacturer} {v.model} ({v.year})
                  </Text>
                  <Text className="text-gray-600">Placa: {v.licensePlate}</Text>
                  <Text className="text-gray-600 capitalize">Tipo: {v.type}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Pressable
              onPress={() => setShowSelectModal(false)}
              className="border border-gray-300 rounded-lg p-4"
            >
              <Text className="text-gray-600 font-medium text-center">Voltar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}