import { BiEdit } from 'react-icons/bi'
import {
    TbClipboardPlus
} from 'react-icons/tb'

import clientIMG from "/src/assets/admin/img/icons/client-02.jpeg"

import Index from "./Index"

const Client = () => {
    return (
        <Index>
            <main className="admin-client admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-more-info admin-row">
                        <div className="admin-col-12 admin-title-btn">
                            <h1 className="admin-h3 admin-mb-3">Milly dos Santos</h1>
                        </div>
                        <div className="admin-col-12 admin-p-0">
                            <div className="admin-container-fluid">
                                <div className="admin-row">
                                    <div className="admin-col-6">
                                        <img
                                            className="admin-p-0 admin-img-fluid"
                                            src={clientIMG}
                                            alt="Unsplash"
                                        />
                                    </div>
                                    <div className="admin-col-6 admin-p-4 admin-bg-fff">
                                        <div className="">
                                            <h5 className="admin-mb-0">Dados</h5>
                                        </div>
                                        <div className="">
                                            <p className="">Nome: Milicrisney Catuca dos Santos</p>
                                            <p className="">Número de NIF: 00000000000000</p>
                                            <p className="">E-mail: milly@gmail.com</p>
                                            <p className="">Telefone / WhatsApp:</p>
                                            <ul>
                                                <li>
                                                    <p className="">+244 928 086 604</p>
                                                </li>
                                                <li>
                                                    <p className="">+244 928 086 604</p>
                                                </li>
                                            </ul>
                                            <p className="">
                                                Área de Negócio: Milicrisney Catuca dos Santos
                                            </p>
                                            <p className="">Localização:</p>
                                            <ul>
                                                <li>
                                                    <p className="">Número da conta: 00000000000000</p>
                                                </li>
                                                <li>
                                                    <p className="">IBAN: 0000000000000000000000000</p>
                                                </li>
                                            </ul>
                                            <p className="">Data de Criação: 31/07/2003</p>
                                            <a href="#" className="">
                                                <BiEdit />
                                            </a>
                                            <a href="#">
                                                <TbClipboardPlus />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                u
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default Client