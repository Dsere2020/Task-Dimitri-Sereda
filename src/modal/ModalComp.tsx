import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styled from "styled-components";
import { useState } from "react";


interface Person {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  gender: string;
  id:number,
}

const Container = styled.div``;
const StyledModal = styled(Modal)`
  background-color: darkkhaki;
  border-radius: 20px;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  display: flex;
  justify-content: center;
  height: 450px;

`;
const StyledModalHeader = styled(ModalHeader)`
    button{
        height: 20px;
        width: 20px;
        cursor: pointer;
    }
`
const AddButton = styled.button`
  position: absolute;
  height: 30px;
  width: 90px;
  background-color: gray;
  bottom: 330px;
  cursor: pointer;
  border: none;
  left: 40px;
  border-radius: 5px;
  color: white;
`;

const StyledModalBody = styled(ModalBody)`
  height: 300px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
    Form{
        display: none;
    }
`;

const StyledForm = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 0.5em;
  background: lightcyan;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const Select = styled.select`
  width: 105%;
  background-color: lightcyan;
  height: 40px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  border: none;
`;

const ModalComp = ({ modal, setModal, modalClose }: {modal: boolean, setModal: (i:boolean)=>void, modalClose:(i:Person)=>void }): JSX.Element => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Not selected");
  const toggle = () => setModal(!modal)
  const id = 0;
  const handleChange = () => {
    modalClose({
      name,
      email,
      street,
      city,
      phone,
      gender,
      id,

      
    });
    setModal(!modal);
    setName("");
    setEmail("");
    setStreet("");
    setCity("");
    setPhone("");
    setPhone("");
    setGender("");
  };

  return (
    <Container>
      <AddButton onClick={toggle}>Add Person</AddButton>

      <StyledModal isOpen={modal} toggle={toggle}>
        <StyledModalHeader toggle = {toggle}>Add Your Information
        </StyledModalHeader>
        <StyledModalBody>
          <StyledForm>
            <Input
              required
              id="label"
              value={name}
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              required
              id="label"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select
              onChange={(e) => setGender(e.target.value)}
              name="Gender"
              value={gender}
            >
              <option value="Not selected">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">other</option>
            </Select>
            <Input
              id="label"
              value={street}
              style={{marginTop: "5px"}}
              placeholder="Add Your Street Address"
              onChange={(e) => setStreet(e.target.value)}
            />
            <Input
              required
              id="label"
              value={city}
              placeholder="Add Your City "
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              id="label"
              placeholder="Add Your Phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </StyledForm>
        </StyledModalBody>
        <ModalFooter>
          <Button  onClick={handleChange}>
            Add
          </Button>   
          <Button  onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </StyledModal>
    </Container>
  );
};

export default ModalComp;
