const arr=JSON.parse(localStorage.getItem("posts"));

export const addOpertaion=(data)=>{
    const arr=JSON.parse(localStorage.getItem("posts"));
    return (dispatch)=>{
        if(arr!== null){
            arr.unshift(data)
            dispatch(successAdded(arr))
        }
        else{
            const post=[]
            post.unshift(data)
            dispatch(successAdded(post))
        }
    }
}

export const editOpertaion=(data)=>{
    return(dispatch)=>{
        dispatch(successAdded(data))
    }
}

export const editLikes=(data)=>{
    return(dispatch)=>{
        dispatch(successAdded(data))
    }
}

export const successAdded=(arr)=>{
    return {
        type:"added success",
        payload:arr
    }
}

export const successFetch=()=>{
    return {
        type:"fetch data",
    }
}