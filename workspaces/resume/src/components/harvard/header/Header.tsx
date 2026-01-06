import { Text, View, StyleSheet, Link } from '@react-pdf/renderer'
import theme from '../../../theme'
import { ResumeQuery } from '@nevmstas/hygraph-client'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
  },
  tagline: {
    fontSize: 10,
    marginTop: 4,
    color: theme.colors.dark3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  infoText: {
    fontSize: 10,
    color: theme.colors.dark2,
  },
  link: {
    fontSize: 10,
    color: theme.colors.dark2,
    textDecoration: 'none',
  },
  divider: {
    fontSize: 10,
    color: theme.colors.dark2,
    marginHorizontal: 4,
  },
})

const Header = ({ name, contactEmail, linkedIn, github, website, role }: ResumeQuery['profiles'][0]) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{name}</Text>
      <Text style={styles.tagline}>
        {role} 
      </Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Bishkek, Kyrgyzstan (Remote)</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.infoText}>No visa sponsorship required</Text>
      </View>
      <View style={styles.infoRow}>
        <Link src={`mailto:${contactEmail}`} style={styles.link}>
          {contactEmail}
        </Link>
        <Text style={styles.divider}>|</Text>
        <Link src={`tel:+996550046336`} style={styles.link}>
          +996 (550) 04 63 36
        </Link>
      </View>
      <View style={styles.infoRow}>
        <Link src={`https://www.linkedin.com/in/${linkedIn}`} style={styles.link}>
          linkedin.com/in/{linkedIn}
        </Link>
        <Text style={styles.divider}>|</Text>
        <Link src={`https://www.github.com/${github}`} style={styles.link}>
          github.com/{github}
        </Link>
        <Text style={styles.divider}>|</Text>
        <Link src={website || ''} style={styles.link}>
          {website?.replace('https://', '').replace('http://', '')}
        </Link>
      </View>
    </View>
  )
}

export default Header
