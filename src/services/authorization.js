module.exports = function(props, callback){

    if(!window.localStorage.getItem("name")){
        props.history.push("login");
        callback();
    }else{
        callback();
    }
}
