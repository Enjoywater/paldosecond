import React from "react";
import { TypeBtn } from "./styles";

export const handlePlace = (title, state, setState) => {
  setState({
    ...state,
    [title]: !state[title],
  });
};

export const selectedBtn = (state, setState) => (
  <>
    {Object.keys(state)
      .filter((key) => state[key])
      .map((item, i) => (
        <TypeBtn
          key={i}
          onClick={() => handlePlace(item, state, setState)}
          clicked={state[item]}
        >
          {item}
        </TypeBtn>
      ))}
  </>
);

export const unSelectedBtn = (state, setState) => (
  <>
    {Object.keys(state)
      .filter((key) => state[key] === false)
      .map((item, i) => (
        <TypeBtn
          key={i}
          onClick={() => handlePlace(item, state, setState)}
          clicked={state[item]}
        >
          {item}
        </TypeBtn>
      ))}
  </>
);

export const selectedSortItem = (state) =>
  Object.keys(state).filter((item) => state[item]);
