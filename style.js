const createAResourceButton = document.getElementById("button");
const modalOverlay = document.getElementById("modal_overlay");
const exitButton = document.getElementById("exit_button");
const form = document.getElementById("form");
const nameInput = document.getElementById("nameofwebsite");
const alertDiv = document.getElementById("name_alert");
const linkInput = document.getElementById("link");
const linkAlertDiv = document.getElementById("link_alert");
const descriptionInput = document.getElementById("DescriptionTextArea");
const descriptionAlert = document.getElementById("description_alert");
const textDiv = document.getElementById("text_container");
const linkDiv = document.getElementById("link_container");
const htmlContainer = document.getElementById("single_container");


// -------------------------------------HIDE AND REVEAL MODAL OVERLAY---------------------------//
// for the create a resource button//
createAResourceButton.addEventListener("click", revealModalOverlay)

function revealModalOverlay(){
    modalOverlay.classList.remove("modal_overlay");
    modalOverlay.classList.add("modal_overlay_visible");

    //to create a focus state for the form
    nameInput.focus()

}


//to exit the form//
exitButton.addEventListener("click", closeModalOverlay)

function closeModalOverlay(){
    modalOverlay.classList.remove("modal_overlay_visible")
    modalOverlay.classList.add("modal_overlay")
}



//--------------------------------FORM LISTENING--------------------------------------//
let arrayOfData = []
form.addEventListener("submit", function(event){
    event.preventDefault()   
    //Input Data
    let theNameInputValue = nameInput.value;
    let thelinkInputValue = linkInput.value;
    let theDescriptionInputValue = descriptionInput.value;

    //-------------------------------------------------FORM VALIDATION---------------------------------//

    //for the name of the website
    nameInput.addEventListener("keyup", function(){
        validateInputName()
    })

    function validateInputName(){
        let nameInputValue = nameInput.value;
        if(nameInputValue.length == 0){
            alertDiv.textContent = "Please Ensure you put in a name";
            nameInput.style.border = "1px solid red";
        }else if (!nameInputValue.match(/^[a-zA-Z\s'-]+$/
        )){
            alertDiv.textContent = "Please Ensure the name is a word";
            nameInput.style.border = "1px solid red"
        }else{
            alertDiv.textContent = " ";
            nameInput.style.border = "2px solid green"
        }
    }


    //for the link of the website
    linkInput.addEventListener("keyup", function(){
        validateInputLink()

        linkInput.reset()
    })



    function validateInputLink() {
    let linkInputValue = linkInput.value
    if(linkInputValue.length == 0){
        linkAlertDiv.textContent = "Please Ensure you put in a link";
        linkInput.style.border = "1px solid red";
    }else if(!linkInputValue.match(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9#?&%=.-]*)?$/)){
        linkAlertDiv.textContent = "Please Ensure you put in a valid link";
        linkInput.style.border = "1px solid red";
    }else{
        linkAlertDiv.textContent = " ";
        linkInput.style.border = "2px solid green";
    }}

    // for the description of the website//
    descriptionInput.addEventListener("keyup", function(){

    })

    function validateDescriptionInput() {
        let descriptionInputValue = descriptionInput.value
        if(descriptionInputValue.length == 0){
            descriptionAlert.textContent = "Please Ensure the name is in words";
            descriptionInput.style.border = "1px solid red";
        }else if(!descriptionInputValue.match(/^[a-zA-Z0-9\s.,?!'-]{1,500}$/
    )){
        descriptionAlert.textContent = "Please Ensure the description is accurate";
        descriptionInput.style.border = "1px solid red";
        }else{
            descriptionAlert.textContent = " ";
            descriptionInput.style.border = "2px solid green";
        }
    }


//bundle the data
    const objectLiteral = {
        userNameInput : theNameInputValue,
        userLinkInput : thelinkInputValue,
        userDescriptionInput : theDescriptionInputValue
    }

    arrayOfData.push(objectLiteral)

    //push the array into local storage

    localStorage.setItem("itemsOfResearch", JSON.stringify(arrayOfData))

    form.reset();
    closeModalOverlay()
    fetchItems()

})

//---------------------------------FETCH FROM LOCAL STORAGE-----------------------------//

function fetchItems(){
    //you have to make sure data exist in the local storage before fetch the item.
    if(localStorage.getItem("itemsOfResearch")){
        // localStorage.getItem("itemsOfResearch")
        //local storage will send the data in a json string. so change it.
        // JSON.parse(localStorage.getItem("itemsOfResearch"))
        //put the json into the array.
        arrayOfData = JSON.parse(localStorage.getItem("itemsOfResearch"))
    }

    printItemsOnUi()
}
//activate
fetchItems()

//---------------------------------PRINT INTO FINAL UI-----------------------------//
function printItemsOnUi(){

    htmlContainer.innerHTML = ""
    arrayOfData.forEach(function(item){
    let printItemName = item.userNameInput;
    let printItemLink = item.userLinkInput;
    let printItemDescription = item.userDescriptionInput;


    let resourceFrameDiv = document.createElement("div");
    resourceFrameDiv.classList.add("resource-frame");


    
    let topContDiv = document.createElement("div");
    topContDiv.classList.add("top-container");

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title_container");



    let deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete_icon_container");

    let deleteIcon = document.createElement("i")
    deleteIcon.classList.add("fa-solid", "fa-trash");
    
    deleteIcon.setAttribute("onclick", `deleteItem("${printItemLink}")`)  //to delete the card

    let itemTitle = document.createElement("a")
    itemTitle.setAttribute("href", `https://${printItemLink}`) //for the final ui
    itemTitle.setAttribute("target", "_blank")  //to send it to another page
    itemTitle.textContent = printItemName

    let bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom-container");

    let descriptionText = document.createElement("p");
    descriptionText.textContent = printItemDescription;

    //append



    resourceFrameDiv.append(topContDiv, bottomDiv);
    topContDiv.append(titleDiv,deleteDiv);
    deleteDiv.append(deleteIcon);
    titleDiv.append(itemTitle);


    deleteDiv.append(deleteIcon);


    bottomDiv.append(descriptionText);
    htmlContainer.append(resourceFrameDiv);
    })
}

function deleteItem(index) {
    // Remove the item from the array
    arrayOfData.splice(index, 1);

    // Update the local storage with the new array
    localStorage.setItem("itemsOfResearch", JSON.stringify(arrayOfData));

    // Refresh the UI by printing the updated list
    printItemsOnUi();
}



