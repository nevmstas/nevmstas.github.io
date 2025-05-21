import { Font } from '@react-pdf/renderer'
import Resume from './Resume'
import { ResumeQuery } from '@nevmstas/hygraph-client'

Font.registerHyphenationCallback((word: string) => {
  return [word]
})

const Resume_ = (props: ResumeQuery) => <Resume {...props} />

export default Resume_