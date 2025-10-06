import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

type RouteDetailsProps = {
  distanciaKm: number;
  duracaoMin: number;
  onConfirmar?: (valorCorrida: number) => void;
};

export function RouteDetails({
  distanciaKm,
  duracaoMin,
  onConfirmar,
}: RouteDetailsProps) {
  const [precoEstimado, setPrecoEstimado] = useState(0);

  useEffect(() => {
    const calcularPreco = () => {
      const taxaBase = 5.0;
      const precoPorKm = 2.5;
      const precoPorMinuto = 0.3;
      const multiplicadorHorarioPico = 1.3;

      const horaAtual = new Date().getHours();
      const emHorarioPico =
        (horaAtual >= 7 && horaAtual <= 9) || (horaAtual >= 17 && horaAtual <= 20);

      let preco = taxaBase + distanciaKm * precoPorKm + duracaoMin * precoPorMinuto;
      if (emHorarioPico) preco *= multiplicadorHorarioPico;

      setPrecoEstimado(parseFloat(preco.toFixed(2)));
    };

    calcularPreco();
  }, [distanciaKm, duracaoMin]);

  return (
    <View className="flex bottom-0 left-0 right-0 mx-1 mt-2" style={{ zIndex: 50 }}>
      <View className="bg-white rounded-t-2xl shadow-lg px-4 pt-3 pb-6">
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-gray-600 text-sm">Distância</Text>
            <Text className="text-base font-semibold text-[#5E60CE]">
              {distanciaKm.toFixed(2)} km
            </Text>
          </View>

          <View>
            <Text className="text-gray-600 text-sm">Duração</Text>
            <Text className="text-base font-semibold text-[#5E60CE]">
              {duracaoMin.toFixed(2)} min
            </Text>
          </View>

          <View>
            <Text className="text-gray-600 text-sm">Estimativa</Text>
            <Text className="text-base font-semibold text-[#5E60CE]">
              R$ {precoEstimado.toFixed(2)}
            </Text>
          </View>
        </View>

        <Pressable onPress={() => onConfirmar?.(precoEstimado)}>
          <LinearGradient
            colors={["#4EA8DE", "#5E60CE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="rounded-xl py-3 flex-row items-center justify-center"
          >
            <MaterialIcons name="arrow-forward-ios" size={18} color="#fff" />
            <Text className="text-white font-semibold text-base ml-2">
              Prosseguir
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}