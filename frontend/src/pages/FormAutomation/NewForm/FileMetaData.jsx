"use client";

import { useState, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { FileDetailsContext } from "@/contexts/FileContext";



const FileMetaData = () => {
  const [activeTab, setActiveTab] = useState("metadata");

  const { sharedFileMetaData, sharedFile } = useContext(FileDetailsContext);


  


  return (
    <Card className="w-full max-w-3xl mx-auto ">
      <CardHeader>
        <CardTitle>CSV File Details</CardTitle>
        <CardDescription>
          View different aspects of your CSV file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="headings">Headings</TabsTrigger>
            <TabsTrigger value="columns">Columns</TabsTrigger>
            <TabsTrigger value="emptycells">Empty Cells</TabsTrigger>
          </TabsList>

          {/* Metadata Tab  */}
          <TabsContent value="metadata" className="mt-4">
            <ScrollArea className="max-h-80">
              <Table>
                <TableBody>
                  {sharedFileMetaData ? (
                    Object.entries(sharedFileMetaData.metaData).map(
                      ([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>


          {/* Heading or Columns Names  */}
          <TabsContent value="headings" className="mt-4">
            <ScrollArea className="h-80">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Heading</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sharedFileMetaData ? (
                    sharedFileMetaData.headings.map((heading, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{heading}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>


          {/* Total Non Empty Cells in per Columns  */}
          <TabsContent value="columns" className="mt-4">
            <ScrollArea >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    {/* <TableHead>Type</TableHead> */}
                    <TableHead>Non-Empty Count</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>

                  {sharedFileMetaData?.nonEmptyCount?.length > 0 ? 
                  
                    (
                      sharedFileMetaData.nonEmptyCount.map((column, index) => (
                        <TableRow key={index}>
                          <TableCell>{column.columnName}</TableCell>
                          {/* <TableCell>{column.type}</TableCell> */}
                          <TableCell>{column.totalNonemptyCells}</TableCell>
                        </TableRow>
                      ))
                    ) : (

                      <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No data available
                      </TableCell>
                    </TableRow>
                    )}

                  
                  
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>

          {/* Empty cells indices as list on each columns   */}
          <TabsContent value="emptycells" className="mt-4">
            <ScrollArea >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Empty Row Indices</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sharedFileMetaData?.emptyCells.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.columnName}</TableCell>
                      <TableCell>{item.rowIndices.join(", ")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FileMetaData;
