import React, { useMemo, useState } from "react";
import { View, Text, DatePicker, Content } from "native-base";
import { PieChart, ChartConfig } from "react-native-chart-kit";
import { Dimensions, StyleSheet } from "react-native";
import Collections from "../../utils/collections.constants";
import {
  useCollections,
  WhereQuery
} from "../../collections-module/Collection.hook";
import { IEvent } from "../../models/Event.model";
import { IClient } from "../../models/Client.model";
import Header from "../../components/header/Header";
import { getRangeMonth, dateView, IRangeDate } from "../../utils/moment.functions";
const width = Dimensions.get("window").width;
const height = 220;

const Reports = () => {
  const [period, setPeriod] = useState<IRangeDate>(
    getRangeMonth(new Date().getMonth(), true)
  );

  const query = useMemo<WhereQuery[]>(() => {
    return [
      { key: "date", operation: ">=", value: period.startAt },
      { key: "date", operation: "<=", value: period.endAt }
    ];
  }, [period]);

  const { items: events, loading: loadingEvents, onRefresh } = useCollections<
    IEvent
  >(Collections.events, query);

  const { items: clients, loading: loadingClients } = useCollections<IClient>(
    Collections.clients
  );

  const eventsWithClient = useMemo<IEvent[]>(() => {
    console.log("NEW EVENTS", events)
    return events.map(event => ({
      ...event,
      fullClient:
        clients.find(client => client.id === event.client_id) || ({} as IClient)
    }));
  }, [events, clients, loadingClients, loadingEvents]);

  const pieChartData = useMemo(() => {
    let data: any[] = [];
    for (let event of eventsWithClient) {
      if (!event.fullClient.value) break;
      const index = data.findIndex(e => e.id === event.fullClient.id);
      if (index >= 0) {
        data[index].value += event.fullClient.value;
      } else {
        data.push({
          id: event.fullClient.id,
          name: event.fullClient.sigla,
          value: event.fullClient.value,
          color: event.fullClient.color,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        });
      }
    }

    return data;
  }, [eventsWithClient]);

  const onDateChange = (newPeriod: IRangeDate) => {
    setPeriod(newPeriod);
    onRefresh();
  };

  return (
    <>
      <Header hasTabs title="Relatórios" />
      <Content style={styles.content}>
        <Text style={styles.textCenter}>Selecione o periodo</Text>
        <View style={styles.dates}>
          <View style={styles.dateContent}>
            <Text>De: </Text>
            <DatePicker
              defaultDate={new Date()}
              locale={"pt-br"}
              animationType={"fade"}
              placeHolderText={dateView(period.startAt)}
              placeHolderTextStyle={{ color: "#333" }}
              onDateChange={date =>
                onDateChange({ startAt: new Date(date), ...period })
              }
            />
          </View>
          <View style={styles.dateContent}>
            <Text>Até: </Text>
            <DatePicker
              defaultDate={new Date()}
              locale={"pt-br"}
              animationType={"fade"}
              placeHolderText={dateView(period.endAt)}
              placeHolderTextStyle={{ color: "#333" }}
              onDateChange={date => onDateChange({ startAt: new Date(date), ...period })}
            />
          </View>
        </View>

        <PieChart
          data={pieChartData}
          height={height}
          width={width}
          chartConfig={chartConfig}
          accessor="value"
        />
      </Content>
    </>
  );
};

export default Reports;

const styles = StyleSheet.create({
  content: {
    padding: 10
  },
  dates: {
    display: "flex",
    flexDirection: "row"
  },
  dateContent: {
    width: width / 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  textCenter: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  }
});

const chartConfig: ChartConfig = {
  backgroundColor: "#b90602",
  backgroundGradientFrom: "#e53935",
  backgroundGradientTo: "#ef5350",
  labelColor: () => "#ffffff",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
};
