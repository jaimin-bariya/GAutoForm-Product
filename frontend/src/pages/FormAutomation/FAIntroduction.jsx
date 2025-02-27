
import { CheckCircle, HelpCircle, Info, Settings2 } from "lucide-react"
import { FAintro, FAdown, FAauto, FAcsv } from "@/assets/assets"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAIntroduction() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Overview Section */}
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Form Automation Guide</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to automate Google Form submissions using CSV data with our powerful desktop application.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 pb-16">
            <Card>
              <CardHeader>
                <Info className="h-6 w-6 mb-2" />
                <CardTitle>What You'll Need</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>• A CSV file with your data</p>
                <p>• Google Form URL</p>
                <p>• Basic understanding of CSV structure</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Settings2 className="h-6 w-6 mb-2" />
                <CardTitle>System Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>• Windows 10/11, macOS, or Linux</p>
                <p>• 4GB RAM minimum</p>
                <p>• Internet connection</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle className="h-6 w-6 mb-2" />
                <CardTitle>Expected Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>• Automated form submissions</p>
                <p>• Time savings</p>
                <p>• Error-free data entry</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tutorial Section */}
        <section className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold">Getting Started</h2>

          <Tabs defaultValue="setup" className="w-full h-96">
            <TabsList>
              <TabsTrigger value="setup">Initial Setup</TabsTrigger>
              <TabsTrigger value="csv">CSV Preparation</TabsTrigger>
              <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Installation Steps</h3>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Download the Application</p>
                        <p className="text-muted-foreground">Choose the version for your operating system</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Run the Installer</p>
                        <p className="text-muted-foreground">Follow the installation wizard prompts</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Launch the Application</p>
                        <p className="text-muted-foreground">Open the app and proceed to initial setup</p>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className=" items-center justify-center flex relative rounded-lg overflow-hidden">
                  <img
                    src={FAdown}
                    alt="Installation Process"
                    fill
                    
                    className="object-center w-56"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="csv" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">CSV File Requirements</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>File Format</CardTitle>
                        <CardDescription>Ensure your CSV file meets these requirements</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>• UTF-8 encoding</p>
                        <p>• Comma-separated values</p>
                        <p>• Header row with field names</p>
                        <p>• Consistent data format</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className=" items-center justify-center flex relative rounded-lg overflow-hidden">
                  <img
                    src={FAcsv}
                    alt="Installation Process"
                    fill
                    
                    className="object-center w-56"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mapping" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Field Mapping Guide</h3>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="step1">
                      <AccordionTrigger>1. Select Your Form</AccordionTrigger>
                      <AccordionContent>Enter your Google Form URL to load all available fields</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="step2">
                      <AccordionTrigger>2. Upload CSV</AccordionTrigger>
                      <AccordionContent>Upload your prepared CSV file to begin mapping</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="step3">
                      <AccordionTrigger>3. Map Fields</AccordionTrigger>
                      <AccordionContent>Match CSV columns to corresponding form fields</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className=" items-center justify-center flex relative rounded-lg overflow-hidden">
                  <img
                    src={FAintro}
                    alt="Installation Process"
                    fill
                    
                    className="object-center w-56"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Running Automation</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Automation Settings</CardTitle>
                        <CardDescription>Configure your automation preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>• Set submission delay</p>
                        <p>• Configure error handling</p>
                        <p>• Enable notifications</p>
                        <p>• Set retry attempts</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className=" items-center justify-center flex relative rounded-lg overflow-hidden">
                  <img
                    src={FAauto}
                    alt="Installation Process"
                    fill
                    
                    className="object-center w-56"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Troubleshooting Section */}
        <section className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold">Troubleshooting</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <HelpCircle className="h-6 w-6 mb-2" />
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="issue1">
                    <AccordionTrigger>CSV Import Errors</AccordionTrigger>
                    <AccordionContent>
                      Ensure your CSV file is properly formatted and uses UTF-8 encoding
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="issue2">
                    <AccordionTrigger>Field Mapping Problems</AccordionTrigger>
                    <AccordionContent>Verify that your CSV headers match the expected format</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="issue3">
                    <AccordionTrigger>Submission Failures</AccordionTrigger>
                    <AccordionContent>Check your internet connection and form accessibility</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
                <CardDescription>Access our support resources or contact our team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/documentation/gformauto">
                <Button variant="outline" className="w-full">
                  View Documentation
                </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

