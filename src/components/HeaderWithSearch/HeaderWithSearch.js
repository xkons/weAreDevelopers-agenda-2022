import PropTypes from "prop-types";
import React from "react";
import { Button, Divider, Header } from "semantic-ui-react";
import TalkSearch from "../TalkSearch/TalkSearch";

const HeaderWithSearch = (props) => (
  <header>
    <Header className="heading" as="h1">
      WeAreDevelopers
    </Header>
    <Button
      onClick={props.toggleSearch}
      className="panama-button search-btn"
      aria-label="Search the agenda"
      icon={props.showSearch ? "close" : "search"}
    />
    {props.showSearch ? (
      <TalkSearch
        source={props.scheduleItems}
        starHandler={props.starTalkHandler}
        starredTalks={props.starredTalks}
      />
    ) : (
      ""
    )}
    <Divider />
  </header>
);

HeaderWithSearch.propTypes = {
  scheduleItems: PropTypes.array.isRequired,
  starTalkHandler: PropTypes.func.isRequired,
  starredTalks: PropTypes.array.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
};

export default HeaderWithSearch;
