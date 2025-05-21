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

const Header = ({ name, contactEmail, linkedIn, github }: ResumeQuery['profiles'][0]) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{name}</Text>
      <View style={styles.contactsContainer}>
        <Text style={styles.contact}>{contactEmail}</Text>
        <Text style={styles.divider}>•</Text>
        <Link
          src={linkedIn || "https://www.linkedin.com/in/nevmstas"}
          style={styles.contact}
        >
          in/nevmstas
        </Link>
        <Text style={styles.divider}>•</Text>
        <Link
          src={github || "https://www.github.com/nevmstas"}
          style={styles.contact}
        >
          nevmstas
        </Link>
        <Text style={styles.divider}>•</Text>
        <Link src={`tel:+996550046336`} style={styles.contact}>
          +996550046336
        </Link>
      </View>
    </View>
  )
}

export default Header
