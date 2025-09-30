import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "~/components/header";

export default function Form() {
  return (
    <LinearGradient
        colors={["#4EA8DE", "#5E60CE", "#4EA8DE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
      <View className="flex-1">
        {/* Header fixo no topo */}
        <Header />

        {/* Área principal */}
        <View className="flex-1 flex-col xl:flex-row">

        </View>
      </View>
    </LinearGradient>
  );
}
