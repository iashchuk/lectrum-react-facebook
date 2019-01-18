import React from 'react';

import { Consumer } from 'components/HOC/withProfile';

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
