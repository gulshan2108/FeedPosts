import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { Button, Form ,Grid, Image} from 'semantic-ui-react'
import { addOpertaion } from '../Action/CreatePost';

const CreatePost=()=>{

    const dispatch=useDispatch()
    const history=useHistory()
    const { register, handleSubmit } = useForm();
    const Feeds=useSelector(state=>state.success)
    const [state,setState]=useState({
        id:0,
        userName:'',
        userImage:'',
        postImage:'',
        hashTags:'',
        like:0,
        comment:[],
        userPrevire:'',
        postPreview:'',
        saveList:[]
    })

    useEffect(()=>{
        const getId=()=>{
            if(localStorage.getItem("posts")){
                const id=JSON.parse(localStorage.getItem("posts"))
                setState({...state,id:id.length+1})
            }
            else{
                setState({...state,id:1})
                localStorage.setItem("id",1)
            }
        }
        getId()
    },[])

    useEffect(()=>{
        if(Feeds === true){
            history.push('/feeds')
        }
    },[Feeds])

    const handleProfile=async (event)=>{
        const file = document.querySelector('#upload-profile').files[0];
        console.log(await toBase64(file));
        setState({...state,
                userImage:[await toBase64(file)],
                userPrevire:URL.createObjectURL(event.target.files[0])
        })
    }

    const handlePostImg=async (event)=>{
        const file = document.querySelector('#upload-post').files[0];
        setState({...state,
                postImage:[await toBase64(file)],
                postPreview:URL.createObjectURL(event.target.files[0])
            })
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onSubmit=data=>{ 
        if(state.userName === ''){
            toast.error('Enter Username')
        }
        else if(state.userImage === ''){
            toast.error('Upload profile Image')
        }
        else if(state.postImage === ''){
            toast.error('Post shound not null')
        }
        else{
            const body={
                id:state.id,
                userName:state.userName,
                userImage:state.userImage,
                postImage:state.postImage,
                hashTags:state.hashTags,
                like:state.like,
                comment:state.comment,
                }
            dispatch(addOpertaion(body))
        }
    }

    return(
    <div className='post-div'>
        <ToastContainer theme='colored'/>
        <Form onSubmit={handleSubmit(onSubmit)} className='post-form'>
            <Form.Field>
            {state.userPrevire !== '' ?
                    <Image className='prfile-img' src={state.userPrevire} size='tiny' circular />
                    :
                    <>
                    <label>Profile Pic</label>
                    <input
                        type="file"
                        name="attachment"
                        id="upload-profile"
                        placeholder='user Profile'
                        onChange={handleProfile}
                    /> 
                    </>
                    }
            </Form.Field>
            <Form.Field>
                <label>User Name</label>
                <input 
                    placeholder='Name' 
                    value={state.userName}
                    onChange={(e)=>setState({...state,userName:e.target.value})}
                    />
            </Form.Field>
            <Form.Field>
            {state.postPreview !== '' ?
                <Image className='post-img' src={state.postPreview} size='medium' />
                :
                <>
                <label> Select Post</label>
                <input
                    type="file"
                    name="attachment"
                    id="upload-post"
                    placeholder='user Profile'
                    onChange={handlePostImg}
                />
                </>
                } 
            </Form.Field>
            <Form.Field>
            <label>what's in your mind</label>
                <input 
                    value={state.hashTags}
                    onChange={(e)=>setState({...state,hashTags:e.target.value})}
                />
            </Form.Field>
            <Button type="submit">submit</Button>
      </Form>
    </div>
    )
}

export default CreatePost