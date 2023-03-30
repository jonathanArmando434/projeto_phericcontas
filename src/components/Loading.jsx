import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1F5B95'            
        }}>
            <ReactLoading type={'spin'} color={'#fff'} />
        </div>
    )
}

export default Loading