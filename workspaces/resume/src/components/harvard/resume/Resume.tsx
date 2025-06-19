import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'
import theme from '../../../theme'
import { ResumeQuery } from '@nevmstas/hygraph-client'
import { Skills } from '../skills'
import sharedStyles from '../styles'
import ResumeItem from '../resume-item/ResumeItem'
import { Header } from '../header'

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.light,
    fontFamily: 'Helvetica',
    color: theme.colors.dark3,
    fontSize: 10,
  },
  container: {
    padding: 24,
  },
  section: {
    marginBottom: 6,
  },
  sectionTitle: {
    color: theme.colors.dark3,
    borderBottom: `1px solid ${theme.colors.dark2}`,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    textAlign: 'left',
  },
  aboutText: {
    textAlign: 'justify',
    lineHeight: 0.64,
  },
  recognitionFullList: {
    display: 'flex',
    alignItems: 'center',
  },
})

const getItemMarginStyle = (
  style: Style | Style[],
  index: number,
  itemsCount: number,
) => (index + 1 === itemsCount ? undefined : style)

const HarvardResume = ({
  profiles,
  skills,
  experiences,
  educations,
}: ResumeQuery) => {
  const profile = profiles[0]
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Header {...profile} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.aboutText}>{profile.aboutMe}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Skills skills={skills} style={sharedStyles.itemMarginBottom} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experiences
              .map((experience, index) => (
                <ResumeItem
                  key={experience.id}
                  title={experience.jobTitile || ''}
                  dates={`${new Date(experience.startDate).getFullYear()} - ${experience.endDate ? new Date(experience.endDate).getFullYear() : 'Present'}`}
                  subtitle={experience.company || ''}
                  description={experience.description}
                  style={getItemMarginStyle(
                    sharedStyles.itemMarginBottom,
                    index,
                    experiences.length,
                  )}
                />
              ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {educations
              .map((education, index) => (
                <ResumeItem
                  key={education.id}
                  dates={education.period || ''}
                  title={`${education.degree} in ${education.specialization}`}
                  subtitle={education.institution || ''}
                  description={education.achievements}
                  style={getItemMarginStyle(
                    sharedStyles.itemMarginBottom,
                    index,
                    educations.length,
                  )}
                />
              ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default HarvardResume
