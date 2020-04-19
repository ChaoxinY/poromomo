import {sentXMLRequest,test} from "../lib/httpsRequestMethods.js";

export default class TaskDisplayer {

    // httpsRequests = new     
    displayTask()
    {
        sentXMLRequest("GET","../../api/test",this.displayResponse);
        test();
        console.log("hi");
    }    

    displayResponse(data, context = null)
    {
        console.log(data);
    }
}