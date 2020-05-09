/**
 * Generic toolmethod that sends XML requests based on the parameters given.
 * @param {*} methode
 * @param {*} url
 * @param {*} [callbackFunction=null]
 * @param {*} [callbackContext=null]
 * @param {*} [dataToSent=null]
 * @returns
 */
function sentXMLRequest(methode, url, callbackFunction, callbackContext, dataToSent = null, returnErrorMessage = false) {
    var request = new XMLHttpRequest();
    request.open(methode, url, true);
    request.onload = function () {
        let response = "";
        if (request.response != "") {
            response = JSON.parse(request.response);
        }

        if (request.status == 200) {
            if(callbackFunction !==null)
            {
                callbackFunction(response, callbackContext);
            }         
        }
        else {
            console.error(request.status);
            console.error(response);
            if (returnErrorMessage) {
                callbackFunction(response, callbackContext);
            }
        }
    };

    if (dataToSent !== null) {
        request.send(dataToSent);
        return;
    }
    request.send();
}

export {sentXMLRequest}