import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ScheduleItem from '../ScheduleItem/ScheduleItem';

const ScheduleList = (props) => (
    <List divided relaxed verticalAlign='middle' size="large">
        {props.items.map(talk => (
            <ScheduleItem
            key={talk.id}
            id={talk.id}
            speaker={talk.speaker}
            starred={props.starredTalks.includes(talk.id)}
            info={talk.info}
            name={talk.name}
            time={talk.time}
            starHandler={props.starTalkHandler} />)
        )}
    </List>
);

ScheduleList.propTypes = {
    items: PropTypes.array.isRequired,
    starTalkHandler: PropTypes.func.isRequired,
    starredTalks: PropTypes.array.isRequired
};

export default ScheduleList
