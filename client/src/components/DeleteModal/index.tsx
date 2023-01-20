import React from 'react';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';

import CloseSvgComponent from 'assets/svg/close';

type Props = {
    inProp: boolean,
    taskStatus: 'completed' | 'uncompleted',
    onDelete: () => void,
    onCancel: () => void
}

const DURATION = 300;

const defaultStyle = {
    transistion: `all ${DURATION}ms ease-in-out`,
    opacity: 0,
    display: 'none',
    left: '50%',
    top: '50%',
}

const transitionStyles = {
    unmounted: {opacity: 0, display: 'none'},
    entering: {opacity: 1, display: 'block'},
    entered: {opacity: 1, display: 'block'},
    exiting: {opacity:0, display: 'none'},
    exited: {opacity:0, display: 'none'}
}
const DeleteModal: React.FC<Props> = ({inProp, taskStatus, onDelete, onCancel}) => {
    
const buttonDeleteStyles = classnames("text-white text-sm tracking-wide font-bold px-4 py-2 rounded-lg",{
    'bg-red-700': taskStatus === "uncompleted",
    'bg-green-300': taskStatus === "completed",

})
    return(
        <Transition in={inProp} timeout={DURATION}>
        {(state)=>(
            <div className="bg-white p-4 h-40 w-64 rounded-lg fixed z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
            style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}>
                <div className="flex flex-col h-full justify-between">
                    <section className="flex flex-row justify-between">
                        <p className="text-darkPurple text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal">
                            {taskStatus==='uncompleted' && 'this Task is not completed, delete it?'}
                            {taskStatus==='completed' && 'bye bye task'}
                            {taskStatus==='uncompleted' &&(
                                <p className="text-2xl">
                                    &#128548;
                                </p>
                            )}
                            {taskStatus==='completed' &&(
                                <p className="text-2xl">
                                    &#128540;
                                </p>
                            )}
                        </p>
                        <CloseSvgComponent onClick={onCancel}/>
                    </section>

                    <button
                    onClick={onDelete}
                    className={buttonDeleteStyles}>
                        {taskStatus==='uncompleted' ? 'delete completed task' : 'delete uncompleted task'}
                    </button>
                </div>
            </div>
        )}
        </Transition>
    )
}

export default DeleteModal