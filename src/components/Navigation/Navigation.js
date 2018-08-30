import React, { Fragment } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Navigation = (props) => (
    <Fragment>
        <Button.Group widths='2' vertical>
            {props.days.map(day =>
            <Button 
                key={day} 
                onClick={() => props.changeDayHandler(day)}
                active={props.activeDay === day && !props.favoritesViewIsActive}
                className="panama-button">
                {day}
            </Button>)}
            <Button 
                active={props.favoritesViewIsActive} 
                onClick={props.showFavorites} 
                className="panama-button">
                Favorites
            </Button>
        </Button.Group>
        <Divider hidden />
        {!props.favoritesViewIsActive ?
        <Button.Group widths='2' className="stageButtons">
            {props.locations.map(location => (
                <Button 
                    key={location}
                    onClick={() => props.changeLocationHandler(location)}
                    active={props.activeLocation === location && !props.favoritesViewIsActive}
                    className="panama-button">
                {location}
                </Button>
            ))}
        </Button.Group> : ''}
    </Fragment>
);

Navigation.propTypes = {
    days: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    activeDay: PropTypes.string.isRequired,
    activeLocation: PropTypes.string.isRequired,
    favoritesViewIsActive: PropTypes.bool.isRequired,
    changeDayHandler: PropTypes.func.isRequired,
    changeLocationHandler: PropTypes.func.isRequired,
    showFavorites: PropTypes.func.isRequired
};

export default Navigation
