import { Trash } from "lucide-react";

  type users = {
    id: string;
    name: string;
    age: string;
    email: string;
  };

type UsersListProps = {
    users: users[];
    deleteUsers: (id:string) => void
}


export default function UsersList({users, deleteUsers}: UsersListProps) {
    return (
        <div className="flex justify-center">
            <div>
                {users.map((users) => (
                    <div className="w- justify-center flex gap-5 border-2 items-center rounded-sm p-2 m-4" key={users.id}>
                        <p 
                        className="border p-2 rounded bg-green-900">
                            {users.name}</p>
                        <p 
                        className="border p-2 rounded bg-green-900">
                            {users.age}</p>
                        <p 
                        className="border p-2 rounded bg-green-900">
                            {users.email}</p>
                        <Trash className="cursor-pointer" onClick={() => deleteUsers(users.id)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}