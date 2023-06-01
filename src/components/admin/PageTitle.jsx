import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const PageTitle = ({ title, btnText , BtnIcon, link = false, path, handleSunmit, year, setYear }) => {
    const [show, setShow] = useState('')

    const anoRef = useRef(null)

    const handleClick = (e) => {
        if (e.target.id === 'filter-btn') {
            setShow('admin-show')
        }
        else if (e.target.id !== 'ano') setShow('')
    }

    useEffect(() => {
        if(show === 'admin-show'){
            anoRef.current.focus();
            anoRef.current.select();
        }
    }, [show])

    useEffect(() => {
        if(!handleSunmit) handleSunmit = (e) => {e.preventDefault()}
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div className="admin-col-12 admin-title-btn" >
            {(BtnIcon) ?
                ((link) ? (
                    <>
                        <h1 className="admin-h3 admin-mb-0">{title}</h1>
                        <Link to={path}>
                            <button className="admin-btn-icon">
                                {btnText}
                                <BtnIcon />
                            </button>
                        </Link>
                    </>
                ) : (
                    <>
                        <h1 className="admin-h3">{title}</h1>
                        <div className='admin-dropdown'>
                            <button id='filter-btn' className="admin-btn-icon admin-dropdown-toggle" data-bs-toggle="dropdown">
                                <BtnIcon />
                            </button>
                            <div style={{ left: '-142%', padding: '1rem' }} className={`admin-dropdown-menu admin-dropdown-menu-end ${show}`}>
                                <form onSubmit={handleSunmit}>
                                    <input
                                        type="text"
                                        className="admin-form-control admin-mb-3"
                                        id="ano"
                                        name="ano"
                                        placeholder="Ano"
                                        minLength={4}
                                        maxLength={4}
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        ref={anoRef}
                                    />
                                    <button type='submit' className="admin-dropdown-item admin-btn admin-main-btn admin-form-control admin-text-center">
                                        Filtrar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                )) :
                (
                    <h1 className="admin-h3">{title}</h1>
                )
            }
        </div >
    )
}

export default PageTitle