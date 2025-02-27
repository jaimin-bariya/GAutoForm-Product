/** @format */

"use client";

import { useState, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileIcon, UploadIcon } from "lucide-react";
import * as XLSX from "xlsx";

import { FileDetailsContext } from "@/contexts/FileContext";

const FormFileInput = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [startPreview, setStartPreview] = useState(false);
  const [fileHeader, setFileHeader] = useState([]);
  const [fileData, setFileData] = useState([]);
  const fileInputRef = useRef(null);

  // consume shared state from File Context
  const { sharedFile, setSharedFile } = useContext(FileDetailsContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setError("");
    setSuccess(false);
    setFileData([]);
    setFileHeader([]);

    if (!selectedFile) return;

    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload a CSV or Excel file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds the 10MB limit");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log("File selected:", file.name); // Use .type directly

      setSharedFile(file);
      setSuccess(true);
      setStartPreview(false);
    } else {
      setError("Please select a file before submitting");
    }
  };

  const handleShowPreview = () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryDate = e.target.result;
      const workbook = XLSX.read(binaryDate, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: false,
      });

      if (parsedData.length > 0) {
        setFileHeader(parsedData[0]);
        setFileData(parsedData.slice(1, 7));
      }
    };

    reader.readAsBinaryString(file);

    setStartPreview((prev) => !prev);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto w-96 p-6  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center ">
          CSV/Excel File Upload and Preview
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-8 h-8 mb-4 " />
                <p className="mb-2 text-sm ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs ">CSV, XLS, or XLSX (MAX. 10MB)</p>
              </div>
              <Input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {file && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileIcon className="w-4 h-4" />
              <span>{file.name}</span>
            </div>
          )}
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1 ">
              Upload File
            </Button>
            <Button
              type="button"
              onClick={handleShowPreview}
              className="flex-1 "
            >
              Show Preview
            </Button>
          </div>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mt-4 ">
            <AlertDescription>File uploaded successfully!</AlertDescription>
          </Alert>
        )}
        {fileData.length > 0 && startPreview && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {fileHeader.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase tracking-wider"
                    >
                      {header || "—"} {/* Handle empty headers */}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {fileData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell || "—"} {/* Handle empty cells */}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default FormFileInput;
