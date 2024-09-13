import { UploadButton } from '@/app/api/uploadthing/upload';
import React from 'react';

const ImageUpload = () => {
  return (
    <div>
      <UploadButton endpoint="imageUploader" />
    </div>
  );
};

export default ImageUpload;
