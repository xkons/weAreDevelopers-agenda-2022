import localForage from "localforage";
import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import scheduleItems from "../../Resources/weAreDevelopersSchedule.json";
import Favorites from "../Favorites/Favorites";
import HeaderWithSearch from "../HeaderWithSearch/HeaderWithSearch";
import Navigation from "../Navigation/Navigation";
import ScheduleList from "../ScheduleList/ScheduleList";
import "./Schedule.css";

const days = ["Tuesday", "Wednesday"];

class Schedule extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    let firstActiveDay = days[0];
    const currentDate = new Date();
    days.forEach((day) => {
      // check what day it is and set that as the first active day for a better user experience
      if (currentDate.toString().startsWith(day.slice(0, 2))) {
        firstActiveDay = day;
      }
    });
    const firstActiveLocation = this.getLocationsForDay(firstActiveDay)[0];

    this.state = {
      day: firstActiveDay,
      location: firstActiveLocation,
      favoritesViewIsActive: false,
      starredTalks: [],
      showSearch: false,
    };
  }

  componentDidMount = () => {
    localForage.getItem("weAreDevelopersStarredTalks", (err, offlineStars) => {
      if (err === null && offlineStars !== null) {
        if (!this.favoritesAreEqual(offlineStars, this.state.starredTalks)) {
          this.setState({ starredTalks: offlineStars });
        }
      }
    });
  };

  setDay = (day) => {
    const locationsForNewDay = this.getLocationsForDay(day);
    return this.setState((prevState) => {
      let newLocation = locationsForNewDay[0];
      if (locationsForNewDay.includes(prevState.location)) {
        newLocation = prevState.location;
      }
      return { day: day, location: newLocation, favoritesViewIsActive: false };
    });
  };

  getLocationsForDay = (day) => {
    let locations = [];
    scheduleItems.forEach((talk) => {
      if (!locations.includes(talk.location) && talk.day === day) {
        locations.push(talk.location);
      }
    });
    return locations;
  };

  setLocation = (location) => {
    console.log("setLocation", location);
    this.setState({ location: location, favoritesViewIsActive: false });
  };

  getScheduleItems = (day, location) =>
    scheduleItems.filter(
      (talk) => talk.day === day && talk.location === location
    );

  getScheduleFilteredByTalks = (talkIds) =>
    scheduleItems.filter((talk) => talkIds.includes(talk.id));

  addStar = (talkId) =>
    this.setState((prevState) => {
      const newStars = [...prevState.starredTalks, talkId];
      localForage.setItem("weAreDevelopersStarredTalks", newStars);
      return { starredTalks: newStars };
    });

  removeStar = (talkId) =>
    this.setState((prevState) => {
      const newStars = prevState.starredTalks.filter(
        (starredTalkId) => starredTalkId !== talkId
      );
      localForage.setItem("weAreDevelopersStarredTalks", newStars);
      return { starredTalks: newStars };
    });

  starTalkHandler = (talkId) => {
    this.state.starredTalks.includes(talkId)
      ? this.removeStar(talkId)
      : this.addStar(talkId);
  };

  toggleSearch = () =>
    this.setState((prevState) => ({ showSearch: !prevState.showSearch }));

  showFavorites = () => this.setState({ favoritesViewIsActive: true });

  favoritesAreEqual = (offline, online) =>
    offline.length === online.length &&
    online.every((element) => offline.includes(element));

  render() {
    return (
      <div className="App">
        <HeaderWithSearch
          scheduleItems={scheduleItems}
          starTalkHandler={this.starTalkHandler}
          starredTalks={this.state.starredTalks}
          toggleSearch={this.toggleSearch}
          showSearch={this.state.showSearch}
        />
        <main>
          <Navigation
            days={days}
            locations={this.getLocationsForDay(this.state.day)}
            activeDay={this.state.day}
            activeLocation={this.state.location}
            changeDayHandler={this.setDay}
            changeLocationHandler={this.setLocation}
            favoritesViewIsActive={this.state.favoritesViewIsActive}
            showFavorites={this.showFavorites}
          />
          <Segment>
            {this.state.favoritesViewIsActive ? (
              <Favorites
                removeStarHandler={this.removeStar}
                days={days}
                items={this.getScheduleFilteredByTalks(this.state.starredTalks)}
              />
            ) : (
              <ScheduleList
                starredTalks={this.state.starredTalks}
                starTalkHandler={this.starTalkHandler}
                items={this.getScheduleItems(
                  this.state.day,
                  this.state.location
                )}
              />
            )}
          </Segment>
        </main>
      </div>
    );
  }
}

export default Schedule;
