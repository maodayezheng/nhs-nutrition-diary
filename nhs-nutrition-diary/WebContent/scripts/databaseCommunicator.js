function Request(headers,data,method,url) {
   this.headers = headers;
   // keys used to retrieve data should set in headers, headers should be a JSON Object
   this.data = data;
   //data "POST" to database, should be a JSON object  	
   this.method =method;
   // method should be "GET" "POST" "PUT" "DELETE"
   this.url = url;
}

function updateData(request){
	 try {
      $.ajax({
         type: request.method,
         url: request.url,
         data: request.data,
         headers: request.headers,
         async: false,
         mimeType: request.binary ? 'text/plain; charset=x-user-defined' : null,
         success: function (response, status, data) {

           	console.log("Successfully send data ");

         },
         error: function (response, status, error) {

            handleHTTPError(response);
         }
      });
   } catch (e) {
      handleException(e);
   }
}



function getResponse(request){

	try {
      $.ajax({
         type: request.method,
         url: request.url,
         data: "",
         headers: request.headers,
         async: false,
         mimeType: request.binary ? 'text/plain; charset=x-user-defined' : null,
         success: function (response, status, data) {

           	console.log("get new data");
           	return response;
         },
         error: function (response, status, error) {
            handleHTTPError(response);
         }
      });
   } catch (e) {
      handleException(e);
   }
}