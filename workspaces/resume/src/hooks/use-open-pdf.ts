import React from 'react';
import { useCallback, useRef } from 'react';
import { generateAndOpenPdf } from '../utils/open-pdf';

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
      await generateAndOpenPdf(pdfDocument, filename, download, currentPdfUrl);
    },
    [Component, props, filename]
  );

  return { openPdf };
};

export default useOpenPdf;