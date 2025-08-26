import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Image, Video, File, Trash2, Eye, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectFile {
  id: string;
  name: string;
  type: 'pptx' | 'pdf' | 'video' | 'image' | 'other';
  size: string;
  uploadDate: string;
  isVerified: boolean;
}

const sampleFiles: ProjectFile[] = [
  {
    id: '1',
    name: 'Advanced Color Grading Techniques.pptx',
    type: 'pptx',
    size: '12.3 MB',
    uploadDate: '2024-01-15',
    isVerified: true
  },
  {
    id: '2',
    name: 'Video Editing Workflow Guide.pdf',
    type: 'pdf',
    size: '8.7 MB',
    uploadDate: '2024-01-14',
    isVerified: true
  },
  {
    id: '3',
    name: 'Motion Graphics Templates.pptx',
    type: 'pptx',
    size: '25.1 MB',
    uploadDate: '2024-01-13',
    isVerified: true
  },
  {
    id: '4',
    name: 'Audio Mixing Fundamentals.pdf',
    type: 'pdf',
    size: '15.2 MB',
    uploadDate: '2024-01-12',
    isVerified: true
  },
  {
    id: '5',
    name: 'After Effects Project Templates.pptx',
    type: 'pptx',
    size: '45.8 MB',
    uploadDate: '2024-01-11',
    isVerified: true
  },
  {
    id: '6',
    name: 'Cinematic Lighting Setup Guide.pdf',
    type: 'pdf',
    size: '22.4 MB',
    uploadDate: '2024-01-10',
    isVerified: true
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pptx':
      return <FileText className="h-8 w-8 text-orange-500" />;
    case 'pdf':
      return <File className="h-8 w-8 text-red-500" />;
    case 'video':
      return <Video className="h-8 w-8 text-purple-500" />;
    case 'image':
      return <Image className="h-8 w-8 text-green-500" />;
    default:
      return <File className="h-8 w-8 text-gray-500" />;
  }
};

export const ProjectsPage = () => {
  const [files, setFiles] = useState<ProjectFile[]>(sampleFiles);
  const [dragOver, setDragOver] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingFiles, setPendingFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Disable right-click context menu, text selection, and screenshots
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    const disableTextSelection = (e: Event) => e.preventDefault();
    const disableKeyShortcuts = (e: KeyboardEvent) => {
      // Disable common screenshot and copy shortcuts
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 's')) ||
        (e.metaKey && (e.key === 'c' || e.key === 'a' || e.key === 's'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('selectstart', disableTextSelection);
    document.addEventListener('keydown', disableKeyShortcuts);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('selectstart', disableTextSelection);
      document.removeEventListener('keydown', disableKeyShortcuts);
    };
  }, []);

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      setPendingFiles(uploadedFiles);
      setShowVerification(true);
      // Simulate sending verification code to email
      console.log('Verification code sent to teamaestheticeditors@gmail.com');
    }
  };

  const handleVerification = () => {
    // Simple verification - in real app, this would verify against server
    if (verificationCode === '123456' && pendingFiles) {
      const newFiles: ProjectFile[] = Array.from(pendingFiles).map((file, index) => ({
        id: String(Date.now() + index),
        name: file.name,
        type: file.name.endsWith('.pptx') ? 'pptx' : 
              file.name.endsWith('.pdf') ? 'pdf' :
              file.type.startsWith('video/') ? 'video' :
              file.type.startsWith('image/') ? 'image' : 'other',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        isVerified: true
      }));
      
      setFiles([...newFiles, ...files]);
      setShowVerification(false);
      setVerificationCode('');
      setPendingFiles(null);
    } else {
      alert('Invalid verification code');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDelete = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  const handlePreview = (file: ProjectFile) => {
    if (file.isVerified) {
      console.log('Opening preview for:', file.name);
      // In a real app, this would open the file preview
    } else {
      alert('File not verified for preview');
    }
  };

  return (
    <div className="py-6 select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground animate-slide-in-up">Secure Project Files & Resources</h2>
        <Lock className="h-5 w-5 text-muted-foreground" />
      </div>
      
      {/* Upload Area */}
      <Card 
        className={`mb-8 p-8 border-2 border-dashed transition-all duration-300 cursor-pointer animate-slide-in-up ${
          dragOver 
            ? 'border-accent bg-accent/5 scale-105' 
            : 'border-border hover:border-accent/50 hover:bg-accent/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-semibold text-foreground mb-2">
            Upload Project Files (Verification Required)
          </p>
          <p className="text-muted-foreground mb-4">
            Drag and drop your PPTX, PDF, or other project files here. A verification code will be sent to teamaestheticeditors@gmail.com
          </p>
          <Button variant="outline" className="hover:bg-accent hover:text-accent-foreground">
            Choose Files
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pptx,.pdf,.mp4,.mov,.avi,.jpg,.jpeg,.png,.gif"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
      </Card>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <Card 
            key={file.id}
            className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-up group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* File Icon and Info */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                  {file.name}
                </h3>
                <p className="text-sm text-muted-foreground">{file.size}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* File Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePreview(file)}
                  className="hover:bg-accent/20 hover:text-accent transition-all duration-300"
                  disabled={!file.isVerified}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {file.isVerified ? 'Preview' : 'Locked'}
                </Button>
                
                {file.isVerified && (
                  <div className="flex items-center space-x-1 text-xs text-green-500">
                    <Shield className="h-3 w-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(file.id)}
                className="hover:bg-destructive/20 hover:text-destructive transition-all duration-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-12">
          <File className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No files uploaded yet</p>
          <p className="text-sm text-muted-foreground">Upload your first project file to get started</p>
        </div>
      )}

      {/* Verification Dialog */}
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-accent" />
              <span>File Upload Verification</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A verification code has been sent to <strong>teamaestheticeditors@gmail.com</strong>. 
              Please enter the code to complete the upload.
            </p>
            <Input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="text-center tracking-widest"
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleVerification}
                className="flex-1"
                disabled={!verificationCode}
              >
                Verify & Upload
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowVerification(false);
                  setVerificationCode('');
                  setPendingFiles(null);
                }}
              >
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Demo code: 123456
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};