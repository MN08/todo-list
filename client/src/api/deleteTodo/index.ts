import axios from 'axios';

export const deleteTodo = async (id: string): Promise<void> =>{
    try {
        await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/todos/${id}`,
        })
    } catch (error) {
        throw error
    }
}