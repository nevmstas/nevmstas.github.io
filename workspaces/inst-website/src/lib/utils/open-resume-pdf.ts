import React from 'react';
import { HarvardResume, generateAndOpenPdf } from '@nevmstas/resume';
import type { ResumeQuery } from '@nevmstas/hygraph-client';

let currentPdfUrl: { current: string | undefined } = { current: undefined };

export async function openResumePdf(
	resumeData: ResumeQuery,
	download = false
): Promise<void> {
	// Create React element using the existing React component
	const pdfDocument = React.createElement(HarvardResume, resumeData);
	
	// Use the shared PDF generation logic from the resume package
	await generateAndOpenPdf(pdfDocument, 'resume', download, currentPdfUrl);
}

