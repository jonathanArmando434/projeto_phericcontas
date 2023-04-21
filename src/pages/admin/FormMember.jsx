import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'
import colaboradorZustand from '../../zustand/colaborador'

import user_no_photo from '/src/assets/admin/img/avatars/user-no-photo.png'

import './FormMember.css'

import PageTitle from '../../components/admin/PageTitle'

const FormMember = () => {
    const [file, setFile] = useState('')
    const [nome, setNome] = useState("")
    const [num_bi, setNum_bi] = useState("")
    const [telefone, setTelefone] = useState([""])
    const [idioma, setIdioma] = useState([""])
    const [data_nasc, setData_nasc] = useState("")
    const [genero, setGenero] = useState('Masculino')
    const [cargo, setCargo] = useState("Assistente de contabilidade")
    const [num_iban, setNum_iban] = useState('')
    const [data_inicio, setData_inicio] = useState('')
    const [data_fim, setData_fim] = useState('')
    const [endereco, setEndereco] = useState('')
    const [photo, setPhoto] = useState(user_no_photo)
    const [btn, setBtn] = useState('Adicionar')
    const [noDisplayed, setDisplayed] = useState('')
    const [titlePage, setTitlePage] = useState('Adicionar colaborador')
    const [method, setMethod] = useState('post')
    const [checkedMale, setCheckedMale] = useState(true)
    const [checkedFemale, setCheckedFemale] = useState(false)
    const [backup, setBackup] = useState({})
    const [msg, setMsg] = useState('')

    let idiomaAux = []
    let telefoneAux = []

    const { id } = useParams()

    const { loading, changeLoading } = loginZustand(state => state)

    const { message, allRight, createColaborador, editColaborador, cleanMessage, cleanAllRight } = colaboradorZustand(state => state)

    const PreparingDatas = async () => {
        try {
            const resColaborador = await api.get(`/colaborador/${id}`)
            const colaborador = resColaborador.data

            const resContato = await api.get(`/contato-colaborador/${id}`)
            const contato = resContato.data

            const resContrato = await api.get(`/contrato/${id}`)
            const contrato = resContrato.data

            const auxBackup = {
                colaborador,
                contato,
                contrato
            }

            setBackup(auxBackup)

            setNome(colaborador.nome)
            setNum_bi(colaborador.num_bi)
            setIdioma(colaborador.idioma)
            setData_nasc(colaborador.data_nasc.split('T')[0])
            setGenero(colaborador.genero)
            setCargo(colaborador.cargo)
            setNum_iban(colaborador.num_iban)
            setTelefone(contato.telefone)
            setEndereco(contato.endereco)
            setData_inicio(contrato.data_inicio.split('T')[0])
            setData_fim(contrato.data_fim.split('T')[0])
        } catch (error) {
            alert('Erro no servidor, recarregue a página!')
        }
    }

    const removeSamevalue = (array) => {
        array.forEach((value, index) => {
            for (let i = index + 1; i < array.length; i++)
                if (array[i] === value) array[i] = ''
        })

        return array
    }

    const removeEmptyValue = (array) => {
        array = removeSamevalue(array)
        const aux = array.filter(value => value !== '')
        return aux
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const auxIdioma = await removeEmptyValue(idioma)
        setIdioma(auxIdioma)

        const auxTelefone = await removeEmptyValue(telefone)
        setTelefone(auxTelefone)

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
            status: true
        }

        if (method === 'post') await createColaborador(member)
        else await editColaborador(member, backup, id)

        if (allRight && method === 'post') cleanDatas()

        if (auxIdioma.length === 0) setIdioma([""])

        if (auxTelefone.length === 0) setTelefone([""])
    }

    const cleanDatas = () => {
        setFile('')
        setNome("")
        setNum_bi("")
        setTelefone([""])
        setIdioma([""])
        setData_nasc("")
        setGenero('Masculino')
        setCargo("Assistente de contabilidade")
        setNum_iban('')
        setData_inicio('')
        setData_fim('')
        setEndereco('')
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

    useEffect(() => {
        cleanAllRight()
        cleanMessage()
        if (id) {
            setBtn('Editar')
            setDisplayed('admin-d-none')
            setTitlePage('Editar colaborador')
            setMethod('patch')
            PreparingDatas()
        }
    }, [])

    const handleOnChangeFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile({})
            return
        }

        setFile(e.target.files[0])
    }

    return (
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
                                    <img src={photo} alt="foto de Perfil" className='admin-photo-member' />
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
                                        checked={genero === 'Masculino'}
                                        onChange={(e) => setCheckedMale(e.target.checked)}
                                        value="Masculino"
                                        name="genero"
                                    />
                                    <span className="admin-form-check-label">Masculino</span>
                                </label>
                                <label className='admin-form-check'>
                                    <input
                                        className="admin-form-check-input"
                                        type="radio"
                                        checked={genero === 'Feminino'}
                                        onChange={e => setCheckedFemale(e.target.checked)}
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
    )
}

export default FormMember