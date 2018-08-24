import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import PhotoStore from './stores/PhotoStore';
import UserStore from './stores/UserStore';

const stores = {
    PhotoStore,
    UserStore
};

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
