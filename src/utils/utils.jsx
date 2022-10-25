import {
  openModalSetting4_1,
  openModalSetting4_2_1,
  openModalSetting4_4_1
} from "../Components/Modal/ModalSettingObj/ModalSettingObj"

export const handlerSelect = (setSettingModal, settingModalElem, value) => {
  setSettingModal(prev => ([
    ...prev.filter(modal => modal.title !== settingModalElem.title)
  ]));
  if (value === 'Перечень документов') setSettingModal(prev => ([
    ...prev, openModalSetting4_1
  ]));
  if (value === 'Список') setSettingModal(prev => ([
    ...prev, openModalSetting4_2_1
  ]));
  if (value === 'Набор ссылок') setSettingModal(prev => ([
    ...prev, openModalSetting4_4_1
  ]));
}

export const getSelectList = (classifiers) => {
  return classifiers.map(classifier => {
    const result = {
      label: classifier.name,
      value: String(classifier.id)
    }

    if (classifier.children?.length) {
      result.children = getSelectList(classifier.children)
    }

    return result;
  })
}

export const getSelectListFlat = (classifiers) => {
  const flat = []
  
  for (const classifier of classifiers) {
    flat.push({
      label: classifier.name,
      value: String(classifier.id)
    })
    
    if (classifier.children?.length) {
      flat.push(...getSelectListFlat(classifier.children))
    }
  }

  return flat
}