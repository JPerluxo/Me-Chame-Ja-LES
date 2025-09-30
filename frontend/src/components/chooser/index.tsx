import { JSX, useRef, useState } from "react";
import { View, Text, Pressable, Animated, Easing, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  onSelect: (who: "cliente" | "motorista") => void;
};

export function Chooser({ onSelect }: Props) {
  const [selected, setSelected] = useState<"cliente" | "motorista" | null>(null);

  const hoverCliente = useRef(new Animated.Value(0)).current;
  const hoverMotorista = useRef(new Animated.Value(0)).current;

  const animateFill = (anim: Animated.Value, toValue: number) => {
    Animated.timing(anim, {
      toValue,
      duration: 260,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const clienteFillHeight = hoverCliente.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });
  const motoristaFillHeight = hoverMotorista.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const handleSelect = (who: "cliente" | "motorista") => {
    setSelected(who);
    onSelect(who);
    if (Platform.OS === "web") {
      if (who === "cliente") {
        animateFill(hoverCliente, 1);
        animateFill(hoverMotorista, 0);
      } else {
        animateFill(hoverMotorista, 1);
        animateFill(hoverCliente, 0);
      }
    }
  };

  const renderButton = (
    who: "cliente" | "motorista",
    icon: JSX.Element,
    label: string,
    anim: Animated.Value,
    fillHeight: any
  ) => (
    <Pressable
      onPress={() => handleSelect(who)}
      onHoverIn={
        Platform.OS === "web" && selected !== who
          ? () => animateFill(anim, 1)
          : undefined
      }
      onHoverOut={
        Platform.OS === "web" && selected !== who
          ? () => animateFill(anim, 0)
          : undefined
      }
      className="relative w-36 h-40 rounded-2xl overflow-hidden shadow-md bg-transparent"
    >
      {Platform.OS === "web" ? (
        <>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: fillHeight,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 16,
            }}
          />
          <View
            style={{
              pointerEvents: "none",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              backgroundColor: "white",
              borderRadius: 16,
              opacity: selected === who ? 1 : 0,
            }}
          />
        </>
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            backgroundColor:
              selected === who ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)",
            borderRadius: 16,
          }}
        />
      )}

      <View className="flex items-center justify-center h-full">
        {icon}
        <Text
          className={`mt-3 font-semibold ${
            selected === who ? "text-black" : "text-white"
          }`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="items-center justify-center">
      <Text className="text-white text-2xl font-bold pb-10 text-center">
        Selecione o Perfil de Usuário
      </Text>

      <View className="flex flex-row gap-6 justify-center">
        {renderButton(
          "cliente",
          <FontAwesome5
            name="user-alt"
            size={50}
            color={selected === "cliente" ? "black" : "white"}
          />,
          "Solicitante",
          hoverCliente,
          clienteFillHeight
        )}
        {renderButton(
          "motorista",
          <FontAwesome6
            name="car"
            size={50}
            color={selected === "motorista" ? "black" : "white"}
          />,
          "Motorista",
          hoverMotorista,
          motoristaFillHeight
        )}
      </View>
    </View>
  );
}