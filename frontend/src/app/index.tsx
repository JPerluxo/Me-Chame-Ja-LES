import { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { Chooser } from "~/components/chooser";
import { useRouter } from "expo-router";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const [step, setStep] = useState<"chooser" | "form">("chooser");
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goToForm = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => setStep("form"));
  };

  const goBack = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => setStep("chooser"));
  };

  const chooserTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -600],
  });

  const formTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#5E60CE", "#4EA8DE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1, paddingTop: statusBarHeight + 20 }}
      >
        <View className="flex-1 items-center justify-center px-6 overflow-hidden">
          {/* CHOOSER */}
          {step === "chooser" && (
            <Animated.View
              style={{
                transform: [{ translateY: chooserTranslate }],
                width: "100%",
                alignItems: "center",
              }}
            >
              <Chooser onSelect={goToForm} />
            </Animated.View>
          )}

          {/* FORM */}
          {step === "form" && (
            <Animated.View
              style={{
                transform: [{ translateY: formTranslate }],
                width: "100%",
                alignItems: "center",
              }}
            >
              <View className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
                <Text className="text-center text-2xl font-bold text-[#5E60CE] mb-6">
                  Login / Cadastro
                </Text>

                <View className="space-y-4">
                  <TextInput
                    placeholder="Email ou telefone"
                    className="w-full h-12 px-4 mt-6 border border-gray-300 rounded-lg bg-gray-50"
                    placeholderTextColor="#888"
                  />
                  <TextInput
                    placeholder="Senha"
                    secureTextEntry
                    className="w-full h-12 px-4 mt-6 border border-gray-300 rounded-lg bg-gray-50"
                    placeholderTextColor="#888"
                  />

                  <Pressable className="w-full mt-2">
                    <Text className="text-right text-sm text-[#5E60CE]">
                      Esqueceu a senha?
                    </Text>
                  </Pressable>

                  <Pressable className="w-full h-12 bg-[#5E60CE] rounded-lg flex items-center justify-center mt-2">
                    <Text className="text-white font-semibold text-lg">
                      Entrar
                    </Text>
                  </Pressable>
                </View>

                {/* Botão voltar */}
                <Pressable
                  onPress={goBack}
                  className="mt-6 w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center"
                >
                  <Text className="text-gray-600 font-medium">Voltar</Text>
                </Pressable>
              </View>
            </Animated.View>
          )}
          {/* 🚀 Botão temporário para ir direto pro /home */}
          <Pressable
            onPress={() => router.push("home")}
            className="mt-10 px-6 py-3 bg-green-500 rounded-lg"
          >
            <Text className="text-white font-bold">Ir para Home</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}