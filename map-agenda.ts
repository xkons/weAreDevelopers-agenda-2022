import { resolve } from "path";

interface WeAreDevelopersAgendaItem {
  title: string;
  agenda_id: string;
  agendaInfo: {
    id: number;
    name: string;
    /**
     * ISO string
     */
    agenda_date: string;
    /**
     * Format: HH:mm:ss
     */
    start_time: string;
    /**
     * Format: HH:mm:ss
     */
    end_time: string;
    /**
     * Contains HTML
     */
    description: string;
    /**
     * Comma separated string. E.g.: Security,.NET,Web & Mobile
     */
    tags: string;
    /**
     * Location
     */
    track_name: string;
    /**
     * 1 or 0.
     */
    is_stream: number;
    stream_link: string;
  };
  speakers: {
    id: number;
    name: string;
    short_description: string;
  }[];
  exhibitors: {
    id: number;
    name: string;
  }[];
}

interface AgendaItem {
  id: number;
  day: string;
  /**
   * Format: 5:00 pm - 6:00 pm
   */
  time: string;
  location: string;
  name: string;
  speaker: string;
  info: string;
}

const tuesdayAgenda: WeAreDevelopersAgendaItem[] = require(resolve(
  process.cwd(),
  `./agenda-tuesday.json`
));
const wednesdayAgenda: WeAreDevelopersAgendaItem[] = require(resolve(
  process.cwd(),
  `./agenda-wednesday.json`
));

const mapWeAreDevelopersAgendaItemFactory = (
  day: "Tuesday" | "Wednesday"
): ((weAreDevsItem: WeAreDevelopersAgendaItem) => AgendaItem) => {
  return (weAreDevsItem: WeAreDevelopersAgendaItem) => {
    const getTimeString = () => {
      const { start_time, end_time } = weAreDevsItem.agendaInfo;
      const startTimeHours = start_time.substring(0, 2);
      const startTimeMinutes = start_time.substring(3, 5);
      const startTimeHoursTimezoneAware = (
        parseInt(startTimeHours, 10) + 2
      ).toString();
      const endTimeHours = end_time.substring(0, 2);
      const endTimeMinutes = end_time.substring(3, 5);
      const endTimeHoursTimezoneAware = (
        parseInt(endTimeHours, 10) + 2
      ).toString();
      return `${startTimeHoursTimezoneAware}:${startTimeMinutes} - ${endTimeHoursTimezoneAware}:${endTimeMinutes}`;
    };

    const speaker = weAreDevsItem.speakers.reduce(
      (speakerString, speaker, index) => {
        if (index !== 0) {
          speakerString += ", ";
        }
        speakerString += speaker.name;
        return speakerString;
      },
      ""
    );
    return {
      id: weAreDevsItem.agendaInfo.id,
      day,
      time: getTimeString(),
      location: weAreDevsItem.agendaInfo.track_name,
      name: weAreDevsItem.agendaInfo.name,
      speaker,
      info: weAreDevsItem.agendaInfo.description,
    };
  };
};

const tuesdayMapper = mapWeAreDevelopersAgendaItemFactory("Tuesday");
const wednesdayMapper = mapWeAreDevelopersAgendaItemFactory("Wednesday");
const mappedAgendaItems: AgendaItem[] = tuesdayAgenda
  .map(tuesdayMapper)
  .concat(wednesdayAgenda.map(wednesdayMapper))
  .filter((agendaItem) => !!agendaItem.location);

const fs = require("fs");

fs.writeFile(
  "./src/Resources/weAreDevelopersSchedule.json",
  JSON.stringify(mappedAgendaItems),
  (err: any) => {
    if (err) {
      console.error("Failed to write file", err);
    }
    console.log("Wrote to src/Resources/weAreDevelopersSchedule.json");
  }
);
