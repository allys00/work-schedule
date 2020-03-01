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
  const query = (month: number): WhereQuery[] => [
    { key: "date", operation: ">=", value: getRangeMonth(month).startAt },
    { key: "date", operation: "<=", value: getRangeMonth(month).endAt }
  ];
  const [month, setMonth] = useState(getMonth(new Date()));

  const { items: events, loading, onRefresh } = useCollections<IEvent>(
    Collections.events,
    query(month)
  );
  const { items: clients } = useCollections<IClient>(Collections.clients);

  useEffect(() => {
    onRefresh();
  }, [month]);

  const mapClient = (event: IEvent): IClient =>
    clients.find(client => client.id === event.client_id) || ({} as IClient);

  const markedDates = useMemo<IMarked>(() => {
    let dates: IMarked = {};
    for (const event of events) {
      const stringDate = dateView(event.date, "yyy-MM-dd");
      const client = mapClient(event);
      if (!client.id) break;
      const dot = { key: event.id, color: client.color };
      if (dates[stringDate]) {
        dates[stringDate].dots.push(dot);
      } else {
        dates[stringDate] = { dots: [dot] };
      }
    }
    return dates;
  }, [events, clients]);

  const clientsToday = useMemo<IClient[]>(() => {
    if (!events.length || !clients.length) return [];
    return events.filter(event => isToday(event.date.toDate())).map(mapClient);
  }, [events, clients]);

  const clientsThisMonth = useMemo<IClient[]>(() => {
    if (!events.length || !clients.length) return [];
    const clientsFiltered = events
      .filter(event => isThisMonth(event.date.toDate()))
      .map(mapClient);

    return [...new Set(clientsFiltered)];
  }, [events, clients]);

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
