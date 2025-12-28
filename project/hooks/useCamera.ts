import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { CameraType, useCameraPermissions } from 'expo-camera';

export function useCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isReady, setIsReady] = useState(false);

  const checkPermissions = async () => {
    if (Platform.OS === 'web') {
      // Web camera permissions are handled differently
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setIsReady(true);
        return true;
      } catch (error) {
        Alert.alert('Camera Error', 'Camera access denied or not available');
        return false;
      }
    }

    if (!permission) {
      return false;
    }

    if (!permission.granted) {
      const result = await requestPermission();
      return result.granted;
    }

    setIsReady(true);
    return true;
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  useEffect(() => {
    checkPermissions();
  }, [permission]);

  return {
    permission,
    requestPermission,
    facing,
    toggleCameraFacing,
    isReady,
    checkPermissions
  };
}