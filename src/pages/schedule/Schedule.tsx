import React, { useMemo, useEffect, useState } from "react";
import { Calendar, MultiDotMarking, DateObject } from "react-native-calendars";
import { Content } from "native-base";
import {
  useCollections,
  WhereQuery
} from "../../collections-module/Collection.hook";
import { IEvent, Event } from "../../models/Event.model";
import Collections from "../../utils/collections.constants";
import Header from "../../components/header/Header";
import { dateView, getRangeMonth } from "../../utils/moment.functions";
import { IClient } from "../../models/Client.model";
import { isToday, isThisMonth, getMonth, toDate } from "date-fns";
import ClientList from "../clients/ClientList";
import Modal from "../../components/modal/Modal";
import { Alert } from "react-native";
import { RouterEnum } from "../../App";

interface IMarked {
  [date: string]: MultiDotMarking;
}

const Schedule = ({ navigation, route }: any) => {
  const [month, setMonth] = useState(getMonth(new Date()));

  const query = useMemo<WhereQuery[]>(() => {
    return [
      { key: "date", operation: ">=", value: getRangeMonth(month).startAt },
      { key: "date", operation: "<=", value: getRangeMonth(month).endAt }
    ];
  }, [month]);
  const { items: events, loading, onRefresh } = useCollections<IEvent>(
    Collections.events,
    query
  );
  const { items: clients } = useCollections<IClient>(Collections.clients);

  const [days, setDays] = useState<Date[]>([]);
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  useEffect(() => {
    onRefresh();
  }, [month]);

  useEffect(() => {
    if (route?.params?.scheduleDays && clients[0].id) {
      navigation.navigate(RouterEnum.Schedule, {
        scheduleDays: null
      });
      createEvents(clients[0].id, route.params.scheduleDays);
    }
  });

  const eventsWithClient = useMemo<IEvent[]>(() => {
    return events.map(event => ({
      ...event,
      fullClient:
        clients.find(client => client.id === event.client_id) || ({} as IClient)
    }));
  }, [events, clients]);

  const markedDates = useMemo<IMarked>(() => {
    let dates: IMarked = {};
    for (const event of eventsWithClient) {
      const stringDate = dateView(event.date, "yyy-MM-dd");
      const dot = { key: event.id, color: event.fullClient.color };
      if (dates[stringDate]) {
        dates[stringDate].dots.push(dot);
      } else {
        dates[stringDate] = { dots: [dot] };
      }
    }
    return dates;
  }, [eventsWithClient]);

  const clientsToday = useMemo<IClient[]>(() => {
    if (!eventsWithClient.length) return [];
    return eventsWithClient
      .filter(event => isToday(event.date.toDate()))
      .map(event => event.fullClient);
  }, [eventsWithClient]);

  const clientsThisMonth = useMemo<IClient[]>(() => {
    if (!eventsWithClient.length) return [];
    const clientsFiltered = eventsWithClient
      .filter(event => isThisMonth(event.date.toDate()))
      .map(event => event.fullClient);

    return [...new Set(clientsFiltered)];
  }, [eventsWithClient]);

  const createEvents = async (client_id: string, days: Date[]) => {
    setCreateLoading(true);
    try {
      for (const day of days) {
        await Event.add({ client_id, date: day });
      }
      setDays([]);
    } catch (error) {
    } finally {
      setCreateLoading(false);
    }
  };

  const onDayPress = ({ timestamp }: DateObject) => {
    if (clients.length) {
      setDays([toDate(timestamp)]);
    } else {
      Alert.alert(
        "Você não possui clientes",
        "Deseja cadastrar seu primeiro cliente?",
        [
          { text: "Depois", style: "cancel" },
          {
            text: "Cadastrar cliente",
            onPress: () =>
              navigation.navigate(RouterEnum.Clients, { days: [toDate(timestamp)] })
          }
        ]
      );
    }
  };

  return (
    <>
      <Header hasTabs title="Agenda" />
      <Content style={{ backgroundColor: "#fff" }}>
        <Calendar
          hideExtraDays={true}
          onDayPress={onDayPress}
          onMonthChange={({ month }) => setMonth(month - 1)}
          markedDates={markedDates}
          markingType={"multi-dot"}
        />
        <ClientList
          loading={loading}
          clients={clientsToday}
          title="Eventos Hoje"
        />
        <ClientList
          loading={loading}
          clients={clientsThisMonth}
          title="Clientes este mês"
        />
        <Modal onClose={() => setDays([])} isVisible={Boolean(days.length)}>
          <ClientList
            clients={clients}
            title="Escolha o Cliente"
            onPress={client => createEvents(client.id, days)}
            loading={createLoading}
          />
        </Modal>
      </Content>
    </>
  );
};

export default Schedule;
