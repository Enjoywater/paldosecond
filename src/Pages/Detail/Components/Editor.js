import React, { useState } from "react";
import styled from "styled-components";

const Editor = ({ detail, title }) => {
  const { editor_note, description } = Object.keys(detail) && detail;

  return (
    <>
      {Object.keys(detail).length > 0 &&
        (editor_note ? (
          <Container>
            <EditorNote id="editorNote">
              <p>EDITOR NOTE</p>
              {editor_note}
            </EditorNote>
            {description?.map((text, i) => {
              return (
                <Propos key={i}>
                  <p>{title[i]}</p>
                  {text}
                </Propos>
              );
            })}
          </Container>
        ) : null)}
    </>
  );
};

export default Editor;

const Container = styled.div`
  ${({ theme }) => theme.flex("center", "center", "column")}
  margin: 30px auto 0 auto;
  padding: 32px 150px;
  width: 1216px;
  background-color: #f7f3f0;
`;

const EditorNote = styled.div`
  margin: 8px 0;
  text-align: center;
  font-size: 42px;
  color: #6b3a0b;
  p {
    margin: 16px 0;
    font-size: 14px;
    color: #6b3a0b;
  }
`;
const Propos = styled.div`
  line-height: 1.3;
  text-align: center;
  font-size: 18px;
  p {
    margin: 17px 0;
    font-size: 26px;
    color: #6b3a0b;
  }
`;
