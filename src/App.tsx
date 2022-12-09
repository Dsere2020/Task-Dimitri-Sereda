import "./App.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useStore from "./store";
import TableData from "./TableData";


interface arrayPart {
  name: string;
  id: number;
  email: string;
  gender: string;
  phone: string;
  address: any;
}

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  background-color: darkcyan;
 
`




function App(): JSX.Element {

  
  return (
    <Container>
     
     <TableData/>
   
    </Container>
  )
}

export default App;
