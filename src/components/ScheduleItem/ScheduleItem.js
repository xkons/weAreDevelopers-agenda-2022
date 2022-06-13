import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Grid, Icon, List, Segment } from "semantic-ui-react";
import "./ScheduleItem.css";

class ScheduleItem extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      showTalkInfo: false,
    };
  }

  toggleTalkInfo = () =>
    this.setState((prevState) => ({ showTalkInfo: !prevState.showTalkInfo }));

  render() {
    return (
      <List.Item>
        <Grid>
          <Grid.Column width={12} stretched={true}>
            <List.Content>
              {this.props.day ? this.props.day : ""} {this.props.time}{" "}
              <List.Header>{this.props.name}</List.Header>
              {this.props.location ? (
                <List.Description>{this.props.location}</List.Description>
              ) : (
                ""
              )}
              {this.props.speaker !== "" ? <p>By {this.props.speaker}</p> : ""}
            </List.Content>
          </Grid.Column>
          <Grid.Column width={4} style={{ maxWidth: 120 }} floated="right">
            <List.Content>
              <Button
                className="scheduleItem__button"
                aria-label="Show description"
                icon
                onClick={this.toggleTalkInfo}
              >
                <Icon name="info" />
              </Button>
              <Button
                className="scheduleItem__button"
                aria-label="Add to favorites"
                icon
                onClick={() => this.props.starHandler(this.props.id)}
              >
                <Icon name={this.props.starred ? "star" : "star outline"} />
              </Button>
            </List.Content>
          </Grid.Column>
        </Grid>
        {this.state.showTalkInfo ? (
          <Segment vertical className="scheduleItem__info">
            <div dangerouslySetInnerHTML={{ __html: this.props.info }} />
          </Segment>
        ) : (
          ""
        )}
      </List.Item>
    );
  }
}

ScheduleItem.propTypes = {
  id: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  speaker: PropTypes.string.isRequired,
  starred: PropTypes.bool.isRequired,
  starHandler: PropTypes.func.isRequired,
  day: PropTypes.string,
  location: PropTypes.string,
  info: PropTypes.string.isRequired,
};

ScheduleItem.defaultProps = {
  day: null,
  location: null,
};

export default ScheduleItem;
