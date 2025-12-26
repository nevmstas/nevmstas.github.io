import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import theme from "../../../theme";
import type { Style } from "@react-pdf/types";

const styles = StyleSheet.create({
  publicationItem: {},
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  link: {
    fontFamily: "Helvetica-Bold",
    color: theme.colors.dark2,
    fontSize: 10,
    textDecoration: "none",
    marginTop: 2,
  },
  description: {
    fontSize: 10,
    textAlign: "justify",
    marginTop: 2,
  },
});

interface Props {
  title: string;
  link?: string | null;
  description?: string | null;
  style?: Style | Style[];
}

const PublicationItem = ({
  title,
  link,
  description,
  style = {},
}: Props) => {
  return (
    <View style={{ ...styles.publicationItem, ...style }}>
      <Text style={styles.title}>{title}</Text>

      {link && (
        <Link src={link} style={styles.link}>
          {link}
        </Link>
      )}

      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
};

export default PublicationItem;

