import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import theme from "../../../theme";
import type { Style } from "@react-pdf/types";

const styles = StyleSheet.create({
  projectItem: {
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    flexShrink: 1,
  },
  linksContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  linkWrapper: {
    flexDirection: "row",
    marginRight: 12,
  },
  linkLabel: {
    color: theme.colors.dark2,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  link: {
    fontFamily: "Helvetica-Bold",
    color: theme.colors.dark2,
    fontSize: 10,
    textDecoration: 'none',
  },
  divider: {
    color: theme.colors.dark2,
    fontSize: 10,
    marginHorizontal: 2
  },
  description: {
    fontSize: 10,
    textAlign: "justify",
    marginTop: 2,
  },
});

interface Props {
  title: string;
  website?: string | null;
  githubLink?: string | null;
  description?: string | null;
  style?: Style | Style[];
}

const ProjectItem = ({
  title,
  website,
  githubLink,
  description,
  style = {},
}: Props) => {
  const hasLinks = website || githubLink;

  return (
    <View style={{ ...styles.projectItem, ...style }}>
      <Text style={styles.title}>{title}</Text>

      {hasLinks && (
        <View style={styles.linksContainer}>
          {website && (
            <Link
            src={`${website}`}
            style={styles.link}
          >
            website
          </Link>
          )}
          <Text style={styles.divider}>•</Text>
          {githubLink && (
              <Link
              src={`${githubLink}`}
              style={styles.link}
            >
              github
            </Link>
          )}
        </View>
      )}

      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
};

export default ProjectItem;

