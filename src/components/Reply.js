import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../store/useStores';

const Reply = observer(({ message, author }) => {
    const { store } = useStores()
    return (
        <div>
            <div>
                <h4>{message}</h4>
            </div>
            <div>
                <h6>{author}</h6>
            </div>
        </div>
    )
})

export default Reply