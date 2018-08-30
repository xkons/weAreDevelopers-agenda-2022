import React, {Component} from 'react';
import { Button, Icon, List, Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './ScheduleItem.css';

class ScheduleItem extends Component {
    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            showTalkInfo: false
        };
    }

    toggleTalkInfo = () => this.setState(prevState => ({showTalkInfo: !prevState.showTalkInfo}));

    render() {
        return (
            <List.Item>
                <Grid>
                    <Grid.Column width={12} stretched={true}>
                        <List.Content>
                            {this.props.day ? this.props.day : ''}{" "}
                            {this.props.time}{" "}
                            <List.Header>
                                {this.props.name}
                            </List.Header>
                            {this.props.location ? <List.Description>{this.props.location}</List.Description> : ''}
                            {this.state.showTalkInfo ?
                                <List.Description className="scheduleItem__info">
                                    <Divider hidden />
                                    {this.props.speaker !== '' ? <p>By <span style={{fontWeight: 'bold'}}>{this.props.speaker}</span></p> : ''}
                                    {this.props.info}
                                </List.Description> :''}
                        </List.Content>
                    </Grid.Column>
                    <Grid.Column width={4} style={{maxWidth: 120}} floated="right">
                        <List.Content>
                            <Button className="scheduleItem__button" icon onClick={this.toggleTalkInfo}>
                                <Icon name="info"/>
                            </Button>
                            <Button className="scheduleItem__button" icon onClick={() => this.props.starHandler(this.props.id)}>
                                <Icon name={this.props.starred ? "star" : "star outline"}/>
                            </Button>
                        </List.Content>
                    </Grid.Column>
                </Grid>
            </List.Item>
        )
    }
};

ScheduleItem.propTypes = {
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    speaker: PropTypes.string.isRequired,
    starred: PropTypes.bool.isRequired,
    starHandler: PropTypes.func.isRequired,
    day: PropTypes.string,
    location: PropTypes.string,
    info: PropTypes.string.isRequired
};

ScheduleItem.defaultProps = {
    day: null,
    location: null
};

export default ScheduleItem

/**<List.Content>
 <List.Header>
 {props.name}
 </List.Header>
 {props.location ? <List.Description>{props.location}</List.Description> : ''}
 </List.Content>
 <List.Content floated='right'>
 <Button icon onClick={() => console.log("info zeigen")}>
 <Icon name="info" />
 </Button>
 <Button icon onClick={() => props.starHandler(props.id)}>
 <Icon name={props.starred ? "star" : "star outline"} />
 </Button>
 </List.Content>*/
