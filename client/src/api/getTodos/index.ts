import axios from "axios";

import { Todos } from "types/todos.type";

export const getTodos = async (): Promise<Todos> => {
    try{
        const res = await axios.get('http://localhost:5000/api/todos')

        return res.data

    }catch(err){
        throw(err)
    }
}