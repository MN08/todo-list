import axios from 'axios';

import {TodoBody} from 'types/todos.type'

export const postTodo = async (data: TodoBody):Promise<void> => {
    try {
        
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/api/todos',
            data: data,
        })

    } catch (error) {
        throw(error)
    }
}