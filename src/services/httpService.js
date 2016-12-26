var BASE_URL = "http://140.124.183.89:3000/" ;
// var BASE_URL = "http://localhost:3000/" ;

var HTTPService = {

    get: function(url, callback) {

        $.ajax({
            method: 'GET',
            url : BASE_URL + url,
            contentType: 'application/json',
    				success: function(res) {
                callback(res);
    				},
  				  error: function(error) {
  					    showFailConnectionMessage(error);
  				  }
			  });

    },
    post: function(url, body, callback){

        $.ajax({
            method: 'POST',
            url : BASE_URL + url,
            data : body,
            success: function(res) {
                callback(res);
            },
            error: function(error) {
                console.log(error);
                showFailConnectionMessage(error);
            }
        });
    }
}

function showFailConnectionMessage(error){

    var title = "";
    var content = "";

    switch(error.status){
        case 401 :
            title = "Login Failed.";
            content = "Please check your email and password and try again."
        break;
        default :
            title = "Server Connection Failed.";
            content = "Server connection failed please retry connecting.";
        break;
    }

    $.bigBox({
       title: title,
       content: content,
       color: "#C46A69",
       icon: "fa fa-warning shake animated",
       number: "1",
       timeout: 3000
    });
}

module.exports = HTTPService;
