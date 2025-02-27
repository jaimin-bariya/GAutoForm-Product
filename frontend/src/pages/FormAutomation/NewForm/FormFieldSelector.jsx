/** @format */

import { Fuel, Plus, Star, Trash2 } from "lucide-react";

import { useContext } from "react";
import { FileDetailsContext } from "@contexts/FileContext";

import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import MultipleChoiceOptions from "./MultipleChoiceOptions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormFieldSelector = () => {
  const [fields, setFields] = useState([]);

  const [selectedType, setSelectedType] = useState("");
  const [heading, setHeading] = useState("");

  const [metadata, setMetadata] = useState("");
  const [currentOption, setCurrentOption] = useState("");
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);
  const [linearScaleStart, setLinearScaleStart] = useState();
  const [linearScaleEnd, setLinearScaleEnd] = useState();
  const [ratingMax, setRatingMax] = useState();
  const [totalRows, setTotalRows] = useState();
  const [totalColumns, setTotalColumns] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // consume from FormDetailsContext
  const {setFormField} = useContext(FileDetailsContext)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fieldTypes = [
    "Short Answer",
    "Paragraph",
    "Multiple Choice",
    "Checkboxes",
    "Dropdown",
    "Linear Scale",
    "Rating",
    "Multiple Choice Grid",
    "Tick Box Grid",
    // "File Upload",
    "Date",
    "Time",
  ];

  const addField = () => {
    if (selectedType && heading) {
      const newField = {
        id: `${Date.now()}`,
        type: selectedType,
        heading: heading,
        metadata: metadata,
        multipleChoiceOptions: multipleChoiceOptions,
        linearScaleStart: linearScaleStart,
        linearScaleEnd: linearScaleEnd,
        ratingMax: ratingMax,
        totalRows: totalRows,
        totalColumns: totalColumns,
      };
      setFields([...fields, newField]);
      setSelectedType("");
      setHeading("");
      setMetadata("");
      setMultipleChoiceOptions([]);
      setLinearScaleStart();
      setLinearScaleEnd();
      setRatingMax();
      setTotalRows();
      setTotalColumns();
      // setSharedFieldList(fields) insted of code here - use useEffect - if fields change set to context
    }
  };

  useEffect(() => {
    // setSharedFieldList(fields)
  }, [fields]);

  const deleteField = (id) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addOptionsInMultipleChoice = () => {
    if (currentOption.trim()) {
      setMultipleChoiceOptions((prev) => [...prev, currentOption]);

      setCurrentOption("");
    }
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);



  const submitAllField = () => {
    

    if (fields.length === 0){
      setError("Please first add field before submit all")
      setSuccess(false)
      return 
    }

    setFormField(fields)
    setSuccess(true)
    setError("")
    

  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <CardTitle>Form Field Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure the fields for your form automation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4  ">
        <div className="flex flex-wrap gap-4  sm:flex-row flex-col">
          <div className="flex flex-col gap-2 w-52 ">
            <Label htmlFor="field-type">Field Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="field-type">
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                {fieldTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-52">
            <Label htmlFor="field-heading">Field Heading</Label>
            <Input
              id="field-heading"
              placeholder="Enter field heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>

          {/* Render if Field Type is Multiple Choice  ---------------------- */}
          {(selectedType === "Multiple Choice" ||
            selectedType === "Checkboxes" ||
            selectedType === "Dropdown") && (
            <div className="flex flex-col gap-2 w-52">
              <Label htmlFor="field-options">
                Options - <span className="font-serif">Add options 1 by 1</span>
              </Label>
              <div className="flex">
                <Input
                  id="field-options"
                  placeholder="Enter field metadata"
                  value={currentOption}
                  className=" rounded-r-none rounded-l-lg focus:ring-0 focus-visible:ring-0 "
                  onChange={(e) => setCurrentOption(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addOptionsInMultipleChoice();
                    }
                  }}
                />
                <Button
                  onClick={addOptionsInMultipleChoice}
                  className=" bg-white  hover:bg-white border rounded-l-none rounded-r-lg"
                >
                  <Plus className=" text-black" />
                </Button>
              </div>
            </div>
          )}

          {/* Render if Field Type is Linear Scale  */}
          {selectedType === "Linear Scale" && (
            <>
              <div className="flex flex-col gap-2 w-52">
                <Label htmlFor="field-options">Start - </Label>

                <Select
                  value={linearScaleStart}
                  onValueChange={setLinearScaleStart}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 ">
                <Label htmlFor="field-options">End - </Label>

                <Select
                  value={linearScaleEnd}
                  onValueChange={setLinearScaleEnd}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 9 }, (_, value) => value + 2).map(
                      (value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Render if Field Type is Rating  */}
          {selectedType === "Rating" && (
            <>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="field-options"
                  className="flex justify-start items-center "
                >
                  Max -{" "}
                  {
                    <div className="flex">
                      {Array.from(
                        { length: parseInt(ratingMax, 10) },
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        )
                      )}
                    </div>
                  }{" "}
                </Label>
                <div className="flex items-center space-x-4">
                  <Select value={ratingMax} onValueChange={setRatingMax}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, value) => value + 3).map(
                        (value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {/* Render if Field Type is Multiple Choice grid or Box Grid  ---------------------- */}
          {(selectedType === "Tick Box Grid" ||
            selectedType === "Multiple Choice Grid") && (
            <>
              <div className="flex flex-col gap-2">
                <Label htmlFor="field-options">Total Rows - </Label>
                <div className="flex">
                  <Input
                    id="field-rows"
                    placeholder="Enter field Rows"
                    value={totalRows}
                    className=" rounded-r rounded-l-lg focus:ring-0 focus-visible:ring-0 "
                    onChange={(e) => setTotalRows(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="field-options">Total Columns - </Label>
                <div className="flex">
                  <Input
                    id="field-rows"
                    placeholder="Enter field Rows"
                    value={totalColumns}
                    className=" rounded-r rounded-l-lg focus:ring-0 focus-visible:ring-0 "
                    onChange={(e) => setTotalColumns(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="add-btn">Add</Label>
            <Button
              id="add-btn"
              onClick={addField}
              className=" bg-black text-white dark:hover:bg-black dark:hover:text-white  dark:border-gray-100 border"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Field
            </Button>
          </div>
        </div>

        {/* Options showing */}
        {(selectedType === "Multiple Choice" ||
          selectedType === "Checkboxes" ||
          selectedType === "Dropdown") && (
          <MultipleChoiceOptions
            multipleChoiceOptions={multipleChoiceOptions}
          />
        )}

        {fields.length > 0 && (
          <div className="pt-8">
            <h3 className="text-lg font-medium mb-3">Field Names</h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid gap-2">
                  {fields.map((field) => (
                    <SortableField
                      key={field.id}
                      field={field}
                      onDelete={deleteField}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button onClick={submitAllField} >Submit</Button>
        
      </CardFooter>

        <div className="p-2">
        {error && (
          <Alert variant="destructive" className="" >
            <AlertDescription> {error} </AlertDescription>

          </Alert>
        )}

        {success && (
          <Alert className="">
            <AlertDescription>All Fields are submited successfully</AlertDescription>
          </Alert>
        )}
        </div>


    </Card>
  );
};

export default FormFieldSelector;

const SortableField = ({ field, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex  items-center justify-between gap-2 p-3 rounded-lg border bg-muted/50 cursor-move"
    >
      <div className="flex gap-4">
        <p className="text-sm text-muted-foreground">{field.type}</p>
        <h4 className="font-medium">{field.heading}</h4>

        {field.metadata && (
          <p className="text-sm text-muted-foreground">{field.metadata}</p>
        )}
        {field.multipleChoiceOptions.length !== 0 && (
          <MultipleChoiceOptions
            multipleChoiceOptions={field.multipleChoiceOptions}
          />
        )}

        {field.linearScaleStart && (
          <p>
            Linear Scale Start - {field.linearScaleStart}, Linear Scale End -{" "}
            {field.linearScaleEnd}
          </p>
        )}

        {field.ratingMax && (
          <p>Rating Start - 3, Rating End - {field.ratingMax}</p>
        )}

        {(field.type === "Tick Box Grid" ||
          field.type === "Multiple Choice Grid") && (
          <p>
            Total Rows - {field.totalRows}, Total Columns - {field.totalColumns}{" "}
          </p>
        )}
      </div>
      <div>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(field.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete field</span>
        </Button>
      </div>
    </div>
  );
};
