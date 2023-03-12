import { useState } from 'react'

import { IoMdAddCircleOutline } from 'react-icons/io'

import { BsPersonBoundingBox } from 'react-icons/bs'

import userNoPhoto from '/src/assets/admin/img/avatars/form-update-img.png'

import passWordGenerator from '../../functions/passWordGenerator'
import { json } from 'react-router-dom'

const FormMember = () => {
    const [picture, setPicture] = useState("")
    const [nome, setNome] = useState("")
    const [bi, setBi] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [idioma, setIdioma] = useState("")
    const [data_nascimento, setData_nascimento] = useState("")
    const [genero, setGenero] = useState('Masculino')
    const [tipo, seTipo] = useState("Funcionário")
    const [salario, setSalario] = useState("100000")
    const [banco, setBanco] = useState('')
    const [numero, setNumero] = useState('')
    const [iban, setIban] = useState('')
    const [data_inicio, setData_inicio] = useState('')
    const [data_fim, setData_fim] = useState('')
    const [endereco, setEndereco] = useState('')
    const [photo, setPhoto] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const password = passWordGenerator()

        const member = {
            picture,
            bi,
            nome,
            email,
            telefone,
            idioma,
            data_nascimento,
            genero,
            tipo,
            salario,
            banco,
            numero,
            iban,
            data_inicio,
            data_fim,
            endereco,
            password
        }

        await fetch('http://localhost:4000/colaborador', {
            method: 'POST', body: JSON.stringify(member), headers: {"content-type": "application/json"}
        }).then(res => console.log(res)).catch(res => console.log(res))

        console.log(member)
    }

    const handleOnChangeFile = e => {
        e.preventDefault()
        setPicture(e.target.value)

        if(picture !== '') setPhoto(true)
        else setPhoto(false)
    }

    return (
        <form className="form-new" onSubmit={handleSubmit}>
            <div className="admin-update-img admin-mb-3">
                <label className='admin-form-label' htmlFor="picture">
                    <span className={photo ? 'admin-d-none' : ''}><BsPersonBoundingBox /></span>
                    <img src={picture} alt="Foto de Perfil" className={photo ? 'admin-fhoto-member' : 'admin-d-none'} style={{width: '50rem'}}/>
                    <label className='admin-form-label admin-d-block'>Seleciona uma imagem</label>
                    <input type="file" accept='image/*' id='picture' name='picture' value={picture || null} onChange={handleOnChangeFile} />
                </label>
            </div>

            <label className='admin-form-label' htmlFor="nome">Nome</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="nome"
                name="nome"
                placeholder="Informe o nome do novo membro"
                value={nome || ""}
                onChange={e => setNome(e.target.value)}
            />
            <label className='admin-form-label' htmlFor="bi">Número do Bilhete de Identidade</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="bi"
                name="bi"
                placeholder="Informe o número do BI do novo membro"
                value={bi || ""}
                onChange={e => setBi(e.target.value)}
            />
            <label className='admin-form-label' htmlFor="email">E-mail</label>
            <input
                type="email"
                className="admin-form-control admin-mb-3"
                id="email"
                name="email"
                placeholder="Informe o E-mail principal do novo membro"
                value={email || ""}
                onChange={e => setEmail(e.target.value)}
            />
            <label className='admin-form-label' htmlFor="telefone">Telefone / WhatsApp</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3 admin-d-inline-block"
                id="telefone"
                name="telefone"
                placeholder="Informe o telefone do novo membro"
                value={telefone || ""}
                onChange={e => setTelefone(e.target.value)}
            />

            <label className='admin-form-label' htmlFor="endereco">Endereço</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="endereco"
                name="endereco"
                placeholder="Informe o endereço do novo membro"
                value={endereco || ""}
                onChange={e => setEndereco(e.target.value)}
            />

            <div>
                <label className='admin-form-label' htmlFor={`idioma${/*idioma.length*/''}`}>Idioma</label>
                {
                    /* idioma.forEach((value, index) => {*/
                    <input
                        /* key={index} */
                        type="text"
                        className={
                                                    /*index === (idioma.length - 1)*/ true ? "admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block" :
                                "admin-form-control admin-mb-3"
                        }
                        id={`idioma${/*index+1*/''}`}
                        name={`idioma${/*index+1*/''}`}
                        placeholder="Informe um idioma"
                        value={idioma || ""}
                        onChange={e => setIdioma(e.target.value)}
                    />
                    /* })*/
                }

                <a href="#" onClick={(e) => {
                    e.preventDefault()
                    idioma.push(' ')
                    console.log(idioma.length)
                }}>
                    <IoMdAddCircleOutline />
                </a>
            </div>

            <label className='admin-form-label' htmlFor="data-nascimento">Data de Nascimento</label>
            <input
                type="date"
                className="admin-form-control admin-mb-3"
                id="data-nascimento"
                name="datNascimento"
                placeholder="Informe o o E-mail principal do novo membro"
                value={data_nascimento || ""}
                onChange={e => setData_nascimento(e.target.value)}
            />
            <label className='admin-form-label' htmlFor="">Género</label>
            <div className="" onChange={e => setGenero(e.target.value)}>
                <label className='admin-form-check'>
                    <input
                        className="admin-form-check-input"
                        type="radio"
                        value="Masculino"
                        name="genero"
                        defaultChecked
                        checked={genero === 'Masculino'}
                    />
                    <span className="admin-form-check-label">Masculino</span>
                </label>
                <label className='admin-form-check'>
                    <input
                        className="admin-form-check-input"
                        type="radio"
                        value="Feminino"
                        name="genero"
                        checked={genero === 'Feminino'}
                    />
                    <span className="admin-form-check-label">Feminino</span>
                </label>
            </div>
            <label className='admin-form-label' htmlFor="cargo">Cargo</label>
            <select id="cargo" className="admin-form-select admin-mb-3" value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="Sócio Majoritário">Sócio Majoritário</option>
                <option value="Gerente">Gerente</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Funcionário">Funcionário</option>
            </select>
            <label className='admin-form-label' htmlFor="salario">Salário</label>
            <select id="salario" className="admin-form-select admin-mb-3" value={salario} onChange={e => setSalario(e.target.value)}>
                <option value="100000">100.000,00 KZ</option>
                <option value="200000">200.000,00 KZ</option>
                <option value="300000">300.000,00 KZ</option>
                <option value="400000">400.000,00 KZ</option>
            </select>
            <label className='admin-form-label admin-d-block' htmlFor="number-bank">
                Conta Bancária
            </label>
            <div className="admin-d-flex admin-justify-content-between">
                <input
                    type="text"
                    className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                    id="name-bank"
                    name="nameBank"
                    placeholder="Nome"
                    style={{ width: '20%' }}
                    value={banco || ''}
                    onChange={e => setBanco(e.target.value)}
                />
                <input
                    type="text"
                    className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                    id="number-bank"
                    name="numberBank"
                    placeholder="Número"
                    style={{ width: '40%' }}
                    value={numero || ''}
                    onChange={e => setNumero(e.target.value)}
                />
                <input
                    type="text"
                    className="admin-form-control admin-d-inline-block admin-mb-3"
                    id="iban-bank"
                    name="ibanBank"
                    placeholder="IBAN"
                    style={{ width: '40%' }}
                    value={iban || ''}
                    onChange={e => setIban(e.target.value)}
                />
            </div>

            <label className='admin-form-label admin-d-block' htmlFor="">
                Contrato
            </label>
            <div className="admin-d-flex admin-justify-content-between">
                <div style={{ width: '49.5%' }}>
                    <label className='admin-form-label admin-d-block' htmlFor="startContract">
                        Início
                    </label>
                    <input
                        type="date"
                        className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                        id="startContract"
                        name="startContract"
                        value={data_inicio || ''}
                        onChange={e => setData_inicio(e.target.value)}
                    />
                </div>
                <div style={{ width: '49.5%' }}>
                    <label className='admin-form-label admin-d-block' htmlFor="endContract">
                        Fim
                    </label>
                    <input
                        type="date"
                        className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                        id="endContract"
                        name="endContract"
                        value={data_fim || ''}
                        onChange={e => setData_fim(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                Cadastrar
            </button>
        </form>
    )
}

export default FormMember