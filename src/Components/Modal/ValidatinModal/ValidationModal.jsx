import React from "react";
import ModalRowInput from "../ModalRow/ModalRowInputRadio";
import { Input, Select, Multiselect, Icon } from "k6-ui";
import { handlerSelect } from "../../../utils/utils";
import LinksInput from "../LinksInput/LinksInput";
import { attrForm, openModalSetting4_2_2 } from "../ModalSettingObj/ModalSettingObj";
// import Multiselect from "../../Multiselect/Multiselect";

const ValidationModal = ({ row, setSubmit, submit, setSettingModal, settingModalElem }) => {

  const optionsSelect = [
    { value: `Перечень документов`, label: `Перечень документов` },
    { value: `Список`, label: `Список` },
    { value: `Набор ссылок`, label: `Набор ссылок` },
  ];

  switch (row.type) {
    case 'inputTypeRadio':
      return (
        <ModalRowInput
          row={row}
          setSubmit={setSubmit}
          submit={submit}
        />
      );
    case 'input':
      return (
        <Input
          width='415px'
          value={submit[row.title]}
          onChange={({ target: { value } }) => {
            setSubmit(prev => ({ ...prev, [row.title]: value }))
          }}
          placeholder={row.placeholder && row.placeholder}
        />
      );
    case 'select':
      return (
        <Select
          options={optionsSelect}
          width='415px'
          value={submit[row.title]}
          onChange={value => {
            setSubmit(prev => ({ ...prev, [row.title]: value }));
            handlerSelect(setSettingModal, settingModalElem, value);
          }}
        />
      );
    case 'textarea':
      return (
        <textarea
          className='modal_row_textarea kApp-textarea'
          style={row.fontWeight && { fontWeight: `${row.fontWeight}` }}
          value={submit[row.title]}
          onChange={({ target: { value } }) => {
            setSubmit(prev => ({ ...prev, [row.title]: value }))
          }}
          placeholder={row.placeholder && row.placeholder}
        />
      )
    case 'multiselect':
      return (
        <>
          <textarea
            className='modal_row_textarea kApp-textarea'
            style={row.fontWeight && { fontWeight: `${row.fontWeight}` }}
            value={submit[row.title]}
            onChange={({ target: { value } }) => {
              setSubmit(prev => ({ ...prev, [row.title]: value }))
            }}
            placeholder={row.placeholder && row.placeholder}
          />
          <p
            onClick={() => row.buttonAdd === 'Найти документы'
              ? setSettingModal(prev=>([...prev, attrForm]))
              : setSettingModal(prev=>([...prev, openModalSetting4_2_2]))
            }
            className="links_add"
          >
            {
              row.buttonAdd === 'Найти документы'
                ? 'Найти документы'
                : 'Добавить ссылку'
            }
          </p>
        </>
      )
    case 'link':
      return (
        <>
          <div className="border_link"></div>
          <h4>Ссылки</h4>
          <LinksInput />
        </>
      );
    case 'listDoc':
      return (
        <>
        <div className="list_doc_wrapper">
          <h4>Список документов</h4>
          <Input
            placeholder="Поиск"
            onSearch={value => console.log(value)}
            width='200px'
          >
            <Icon
              className='uiIcon _flat _search _accent'
              title="Найти"
            />
          </Input>
        </div>
          <div className="border_link"></div>
          </>
      )
    default:
      break;
  }
}

export default ValidationModal;