



/**
 * Returns the ID input in a clearner form.
 * @param id - potentially invalid id
 * @returns cleand up form of id
 */
function getValidId(id) {
    return id.replace(" ","_");
}


function ajax(loc,suc,err,tpe,data,run) {
    //Defaults
    if (err === undefined)
        err = function(){};
    if (tpe === undefined)
        tpe = "GET";
    if (run === undefined)
        run = function(){};
    if (data === undefined)
        data = {};
    //Load configuration and setup page
    $.ajax(
        {
            url: loc,
            success: function(resp) {
                    if (resp == null)
                        resp = {};
                    //Print system responces
                    if ("ste" in resp && resp["ste"] != "")
                        GlobalLogger.error("Application Standard Error:"+resp["ste"]);
                    if ("sto" in resp && resp["sto"] != "")
                        GlobalLogger.error("Application Output:"+resp["sto"]);
                    if ("error" in resp) {
                        err(resp);
                        GlobalLogger.error(resp["error"]);
                    } else { 
                        suc(resp);
                    }
                },
            error: function(resp) {
                    GlobalLogger.error("Error loading: "+loc);
                    err(resp)
                },
            beforeSend: run,
            type: tpe,
            data: data,
            dataType: "json"
        }); 

}



