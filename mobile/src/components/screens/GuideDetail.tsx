import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  PRIMARY_BACKGROUND_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  SECONDARY_FONT_COLOR,
} from "../../../constants/app-colors";
import { api } from "../../services/api";
import TextDate from "../layout/TextDate";
import Button from "../layout/Button";
import Details from "../layout/Details";

const { height } = Dimensions.get("window");

type GuideIdentifier = {
  id?: string;
  title?: string;
  description?: string;
  created_at?: string;
  guide_details?: Array<GuideDetails>;
};

export type GuideDetails = {
  id?: string;
  format?: string;
  content?: string;
};

export default function GuideDetail({ route, navigation }) {
  const id = route.params;

  const [data, setData] = React.useState<GuideIdentifier>({});
  const getData = async () => {
    const result = await api.get(`/guide/${id}`);
    if (result.data != data) {
      setData(result.data);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {data.title === undefined ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={SECONDARY_BACKGROUND_COLOR}
          size={"large"}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.description}>{data.description}</Text>
            <TextDate createdAt={data.created_at} style={styles.date} />
            {data.guide_details ? (
              <Details details={data.guide_details} />
            ) : null}
            <Button style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Voltar</Text>
            </Button>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
  },
  date: {
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 6,
    textAlign: "justify",
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    color: SECONDARY_FONT_COLOR,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  activityIndicator: {
    flex: 1,
    height,
    justifyContent: "center",
  },
});
