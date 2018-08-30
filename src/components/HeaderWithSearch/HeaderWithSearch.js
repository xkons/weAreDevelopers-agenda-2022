import React from 'react';
import {
    Button,
    Header,
    Divider
  } from 'semantic-ui-react';
import TalkSearch from '../TalkSearch/TalkSearch';
import PropTypes from 'prop-types';

const HeaderWithSearch = (props) => (
    <header>
        <Header className="heading" as='h1'>CoderCruise</Header><Button onClick={props.toggleSearch} className="panama-button search-btn" icon={props.showSearch ? 'close' : 'search'} />
        {props.showSearch ?
        <TalkSearch
            source={props.scheduleItems}
            starHandler={props.starTalkHandler}
            starredTalks={props.starredTalks} /> :
        ''
        }
        <Divider />
    </header>
);

HeaderWithSearch.propTypes = {
    scheduleItems: PropTypes.array.isRequired,
    starTalkHandler: PropTypes.func.isRequired,
    starredTalks: PropTypes.array.isRequired,
    toggleSearch: PropTypes.func.isRequired,
    showSearch: PropTypes.bool.isRequired
};

export default HeaderWithSearch
