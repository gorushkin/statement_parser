import { Box, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { ChangeEvent, FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from 'src/entities/preview';
import { parser } from 'src/shared/parser';
import { ROUTE } from 'src/shared/routes';
import { cn, getFileExtension } from 'src/shared/utils';

import { useFileDrop } from '../lib/';
import { FileFormat } from '../types';
import styles from './FileForm.module.scss';

const FileForm: FC = observer(() => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileConvert = (file: ArrayBuffer | string, name: string) => {
    preview.createPreview(file, name);
    navigate(ROUTE.STATEMENT_PREVIEW);
  };

  const handleSubmit = async (files: FileList) => {
    for (const file of files) {
      const { name } = file;
      const fileExtension = getFileExtension(name);

      if (fileExtension === FileFormat.CSV) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          if (!reader.result) return;
          return handleFileConvert(reader.result, name);
        });
        // TODO: add encoding selector
        return reader.readAsText(file, 'CP1251');
      }

      if (
        fileExtension === FileFormat.XLS ||
        fileExtension === FileFormat.XLSX
      ) {
        const csv = await parser.convert(file);
        return handleFileConvert(csv, name);
      }

      throw new Error('there is no extension');
    }
  };

  const { handleFileDragLeave, handleFileDragOver, handleFileDrop, isHover } =
    useFileDrop(handleSubmit);

  const handleAddFileButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileInputChange = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    void handleSubmit(files);
  };

  return (
    <Box
      className={cn(styles.form, isHover && styles.formHover)}
      onDragLeave={handleFileDragLeave}
      onDragOver={handleFileDragOver}
      onDrop={handleFileDrop}
    >
      <Text textAlign={'center'}>
        Drag'n'drop your statement or{' '}
        <Text
          as={'button'}
          className={styles.link}
          onClick={handleAddFileButtonClick}
          type="button"
        >
          click here
        </Text>
      </Text>
      <input
        accept=".csv, .xls"
        hidden={true}
        name="file"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        type="file"
      />
    </Box>
  );
});

export { FileForm };
