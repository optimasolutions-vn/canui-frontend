import React, { useState } from "react";
 
function BlockInput(props) {
  const [inputList, setInputList] = useState([{ quest: "", asw: "" }]);
 
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    if(typeof props.actionRemove === 'function'){
      props.actionRemove();
    }
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { quest: "", asw: "" }]);
    if(typeof props.actionAdd === 'function'){
      props.actionAdd();
    }
  };
  React.useEffect(() => {
    if(props.defaultValue){
       setInputList(props.defaultValue);
    }
  }, [props.defaultValue]);
  React.useEffect(() => {

    if(typeof props.dataCallBack === 'function'){
      props.dataCallBack(inputList);
    }
  }, [inputList]);
 
  return (
    <div className="block">
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <div className="info-box">
              <input
                className="with-border"
                name="quest"
                placeholder="Quest"
                value={x.quest}
                onChange={e => handleInputChange(e, i)}
              />
              <textarea
                className="with-border"
                cols="30"
                rows="5"
                name="asw"
                placeholder="Answer"
                value={x.asw}
                onChange={e => handleInputChange(e, i)}
              />
            </div>
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="button"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
            </div>
          </div>
        );
      })}
      {<button type="button" className="button" onClick={handleAddClick}>Add New</button>}
      
    </div>
  );
}
 
export default BlockInput;