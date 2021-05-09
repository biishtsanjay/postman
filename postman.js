console.log("hey");

// utility functions
// 1. utility function to get DOM element from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// initialize param Count
let addedParamCount = 0;


// hide the parameterrs box initially 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = "none";

// if the user clicks on params radio, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parametersBox').style.display = "block";
});

// if the user clicks on json radio , hide params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = "block";
    document.getElementById('parametersBox').style.display = "none";
});

// if user clicks on "+ button" add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="form-group row my-2">
                    <legend class="col-form-label col-sm-2 pt-0">Parameter ${addedParamCount + 2}</legend>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter${addedParamCount + 2} Key">
                    </div>

                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} value">
                    </div>
                    <button  class="btn btn-primary deleteParam">-</button>
                </div>
                `;
// convert the element string to DOM element
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // add an event Listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click', (e)=>{
            e.target.parentElement.remove();
        })
    }
             addedParamCount++;
    

    
    
               })

// if user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    //show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value ="Please wait.. Fetching response..";
    document.getElementById('responsePrism').innerHTML ="Please wait.. Fetching response..";

    //fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    //if  user has used params option instead of  jason , collect all the parameters in an object
    if(contentType == 'params'){
        data= {};
        for(let i=0;i< addedParamCount +1; i++){
            if(document.getElementById('parameterKey'+ (i+1)) != undefined){
            let key = document.getElementById ('parameterKey' + (i+1)).value;
            let value = document.getElementById('parameterKey'+ (i+1)).value;
            data[key] = value;
        }
    }
    data = JSON.stringify(data);
}else{
    data = document.getElementById('requestJsonText').value;
}

// if request type is get, invoke the fetch api to invoke a post request
if(requestType == 'GET'){
    fetch(url,{
        method:'GET',
    })
    .then(response=> response.text())
    .then((text) =>{
        // document.getElementById('responseJsonText').value = text;
        document.getElementById('responsePrism').innerHTML = text;
    });
}
 else{
    fetch(url,{
        method:'POST',
        body: data,
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response=> response.text())
    .then((text) =>{
        // document.getElementById('responseJsonText').value = text;
        document.getElementById('responsePrism').innerHTML = text;
    });
 }


})
