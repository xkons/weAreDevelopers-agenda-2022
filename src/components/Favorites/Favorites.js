import React, {Fragment} from 'react';
import {
    List,
    Header
} from 'semantic-ui-react';
import ScheduleItem from '../ScheduleItem/ScheduleItem';
import PropTypes from 'prop-types';

const Favorites = (props) => {
    if (props.items.length === 0) {
        return (<p>No favorites saved.</p>)
    }

    const favorites = props.days.map(day => {
        const talksOnDay = props.items
                            .filter(talk => talk.day === day)
                            .sort((talk1, talk2) => talk1.id > talk2.id);

        if (talksOnDay.length === 0) {
            return '';
        }

        return (
            <Fragment key={day}>
                <Header as='h2'>{day}</Header>
                <List divided relaxed verticalAlign='middle' size="large">
                    {talksOnDay.map(talk => (
                        <ScheduleItem
                            key={talk.id}
                            id={talk.id}
                            speaker={talk.speaker}
                            name={talk.name}
                            starred={true}
                            time={talk.time}
                            starHandler={props.removeStarHandler}
                            location={talk.location}
                            info={talk.info} />
                    ))}
                </List>
            </Fragment>
        )
    });

    return (
        <Fragment>
            {favorites}
        </Fragment>
    )
};

Favorites.propTypes = {
    items: PropTypes.array.isRequired,
    days: PropTypes.array.isRequired,
    removeStarHandler: PropTypes.func.isRequired
};


export default Favorites
