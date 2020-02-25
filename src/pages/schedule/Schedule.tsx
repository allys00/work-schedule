import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Content } from "native-base";
import { useCollections } from "../../hooks/Collections.hook";
import { IEvent } from "../../models/Event.interface";
import Collections from "../../utils/collections.constants";

const Schedule = () => {
  const { items: events, loading } = useCollections<IEvent[]>(
    Collections.events
  );
  
  const [day, setDay] = useState();

  function onDayPress(day: any) {
    setDay(day.dateString);
  }

  return (
    <Content>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          "2020-02-16": {
            selected: true,
            marked: true,
            selectedColor: "blue"
          },
          "2020-02-17": { marked: true },
          "2020-02-18": { marked: true, dotColor: "red", activeOpacity: 0 },
          "2020-02-19": { disabled: true, disableTouchEvent: true }
        }}
      />
    </Content>
  );
};

export default Schedule;
