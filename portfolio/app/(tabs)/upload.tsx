import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Camera,
  CheckCircle,
  X,
  Clock,
  Eye,
} from 'lucide-react-native';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadTime: Date;
  status: 'processing' | 'completed' | 'error';
}

export default function UploadScreen() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Physics Chapter 5.pdf',
      type: 'pdf',
      size: 2.5,
      uploadTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: '2',
      name: 'Math Notes.docx',
      type: 'document',
      size: 1.2,
      uploadTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed',
    },
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        await uploadFile(file.name, file.size || 0, 'document');
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        // Web fallback - show message about file upload
        Alert.alert('Upload', 'File upload simulation - document would be processed here');
        await uploadFile('Sample Document.pdf', 1024000, 'document');
      } else {
        Alert.alert('Error', 'Failed to pick document');
      }
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        await uploadFile(file.fileName || 'image.jpg', file.fileSize || 0, 'image');
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        // Web fallback
        Alert.alert('Upload', 'Image upload simulation - OCR would be processed here');
        await uploadFile('Sample Image.jpg', 512000, 'image');
      } else {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  const handleCameraPick = async () => {
    try {
      if (Platform.OS === 'web') {
        Alert.alert('Camera', 'Camera not available on web platform');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        await uploadFile(file.fileName || 'camera.jpg', file.fileSize || 0, 'image');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const uploadFile = async (name: string, size: number, type: string) => {
    setIsUploading(true);
    
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name,
      type,
      size: size / (1024 * 1024), // Convert to MB
      uploadTime: new Date(),
      status: 'processing',
    };

    setUploadedFiles(prev => [newFile, ...prev]);

    // Simulate upload and processing
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === newFile.id 
            ? { ...file, status: 'completed' }
            : file
        )
      );
      setIsUploading(false);
    }, 3000);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getFileIcon = (type: string, status: string) => {
    if (status === 'processing') {
      return <ActivityIndicator size={20} color="#2563EB" />;
    }

    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText size={20} color="#DC2626" />;
      case 'image':
        return <ImageIcon size={20} color="#059669" />;
      default:
        return <FileText size={20} color="#64748B" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#059669" />;
      case 'processing':
        return <Clock size={16} color="#F59E0B" />;
      case 'error':
        return <X size={16} color="#DC2626" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Upload Documents</Text>
          <Text style={styles.subtitle}>
            Add your study materials to get started with AI-powered learning
          </Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)']}
            style={styles.heroOverlay}
          >
            <Text style={styles.heroTitle}>Transform Your Study Materials</Text>
            <Text style={styles.heroSubtitle}>Upload any document and unlock AI-powered insights</Text>
          </LinearGradient>
        </View>

        {/* Upload Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Upload Method</Text>
          <View style={styles.uploadGrid}>
            <TouchableOpacity style={styles.uploadOption} onPress={handleDocumentPick}>
              <LinearGradient
                colors={['#2563EB', '#1D4ED8']}
                style={styles.uploadGradient}
              >
                <FileText size={32} color="#FFFFFF" />
                <Text style={styles.uploadTitle}>Documents</Text>
                <Text style={styles.uploadSubtitle}>PDF, Word, PowerPoint</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadOption} onPress={handleImagePick}>
              <LinearGradient
                colors={['#059669', '#047857']}
                style={styles.uploadGradient}
              >
                <ImageIcon size={32} color="#FFFFFF" />
                <Text style={styles.uploadTitle}>Photos</Text>
                <Text style={styles.uploadSubtitle}>JPG, PNG with OCR</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadOption} onPress={handleCameraPick}>
              <LinearGradient
                colors={['#DC2626', '#B91C1C']}
                style={styles.uploadGradient}
              >
                <Camera size={32} color="#FFFFFF" />
                <Text style={styles.uploadTitle}>Camera</Text>
                <Text style={styles.uploadSubtitle}>Capture documents</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload Guidelines */}
        <View style={styles.section}>
          <View style={styles.guidelinesCard}>
            <Text style={styles.guidelinesTitle}>Upload Guidelines</Text>
            <View style={styles.guideline}>
              <Text style={styles.guidelineBullet}>•</Text>
              <Text style={styles.guidelineText}>Maximum file size: 20 MB</Text>
            </View>
            <View style={styles.guideline}>
              <Text style={styles.guidelineBullet}>•</Text>
              <Text style={styles.guidelineText}>Supported formats: PDF, Word, PowerPoint, Images</Text>
            </View>
            <View style={styles.guideline}>
              <Text style={styles.guidelineBullet}>•</Text>
              <Text style={styles.guidelineText}>Images will be processed with OCR for text extraction</Text>
            </View>
            <View style={styles.guideline}>
              <Text style={styles.guidelineBullet}>•</Text>
              <Text style={styles.guidelineText}>Processing usually takes 1-3 minutes</Text>
            </View>
          </View>
        </View>

        {/* Uploaded Files */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Documents ({uploadedFiles.length})</Text>
          <View style={styles.filesContainer}>
            {uploadedFiles.map((file) => (
              <View key={file.id} style={styles.fileItem}>
                <View style={styles.fileIcon}>
                  {getFileIcon(file.type, file.status)}
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileSize}>{file.size.toFixed(1)} MB</Text>
                    <Text style={styles.fileDot}>•</Text>
                    <Text style={styles.fileTime}>{formatTime(file.uploadTime)}</Text>
                  </View>
                </View>
                <View style={styles.fileActions}>
                  {getStatusIcon(file.status)}
                  {file.status === 'completed' && (
                    <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() => console.log('View file:', file.id)}
                    >
                      <Eye size={16} color="#2563EB" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeFile(file.id)}
                  >
                    <X size={16} color="#64748B" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            {uploadedFiles.length === 0 && (
              <View style={styles.emptyState}>
                <Upload size={48} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>No documents uploaded yet</Text>
                <Text style={styles.emptySubtitle}>
                  Upload your first document to start learning with AI
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Upload Progress Overlay */}
      {isUploading && (
        <View style={styles.uploadOverlay}>
          <View style={styles.uploadModal}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.uploadText}>Processing your document...</Text>
            <Text style={styles.uploadSubtext}>This may take a few moments</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  uploadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  uploadOption: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  uploadGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
  },
  guidelinesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  guidelineBullet: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '700',
    marginRight: 8,
    marginTop: 2,
  },
  guidelineText: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
    lineHeight: 20,
  },
  filesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  fileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  fileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSize: {
    fontSize: 12,
    color: '#64748B',
  },
  fileDot: {
    fontSize: 12,
    color: '#64748B',
    marginHorizontal: 8,
  },
  fileTime: {
    fontSize: 12,
    color: '#64748B',
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  uploadOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});