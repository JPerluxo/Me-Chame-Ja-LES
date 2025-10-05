import { useRef, useState } from "react";
import {
  View,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { Chooser } from "~/components/chooser";
import { useRouter } from "expo-router";
import { FormCadastro } from "~/components/formCadastro";
import { FormLogin } from "~/components/formLogin";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const [step, setStep] = useState<"chooser" | "form" | "login">("chooser");
  const [userType, setUserType] = useState<"cliente" | "motorista" | null>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const goToForm = (who: "cliente" | "motorista" | "login") => {
    if (who === "login") {
      setStep("login");
    } else {
      setUserType(who);
      setStep("form");
    }

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
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

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
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

          {/* CADASTRO */}
          {step === "form" && userType && (
            <Animated.View
              style={{
                transform: [{ translateY: formTranslate }],
                width: "100%",
                alignItems: "center",
              }}
            >
              <FormCadastro tipoUsuario={userType} goBack={goBack} />
            </Animated.View>
          )}

          {/* LOGIN */}
          {step === "login" && (
            <Animated.View
              style={{
                transform: [{ translateY: formTranslate }],
                width: "100%",
                alignItems: "center",
              }}
            >
              <FormLogin
                goBack={goBack}
                onLoginSuccess={() => {
                  router.push("/home");
                }}
              />
            </Animated.View>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}