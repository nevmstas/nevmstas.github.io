import { Text, View, StyleSheet } from "@react-pdf/renderer";
import theme from "../../../theme";
import type { Style } from "@react-pdf/types";

const styles = StyleSheet.create({
  resumeItem: {
    marginBottom: 10,
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    flexShrink: 1,
  },
  dates: {
    color: theme.colors.dark2,
    fontSize: 10,
    textAlign: "right",
    flexShrink: 0,
  },
  subtitle: {
    color: theme.colors.dark2,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginTop: 2,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 10,
    textAlign: "justify",
    marginTop: 2,
  },
});

interface Props {
  dates?: string;
  title: string;
  subtitle?: string | URL;
  description?: string[];
  style?: Style | Style[];
}

const ResumeItem = ({
  dates,
  title,
  subtitle,
  description,
  style = {},
}: Props) => {
  return (
    <View style={{ ...styles.resumeItem, ...style }}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.subtitleContainer}>
        {typeof subtitle === "string" && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
        {dates && <Text style={styles.dates}>{dates}</Text>}
      </View>

      {description && (
        <View style={styles.description}>
          {description.map((item, index) => (
            <Text key={index}>{'\u2022'} {item}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default ResumeItem;
