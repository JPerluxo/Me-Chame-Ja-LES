import { useEffect, useRef } from "react";
import { Modal, View, Text, Animated } from "react-native";

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
  success?: boolean;
};

export function FeedbackModal({
  visible,
  message,
  onClose,
  duration = 3000,
  success = true,
}: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start(() => {
        onClose();
      });
    }
  }, [visible]);

  const widthAnim = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "0%"],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-80 bg-white rounded-2xl p-6 shadow-lg items-center">
          <Text
            className={`text-lg font-bold text-center mb-4 ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </Text>
          <View className="w-full h-2 bg-gray-200 rounded">
            <Animated.View
              style={{
                height: "100%",
                width: widthAnim,
                backgroundColor: success ? "green" : "red",
                borderRadius: 4,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}