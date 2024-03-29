import React from 'react';
import ReactLoading from 'react-loading';

import './Loading.css'

const Loading = () => {
    return (
        <div className='spin'>
            <ReactLoading type={'spin'} color={'#fff'} />
            <p className="spin-text">Carregando...</p>
        </div>
    )
}

export default Loading