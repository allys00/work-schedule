import React, { useMemo } from "react";
import { View, Text } from "native-base";
import { PieChart, ChartConfig, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Collections from "../../utils/collections.constants";
import { useCollections } from "../../collections-module/Collection.hook";
import { IEvent } from "../../models/Event.model";
import { IClient } from "../../models/Client.model";

const Reports = () => {
  const { items: events, loading: loadingEvents, onRefresh } = useCollections<
    IEvent
  >(Collections.events);
  const { items: clients, loading: loadingClients } = useCollections<IClient>(
    Collections.clients
  );

  const width = Dimensions.get("window").width;
  const height = 220;

  const eventsWithClient = useMemo<IEvent[]>(() => {
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

  const barChartData = useMemo(() => {
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

  return (
    <View>
      <PieChart
        data={pieChartData}
        height={height}
        width={width}
        chartConfig={chartConfig}
        accessor="value"
        style={{
          borderRadius: 16
        }}
      />
      <BarChart
        yAxisLabel="R$"
        width={width}
        height={height}
        data={data}
        chartConfig={chartConfig}
        style={{}}
        fromZero={true}
      />
    </View>
  );
};

export default Reports;

const chartConfig: ChartConfig = {
  backgroundColor: "#b90602",
  backgroundGradientFrom: "#e53935",
  backgroundGradientTo: "#ef5350",
  labelColor: () => "#ffffff",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
};

const data = {
  labels: ["Oi", "Tchau"],
  datasets: [
    {
      data: [10, 20],
      color: (opacity = .5) => `rgba(0, 0, 0, ${opacity})`
    },
  ]
};
