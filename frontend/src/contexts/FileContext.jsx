/** @format */

import { createContext, useEffect, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const FileDetailsContext = createContext();

const FileDetailsContextProvider = ({ children }) => {
  const [sharedFile, setSharedFile] = useState(null);
  const [filInCSV, setFileInCSV] = useState(null);
  const [sharedFileMetaData, setSharedFileMetaData] = useState(null);
  const [formLink, setFormLink] = useState(null);
  const [formField, setFormField] = useState([]);

  const getMetaDataCSV = (file) => {

    console.log("-------iam =-============");
    
    console.log(file);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const { data, meta } = result;

        // Compute non-empty counts for each column
        const nonEmptyCounts = meta.fields.map((column) => ({
          columnName: column,
          totalNonemptyCells: data.filter((row) => row[column]).length,
        }));


        // Compute empty cells per columns with row indices
        const emptyCells = meta.fields.map((column) =>  ({
          columnName: column,
          rowIndices: data
                      .map((row, rowIndex) => (!row[column] ? rowIndex + 1 : null))
                      .filter((index) => index != null)
        }))

        setSharedFileMetaData({
          metaData: {
            fileName: file.name, // file name
            fileSize: (file.size / 1024 / 1024).toFixed(2), // file size
            rowCount: data.length, // total number of rows
            columnCount: meta.fields.length, // total number of columns
          },
          headings: meta.fields, // Columns headings
          nonEmptyCount: nonEmptyCounts, // [{columnName: abc, totalNonemptyCells: 1000}]
          emptyCells: emptyCells, // [{columnName: abc, rowIndices: []}]
        });
      },
    });
  };

  const handleExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Read the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setFileInCSV(XLSX.utils.sheet_to_csv(worksheet));
      
      console.log("-------after convertion ---------iam---------");
      
      console.log(filInCSV);

      const headings = jsonData[0]; // First row is the column headers
      const rows = jsonData.slice(1); // Remaining rows are the data


      // Compute non-empty counts for each column
      const nonEmptyCounts = headings.map((column, colIndex) => ({
        columnName: column,
        totalNonemptyCells: rows.filter((row) => row[colIndex] != undefined && row[colIndex] !== "").length,
      }));

      // Find empty cells per column
      const emptyCells = headings.map((heading, colIndex) => ({
        columnName: heading,
        rowIndices: rows
          .map((row, rowIndex) => (!row[colIndex] ? rowIndex + 1 : null))
          .filter((index) => index !== null),
      }));

      setSharedFileMetaData({
        metaData: {
          fileName: file.name,
          fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
          rowCount: rows.length, // Corrected total rows
          columnCount: headings.length, // Total columns
        },
        headings: headings, // Column headings
        nonEmptyCount: nonEmptyCounts, // [{columnName: abc, totalNonemptyCells: 1000}]
        emptyCells: emptyCells, // [{columnName: abc, rowIndices: []}]
      });
    };
    reader.readAsArrayBuffer(file);
  };


  // useEffect and logging to check successful upload
  useEffect(() => {
    if (sharedFile) {
      console.log("Processing file:", sharedFile.name);
      const fileType = sharedFile.name.split(".").pop()?.toLowerCase();
      if (fileType === "csv") {
        getMetaDataCSV(sharedFile);
        setFileInCSV(sharedFile);
      } else if (["xls", "xlsx"].includes(fileType)) {
        handleExcel(sharedFile);
      }
    }
  }, [sharedFile]);
  



  return (
    <FileDetailsContext.Provider
      value={{
        sharedFile,
        setSharedFile,
        sharedFileMetaData,
        setSharedFileMetaData,
        formLink,
        setFormLink,
        formField,
        setFormField,
      }}
    >
      {children}
    </FileDetailsContext.Provider>
  );
};

export { FileDetailsContext, FileDetailsContextProvider };
