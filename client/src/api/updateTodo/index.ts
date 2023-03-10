import axios from 'axios'

import { getTodo } from 'api/getTodo'

import { TodoBody } from 'types/todos.type'
import { TodoStatus } from 'enum/todos.enum'

export const updateTodo = async (id: string): Promise<void> => {
  try {
    const getTodoRes = await getTodo(id)

    if (getTodoRes.status === 200) {
      const todo = getTodoRes.data.result
      const body: TodoBody = {
        title: todo.title,
      }

      // Toggle todo status
      todo.status === TodoStatus.completed ?
        body.status = 'uncompleted' :
        body.status = 'completed'

           await axios({
                method: 'PUT',
                url: `http://localhost:5000/api/todos/${id}`,
                data: body
            })
        }

    } catch (err) {
        throw(err)
    }
}