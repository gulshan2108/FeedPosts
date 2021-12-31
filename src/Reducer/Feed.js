const Feed=(
    state={
        success:false,
        fail:false,
        feedList:[]
    },
    action
)=>{
    switch(action.type){
        case "added success":
            localStorage["posts"] = JSON.stringify(action.payload);
            return{
                ...state,
                fail:false,
                success:true,
                feedList:localStorage.getItem("posts")
            }
            case "fetch data":
            const allPost=JSON.parse(localStorage.getItem("posts"))
            return{
                ...state,
                fail:false,
                success:false,
                feedList:allPost
            }
            default: break
    }
    return state
}

export default Feed