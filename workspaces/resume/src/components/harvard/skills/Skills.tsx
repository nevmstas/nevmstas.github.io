import { Text, View } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'
import { SkillType } from '@nevmstas/hygraph-client'

interface Skill {
  name: string
  type: SkillType
}

interface Props {
  skills: Skill[]
  style?: Style | Style[]
}

const typeLabels: Partial<Record<SkillType, string>> = {
  [SkillType.Frontend]: 'Frontend & Mobile',
  [SkillType.Backend]: 'Data & APIs',
  [SkillType.Cicd]: 'Infra & Delivery',
  [SkillType.Ai]: 'AI & Automation',
  [SkillType.Architecture]: 'Architecture',
}

const groupByType = (skills: Skill[]): Record<string, string[]> =>
  skills
    .filter((skill) => skill.type in typeLabels)
    .reduce<Record<string, string[]>>((acc, skill) => ({
      ...acc,
      [skill.type]: [...(acc[skill.type] ?? []), skill.name],
    }), {})

const Skills = ({ skills, style = {} }: Props) => {
  const grouped = groupByType(skills)

  return (
    <View style={style}>
      {Object.entries(grouped).map(([type, names]) => (
        <Text key={type}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>
            {typeLabels[type as SkillType] ?? type}
          </Text>
          {`: ${names.join(', ')}`}
        </Text>
      ))}
    </View>
  )
}

export default Skills
