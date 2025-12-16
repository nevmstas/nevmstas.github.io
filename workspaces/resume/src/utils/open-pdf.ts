import { pdf } from '@react-pdf/renderer';
import type { ReactElement } from 'react';

export async function generateAndOpenPdf(
  pdfDocument: ReactElement<any>,
  filename: string,
  download = false,
  currentPdfUrlRef?: { current: string | undefined }
): Promise<void> {
  const blob = await pdf(pdfDocument).toBlob();
  const pdfFilename = `${filename}.pdf`;
  
  // Create a File object with the proper filename so browser uses it when saving
  const file = new File([blob], pdfFilename, { type: 'application/pdf' });
  const fileUrl = URL.createObjectURL(file);

  // Revoke the previous URL if exists
  if (currentPdfUrlRef?.current) {
    URL.revokeObjectURL(currentPdfUrlRef.current);
  }

  if (currentPdfUrlRef) {
    currentPdfUrlRef.current = fileUrl;
  }

  if (download) {
    // Download mode: trigger download with proper filename
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = pdfFilename;
    link.click();
  } else {
    // Preview mode: open in new tab without download attribute
    window.open(fileUrl, '_blank');
  }
}
