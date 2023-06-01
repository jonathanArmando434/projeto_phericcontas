import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <main className="admin">
            <div className="admin-container admin-p-0">
                <div className="admin-row">
                    <div className='spin-min admin-col-12'>
                        <ReactLoading type={'spin'} color={'#1F5B95'} />
                        <p className="spin-text-02">Carregando...</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Loading