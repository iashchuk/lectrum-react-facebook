import React, { Component } from 'react';

import { Consumer } from './withProfile';
import { getDisplayName } from './helpers';

export default (ComponentWrapped) => {
    class WithCompose extends Component {
        render() {
            return (
                <Consumer>
                    {(context) => (
                        <ComponentWrapped
                            { ...this.props }
                            { ...context }
                        />
                    )}
                </Consumer>
            );
        }
    }

    WithCompose.displayName = `WithState(${getDisplayName(ComponentWrapped)})`;

    return WithCompose;
};
