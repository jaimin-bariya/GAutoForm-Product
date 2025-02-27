/** @format */

import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "lucide-react";
import { FileDetailsContext } from "@/contexts/FileContext";

const FormURLInput = () => {
  const [inputFormLink, setinputFormLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {setFormLink} = useContext(FileDetailsContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Basic validation for Google Forms URL
    const googleFormsRegex =
      /^https:\/\/(docs\.google\.com\/forms|forms\.gle)\/.+/;
    if (!googleFormsRegex.test(inputFormLink)) {
      setError("Please enter a valid Google Forms URL");
      return;
    }

    // If valid, show success message
    setFormLink(inputFormLink)
    setSuccess(true);
    // Here you can add logic to handle the submitted link (e.g., send to server)
  };

  return (
    <>
      <Card className="w-full mx-auto p-2  rounded-lg shadow-md  h-auto ">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Link className="h-5 w-5" />
            <CardTitle>Google Form Link</CardTitle>
          </div>
          <CardDescription>
            Enter your Google Form URL to begin the automation process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full flex sm:flex-row flex-col gap-4 justify-center items-end "
          >
            <div className="w-full">
              <label
                htmlFor="inputFormLink"
                className="block text-sm font-medium  mb-1"
              >
                {" "}
                Enter Google Form Link{" "}
              </label>
              <Input
                type="url"
                id="inputFormLink"
                value={inputFormLink}
                onChange={(e) => setinputFormLink(e.target.value)}
                placeholder="https://docs.google.com/forms/..."
                className="w-full dark:text-black"
                required
              />
            </div>
            <Button
              type="submit"
              className="sm:w-40 w-full bg-black text-white dark:hover:bg-black dark:hover:text-white  dark:border-gray-100 border"
            >
              Submit
            </Button>
          </form>
        </CardContent>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mt-4 ">
            <AlertDescription>
              Valid Google Form link submitted <br /> successfully!
            </AlertDescription>
          </Alert>
        )}
      </Card>
    </>
  );
};

export default FormURLInput;
