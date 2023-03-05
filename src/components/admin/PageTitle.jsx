import { Link } from 'react-router-dom'

const PageTitle = ({ title, btnText = '', BtnIcon = '', link = false, path = '' }) => {
    return (
        <div className="admin-col-12 admin-title-btn" >
            {(btnText !== '' && BtnIcon !== '') ?
                ((link) ? (
                    <>
                        <h1 className="admin-h3">{title}</h1>
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
                        <button className="admin-btn-icon">
                            {btnText}
                            <BtnIcon />
                        </button>
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