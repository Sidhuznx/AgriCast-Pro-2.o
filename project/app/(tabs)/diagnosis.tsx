import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Upload, Scan, CircleCheck as CheckCircle, CircleAlert as AlertCircle, X, Loader } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useCamera } from '@/hooks/useCamera';
import { useImageUpload } from '@/hooks/useImageUpload';
import { CameraView } from 'expo-camera';

export default function DiagnosisScreen() {
  const { t } = useLanguage();
  const { permission, facing, toggleCameraFacing, isReady, checkPermissions } = useCamera();
  const { uploading, uploadProgress, uploadImage, selectImage } = useImageUpload();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const sampleImages = [
    {
      id: 1,
      uri: 'https://images.pexels.com/photos/1459534/pexels-photo-1459534.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Healthy Rice Plant',
    },
    {
      id: 2,
      uri: 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Wheat Field',
    },
  ];

  const mockDiagnose = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setDiagnosisResult({
        condition: 'Leaf Spot Disease',
        severity: 'Moderate',
        confidence: 87,
        treatment: {
          organic: [
            'Apply neem oil spray twice weekly',
            'Improve air circulation around plants',
            'Remove infected leaves and dispose properly',
          ],
          chemical: [
            'Apply copper-based fungicide',
            'Use systemic fungicide (Propiconazole)',
            'Ensure proper drainage',
          ],
        },
        prevention: [
          'Maintain proper plant spacing',
          'Avoid overhead watering',
          'Apply balanced fertilizer',
        ],
      });
    } catch (error) {
      Alert.alert(t('error_occurred'), t('analyzing_image'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectSampleImage = (imageUri: string) => {
    setSelectedImage(imageUri);
    setDiagnosisResult(null);
  };

  const handleTakePicture = async () => {
    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      Alert.alert(t('camera_permission_required'), t('grant_permission'));
      return;
    }
    setShowCamera(true);
  };

  const handleUploadImage = async () => {
    try {
      const imageUri = await selectImage();
      if (imageUri) {
        setSelectedImage(imageUri);
        setDiagnosisResult(null);
        
        // Upload image
        const result = await uploadImage(imageUri);
        if (!result.success) {
          Alert.alert(t('error_occurred'), result.error || t('image_upload_failed'));
        }
      }
    } catch (error) {
      Alert.alert(t('error_occurred'), t('image_upload_failed'));
    }
  };

  const capturePhoto = () => {
    // Mock photo capture
    const mockImageUri = `https://images.pexels.com/photos/1459534/pexels-photo-1459534.jpeg?auto=compress&cs=tinysrgb&w=800`;
    setSelectedImage(mockImageUri);
    setShowCamera(false);
    setDiagnosisResult(null);
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Camera size={48} color="#6B7280" />
          <Text style={styles.permissionTitle}>{t('loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('crop_diagnosis')}</Text>
          <Text style={styles.subtitle}>
            {t('upload_image')}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleTakePicture}>
            <Camera size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{t('take_photo')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleUploadImage}>
            <Upload size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{t('upload_photo')}</Text>
          </TouchableOpacity>
        </View>

        {/* Upload Progress */}
        {uploading && (
          <View style={styles.uploadProgress}>
            <View style={styles.progressHeader}>
              <Loader size={16} color="#10B981" />
              <Text style={styles.progressText}>Uploading... {uploadProgress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
            </View>
          </View>
        )}

        {/* Sample Images */}
        <View style={styles.sampleSection}>
          <Text style={styles.sectionTitle}>Try with sample images</Text>
          <View style={styles.sampleGrid}>
            {sampleImages.map((image) => (
              <TouchableOpacity
                key={image.id}
                style={[
                  styles.sampleImage,
                  selectedImage === image.uri && styles.selectedImage,
                ]}
                onPress={() => selectSampleImage(image.uri)}
              >
                <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                <Text style={styles.imageTitle}>{image.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Analyze Button */}
        {selectedImage && (
          <View style={styles.analyzeSection}>
            <TouchableOpacity
              style={[styles.analyzeButton, isAnalyzing && styles.analyzingButton]}
              onPress={mockDiagnose}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader size={20} color="#FFFFFF" />
              ) : (
                <Scan size={20} color="#FFFFFF" />
              )}
              <Text style={styles.analyzeButtonText}>
                {isAnalyzing ? t('analyzing_image') : 'Analyze Crop'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Diagnosis Results */}
        {diagnosisResult && (
          <View style={styles.resultsSection}>
            <View style={styles.resultHeader}>
              <AlertCircle size={24} color="#F59E0B" />
              <View>
                <Text style={styles.conditionName}>{diagnosisResult.condition}</Text>
                <Text style={styles.severity}>
                  Severity: {diagnosisResult.severity} • {diagnosisResult.confidence}% confidence
                </Text>
              </View>
            </View>

            {/* Treatment Options */}
            <View style={styles.treatmentSection}>
              <Text style={styles.treatmentTitle}>Organic Treatment</Text>
              {diagnosisResult.treatment.organic.map((treatment: string, index: number) => (
                <View key={index} style={styles.treatmentItem}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.treatmentText}>{treatment}</Text>
                </View>
              ))}
            </View>

            <View style={styles.treatmentSection}>
              <Text style={styles.treatmentTitle}>Chemical Treatment</Text>
              {diagnosisResult.treatment.chemical.map((treatment: string, index: number) => (
                <View key={index} style={styles.treatmentItem}>
                  <CheckCircle size={16} color="#3B82F6" />
                  <Text style={styles.treatmentText}>{treatment}</Text>
                </View>
              ))}
            </View>

            <View style={styles.treatmentSection}>
              <Text style={styles.treatmentTitle}>Prevention Tips</Text>
              {diagnosisResult.prevention.map((tip: string, index: number) => (
                <View key={index} style={styles.treatmentItem}>
                  <CheckCircle size={16} color="#8B5CF6" />
                  <Text style={styles.treatmentText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Camera Modal */}
      <Modal visible={showCamera} animationType="slide">
        <View style={styles.cameraContainer}>
          {isReady && permission?.granted ? (
            <CameraView style={styles.camera} facing={facing}>
              <View style={styles.cameraControls}>
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={() => setShowCamera(false)}
                >
                  <X size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={capturePhoto}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={toggleCameraFacing}
                >
                  <Camera size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            <View style={styles.permissionContainer}>
              <Camera size={48} color="#6B7280" />
              <Text style={styles.permissionTitle}>{t('camera_permission_required')}</Text>
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={checkPermissions}
              >
                <Text style={styles.permissionButtonText}>{t('grant_permission')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  uploadProgress: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  sampleSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  sampleGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  sampleImage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedImage: {
    borderColor: '#10B981',
  },
  imagePreview: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    textAlign: 'center',
  },
  analyzeSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  analyzeButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  analyzingButton: {
    backgroundColor: '#6B7280',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  resultsSection: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  conditionName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  severity: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  treatmentSection: {
    marginBottom: 20,
  },
  treatmentTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  treatmentText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 20,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});