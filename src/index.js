import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import Schedule from './components/Schedule/Schedule';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Schedule />,
    document.getElementById('root')
);
registerServiceWorker();
