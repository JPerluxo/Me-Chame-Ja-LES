import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

type RouteDetailsProps = {
  distanciaKm: number;
  duracaoMin: number;
  precoEstimado?: number;
  onConfirmar?: () => void;
};

export function RouteDetails({
  distanciaKm,
  duracaoMin,
  precoEstimado,
  onConfirmar,
}: RouteDetailsProps) {
  return (
    <View
      className="flex bottom-0 left-0 right-0 mx-1 mt-2"
      style={{ zIndex: 50 }}
    >
      {/* Card */}
      <View className="bg-white rounded-t-2xl shadow-lg px-4 pt-3 pb-6">
        {/* Linha 1 - Info da rota */}
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-gray-600 text-sm">Distância</Text>
            <Text className="text-base font-semibold text-[#5E60CE]">
              {distanciaKm.toFixed(1)} km
            </Text>
          </View>
          <View>
            <Text className="text-gray-600 text-sm">Duração</Text>
            <Text className="text-base font-semibold text-[#5E60CE]">
              {duracaoMin} min
            </Text>
          </View>
          {precoEstimado !== undefined && (
            <View>
              <Text className="text-gray-600 text-sm">Estimativa</Text>
              <Text className="text-base font-semibold text-[#5E60CE]">
                R$ {precoEstimado.toFixed(2)}
              </Text>
            </View>
          )}
        </View>

        {/* Linha 2 - Cupom (se quiser colocar promo futura) */}
        {/* <View className="mb-3">
          <Text className="text-xs text-[#F16622] font-medium">
            Aplicar 10% cupom
          </Text>
        </View> */}

        {/* Botão de confirmar */}
        <Pressable onPress={onConfirmar}>
          <LinearGradient
            colors={["#4EA8DE", "#5E60CE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="rounded-xl py-3 flex-row items-center justify-center"
          >
            <MaterialIcons name="arrow-forward-ios" size={18} color="#fff" />
            <Text className="text-white font-semibold text-base ml-2">
              Solicitar
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}