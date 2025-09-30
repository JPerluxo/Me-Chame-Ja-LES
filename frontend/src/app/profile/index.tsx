import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "~/components/header";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
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

        <ScrollView className="flex-1 p-6 space-y-6">
          {/* Card do usuário */}
          <View className="bg-white rounded-2xl shadow-lg p-6 mb-4 items-center">
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/32.jpg",
              }}
              className="w-28 h-28 rounded-full mb-4 border-4 border-indigo-200"
            />
            <Text className="text-xl font-bold text-gray-900">
              João Martins
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              joao.martins92@gmail.com
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              +55 21 98877-3344
            </Text>
          </View>

          {/* Opções */}
          <View className="bg-white rounded-2xl shadow-md divide-y mb-4">
            <Pressable className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="person-circle-outline" size={22} color="#5E60CE" />
                <Text className="text-gray-800">Editar Perfil</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </Pressable>

            <Pressable className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center space-x-3">
                <MaterialIcons name="lock-outline" size={22} color="#5E60CE" />
                <Text className="text-gray-800">Mudar Senha</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </Pressable>

            <Pressable className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="notifications-outline" size={22} color="#5E60CE" />
                <Text className="text-gray-800">Notificações</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </Pressable>

            <Pressable className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="document-text-outline" size={22} color="#5E60CE" />
                <Text className="text-gray-800">Termos & Condições</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </Pressable>
          </View>

          {/* Botões finais */}
          <View className="space-y-3">
            <Pressable className="bg-red-500 rounded-xl p-4 items-center shadow">
              <Text className="text-white font-bold">Sair</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}