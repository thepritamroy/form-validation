import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "../api/axios";

interface USERS {
  id: number,
  username : string,
  roles : string[]
}
const Users = () => {
    const [users, setUsers] = useState<USERS[]>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await fetch("https://backend-practice-five.vercel.app/api/users", {
                  headers: {
                    Authorization: `Bearer Prita-access-token`,
                  },
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setUsers((await response.json()).users);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;