import React, { useState, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadImage } from '../lib/supabase';

export default function ImageUploadWidget({
  onUploadSuccess,
  onError,
  folder = 'modulos',
  maxFileSize = 5, // MB
  requiresAuth = true,
}) {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [canUpload, setCanUpload] = useState(true);
  const fileInputRef = useRef(null);

  // Validar permisos
  React.useEffect(() => {
    if (requiresAuth && user) {
      const isAllowed =
        user.roles?.nombre === 'admin' || user.roles?.nombre === 'profesor';
      setCanUpload(isAllowed);

      if (!isAllowed) {
        setError(
          'Solo administradores y profesores pueden subir imágenes'
        );
      }
    } else if (requiresAuth && !user) {
      setCanUpload(false);
    }
  }, [user, requiresAuth]);

  // Validar archivo
  const validateFile = useCallback((file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de archivo no permitido. Use JPG, PNG, GIF o WebP');
      return false;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      setError(`Archivo muy grande. Máximo ${maxFileSize}MB`);
      return false;
    }

    return true;
  }, [maxFileSize]);

  // Manejar selección de archivo
  const handleFileSelect = useCallback((file) => {
    setError(null);

    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [validateFile]);

  // Drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Click en área de upload
  const handleBrowseClick = () => {
    if (!canUpload) return;
    fileInputRef.current?.click();
  };

  // Upload a Supabase
  const handleUpload = async () => {
    if (!selectedFile || !canUpload) {
      setError('Selecciona un archivo válido');
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Simular progreso
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 30;
        });
      }, 300);

      const url = await uploadImage(selectedFile, folder);

      clearInterval(progressInterval);

      if (url) {
        setProgress(100);
        setSelectedFile(null);
        setPreviewUrl(null);

        // Resetear después de 500ms
        setTimeout(() => {
          setProgress(0);
          setIsUploading(false);
        }, 500);

        onUploadSuccess(url);
      } else {
        throw new Error('Error al subir la imagen');
      }
    } catch (err) {
      setError(err.message || 'Error al subir la imagen');
      setIsUploading(false);
      setProgress(0);

      if (onError) {
        onError(err.message || 'Error al subir la imagen');
      }
    }
  };

  // Cancelar upload
  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setError(null);
  };

  if (!canUpload) {
    return (
      <div className="upload-widget disabled">
        <p className="upload-disabled-message">
          <i className="fas fa-lock"></i> Solo administradores y profesores pueden subir imágenes
        </p>
      </div>
    );
  }

  return (
    <div className="upload-widget">
      {/* Área de drag-drop */}
      <div
        className="upload-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.length > 0) {
              handleFileSelect(e.target.files[0]);
            }
          }}
          style={{ display: 'none' }}
          disabled={isUploading}
        />

        {!isUploading && !previewUrl && (
          <>
            <i className="fas fa-cloud-upload-alt"></i>
            <p>
              <strong>Arrastra tu imagen aquí</strong>
              <br />o haz click para seleccionar
            </p>
            <span className="upload-hint">
              JPG, PNG, GIF o WebP • Máx {maxFileSize}MB
            </span>
          </>
        )}

        {previewUrl && !isUploading && (
          <>
            <img src={previewUrl} alt="Preview" className="upload-preview" />
            <p className="upload-filename">
              {selectedFile?.name.substring(0, 30)}
              {selectedFile?.name.length > 30 ? '...' : ''}
            </p>
          </>
        )}

        {isUploading && (
          <div className="upload-progress-circular">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="progress-circle-bg" />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="progress-circle-fill"
                style={{
                  strokeDasharray: `${progress * 2.83} 283`,
                }}
              />
            </svg>
            <span className="upload-progress-text">{Math.round(progress)}%</span>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="upload-error">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}

      {/* Botones */}
      <div className="upload-actions">
        {!isUploading && previewUrl && (
          <>
            <button
              className="upload-btn submit-btn"
              onClick={handleUpload}
              disabled={isUploading}
            >
              <i className="fas fa-check"></i> Subir imagen
            </button>
            <button
              className="upload-btn cancel-btn"
              onClick={handleCancel}
              disabled={isUploading}
            >
              <i className="fas fa-times"></i> Cancelar
            </button>
          </>
        )}

        {isUploading && (
          <button className="upload-btn cancel-btn" onClick={handleCancel}>
            <i className="fas fa-times"></i> Cancelar
          </button>
        )}
      </div>

      {/* Success message */}
      {progress === 100 && !isUploading && (
        <div className="upload-success">
          <i className="fas fa-check-circle"></i> ¡Imagen subida exitosamente!
        </div>
      )}
    </div>
  );
}
