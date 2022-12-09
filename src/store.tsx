import create from "zustand";
import React from "react";
import axios from "axios";

interface Person{
  name:string,
  email:string,
  phone:string,
  street:string,
  city:string,
  gender:string,
  id:number,
}
interface UseStoreProps{
  data:any[],
  loading: boolean,
  fetch:()=>Promise<void>
  removePerson:(id:number) => void
  addPerson:(person:Person) => void,
  updatePerson:(person:Person)=>void,
  
}


const useStore = create<UseStoreProps>((set) => ({
  data: [],
  loading: false,
  hasErrors: false,

  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get("http://localhost:3001/");
      set({ data: await response.data, loading: false });
    } catch (error) {
      console.log(error);
    }
  },
  removePerson: (id) =>
    set((state) => ({
      data: state.data.filter((person: Person) => person.id !== id),
    })),
  addPerson: (person) =>
    set((state) => ({
      data: [
        {
          name: person.name,
          id: new Date().getUTCMilliseconds(),
          email: person.email,
          address: {
            street: person.street,
            city: person.city,
          },
          phone: person.phone,
          gender: person.gender,
        },
        ...state.data,
      ],
    })),
  updatePerson: (person) =>
    set((state) => ({
      data: state.data.map((item) => {
        if (item.id === person.id) {
          return {
            name: person.name,
            id: person.id,
            email: person.email,
            address:{
              street: person.street,
              city: person.city,
            },
          
            phone: person.phone,
            gender: person.gender,
          };
        } else {
          return item;
        }
      }),
    })),
}));
export default useStore;
