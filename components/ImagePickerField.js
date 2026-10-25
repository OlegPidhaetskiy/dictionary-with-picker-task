import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

// Square area that shows the picked image (or a placeholder).
// Press on it opens the gallery; permission is requested on the first use.
function ImagePickerField({ image, onPick, disabled = false }) {
  const colors = useSelector((state) => state.theme.colors);
  const styles = useMemo(() => getStyles(colors), [colors]);
  const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  async function onPress() {
    if (disabled) {
      return;
    }
    if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      const response = await requestPermission();
      if (!response.granted) {
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets?.length) {
      onPick(result.assets[0].uri);
    }
  }

  return (
    <Pressable
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        <>
          <Ionicons name="image-outline" size={32} color={colors.grey600} />
          <Text style={styles.text}>No image taken yet.</Text>
        </>
      )}
    </Pressable>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: {
      width: 160,
      aspectRatio: 1,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 14,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: colors.primary200,
      overflow: "hidden",
    },
    disabled: {
      opacity: 0.5,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    text: {
      marginTop: 6,
      color: colors.grey600,
    },
  });
}

export default ImagePickerField;
