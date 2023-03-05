import { BiEdit } from 'react-icons/bi'
import {
    AiOutlineCloseSquare
} from 'react-icons/ai'

import memberIMG from "/src/assets/admin/img/photos/unsplash-2.jpg"

import Index from "./Index"

const Member = () => {
    return (
        <Index>
            <main className="admin-member admin-content">
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
                                            src={memberIMG}
                                            alt="Unsplash"
                                        />
                                    </div>
                                    <div className="admin-col-6 admin-p-4 admin-bg-fff">
                                        <div className="">
                                            <h5 className="admin-mb-0">Dados</h5>
                                        </div>
                                        <div className="">
                                            <p className="">Nome: Milicrisney Catuca dos Santos</p>
                                            <p className="">Número do BI: 00000000000000</p>
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
                                            <p className="">Data de Nascimento: 31/07/2003</p>
                                            <p className="">Sexo: Masculino</p>
                                            <p className="">Cargo: Sócio Majoritário</p>
                                            <p className="">Salário: 1.000.000,00 KZ</p>
                                            <p className="">Conta Bancária:</p>
                                            <ul>
                                                <li>
                                                    <p className="">Número da conta: 00000000000000</p>
                                                </li>
                                                <li>
                                                    <p className="">IBAN: 0000000000000000000000000</p>
                                                </li>
                                            </ul>
                                            <a href="#" className="">
                                                <BiEdit />
                                            </a>
                                            <a href="#">
                                                <AiOutlineCloseSquare />
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

export default Member