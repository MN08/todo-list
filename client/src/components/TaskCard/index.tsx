import React, {useState} from "react";
import classnames from "classnames";
import { useMutation,useQueryCache } from "react-query";
import { updateTodo } from "api/updateTodo";
import { deleteTodo } from "api/deleteTodo";

import DeleteModal from "components/DeleteModal";

import ChecklistSvgComponent from "assets/svg/checklist";
import TrashSvgComponent from "assets/svg/trash";
import ClockSvgComponent from "assets/svg/clock";


type Props = {
  taskId: string,
  title: string,
  status: 'completed' | 'uncompleted'
}

const TaskCard: React.FC<Props> = ({ title, taskId, status }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const cache = useQueryCache()

  const [checkTodo, { isLoading }] = useMutation(updateTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

    const [removeTodo] = useMutation(deleteTodo,{
        onSuccess: () =>{
            cache.invalidateQueries('todos')
        }
    })

    const handleRemoveTodo = (type: 'delete' | 'cancel') => {
        if(type === 'delete'){
            removeTodo(taskId)
            setShowDeleteModal(false)
        }
        if(type === 'cancel'){
            setShowDeleteModal(false)
        }
    }

    const containerClass = classnames('flex justify-center items-center relative rounded shadow-lg p-4 mb-2',{
        'bg-white bg-opacity-50': status === 'completed',
        'bg-white text-darkPurple': status === 'uncompleted',
    })

    const titleClass = classnames('flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate',{
        'line-through': status === 'completed'
    })

    const checkListClass = classnames('w-5 h-5 ml-4',{
        'text-red-400': status === 'completed',
        'text-red-600': status === 'uncompleted',
    })

    return(
        <div className={containerClass}>
            <p className={titleClass}>
                {title}
            </p>

            <div className="flex text-darkPurple">
               <span>
                    {isLoading ? (
                    <ClockSvgComponent />
                    ): (
                    <ChecklistSvgComponent className={checkListClass} onClick={() => checkTodo(taskId)} />
                    )}
                </span>
                <span className="w-5 h-5 ml-4 text-red-700">
                    <TrashSvgComponent onClick={() => setShowDeleteModal(true)}/>
                </span>
            </div>
            
            <DeleteModal
                inProp={showDeleteModal}
                taskStatus={status}
                onDelete={() => handleRemoveTodo('delete')}
                onCancel={() => handleRemoveTodo('cancel')} 
            />
        </div>
    )
}

export default TaskCard