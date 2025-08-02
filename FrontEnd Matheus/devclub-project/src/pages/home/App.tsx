import UsersList from "../../components/Users-List";
import "./App.css";
import api from "../../services/api.ts";
import { useEffect, useState, useRef } from "react";

function App() {
  type users = {
    id: string;
    name: string;
    age: string;
    email: string;
  };

const inputName = useRef<HTMLInputElement>(null);
const inputAge = useRef<HTMLInputElement>(null);
const inputEmail = useRef<HTMLInputElement>(null);

  const [users, setUsers] = useState([]);

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
    console.log(users);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current?.value || "",
      age: inputAge.current?.value || "",
      email: inputEmail.current?.value || "",
    });

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, );

  async function deleteUsers(id: string) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="Container  bg-green-700 rounded-3xl m-5 p-8 font-mono w-auto ">
        <form className="flex items-center flex-col ">
          <h1 className="py-5">Cadastro de Usuários</h1>

          <input
            className="border-2 rounded-sm p-2 m-3 "
            type="text"
            name="nome"
            placeholder="Nome"
            ref={inputName}
          />

          <input
            className="border-2 rounded-sm p-2 m-3 "
            type="text"
            name="idade"
            placeholder="Idade"
            ref={inputAge}
          />

          <input
            className="border-2 rounded-sm p-2 m-3 "
            type="email"
            name="email"
            placeholder="email"
            ref={inputEmail}
          />

          <button
            type="button"
            onClick={() => createUsers()}
            className="px-10 py-4"
          >
            Cadastrar
          </button>
        </form>
      </div>

      <UsersList users={users} deleteUsers={deleteUsers}/>
    </div>
  );
}

export default App;
