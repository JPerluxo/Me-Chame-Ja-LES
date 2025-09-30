import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "~/components/header";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Fidelity() {
  // Exemplo de valores fixos
  const pontos = 320;
  const meta = 500;
  const progresso = pontos / meta; // 0 a 1

  return (
    <LinearGradient
      colors={["#4EA8DE", "#5E60CE", "#4EA8DE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        {/* Header fixo */}
        <Header />

        {/* Área principal */}
        <View className="flex-1 p-4 space-y-6">
          {/* Título */}
          <Text className="text-white text-2xl font-bold">
            Programa de Fidelidade
          </Text>
          <Text className="text-white text-base opacity-80">
            Acumule pontos a cada pedido e troque por cupons de desconto!
          </Text>

          {/* Card de pontos */}
          <View className="bg-white rounded-2xl p-4 shadow-md">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-gray-800">
                Seus Pontos
              </Text>
              <Ionicons name="star" size={24} color="#fbbf24" />
            </View>
            <Text className="text-3xl font-bold text-indigo-600">
              {pontos} pts
            </Text>
            <Text className="text-gray-500 mt-1">
              Faltam {meta - pontos} pts para o próximo cupom
            </Text>

            {/* Barra de progresso */}
            <View className="h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
              <View
                className="h-3 bg-indigo-500 rounded-full"
                style={{ width: `${progresso * 100}%` }}
              />
            </View>
          </View>

          {/* Ranking de níveis */}
          <View className="bg-white rounded-2xl p-4 shadow-md space-y-3">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Seu Nível
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <MaterialIcons name="military-tech" size={24} color="#cd7f32" />
                <Text className="text-gray-700 font-semibold">Bronze</Text>
              </View>
              <Text className="text-sm text-gray-500">0 - 199 pts</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <MaterialIcons name="military-tech" size={24} color="#c0c0c0" />
                <Text className="text-gray-700 font-semibold">Prata</Text>
              </View>
              <Text className="text-sm text-gray-500">200 - 499 pts</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <MaterialIcons name="military-tech" size={24} color="#ffd700" />
                <Text className="text-gray-700 font-semibold">Ouro</Text>
              </View>
              <Text className="text-sm text-gray-500">500+ pts</Text>
            </View>
          </View>

          {/* Lista de vouchers disponíveis */}
          <View className="bg-white rounded-2xl p-4 shadow-md space-y-3">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Seus Vouchers
            </Text>

            <View className="flex-row items-center justify-between border-b border-gray-200 pb-2">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="gift" size={24} color="#5E60CE" />
                <View>
                  <Text className="font-semibold text-gray-700">
                    Cupom R$ 10,00
                  </Text>
                  <Text className="text-sm text-gray-500">Expira em 15 dias</Text>
                </View>
              </View>
              <Pressable className="bg-indigo-500 px-3 py-1 rounded-lg">
                <Text className="text-white text-sm">Usar</Text>
              </Pressable>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="gift" size={24} color="#5E60CE" />
                <View>
                  <Text className="font-semibold text-gray-700">
                    Entrega Grátis
                  </Text>
                  <Text className="text-sm text-gray-500">Expira em 7 dias</Text>
                </View>
              </View>
              <Pressable className="bg-indigo-500 px-3 py-1 rounded-lg">
                <Text className="text-white text-sm">Usar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}