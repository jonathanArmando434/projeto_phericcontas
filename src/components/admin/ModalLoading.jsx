import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className='spin-modal'>
            <ReactLoading type={'spin'} color={'#fff'} />
            <p className="spin-text">Carregando...</p>
        </div>
    )
}

export default Loading