import { pdf } from '@react-pdf/renderer';
import type { ReactElement } from 'react';

export async function generateAndOpenPdf(
  pdfDocument: ReactElement<any>,
  filename: string,
  download = false,
  currentPdfUrlRef?: { current: string | undefined }
): Promise<void> {
  const blob = await pdf(pdfDocument).toBlob();
  const url = URL.createObjectURL(blob);

  // Revoke the previous URL if exists
  if (currentPdfUrlRef?.current) {
    URL.revokeObjectURL(currentPdfUrlRef.current);
  }

  if (currentPdfUrlRef) {
    currentPdfUrlRef.current = url;
  }

  // Open or download the PDF
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  if (download) {
    link.download = `${filename}-${Date.now()}.pdf`;
  }
  link.click();
}

