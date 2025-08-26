import { useState, useEffect } from 'react';
import { FileText, Image, Video, File, Eye, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  const [files] = useState<ProjectFile[]>(sampleFiles);

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

    </div>
  );
};