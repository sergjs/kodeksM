import React, { useMemo, useState } from "react";
import { IconFooter } from "../Icons/Icons";
import FormAttrSearch from "./FormAttrSearch/FormAttrSearch";
import HeaderRow from "./Header/HeaderRow";
import { Label } from "./Header/Label";
import './Modal.scss'
import ValidationModal from "./ValidatinModal/ValidationModal";


const Modal = ({ settingModalElem, setSettingModal, setSubmit, submit }) => {
  console.log(submit, 'submit')

  // const { formElems: elems } = useMemo(
  //   () => formElems.find(({ tabId }) => tabId === activeTab) || [],
  //   [activeTab, loading]
  // );

  const closeModal = () => {
    setSettingModal(prev => ([
      ...prev.filter(item =>
        item.title !== settingModalElem.title)
    ]))
    setSubmit({})
  }

  return (
    <div className="wrapper_modal_back">
      <div className="wrapper_modal">
        <div className="modal_custom" style={{ ...settingModalElem?.style }}>
          <div>
            <span
              onClick={() => closeModal()}
              className="uiIcon _close _small close_button_modal"
            >
            </span>
            <h4 className="header_title">
              {settingModalElem.title.toUpperCase()}
            </h4>
          </div>
          <div className="modal_body">
            {settingModalElem.nameObj === 'attrForm'
              ? <FormAttrSearch
                formElems={settingModalElem}
                setSubmit={setSubmit}
                submit={submit}
              />
              : <div className="modal_body_wrapper">
                {settingModalElem.body.map((row, idx) => {
                  return (
                    <div
                      className="modal_row"
                      key={row.title}
                    >
                      {!['link', 'listDoc'].includes(row.type)
                        && <HeaderRow row={row} />}
                      <div className="modal_row_input">
                        <ValidationModal
                          row={row}
                          setSubmit={setSubmit}
                          submit={submit}
                          setSettingModal={setSettingModal}
                          settingModalElem={settingModalElem}
                        />
                      </div>
                    </div>
                  )
                })
                }
              </div>
            }
          </div>
          <div className="footer_wrapper">
            <button className="kApp-flatBtn kApp-flatBtn_blue">
              {settingModalElem.footer[0]}
            </button>
            <button
              onClick={() => closeModal()}
              className="kApp-flatBtn"
            >
              {settingModalElem.footer[1]}
            </button>
            {
              settingModalElem.isCopyLink
              && <IconFooter />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;