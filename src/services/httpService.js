//var BASE_URL = "http://140.124.183.89:3000/" ;
var BASE_URL = "http://localhost:3000/" ;

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
					    showFailConnectionMessage();
				  }
			});

    },
    post: function(url,body){

        var options = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
            credentials : "include"
        };

        return fetch(baseUrl + url, options )
            .then(function(res){
                return checkStatus(res, "post") ;
            })
            .catch(function(error) {
                showFailConnectionMessage();
            });

    }
}

function showFailConnectionMessage(){
    /*API Server Connection Failed*/
    $.bigBox({
       title: "Server Connection Failed.",
       content: "Server connection failed please retry connecting.",
       color: "#C46A69",
       icon: "fa fa-warning shake animated",
       number: "1",
       timeout: 3000
    });
}

module.exports = HTTPService;
