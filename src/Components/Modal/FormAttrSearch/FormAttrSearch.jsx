import React, { useEffect, useState, useMemo } from "react";
import './attrform.scss'
import { Label } from "../Header/Label";
import { Field } from "../Field/Field";

const FormAttrSearch = ({formElems, setSubmit, submit}) => {

  const loading = false;
  const [selected, setSelected] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  const { formElems: elems } = useMemo(
    () => formElems.body.find(({ tabId }) => tabId === activeTab) || [],
    [activeTab, loading]
  );

  // const source = isFilter ? filtersTmp : modalForm

  // useEffect(() => {
  //   if (isFilter) {
  //     dispatch(
  //       setPageParams({
  //         filtersTmp: {
  //           ...filtersTmp,
  //           search_tab_id: activeTab
  //         }
  //       })
  //     );
  //   } else {
  //     dispatch(handleInputChange("search_tab_id", activeTab));
  //   }
  // }, [activeTab]);

  useEffect(() => {
    setActiveTab(formElems.body[0]?.tabId);
  }, [formElems]);

  // useEffect(() => {
  //   if ( source.search_tab_id !== undefined && source.search_tab_id !== "" ) {
  //     if (isFilter && !Object.values(filters).length) {
  //       dispatch(overwritePageParams({
  //         filtersTmp: attrFormDefaultValues(formElems, source.search_tab_id)
  //       }))
  //     } else if (!isFilter) {
  //       dispatch(
  //         setAttrDefaultValues(attrFormDefaultValues(formElems, source.search_tab_id))
  //       )
  //     }
  //   }
  // }, [source.search_tab_id]);

  // useEffect(() => {
  //   if ( Object.keys(filters).length ) {
  //     dispatch(
  //       setPageParams({
  //         filtersTmp: filters
  //       })
  //     )
  //   }
  //   return () => dispatch(clearFiltersTmp())
  // }, []);

  // const handleChange = ({ target: { name, value } }) => {
  //   if (isFilter) {
  //     dispatch(
  //       setPageParams({
  //         filtersTmp: {
  //           [name]: value,
  //         },
  //       })
  //     );
  //   } else {
  //     dispatch(handleInputChange(name, value));
  //   }
  // };

  // const handleSelectedAttrsChange = ({ target: { selectedOptions } }) => {
  //   setSelectedAttrs([...selectedOptions].map((opt) => +opt.value));
  // };

  return (
    <div className={"attr-search"}>
      <div className={"kApp-box attr-search-sidebar"}>
        {!loading &&
          formElems.body.map(({ tabId, tabName }, i) => (
            <div
              onClick={() => setActiveTab(tabId)}
              key={i}
              className={`attr-search-sidebar_item${
                tabId === activeTab ? " active" : ""
              }`}
            >
              <span>{tabName}</span>
              
            </div>
          ))}
      </div>
      <div className="form-attr-search" id="form-attr-search">
        {/* {selectAttrs && (
          <select
            style={{ height: "180px" }}
            name="selectAttrs"
            className="custom-select it l-mb-s"
            value={selectedAttrs}
            onChange={handleSelectedAttrsChange}
            multiple
          >
            {!loading ? (
              (elems || []).map((attr, index) => (
                <option key={index} value={attr.id}>
                  {attr.customName || attr.name}
                </option>
              ))
            ) : (
              <Preloader height={'630px'} width={'90%'}/>
            )}
          </select>
        )} */}
        {!loading ? (
          (elems || []).map((attr, idx) => {
            // if (!selectAttrs || selectedAttrs.includes(attr.id)) {
              return (
                <div key={idx} className="row l-mb-s"> 
                  <Label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    name={attr.name}
                    customName={attr.customName}
                  />
                  <div> 
                    <Field
                    setSubmit={setSubmit}
                      id={attr.id}
                      index={idx}
                      type={attr.type}
                      selected={selected}
                      classifiers={attr.classifiers || []}
                      handleSelected={setSelected}
                      submit={submit}
                    />
                  </div>
                </div>
              );
            }
          )
        ) : <></>
          // <Preloader height={'630px'} width={'90%'} />
        }
      </div>
    </div>
  );
};


export default FormAttrSearch;