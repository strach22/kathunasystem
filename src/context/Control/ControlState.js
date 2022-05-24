import { useReducer } from "react";

import PropTypes from "prop-types";

import institutionInfo from "../../data/institutionInfo.json";
import ControlContext from "./ControlContext";

function reducer(state, action) {
  switch (action.type) {
    case "UPLOAD_INFO":
      return { ...state, institutionInfo: action.value };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function ControlState({ children }) {
  const initialstate = {
    institutionInfo,
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  const uploadInfo = (info) => {
    const newInfo = info;
    dispatch({
      type: "UPLOAD_INFO",
      value: newInfo,
    });
  };

  return (
    <ControlContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        institutionInfo: state.institutionInfo,
        uploadInfo,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
}

ControlState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ControlState;
