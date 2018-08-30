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

    const thursdayFavorites = props.items.filter(item => item.day === "Thursday"); // no sorting required since there is only one keynote
    const fridayFavorites = props.items
                                .filter(item => item.day === "Friday")
                                .sort((item1, item2) => item1.id > item2.id);
    const saturdayFavorites = props.items
                                .filter(item => item.day === "Saturday")
                                .sort((item1, item2) => item1.id > item2.id);
    const sundayFavorites = props.items
                                .filter(item => item.day === "Sunday")
                                .sort((item1, item2) => item1.id > item2.id);

    return (
        <Fragment>
            {thursdayFavorites.length ?
                <Fragment>
                    <Header as='h2'>Thursday</Header>
                    <List divided relaxed verticalAlign='middle' size="large">
                        {thursdayFavorites.map(talk => (
                            <ScheduleItem
                                key={talk.id}
                                id={talk.id}
                                speaker={talk.speaker}
                                name={talk.name}
                                starred={true}
                                time={talk.time}
                                starHandler={props.removeStarHandler}
                                location={talk.location}
                                info={talk.info} />)
                        )
                        }
                    </List>
                </Fragment>
                : '' }
            {fridayFavorites.length ?
                <Fragment>
                    <Header as='h2'>Friday</Header>
                    <List divided relaxed verticalAlign='middle' size="large">
                        {fridayFavorites.map(talk => (
                            <ScheduleItem
                                key={talk.id}
                                id={talk.id}
                                speaker={talk.speaker}
                                name={talk.name}
                                starred={true}
                                time={talk.time}
                                starHandler={props.removeStarHandler}
                                location={talk.location}
                                info={talk.info} />)
                            )
                        }
                    </List>
                </Fragment>
            : '' }
            {saturdayFavorites.length ?
                <Fragment>
                    <Header as='h2'>Saturday</Header>
                    <List divided relaxed verticalAlign='middle' size="large">
                        {saturdayFavorites.map(talk => (
                            <ScheduleItem
                                key={talk.id}
                                id={talk.id}
                                speaker={talk.speaker}
                                name={talk.name}
                                starred={true}
                                time={talk.time}
                                starHandler={props.removeStarHandler}
                                location={talk.location}
                                info={talk.info} />)
                            )
                        }
                    </List>
                </Fragment>
            : '' }
            {sundayFavorites.length ?
                <Fragment>
                    <Header as='h2'>Sunday</Header>
                    <List divided relaxed verticalAlign='middle' size="large">
                        {sundayFavorites.map(talk => (
                            <ScheduleItem
                                key={talk.id}
                                id={talk.id}
                                speaker={talk.speaker}
                                name={talk.name}
                                starred={true}
                                time={talk.time}
                                starHandler={props.removeStarHandler}
                                location={talk.location}
                                info={talk.info} />)
                        )
                        }
                    </List>
                </Fragment>
                : '' }
        </Fragment>
    )
};

Favorites.propTypes = {
    items: PropTypes.array.isRequired,
    removeStarHandler: PropTypes.func.isRequired
};


export default Favorites

/**
 * Notes for Refactoring:
 * const getFavoriteItemsOnDay = (day, items) => {
        const filteredItems = items.filter(item => item.day === "Friday").sort((item1, item2) => item1.id > item2.id);

        let listElements = [];
        filteredItems.forEach((talk) => {
            listElements.push(<ScheduleItem
                key={talk.id}
                id={talk.id}
                speaker={talk.speaker}
                name={talk.name}
                starred={true}
                time={talk.time}
                starHandler={props.removeStarHandler}
                location={talk.location}
                info={talk.info} />)
        });

        return listElements;
    };

 const favorites = props.days.map(day => {
        let dayFavoritesJsx = [];
        dayFavoritesJsx.push(<Header as='h2'>{day}</Header>);
        dayFavoritesJsx.push(<List divided relaxed verticalAlign='middle' size="large">{getFavoriteItemsOnDay(day, props.items)}</List>);
        return dayFavoritesJsx
    });
 */
