import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Button, Divider } from "semantic-ui-react";
import "./Navigation.css";

const Navigation = (props) => {
  const handleLocationSelect = (event) => {
    props.changeLocationHandler(event.target.value);
  };
  const sortedLocations = props.locations.sort();
  return (
    <Fragment>
      <Button.Group widths="2" vertical>
        {props.days.map((day) => (
          <Button
            key={day}
            onClick={() => props.changeDayHandler(day)}
            active={props.activeDay === day && !props.favoritesViewIsActive}
            className="panama-button"
          >
            {day}
          </Button>
        ))}
        <Button
          active={props.favoritesViewIsActive}
          onClick={props.showFavorites}
          className="panama-button"
        >
          Favorites
        </Button>
      </Button.Group>
      <Divider hidden />
      {!props.favoritesViewIsActive ? (
        <div className="stageSelectContainer">
          <label className="stageSelectLabel" htmlFor="stageSelect">
            Select a stage:
          </label>
          <select
            value={props.activeLocation}
            onChange={handleLocationSelect}
            id="stageSelect"
          >
            {sortedLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

Navigation.propTypes = {
  days: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  activeDay: PropTypes.string.isRequired,
  activeLocation: PropTypes.string.isRequired,
  favoritesViewIsActive: PropTypes.bool.isRequired,
  changeDayHandler: PropTypes.func.isRequired,
  changeLocationHandler: PropTypes.func.isRequired,
  showFavorites: PropTypes.func.isRequired,
};

export default Navigation;

/**
 * <Dropdown
    text={props.activeLocation}
    value={props.activeLocation}
    onChange={handleLocationSelect}
    aria-describedby="stageLabel"
    className="stageSelect"
    >
    <Dropdown.Menu>
        {props.locations.map((location) => (
        <Dropdown.Item key={location} text={location} />
        ))}
    </Dropdown.Menu>
    </Dropdown>
 */
