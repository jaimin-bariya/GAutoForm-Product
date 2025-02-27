import axios from "axios";



const apiurl = import.meta.env.VITE_API_URL;



const startTestAutomation = async () => {

    try {
        let response = await fetch(`${apiurl}/form/test`);
        let data = await response.json();   
        console.log(data);
        
    } catch (error) {
        console.error("Error - API Services - StartTestAutomation", error); 
    }

}


const sendFile = async (file) => {


    if (!file) {
        alert("Please Select a file first")
    }

    const formData = new FormData()
    formData.append("file", file)





    try {

        const response = await fetch(`${apiurl}/form/fileupload`, {
            method: "POST",
            body: formData
        });
        const data = await response.json()
        console.log(data);
        

    } catch (error) {
        console.log("API Service - SendFile", error);
        
    }

}


const sendFormLink = async (formLink) => {
    try {

        const response = await axios.post(`${apiurl}/form/form-link`, {
            formLink: formLink 
        })

        console.log(response.data);
        

    } catch (error) {
        console.error("SendFormLink", error);
        
    }
}




const sendFormFields = async (fields) => {


    const response = await axios.post(`${apiurl}/form/form-field`, {
        fields: fields
    })

    console.log(response.data);
    


}


export {startTestAutomation, sendFile, sendFormLink, sendFormFields}