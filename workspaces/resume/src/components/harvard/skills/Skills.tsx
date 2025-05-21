import { Text } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'

interface Props {
  skills: {
    name: string
  }[]
  style?: Style | Style[]
}

const Skills = ({ skills, style = {} }: Props) => {
  return (
    <Text style={style}>
      {skills.map((skill) => skill.name).join(', ')}
    </Text>
  )
}

export default Skills
