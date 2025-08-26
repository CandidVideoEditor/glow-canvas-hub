import { useState, useRef } from 'react';
import { Upload, Download, FileText, Image, Video, File, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProjectFile {
  id: string;
  name: string;
  type: 'pptx' | 'pdf' | 'video' | 'image' | 'other';
  size: string;
  uploadDate: string;
  downloadUrl?: string;
}

const sampleFiles: ProjectFile[] = [
  {
    id: '1',
    name: 'Advanced Color Grading Techniques.pptx',
    type: 'pptx',
    size: '12.3 MB',
    uploadDate: '2024-01-15',
    downloadUrl: '/sample-files/color-grading.pptx'
  },
  {
    id: '2',
    name: 'Video Editing Workflow Guide.pdf',
    type: 'pdf',
    size: '8.7 MB',
    uploadDate: '2024-01-14',
    downloadUrl: '/sample-files/workflow-guide.pdf'
  },
  {
    id: '3',
    name: 'Motion Graphics Templates.pptx',
    type: 'pptx',
    size: '25.1 MB',
    uploadDate: '2024-01-13',
    downloadUrl: '/sample-files/motion-graphics.pptx'
  },
  {
    id: '4',
    name: 'Audio Mixing Fundamentals.pdf',
    type: 'pdf',
    size: '15.2 MB',
    uploadDate: '2024-01-12',
    downloadUrl: '/sample-files/audio-mixing.pdf'
  },
  {
    id: '5',
    name: 'After Effects Project Templates.pptx',
    type: 'pptx',
    size: '45.8 MB',
    uploadDate: '2024-01-11',
    downloadUrl: '/sample-files/ae-templates.pptx'
  },
  {
    id: '6',
    name: 'Cinematic Lighting Setup Guide.pdf',
    type: 'pdf',
    size: '22.4 MB',
    uploadDate: '2024-01-10',
    downloadUrl: '/sample-files/lighting-guide.pdf'
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      const newFiles: ProjectFile[] = Array.from(uploadedFiles).map((file, index) => ({
        id: String(Date.now() + index),
        name: file.name,
        type: file.name.endsWith('.pptx') ? 'pptx' : 
              file.name.endsWith('.pdf') ? 'pdf' :
              file.type.startsWith('video/') ? 'video' :
              file.type.startsWith('image/') ? 'image' : 'other',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0]
      }));
      
      setFiles([...newFiles, ...files]);
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

  const handleDownload = (file: ProjectFile) => {
    if (file.downloadUrl) {
      // In a real app, this would trigger an actual download
      console.log('Downloading:', file.name);
    } else {
      console.log('File uploaded by user - download not available for demo');
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-foreground mb-6 animate-slide-in-up">Project Files & Resources</h2>
      
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
            Upload Project Files
          </p>
          <p className="text-muted-foreground mb-4">
            Drag and drop your PPTX, PDF, or other project files here, or click to browse
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
                  onClick={() => handleDownload(file)}
                  className="hover:bg-accent/20 hover:text-accent transition-all duration-300"
                  disabled={!file.downloadUrl}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-accent/20 hover:text-accent transition-all duration-300"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
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
    </div>
  );
};