import React from 'react';

import { Consumer } from './withProfile';

export default (ComponentWrapped) => {
    return (props) => {
        return (
            <Consumer>{(context) => (
                <ComponentWrapped
                    { ...props }
                    { ...context }
                />
            )}
            </Consumer>
        );
    };
};
