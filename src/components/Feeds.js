import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Image, Segment, Header, Pagination, Form, Button, Input} from 'semantic-ui-react'
import {editLikes, editOpertaion, successFetch} from '../Action/CreatePost'

const Feeds=()=>{

    const dispatch=useDispatch()
    const feeds=useSelector(state=>state.feedList)
    const [state,setState]=useState({
        feeds:[],
        activePage:1,
        totalPage:0,
        copyFeed:[],
        open:false,
        id:0,
        favCount:0
    })
    const[pagedata,setPageData]=useState([])

    useEffect(()=>{
        fetchFeeds()
        if(localStorage.getItem("fav")){
            setState({...state,favCount:localStorage.getItem("fav")})
        }
    },[])

    useEffect(()=>{
        getPaginationGroup()
    },[feeds,state.activePage])

    useEffect(()=>{
        getPages()
    },[feeds])

    const fetchFeeds=()=>{
        dispatch(successFetch())
    }

    const getPages=()=>{
        if(feeds && feeds.length > 0)
        setState({...state,totalPage:feeds.length/3,feeds:feeds, copyFeed:feeds})
    }

    const getnewPage=(e)=>{
        setState({...state,activePage:e.target.innerText})
    }

    const getPaginationGroup = () => {
        if(feeds && feeds.length > 0){
        setState({...state,id:'', open:false})
        const data=[]
        let start =state.activePage * 3 - 3;
        const endIndex = start + 3;
        for(var i=start;i<=endIndex-1;i++){
            if(feeds[i] !== undefined){
                data.push(feeds[i])
            }
        }
        setPageData(data)
        }
      }

      const saveComment=(e,id, index)=>{
        const feed=state.feeds
        const data=pagedata[index]
        index=feeds.indexOf(data)
        data.comment.push(state.comment)
        feed.splice(index,1,data)
        dispatch(editOpertaion(feed))
        setState({...state,id:'',open:false,comment:''})
        fetchFeeds()
      }

      const addLikes=(e,id,index)=>{
        const feed=state.feeds
        const data=pagedata[index]
        data.like=data.like+1
        index=feeds.indexOf(data)
        feed.slice(index,1,data)
        dispatch(editLikes(feed))
        fetchFeeds()
      }

      const searchSource=(event)=>{
        event.preventDefault();
		const list=state.copyFeed.filter(
            (e)=>
            e.userName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            e.hashTags.toLowerCase().includes(event.target.value.toLowerCase())
            )
        setPageData(list)
    }

    const setFavCount=(e)=>{
        setState({...state,favCount:state.favCount+1})
        localStorage.setItem("fav",state.favCount)
    }

    return(
    <div className='main'>
    <div className='top-div'>
        <Input 
            className='name-search' 
            icon='search' 
            iconPosition='left' 
            placeholder='Search...' 
            onChange={(e)=>searchSource(e)}
        />
        <span className='like-span'>{state.favCount}</span>
       <i class="big bookmark icon" onClick={(e)=>setFavCount(e)}></i>
    </div>
    {
        pagedata && pagedata.length > 0 ? pagedata.map((data,index)=>{
            return(
                <>
                <Segment className='feed-div'>
                <div>
                    <div className='img-div'>
                        <Image src={data.userImage} size='mini' circular  className='feed-img'/>
                        <span className='name-div'>{data.userName}</span>
                    </div>
                    <Divider></Divider>
                        <Image src={data.postImage} size='medium' centered className='post-image'/>
                        <Divider></Divider>
                        <span className='hash'>{data.hashTags}</span>
                        <Divider />
                        <div className='icon-div'>
                            <ul className='icon-ui'>
                                <li className='icon-li'>
                                    <span className='like-span'>{data.like}</span>
                                    <i class="large heart outline icon lis"
                                        onClick={(e)=>addLikes(e,data.id,index)}>
                                    </i>
                                </li>
                                <li className='icon-li'>
                                    <span className='like-span'>{data.comment && data.comment.length}</span>
                                    <i class="large comment outline icon lis"
                                        onClick={(_e)=>setState({...state,open:true,id:index})}>
                                    </i>
                                </li>
                                <li className='icon-li'>
                                    <i class="large share alternate icon"></i>
                                </li>
                                <li className='icon-li'>
                                    <i class="large bookmark outline icon"
                                        onClick={(e)=>setState({...state,favCount:state.favCount+1})}></i>
                                </li>
                            </ul>
                        </div>
                        {state.open && state.id===index &&
                            <div className='comment'>
                            <Form.Field className='field-inpt'>
                                <input placeholder='Comment' className='comm-field' onChange={(e)=>setState({...state,comment:e.target.value})}/>
                            </Form.Field>
                            <Button  primary onClick={(e)=>saveComment(e,data.id,index)} >save</Button>
                            </div>
                        }
                        {data.comment && data.comment.map(body=>{
                            return(<>
                            <ul className='comment-list'>
                                <li className='comment-item'>
                                <Image src={data.userImage} size='mini' circular/>
                                </li>
                                <li className='comment-item-two'>{data.userName}:</li>
                                <li className='comment-item'>{body}</li>
                            </ul>
                            </>)
                        })}
                </div>
                </Segment>
                </>
            )
        })
        :
        <h3>No Feeds Found</h3>
    }
    {pagedata.length > 0 && 
        <Pagination
            boundaryRange={0}
            defaultActivePage={state.activePage}
            firstItem={null}
            lastItem={null}
            totalPages={state.totalPage}
            onClick={(e)=>getnewPage(e)}
        />
    }
    </div>
    )
}

export default Feeds