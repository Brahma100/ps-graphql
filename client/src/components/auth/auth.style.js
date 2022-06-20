import styled, { keyframes } from "styled-components";

export const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;
export const ErrorMessage = styled.p`
  margin: 7px;
  color: red;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  max-width: 500px;
  width: 100%;
  margin: auto;
`;
export const Form = styled.form`
/* height: 250px; */
  width: 70%;
  min-width: 300px;
  border: 1px solid #dfdfdf;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
`;
export const Field = styled.div`
height:30px ;
  display: grid;
  grid-template-columns: 70px 4fr;
  grid-column-gap: 20px;
  align-items: center;
`;
export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;
// Add attributes
export const Input = styled.input.attrs((props) => ({
  type: props.type || "text"
}))`
  color: ${(props) => props.color || "#000"};
  outline: none;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  &:focus {
    border: 2px solid rgb(109, 106, 172) !important;
  }
`;
export const rotate = keyframes`
  from {
    color:greenyellow;
  }
  to {
    color:yellow;
  }
`;
export const Pre = styled.pre`
  animation: ${rotate} 2s linear infinite;
  width: 70%;
  color: #fff;
  font-size: larger;
`;
export const Message = styled.div`
  color: greenyellow;
`;
export const Button = styled.button`
  cursor: pointer;
  margin-top:20px ;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  border: none;
  margin-left: ${(props) => (props.ml_10 ? "10px" : "0px")};
  background: ${(props) =>
    props.danger ? "rgb(207, 31, 0)" : "rgb(1, 105, 1)"};
  &:hover {
    color: yellowgreen;
    background-clip: 10px;
  }
`;
