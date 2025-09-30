import { View, Text, Pressable, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export function Footer() {
  return (
    <LinearGradient
      colors={["#4EA8DE", "#5E60CE", "#4EA8DE"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
    >
      <View className="w-full h-10 flex flex-row items-center justify-between p-1 shadow-md">
      </View>
    </LinearGradient>
  );
}