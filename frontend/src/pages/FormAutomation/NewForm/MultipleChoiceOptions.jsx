import { Badge } from "@/components/ui/badge"


const MultipleChoiceOptions = ({multipleChoiceOptions}) => {
  return (
    <>
    
        <div className="flex gap-1">

            <h3>Options :- </h3>

            {multipleChoiceOptions.map((option, index) => (
                
                    <Badge key={index} variant="outline" >{option}</Badge>

            ))}

        </div>

      
    </>
  );
};

export default MultipleChoiceOptions;