import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'

import imgMember from '/src/assets/admin/img/photos/unsplash-2.jpg'
import memberIMG from '../../assets/admin/img/avatars/avatar-2.jpg'
import clientIMG from '../../assets/admin/img/icons/client-02.jpeg'


import './AdminModal.css'

const AdminModal = ({ open, setOpen, about }) => {
    let [select, setSelect] = useState(false)
    return (
        <div id="admin-modal" className={open ? "admin-modal admin-d-block" : "admin-modal"}>
            {/* Modal content */}
            <div className="admin-modal-content">
                {/* <span class="close">&times;</span> */}
                <div className="admin-bar-modal">
                    <form action="" className="admin-w-100">
                        <input
                            type="search"
                            id="search"
                            name="search"
                            className="admin-form-control admin-d-inline-block"
                            placeholder="Pesquisar funcionário"
                        />
                        <button
                            type="submit"
                            id="btn-search"
                            className="admin-btn-input admin-btn admin-button-select"
                        >
                            <BiSearch />
                        </button>
                    </form>
                    <span onClick={() => {
                        setOpen(!open)
                        setSelect(false)
                    }} className="admin-close">x</span>
                </div>
                <main className="admin-content">
                    <div className="admin-row">
                        <div className="admin-col-12 admin-title-btn">
                            <h1 className="admin-h3 admin-mb-3">
                                Seleciona um {about}
                            </h1>
                        </div>
                        <div className="admin-col-12 admin-d-flex">
                            <div className="admin-row">
                                <div className="admin-col-12">
                                    <div className="admin-row">
                                        {
                                            (about === 'Funcionário') ?
                                                (
                                                    <div onClick={() => setSelect(!select)}
                                                        className={select ? "admin-card-selected admin-card admin-card-member admin-px-2 admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"
                                                            : "admin-card admin-card-member admin-px-2 admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"}>
                                                        <div className="admin-card-content">
                                                            <img
                                                                className="admin-card-img-top admin-card-img-member"
                                                                src={memberIMG}
                                                                alt="Unsplash"
                                                                width="276"
                                                                height="276"
                                                            />
                                                            <div className="admin-card-header">
                                                                <h5 className="admin-card-title admin-mb-0">Milly dos Snatos</h5>
                                                            </div>
                                                            <div className="admin-card-body">
                                                                <p className="admin-card-text">Sócio Majoritário</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) :
                                                (
                                                    <div onClick={() => setSelect(!select)}
                                                        className={select ? "admin-card-selected admin-card admin-card-client admin-px-2 admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"
                                                            : "admin-card admin-card-client admin-px-2 admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"}>
                                                        <div className="admin-card-content">
                                                            <img
                                                                className="admin-card-img-top admin-card-img-client"
                                                                src={clientIMG}
                                                                alt="Unsplash"
                                                                width="276"
                                                                height="276"
                                                            />
                                                            <div className="admin-card-header">
                                                                <h5 className="admin-card-title admin-mb-0">Phericcontas</h5>
                                                            </div>
                                                            <div className="admin-card-body">
                                                                <p className="admin-card-text">Sócio Majoritário</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminModal