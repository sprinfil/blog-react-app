import React, { useState } from 'react';
import Posts from './Posts.jsx';
import PostForm from './PostForm.jsx';

const PostContainer = () => {

    const [opciones, setOpciones] = useState([
        {
            title: "Mis Posts",
            selected: true,
            element: <Posts />
        },
        {
            title: "Nuevo Post",
            selected: false,
            element: <PostForm />
        }
    ])
    console.log(opciones);

    const change_selected = (index) => {
        const newarray = [...opciones];
        newarray.map((opcion, index) => {
            opcion.selected = false;
        })
        newarray[index].selected = true;
        setOpciones(newarray);
        console.log(opciones);
    }

    return (
        <div>
            <div className='view-menu-container'>
                {
                    opciones.map((opcion, index) => (
                        <div key={index}>
                            <div className='view-menu-btn' key={index} onClick={() => change_selected(index)}>
                                {opcion.title}
                                {opcion.selected &&
                                    <div className='underline-selected sizeChange' key={index}></div>
                                }
                            </div>
                        </div>
                    ))
                }
                
            </div>
            <div className='w-full h-[1px] bg-gray-100'></div>
            {
                opciones.map((opcion, index) => (
                    <div>
                        {opcion.selected &&
                            opcion.element
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default PostContainer