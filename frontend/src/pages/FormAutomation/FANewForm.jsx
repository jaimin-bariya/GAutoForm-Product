/** @format */

import FormURLInput from "./NewForm/FormURLInput";
import FormFieldSelector from "./NewForm/FormFieldSelector";
import FormFileInput from "./NewForm/FormFileInput";
import FileMetaData from "./NewForm/FileMetaData";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startTestAutomation, sendFile, sendFormLink , sendFormFields} from "@/services/APIServices";
import { useState, useContext, useEffect } from "react";
import { FileDetailsContext } from "@/contexts/FileContext";


const FANewForm = () => {

  const [loading, setLoading] = useState(false);

  const {sharedFile, formLink, formField} = useContext(FileDetailsContext)

  useEffect(() => {
    console.log(sharedFile);
    
  })


  const handleTestClick = async () => {
    setLoading(true)
    
    await sendFormLink(formLink)
    await sendFormFields(formField)
    await sendFile(sharedFile)
    await startTestAutomation()
    

    console.log("-----------------------------");
    
    
    setLoading(false)
  }

  return (
    <>
      <div className="flex flex-col items-start  m-4 gap-10 py-8 space-y-8">
        {/* Fixed height for the first row */}
        <div id="row-1" className="h-full sm:w-full w-full flex gap-6">
          <FormURLInput />
        </div>


        {/* Allow second row to expand */}
        <div className="w-full">
          <FormFieldSelector />
        </div>


        {/* CSV Uploader and Details shower  */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5" />
              <CardTitle>CSV Data Configuration</CardTitle>
            </div>
            <CardDescription>Upload and preview your CSV data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-10">
              <FormFileInput />
              <div className="col-span-2">
                <FileMetaData />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="w-full space-y-6">
        {/* Test Button  */}
        <div className="w-full">
          <Button disabled={loading} onClick={handleTestClick} className='w-full bg-black border-2 border-white dark:text-white  h-12 font-bold text-lg hover:bg-white hover:text-black hover:border-black dark:hover:text-black rounded-2xl '>
          {/* <Button className="w-full font-bold h-12 text-lg"> */}
            {loading ? "Loading..." : "Test First"}
          </Button>
        </div>

        {/* Start Button  */}
        <div className="w-full">
          <Button className='w-full bg-black border-2 border-white dark:text-white  h-12 font-bold text-lg hover:bg-white hover:text-black hover:border-black dark:hover:text-black rounded-2xl '>
          {/* <Button className="w-full font-bold h-12 text-lg"> */}
            Start Filling 
          </Button>
        </div>
        </div>
      </div>
    </>
  );
};

export default FANewForm;
