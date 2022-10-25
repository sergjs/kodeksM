import React, { useEffect, useMemo, useCallback } from "react";
import { TreeSelect } from "k6-ui";
import { DateInput } from "../../DateInput/DateInput";
import TextInput from "../../TextInput/TextInput";
import DropDownMenu from "../../DropDownMenu/DropDownMenu";
import { getSelectList, getSelectListFlat } from "../../../utils/utils";

export const Field = ({
  setSubmit,
  submit,
  // isFilter,
  id,
  type,
  conditionsArray,
  classifiers,
  index
}) => {

  const isIE = /*@cc_on!@*/false || !!document.documentMode;

  const mode = useMemo(() => submit.formAttr?.[`id_${id}_type_${type}_mode`], [
    submit
  ]);

  const lop = useMemo(() => submit.formAttr?.[`id_${id}_type_${type}_lop`], [
    submit
  ]);

  const selectList = getSelectListFlat(classifiers);

  const getValues = useCallback(() => {
    const result = [];
    (
      submit?.formAttr?.[`id_${id}_type_${type}_values`] || []
    ).map((val) => {
      result.push(selectList.find(({ value }) => value === val));
    });
    console.log(result, 'result')
    return result;
  }, [submit]);

  const handleChange = (name, value) => {
    console.log(value, 'value')
    setSubmit(prev => (
      {
        ...prev,
        formAttr: {
          ...prev.formAttr,
          [name]: value,
        }
      }
    ))
  };

  // useEffect(() => {
  //   if (type !== 5 && type !== 1) {
  //     handleChange({
  //       value: mode,
  //       mode: "mode",
  //     });
  //   } else if (type === 5) {
  //     handleChange({
  //       value: lop || 'or',
  //       mode: 'lop',
  //     })
  //   }
  // }, [mode, lop, type]);

  const optionsText = [
    { value: "1", label: `Точно` },
    { value: "2", label: `Cодержит` },
    { value: "3", label: `Начинается c` },
  ];

  const optionsAttr = [
    { value: "or", label: `Или` },
    { value: "and", label: `И` },
    { value: "not", label: `Кроме` },
  ];

  switch (type) {
    case 1:
      return (
        <DateInput
          id={id}
          index={index}
          type={type}
          selected={mode || '0'}
          position={0}
          handleChange={handleChange}
          submit={submit}
        />
      );
    case 2:
      return (
        <div
          className="text_input"
          style={isIE ? { width: '567px' } : {}}
        >
          <TextInput
            submit={submit}
            id={id}
            type={type}
            handleChange={handleChange}
          />
        </div>
      );
    case 3:
      return (
        <div className="block">
          <div>
            <DropDownMenu
              id={`mode${index}`}
              parentId={"form-attr-search"}
              value={mode}
              onChange={(value) => handleChange(`id_${id}_type_${type}_mode`, value)}
              options={optionsText}
              width={"150px"}
              height={"32px"}
            />
          </div>
          <div
            className="row_text_input"
            style={isIE ? { marginLeft: '169px', width: '398px' } : {}}
          >
            <TextInput
              submit={submit}
              id={id}
              type={type}
              handleChange={handleChange}
            />
          </div>
        </div>
      );
    case 5:
      return (
        <div className="block">
          <DropDownMenu
            id={`lop${index}`}
            value={lop}
            onChange={(value) => handleChange(`id_${id}_type_${type}_lop`, value)}
            options={optionsAttr}
            parentId={"form-attr-search"}
            width={"150px"}
            height={"32px"}
          />
          <div
            className='treeselect'
            style={isIE ? { marginLeft: '169px', width: '398px' } : {}}
          >
            <TreeSelect
              labelWidth={50}
              data={getSelectList(classifiers)}
              showPartiallySelected={true}
              keepTreeOnSearch={true}
              keepChildrenOnSearch={true}
              tagMode={true}
              texts={{ placeholder: "Выбрать значение" }}
              values={getValues().includes(undefined) ? [] : getValues()}
              onSubmit={(values) => handleChange(
                `id_${id}_type_${type}_values`, 
                [...values.map(({ value }) => value)]
              )}
              mode={"multiSelect"}
              inlineSearchInput={true}
              allowedDoubles={true}
              height={"32px"}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};
