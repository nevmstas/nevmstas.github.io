import { ComponentType, useCallback } from 'react'
import useOpenPdf from './use-open-pdf'

const useResume = <P extends object>(
  Component: ComponentType<P>,
  props: P | undefined,
  filename: string = 'resume',
) => {
  const { openPdf } = useOpenPdf(Component, props, filename)

  const previewResume = useCallback(() => openPdf(false), [openPdf])
  const downloadResume = useCallback(() => openPdf(true), [openPdf])

  return {
    openResume: openPdf,
    previewResume,
    downloadResume,
  }
}

export default useResume