import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useStore from "./store";

import ModalComp from "./modal/ModalComp";
import EditPerson from "./EditPerson/EditPerson";
import PieChartComp from "./Chart/PieChartComp";

interface Person {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  gender: string;
  id: number;
}
interface PersonPlusAddress {
  address: Address;
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  gender: string;
  id: number;
}
interface Address {
  city: string;
  street: string;
}

interface UseStoreProps {
  loading: boolean;
  fetch: () => Promise<void>;
  removePerson: (id: number) => void;
  addPerson: (person: Person) => void;
  updatePerson: (person: Person) => void;
}

const TableData = (): JSX.Element => {
  const fetchData = useStore((state: UseStoreProps) => state.fetch);
  const data = useStore((state) => state.data);
  const removePerson = useStore((state: UseStoreProps) => state.removePerson);
  const deleteHandler = (id: number): void => {
    removePerson(id);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addPerson = useStore((state: UseStoreProps) => state.addPerson);

  const modalClose = (response: Person) : void=> {
    if (response) {
      addPerson({
        name: response.name,
        email: response.email,
        phone: response.phone,
        street: response.street,
        city: response.city,
        gender: response.gender,
        id: response.id,
      });
    }
  };

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("Not selected");
  const [id, setId] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const perPage: boolean = true;

  const [change, setChange] = useState<boolean>(false);

  const doubleClickChange = (row: PersonPlusAddress) => {
    setName(row.name);
    setEmail(row.email);
    setStreet(row.address.street);
    setCity(row.address.city);
    setPhone(row.phone);
    setGender(row.gender);
    setChange(!change);
    setId(row.id);
  };

  const columns: object[] = [
    {
      name: "Name",
      selector: (row: Person) => row.name,
    },
    {
      name: "Email",
      selector: (row: Person) => row.email,
    },
    {
      name: "Gender",
      selector: (row: Person) => row.gender,
    },
    {
      name: "Street",
      selector: (row: PersonPlusAddress) => row.address.street,
    },
    {
      name: "City",
      selector: (row: PersonPlusAddress) => row.address.city,
    },
    {
      name: "Phone",
      selector: (row: Person) => row.phone,
    },

    {
      name: "Delete Row",
      cell: (row: { id: number }) => (
        <>
          <button
            onClick={() => {
              deleteHandler(row.id);
            }}
          >
            Delete
          </button>
        </>
      ),
    },
  ];
  console.log(change);
  return (
    <div>
      <ModalComp modal={modal} setModal={setModal} modalClose={modalClose} />

      <DataTable
        title="Data"
        columns={columns}
        data={data}
        pagination={perPage}
        onRowDoubleClicked={doubleClickChange}
      />

      <PieChartComp fetchData={data} city={city} />

      {change && (
        <EditPerson
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          city={city}
          setCity={setCity}
          street={street}
          setStreet={setStreet}
          gender={gender}
          setGender={setGender}
          id={id}
          setChange={setChange}
        />
      )}
    </div>
  );
};

export default TableData;
