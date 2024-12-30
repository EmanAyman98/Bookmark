var bookmarkName =document.getElementById("bookmarkName");
var websiteURL = document.getElementById("websiteURL");
var btnSubmit = document.getElementById("btnSubmit");



var webSites=[];

if(localStorage.getItem('allWebsites')){
    webSites = JSON.parse(localStorage.getItem('allWebsites'));
    displayWebsites();
}

function addWebsite(){
   
    var website = {
        sName : bookmarkName.value ,
        sURL : websiteURL.value,
    }
    
    webSites.push(website);
    localStorage.setItem("allWebsites", JSON.stringify(webSites));
    console.log(website);
    bookmarkName.classList.remove('is-invalid');
    bookmarkName.classList.add('is-valid');
    clearInput();
    displayWebsites();
}

function clearInput(){
    bookmarkName.value = null;
    websiteURL.value = null;
}

function displayWebsites(){
    var container = ``;
    for(var i =0 ; i<webSites.length ; i++){
        container += `
                  <tr scope='row'>
                   <td>${i + 1}</td>
                   <td>${webSites[i].sName}</td>
                    <td><a href="${webSites[i].sURL}" target="_blank" class="btn btn-primary">
                    <i class="fa-regular fa-eye"></i>
                    Visit</a></td>
                   <td><button class="btn btn-danger" onclick="deleteWebsites(${i})">
                   <i class="fa-solid fa-trash-can"></i>
                   Delete</button></td>
                  </tr>
                `
    }

    document.getElementById("tableBody").innerHTML = container;
}

function deleteWebsites(index){
    webSites.splice(index,1);
    localStorage.setItem("allWebsites",JSON.stringify(webSites));
    displayWebsites();
}

function validationSpacifiedInputs(element){
    inputsRegex = {
        bookmarkName:/^[A-Z][a-z]{3,8}$/,
        websiteURL:/^https:\/\/[^\s/$.?#].[^\s]*$/
    }
    if(inputsRegex[element.id].test(element.value)){
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    }else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
}