import axios, {AxiosResponse} from "axios";

import { GetTodoResult } from 'types/todos.type';

export const getTodo = async (id:string): Promise<AxiosResponse<GetTodoResult>> =>{
    try{
        const res = await axios({
            method: 'GET',
            url: `http://localhost:5000/api/todos/${id}`,
        })

        return res

    }catch(err){
        throw(err)
    }
}