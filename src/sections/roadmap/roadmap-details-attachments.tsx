import { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { MultiFilePreview, UploadBox } from 'src/components/upload';

// ----------------------------------------------------------------------

type Props = {
  attachments: string[];
  setAttachments: any;
};

export default function KanbanDetailsAttachments({ attachments, setAttachments }: Props) {
  const [files, setFiles] = useState<(File | string)[]>(attachments);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles((prevFiles: any) => [...prevFiles, ...newFiles]); // Concatenate newFiles to the front
      setAttachments((prevAttachments: any) => [...prevAttachments, ...newFiles]);
    },
    [setFiles, setAttachments]
  );

  const handleRemoveFile = useCallback(
    (removedFile: File | string) => {
      setFiles((prevFiles) => prevFiles.filter((file) => file !== removedFile));
      setAttachments((prevAttachments: any) =>
        prevAttachments.filter((file: any) => file !== removedFile)
      );
    },
    [setFiles, setAttachments]
  );

  const handleDownloadFile = (file: File | string) => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (typeof file === 'string') {
      const downloadEndpoint = `${file}`;
      window.open(downloadEndpoint, '_blank');
    }
  };

  return (
    <Stack direction="row" flexWrap="wrap">
      {files.map((file, index) => (
        <MultiFilePreview
          thumbnail
          files={[file]}
          sx={{ width: 64, height: 64 }}
          key={index}
          onRemove={() => handleRemoveFile(file)}
          onDownload={() => handleDownloadFile(file)}
        />
      ))}
      <UploadBox onDrop={handleDrop} />
    </Stack>
  );
}
