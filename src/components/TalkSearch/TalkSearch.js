import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { List, Search } from "semantic-ui-react";
import ScheduleItem from "../ScheduleItem/ScheduleItem";

// the title parameter is required by the Semantic UI Search component
const resultPreviewsRenderer = ({
  day,
  id,
  time,
  location,
  name,
  title,
  speaker,
}) => (
  <p key={id}>
    {day} {time}
    <br />
    <b>{name}</b>
    <br />
    {location}
    <br />
    By {speaker}
  </p>
);

resultPreviewsRenderer.propTypes = {
  day: PropTypes.string,
  speaker: PropTypes.string,
  stage: PropTypes.string,
  url: PropTypes.string,
  time: PropTypes.string,
};

class TalkSearch extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.searchIndex = this._intiliazeSearchIndex(props.source);
  }

  searchIndex = [];

  componentWillMount() {
    this._resetComponent();
  }

  _resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  /**
   * Adds a title attribute to each item in the index since it is required
   * for the Semantic UI search component to work properly.
   *
   * @param {array} documents
   */
  _intiliazeSearchIndex = (documents) => {
    documents.forEach((talk, position) => {
      talk["title"] = talk.name;
      documents[position] = talk;
    });
    console.log(documents);
    return documents;
  };

  /**
   * Is called when the user selects an Item from the previewed results.
   */
  _handleResultSelect = (e, { result }) =>
    this.setState({ value: result.name });

  /**
   * Is called when the search input changes.
   */
  _handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this._resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.name + result.speaker);

      this.setState({
        isLoading: false,
        results: _.filter(this.searchIndex, isMatch),
      });
    }, 300);
  };

  getTalksForMatchingName = (query) => {
    return this.searchIndex.filter((talk) => talk.name.startsWith(query));
  };

  render() {
    const { isLoading, value, results } = this.state;
    const searchInputProps = { fluid: true };

    return (
      <Fragment>
        <Search
          loading={isLoading}
          onResultSelect={this._handleResultSelect}
          onSearchChange={_.debounce(this._handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value}
          selectFirstResult={true}
          input={searchInputProps}
          placeholder="Search by name or speaker"
          noResultsMessage="No results"
          resultRenderer={resultPreviewsRenderer}
        />
        {value === "" ? (
          ""
        ) : (
          <List relaxed verticalAlign="middle" size="large">
            {this.getTalksForMatchingName(value).map((talk) => (
              <ScheduleItem
                key={talk.id}
                id={talk.id}
                speaker={talk.speaker}
                name={talk.name}
                location={talk.location}
                starred={this.props.starredTalks.includes(talk.id)}
                time={talk.time}
                starHandler={this.props.starHandler}
                stage={talk.location}
                day={talk.day}
                info={talk.info}
              />
            ))}
          </List>
        )}
      </Fragment>
    );
  }
}

TalkSearch.propTypes = {
  source: PropTypes.array.isRequired,
  starHandler: PropTypes.func.isRequired,
  starredTalks: PropTypes.array.isRequired,
};

export default TalkSearch;
