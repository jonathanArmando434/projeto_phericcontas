import { useState } from 'react'

const BtnFilter = ({ items }) => {
    const [active, setActive] = useState(0)
    return (
        <div className="admin-col-12 admin-d-flex admin-my-5 admin-menu-list">
            {items.forEach((value, index) => {
                active === index ? (
                    <a key={index} href='#' className={`active admin-btn admin-btn-nav admin-mx-3`}>{value}</a>
                ) : (
                    <a key={index} href='#' className={`admin-btn admin-btn-nav admin-mx-3`}>{value}</a>
                )

            })}
        </div>
    )
}

export default BtnFilter