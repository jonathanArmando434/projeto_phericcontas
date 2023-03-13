import { BiEdit } from 'react-icons/bi'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { FaRegAddressCard } from 'react-icons/fa'
import { MdOutlineDateRange } from 'react-icons/md'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { RiBankLine } from 'react-icons/ri'

import './Perfil.css'

import memberIMG from "/src/assets/admin/img/avatars/avatar-4.jpg"
import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'

import Index from "./Index"

const Member = () => {
    return (
        <Index>
            <main className="admin-member admin-content admin-bg-fff">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-perfil admin-row">
                        <div className="admin-col-12 admin-p-0">
                            <div className="admin-container-fluid">
                                <div className="admin-row admin-perfil admin-align-items-center admin-justify-content-center">
                                    <div className="admin-col-4 mb-4">
                                        <div className="admin-card">
                                            <div className="card-body text-center">
                                                <img src={userNoPhoto} alt="Christina Mason" className="admin-rounded-circle admin-mb-2 admin-no-photo" width="248" height="248" />
                                                <h5 className="admin-card-title admin-mb-0">Milicrisney Catuca dos Santos</h5>
                                                <div className="admin-text-muted admin-mb-2">Sócio Majoritário</div>

                                                <div>
                                                    <a className="admin-btn admin-me-2 admin-main-btn" href="#"><BiEdit /> Editar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admin-col-9 admin-bg-fff">
                                        <div className="admin-row">
                                            <div className="admin-col-4 admin-perfil-menu admin-p-4">
                                                <nav id="" className="">
                                                    <div className="">

                                                        <h5 className="admin-mb-0">Dados</h5>

                                                        <ul className="admin-perfilbar-item">
                                                            <li className="">
                                                                <a className="admin-perfilbar-link" href="#">
                                                                    <span className="admin-align-middle">Vista Geral</span>
                                                                </a>
                                                            </li>
                                                            <li className="admin-perfilbar-item">
                                                                <a className="admin-perfilbar-link" href="#">
                                                                    <span className="admin-align-middle">Informações Básicas de Contacto</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </nav>
                                            </div>
                                            <div className="admin-col-8 admin-p-4">
                                                <div className="admin-row">
                                                    <div className="admin-col-12">
                                                        <div className="admin-perfil-item">
                                                            <div className="admin-d-flex">
                                                                <FaRegAddressCard />
                                                                <div>
                                                                    <span className="admin-perfil-dado">00000000000000</span>
                                                                    <span className="admin-small admin-d-block admin-perfil-title">Bilhete de Idenditade</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="admin-perfil-item">
                                                            <div className="admin-d-flex">
                                                                <MdOutlineDateRange />
                                                                <div>
                                                                    <span classNamd="admin-perfil-dado">31 de Julho de 2003</span>
                                                                    <span className="admin-small admin-d-block admin-perfil-title">Data de Nascimento</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="admin-perfil-item admin-m-0">
                                                            <div className="admin-d-flex">
                                                                <RiBankLine />
                                                                <div>
                                                                    <span className="admin-perfil-dado">0000000000000000000000000</span>
                                                                    <span className="admin-small admin-d-block admin-perfil-title">IBAN</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="admin-col-12 admin-d-none">
                                                        <div className="admin-perfil-item">
                                                            <h4 className="admin-mb-0">Informações de Contacto</h4>
                                                        </div>
                                                        <div className="admin-perfil-item">
                                                            <div className="admin-d-flex">
                                                                <BiEdit />
                                                                <div>
                                                                    <span className="admin-perfil-dado">+244 928 086 604</span>
                                                                    <span className="admin-small admin-d-block admin-perfil-title">Telefone</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="admin-perfil-item">
                                                            <div className="admin-d-flex">
                                                                <BiEdit />
                                                                <div>
                                                                    <span className="admin-perfil-dado">Mily@gmail.com</span>
                                                                    <span className="admin-small admin-d-block admin-perfil-title">E-mail</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <hr />

                                                        <div className="admin-perfil-item">
                                                            <h4 className="admin-mb-0">Informações Básicas</h4>
                                                        </div>

                                                        <div className="admin-perfil-item">
                                                            <div className="admin-d-flex">
                                                                <BiEdit />
                                                                <span className="admin-perfil-dado">Adicionar um indioma</span>
                                                            </div>
                                                        </div>
                                                        <div className="admin-perfil-item admin-m-0">
                                                            <div className="admin-d-flex">
                                                                <BiEdit />
                                                                <div>
                                                                    <span className="admin-perfil-dado">Masculino</span>
                                                                    <span className="admin-small admin-d-block admin-perfil-title">Género</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </main>
        </Index>
    )
}

export default Member