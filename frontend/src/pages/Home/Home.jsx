import { ArrowRight, FileSpreadsheet, Gauge, Upload, Zap } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">

        {/* Hero Section  */}
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Automate Google Form Submissions
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Transform your CSV data into Google Form submissions instantly. Save time and eliminate manual entry
                  with our powerful automation tool.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/form-auto" >
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
                <Link to={"/documentation/gformauto"}>
                <Button variant="outline" size="lg">
                  View Documentation
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        <section className="w-full py-2 md:py-6 lg:py-8 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Upload className="w-8 h-8 mb-2" />
                  <CardTitle>Upload CSV</CardTitle>
                  <CardDescription>
                    Simply upload your CSV file containing the form data you want to submit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Support for all standard CSV formats. Map your columns to form fields with our intuitive interface.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileSpreadsheet className="w-8 h-8 mb-2" />
                  <CardTitle>Map Fields</CardTitle>
                  <CardDescription>
                    Match your CSV columns to Google Form fields automatically or manually
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Intelligent field mapping with support for all Google Form field types including multiple choice and
                    checkboxes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 mb-2" />
                  <CardTitle>Automate Submission</CardTitle>
                  <CardDescription>Let our tool handle the form submissions automatically</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fast and reliable automation with progress tracking and error handling.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>



        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Why Choose Our Form Automation?
                </h2>
                <ul className="grid gap-4">
                  <li className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    <span>Process thousands of entries in minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    <span>99.9% submission accuracy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    <span>Cross-platform desktop application</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    <span>Open-source and secure</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Getting Started</h3>
                    <p className="text-muted-foreground">
                      Follow these simple steps to automate your form submissions:
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border">1</div>
                      <span>Download and install the application</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border">2</div>
                      <span>Prepare your CSV file with form data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border">3</div>
                      <span>Upload and map your fields</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border">4</div>
                      <span>Start the automation process</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">© 2025 Form Automation Tool. Open source software.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

