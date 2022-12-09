import React from "react";
import styled from "styled-components";
import useStore from "../store";

interface Props {
  name: string;
  setName: (i: string) => void;
  email: string;
  setEmail: (i: string) => void;
  phone: string;
  setPhone: (i: string) => void;
  city: string;
  setCity: (i: string) => void;
  street: string;
  setStreet: (i: string) => void;
  gender: string;
  setGender: (i: string) => void;
  id: number;
  setChange: (i: boolean) => void;
}
interface ResProps {
  name: string;
  email: string;
  phone: string;
  city: string;
  street: string;
  gender: string;
  id: number;
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 80px;
  height: 300px;
  width: 40%;
  background-color: darkkhaki;
  display: flex;
  flex-direction: column;
`;

const EditPerson = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  city,
  setCity,
  street,
  setStreet,
  gender,
  setGender,
  id,
  setChange,
}: Props): JSX.Element => {
  const updatePerson = useStore((state) => state.updatePerson);
  const edit = (res: ResProps) => {
    updatePerson({
      name: res.name,
      email: res.email,
      phone: res.phone,
      street: res.street,
      city: res.city,
      gender: res.gender,
      id: res.id,
    });
    setChange(false);
  };
  return (
    <Container>
      <form>
        <input
          id="label"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="label"
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          onChange={(e) => setGender(e.target.value)}
          name="gender"
          value={gender}
        >
          <option value="Not selected">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">other</option>
        </select>
        <input
          id="label"
          value={street}
          placeholder="Enter Your Street Address"
          style={{ marginTop: "5px" }}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          id="label"
          value={city}
          placeholder="Enter Your City Address"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          id="label"
          placeholder="Enter Your Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </form>
      <button
        onClick={() =>
          edit({
            name,
            email,
            phone,
            street,
            city,
            gender,
            id,
          })
        }
      >
        Save
      </button>
    </Container>
  );
};

export default EditPerson;
