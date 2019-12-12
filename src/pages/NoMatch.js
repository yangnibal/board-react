import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class NoMatch extends React.Component{
    render() {
        const containerStyle = {
            width: '100vw',
            height: '100vh',
            background: 'rgb(242, 243, 245',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgb(34, 76, 126)',
            fontSize: '5rem'
        }
        return (
            <div style={containerStyle}>
                404 Not Found
            </div>
        )
    }
}

export default NoMatch;