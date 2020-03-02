import React, { useMemo, useEffect, useState } from "react";
import { Calendar, MultiDotMarking } from "react-native-calendars";
import { Content, Spinner } from "native-base";
import {
  useCollections,
  WhereQuery
} from "../../collections-module/Collection.hook";
import { IEvent } from "../../models/Event.model";
import Collections from "../../utils/collections.constants";
import Header from "../../components/header/Header";
import { dateView, getRangeMonth } from "../../utils/moment.functions";
import { IClient } from "../../models/Client.model";
import { isToday, isThisMonth, getMonth } from "date-fns";
import ScheduleList from "./schedule-list/ScheduleList";

interface IMarked {
  [date: string]: MultiDotMarking;
}

const Schedule = () => {
  const [month, setMonth] = useState(getMonth(new Date()));

  const query = useMemo<WhereQuery[]>(() => {
    return [
      { key: "date", operation: ">=", value: getRangeMonth(month).startAt },
      { key: "date", operation: "<=", value: getRangeMonth(month).endAt }
    ];
  }, [month]);
  console.log(query)
  const { items: events, loading, onRefresh } = useCollections<IEvent>(
    Collections.events,
    query
  );
  const { items: clients } = useCollections<IClient>(Collections.clients);

  useEffect(() => {
    onRefresh();
  }, [month]);

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

  console.log(events);

  return (
    <>
      <Header hasTabs title="Agenda" />
      <Content>
        <Calendar
          hideExtraDays={true}
          onMonthChange={({ month }) => setMonth(month - 1)}
          markedDates={markedDates}
          markingType={"multi-dot"}
        />
        {loading ? (
          <Spinner color="#888" style={{ marginTop: 100 }} />
        ) : (
          <>
            <ScheduleList clients={clientsToday} title="Eventos Hoje" />
            <ScheduleList
              clients={clientsThisMonth}
              title="Clientes este mês"
            />
          </>
        )}
      </Content>
    </>
  );
};

export default Schedule;
