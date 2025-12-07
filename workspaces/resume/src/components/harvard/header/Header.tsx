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
    fontSize: 12,
  },
  contactsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  contact: {
    marginHorizontal: 8,
    fontSize: 10,
    color: theme.colors.dark2,
    textDecoration: 'none',
  },
  divider: {
    fontSize: 10,
    color: theme.colors.dark2,
  },
})

const Header = ({ name, contactEmail, linkedIn, github, website }: ResumeQuery['profiles'][0]) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{name}</Text>
      <View style={styles.contactsContainer}>
        <Text style={styles.contact}>{contactEmail}</Text>
        <Text style={styles.divider}>•</Text>
        <Link
          src={`https://www.linkedin.com/${linkedIn}`}
          style={styles.contact}
        >
          {linkedIn}
        </Link>
        <Text style={styles.divider}>•</Text>
        <Link
          src={`https://www.github.com/${github}`}
          style={styles.contact}
        >
          {`github.com/${github}`}
        </Link>
        <Text style={styles.divider}>•</Text>
        <Link
          src={`${website}`}
          style={styles.contact}
        >
          website
        </Link>
        <Text style={styles.divider}>•</Text>
        <Link src={`tel:+996550046336`} style={styles.contact}>
          {`+996 (550) 04 63 36`}
        </Link>
      </View>
    </View>
  )
}

export default Header
