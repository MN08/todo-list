import React from 'react';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryCache } from 'react-query';

import { postTodo } from 'api/postTodo';

import { Transition } from 'react-transition-group';

import CloseSvgComponent from 'assets/svg/close';

type Props = {
    inProp: boolean,
    onClose: () => void,
}

type Inputs = {
    title: string,
    status: 'completed' | 'uncompleted',
}

const DURATION = 240

const formDefaultStyle = {
    transition : `bottom ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
    opacity: 0,
    bottom: '-180px',
}

const formTransitionStyle = {
    unmounted : {bottom: '-180px', opacity:0},
    entering : {bottom: 0, opacity:1},
    entered : {bottom: 0, opacity:1},
    exiting : {bottom: '-180px', opacity:0},
    exited : {bottom: '-180px', opacity:0},
}

const overlayDefaultStyle = {
    transition : `bottom ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
    opacity: 0,
    display: 'none'
}

const overlayTransitionStyle = {
    unmounted : {bottom: '-180px', opacity:0},
    entering : {display: 'block', opacity:.85},
    entered : {display: 'block', opacity:.85},
    exiting : {bottom: '-180px', opacity:0},
    exited : {bottom: '-180px', opacity:0},
}

const Form: React.FC<Props> = ({inProp,onClose}) => {
    const cache =useQueryCache()
    const { register, handleSubmit, errors, reset} = useForm<Inputs>()

    const [mutate] = useMutation(postTodo,{
        onSuccess: () =>{
            cache.invalidateQueries('todos')
        }
    })

    const onSubmit = async (data: Inputs): Promise<void> => {
        try {

            await mutate(data)
            reset()
            
        } catch (error) {
            throw(error)
        }
    }

    const handleOnClose = () => {
        reset()
        onClose()
    }

    const placeHolderStyle = classnames('text-darkPurple flex-1 bg-transparent outline-none',{
        'placholder-red-300': errors.title
    })

    const inputStyle = classnames('flex justify-center items-center bg-gray-300 px-4 py-2 rounded-lg box-border',{
        'bg-red-300': errors.title
    })

    return(
       <Transition in={inProp} timeout={DURATION}>
        {(state) => (
            <>
            <div
                onClick={onClose}
                style={{
                    ...overlayDefaultStyle,
                    ...overlayTransitionStyle[state]
                }}
                className="fixed left-0 top-0 bottom-0 right-0 bg-black"
            />
            <div
            style={{
                ...formDefaultStyle,
                ...formTransitionStyle[state],
            }}
            className="fixed flex flex-col z-10 inset-x-0 rounded-t-lg p-4 h-32 bg-white">
            <form
            onSubmit={handleSubmit(onSubmit)}
            className={inputStyle}>
                <input
                ref={register({
                    required: {
                        value: true,
                        message: "this field is required",
                    },
                    minLength:{
                        value: 8,
                        message: "minimum length 8 characters",
                    },
                    maxLength:{
                        value: 50,
                        message: "maximum length 50 characters"
                    }
                })}
                name='title'
                placeholder={errors.title ? 'ooops..' : 'What you wanna do ?'}
                className={placeHolderStyle} />

                <input ref={register} name='status' defaultValue='uncomplated' className='hidden' />

                {errors.title ? (
                <button
                onClick={() => reset()}
                className='bg-transparent text-md font-bold text-darkPurple outline-none ml-1'>
                    Reset
                </button>
                ) : (
                <input
                    type='submit'
                    value='Add'
                    className='bg-transparent text-md font-bold text-darkPurple outline-none ml-1'/>
                )}

            </form>
            {errors.title && (
                <span className='text-xs text-red-800 font-semibold tracking-wide mt-2 pl-1'>{errors?.title?.message}</span>
            )}

            <span
            onClick={handleOnClose}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
                bottom:'10px',
                left:'50%'
            }}>
                <CloseSvgComponent/>
            </span>
        </div>
            </>
        )}
       </Transition>
    )
}

export default Form