import React, {useState, Fragment} from 'react';
import Modal from './Components/Modal/Modal.jsx'
import {openModalSetting2_1, openModalSetting4_1} from './Components/Modal/ModalSettingObj/ModalSettingObj.jsx'
import './index.css'

function App() {
  const [settingModal, setSettingModal] = useState([])
  const [submit, setSubmit] = useState({})

console.log(settingModal, 'settingModal')
  return (
    <>
    <button onClick={() => 
      setSettingModal([...settingModal, openModalSetting2_1])
    }>
      Модалка 2_1
    </button>

    <button onClick={() => 
      setSettingModal([...settingModal, openModalSetting4_1])
    }>
      Модалка 4_1
    </button>

    {settingModal.map(modal =>
       <Fragment key={modal.nameObj}>
        <Modal
          settingModalElem={modal}
          setSettingModal={setSettingModal}
          settingModal={settingModal}
          submit={submit}
          setSubmit={setSubmit}
        />
      </Fragment>)
    }
    </>
  );
}

export default App;
