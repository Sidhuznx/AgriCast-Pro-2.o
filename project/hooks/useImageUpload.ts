import { useState } from 'react';
import { Platform, Alert } from 'react-native';

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = async (imageUri: string): Promise<UploadResult> => {
    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Mock upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Mock successful upload
      const mockUrl = `https://storage.example.com/crops/${Date.now()}.jpg`;
      
      return {
        success: true,
        url: mockUrl
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const selectImage = async (): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            resolve(url);
          } else {
            resolve(null);
          }
        };
        input.click();
      });
    }

    // For mobile platforms, you would use expo-image-picker here
    // Mock image selection for now
    return `mock://image/${Date.now()}.jpg`;
  };

  return {
    uploading,
    uploadProgress,
    uploadImage,
    selectImage
  };
}