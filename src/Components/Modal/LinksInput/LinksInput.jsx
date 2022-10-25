import React, { Fragment, useState } from "react";
import { Input } from "k6-ui";
import './LinksInput.scss'

const LinksInput = () => {
  const [links, setLinks] = useState([{ count: '1' }])

  return (
    <>
      {links.map(link => {
        return (
          <Fragment key={link.count}>
            <WrapperLink
              link={link}
              setLinks={setLinks}
              links={links}
            />
          </Fragment>
        )
      })}
      <p
        onClick={() => setLinks(
          [...links, { count: links[links.length - 1].count + 1 }]
        )}
        className="links_add"
      >
        Добавить ссылку
      </p>
    </>
  )
}

export default LinksInput;

const WrapperLink = ({ link, links, setLinks }) => {
  const [isDeleteLink, setIsDeleteLinks] = useState(false)

  return (
    <div className="links_wrapper" >
      <Link placeholder='Введите название' title='Название' />
      <Link placeholder='Введите подсказку' fontWeight='normal' title='Подсказка' />
      <Link placeholder='Введите адрес' title='Адрес ссылки' />
      <span
        className="uiIcon _close _accent _small _danger close_links"
        onClick={() => setIsDeleteLinks(true)}
      >
      </span>
      {
        isDeleteLink
        && <DeleteLink
          setLinks={setLinks}
          links={links}
          setIsDeleteLinks={setIsDeleteLinks}
          link={link}
        />
      }
    </div>
  )
}

const Link = ({ fontWeight, title, placeholder }) => {
  return (
    <div className="link_wrapper">
      <div className="link_title">
        <h4 style={fontWeight && { fontWeight: `${fontWeight}` }}>
          {title}
        </h4>
      </div>
      <Input placeholder={placeholder} width='415px' />
    </div>
  )
}

const DeleteLink = ({ setIsDeleteLinks, setLinks, links, link }) => {
  return (
    <div className="links_warning_wrapper">
      <p>Удалить ссылку со всеми заполненными полями?</p>
      <div className="links_warning_footer">
        <button
          onClick={() => setLinks([...links.filter(elem =>
            elem.count !== link.count
          )])}
          className="kApp-flatBtn kApp-flatBtn_red">
          Удалить
        </button>
        <button
          onClick={() => setIsDeleteLinks(false)}
          className="kApp-flatBtn"
        >
          Отменить
        </button>
      </div>
    </div>
  )
}