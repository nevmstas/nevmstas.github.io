import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { useCallback, useRef } from 'react';

const useOpenPdf = <T extends object>(
  Component: React.ComponentType<T>,
  props: T | undefined,
  filename: string
) => {
  const currentPdfUrl = useRef<string | undefined>(undefined);

  const openPdf = useCallback(
    async (download = false) => {
      if (!props) return;

      const pdfDocument = React.createElement(Component, props);
      const blob = await pdf(pdfDocument).toBlob();
      const url = URL.createObjectURL(blob);

      // Revoke the previous URL if exists
      if (currentPdfUrl.current) {
        URL.revokeObjectURL(currentPdfUrl.current);
      }

      currentPdfUrl.current = url;

      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      if (download) {
        link.download = `${filename}-${Date.now()}.pdf`;
      }
      link.click();
    },
    [Component, props, filename]
  );

  return { openPdf };
};

export default useOpenPdf;