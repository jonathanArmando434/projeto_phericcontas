import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'
import colaboradorZustand from '../../zustand/colaborador'

import user_no_photo from '/src/assets/admin/img/avatars/user-no-photo.png'

import './FormMember.css'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import Loading from '../../components/Loading'

const FormMember = ({ dados = {} }) => {
    const [file, setFile] = useState(dados.foto_url || '')
    const [nome, setNome] = useState(dados.nome || "")
    const [num_bi, setNum_bi] = useState(dados.num_bi || "")
    const [telefone, setTelefone] = useState(dados.telefone || [""])
    const [idioma, setIdioma] = useState(dados.idioma || [""])
    const [data_nasc, setData_nasc] = useState(dados.data_nasc || "")
    const [genero, setGenero] = useState(dados.genero || 'Masculino')
    const [cargo, setCargo] = useState(dados.cargo || "Assistente de contabilidade")
    const [num_iban, setNum_iban] = useState(dados.num_iban || '')
    const [data_inicio, setData_inicio] = useState(dados.data_inicio || '')
    const [data_fim, setData_fim] = useState(dados.data_fim || '')
    const [endereco, setEndereco] = useState(dados.endereco || '')
    const [photo, setPhoto] = useState(user_no_photo)
    const [btn, setBtn] = useState('Adicionar')
    const [noDisplayed, setDisplayed] = useState('')
    const [titlePage, setTitlePage] = useState('Adicionar colaborador')
    const [method, setMethod] = useState('post')

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            setBtn('Editar')
            setDisplayed('admin-d-none')
            setTitlePage('Editar colaborador')
            setMethod('patch')
        }
    }, [])


    const { loading, changeLoading } = loginZustand(state => state)

    const {message, allRight, createColaborador, cleanMessage, cleanAllRight} = colaboradorZustand(state => state)

    let idiomaAux = []
    let telefoneAux = []

    const handleSubmit = async (e) => {
        e.preventDefault()

        cleanMessage()
        cleanAllRight()

        let member = {
            file,
            num_bi,
            nome,
            telefone,
            idioma,
            data_nasc,
            genero,
            cargo,
            num_iban,
            data_inicio,
            data_fim,
            endereco,
        }

        changeLoading()

        if(method === 'post'){
            await createColaborador(member, method, id || '')
            console.log(allRight)
        }

        if(allRight && method === 'post') cleanDatas()


        changeLoading()
    }

    const cleanDatas = () => {
        setFile(dados.foto_url || '')
        setNome(dados.nome || "")
        setNum_bi(dados.num_bi || "")
        setTelefone(dados.telefone || [""])
        setIdioma(dados.idioma || [""])
        setData_nasc(dados.data_nasc || "")
        setGenero(dados.genero || 'Masculino')
        setCargo(dados.cargo || "Assistente de contabilidade")
        setNum_iban(dados.num_iban || '')
        setData_inicio(dados.data_inicio || '')
        setData_fim(dados.data_fim || '')
        setEndereco(dados.endereco || '')
        setPhoto(user_no_photo)
    }

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!file) {
            setPhoto(user_no_photo)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPhoto(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const handleOnChangeFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile({})
            return
        }

        setFile(e.target.files[0])
    }

    return (loading ? <Loading /> :
        (
            <Index>
                <main className="admin-content">
                    <div className="admin-container-fluid admin-p-0">
                        <div className="admin-row">
                            <PageTitle title={titlePage} />

                            <div className="admin-col-12 admin-col-lg-6 admin-bg-fff admin-br-5 mx-auto admin-p-3 div-form">
                                <form className="form-new" onSubmit={handleSubmit}>
                                    {
                                        message && <div className={(allRight ? 'admin-msg-success' : 'admin-msg-danger')}>
                                            {message}
                                        </div>
                                    }
                                    <div className={noDisplayed === 'admin-d-none' ? noDisplayed : 'admin-update-img admin-mb-3'}>
                                        <label className='admin-form-label' htmlFor="picture">
                                            <img src={photo} alt="file de Perfil" className='admin-photo-member' />
                                            <span style={{ marginTop: '1rem', marginBottom: 0, cursor: 'pointer' }} className='admin-form-label admin-d-block'>{file ? 'Selecionar outra imagem' : 'Seleciona uma imagem'}</span>
                                            <input type="file" accept='image/*' id='picture' name='picture' onChange={handleOnChangeFile} />
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
                                        value={num_bi || ""}
                                        onChange={e => setNum_bi(e.target.value)}
                                    />
                                    <div>
                                        <label className='admin-form-label' htmlFor={`idioma${idioma.length}`}>Idioma</label>
                                        {
                                            idioma && (idioma.map((value, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    className={
                                                        (index === (idioma.length - 1)) ? "admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block" :
                                                            "admin-form-control admin-mb-3"
                                                    }
                                                    id={`idioma${(index + 1)}`}
                                                    name={`idioma${(index + 1)}`}
                                                    placeholder="Informe um idioma"
                                                    value={value}
                                                    onChange={e => {
                                                        idiomaAux = idioma.map((value, i) => (index === i ? e.target.value : value))
                                                        setIdioma([...idiomaAux])
                                                    }}
                                                />
                                            )))
                                        }

                                        <a href="#" onClick={(e) => {
                                            e.preventDefault()
                                            setIdioma([...idioma, ''])
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
                                        value={data_nasc || ""}
                                        onChange={e => setData_nasc(e.target.value)}
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
                                            />
                                            <span className="admin-form-check-label">Masculino</span>
                                        </label>
                                        <label className='admin-form-check'>
                                            <input
                                                className="admin-form-check-input"
                                                type="radio"
                                                value="Feminino"
                                                name="genero"
                                            />
                                            <span className="admin-form-check-label">Feminino</span>
                                        </label>
                                    </div>
                                    <label className='admin-form-label' htmlFor="cargo">Cargo</label>
                                    <select id="cargo" className="admin-form-select admin-mb-3" value={cargo} onChange={e => setCargo(e.target.value)}>
                                        <option value="PCA">PCA</option>
                                        <option value="Gerente">Gerente</option>
                                        <option value="Contabilista Senior">Contabilista senior</option>
                                        <option value="Assistente de contabilidade">Assistente de contabilidade</option>
                                        <option value="Estagiario">Estagiário</option>
                                    </select>
                                    <label className='admin-form-label admin-d-block' htmlFor="number-bank">
                                        Conta Bancária
                                    </label>
                                    <input
                                        type="text"
                                        className="admin-form-control admin-d-inline-block admin-mb-3"
                                        id="iban-bank"
                                        name="ibanBank"
                                        placeholder="IBAN"
                                        value={num_iban || ''}
                                        onChange={e => setNum_iban(e.target.value)}
                                    />
                                    <div>
                                        <label className='admin-form-label' htmlFor={`phone${telefone.length}`}>Telefone / WhatsApp</label>
                                        {
                                            telefone && (telefone.map((value, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    className={
                                                        (index === (telefone.length - 1)) ? "admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block" :
                                                            "admin-form-control admin-mb-3"
                                                    }
                                                    id={`phone${(index + 1)}`}
                                                    name={`phone${(index + 1)}`}
                                                    placeholder="Informe um número de telefone / WhatsApp"
                                                    value={value}
                                                    onChange={e => {
                                                        telefoneAux = telefone.map((value, i) => (index === i ? e.target.value : value))
                                                        setTelefone(telefoneAux)
                                                    }}
                                                />
                                            )))
                                        }

                                        <a href="#" onClick={(e) => {
                                            e.preventDefault()
                                            setTelefone([...telefone, ''])
                                            console.log(telefone.length)
                                        }}>
                                            <IoMdAddCircleOutline />
                                        </a>
                                    </div>

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
                                        {btn}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </Index>
        )
    )
}

export default FormMember