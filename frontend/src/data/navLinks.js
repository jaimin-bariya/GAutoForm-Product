
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    ClipboardType
  } from "lucide-react"
  

const headerLinks = [
    // {
    //   title: "Playground",
    //   url: "#",
    //   icon: SquareTerminal,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Start",
    //       url: "/start",
    //     },
    //     {
    //       title: "Home",
    //       url: "/",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Form Automation",
      url: "#",
      icon: ClipboardType,
      items: [
        {
          title: "Introduction",
          url: "/form-auto",
        },
        {
          title: "New Form",
          url: "/form-auto/new-form",
        },
        {
          title: "History",
          url: "form-auto/history",
        },
        {
          title: "Settings",
          url: "form-auto/settings",
        },
      ],
    },

    // Class Arranger
    // {
    //   title: "Classroom Arranger",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "classroom-arranger/introduction",
    //     },
    //     {
    //       title: "Create New Timetable",
    //       url: "classroom-arranger/new-timetable",
    //     },
    //     {
    //       title: "This Week",
    //       url: "classroom-arranger/this-week",
    //     },

    //   ],
    // },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "documentation/introduction",
        },
        {
          title: "GFormAuto",
          url: "documentation/gformauto",
        },
        // {
        //   title: "Classroom Arranger",
        //   url: "documentation/classroom-arranger",
        // },
        {
          title: "Other",
          url: "documentation/more",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "All",
          url: "/settings/all",
        },
      ],
    },
]



const userDetails = {
    name: "JP",
    email: "jaiminbariya@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  }



export {headerLinks, userDetails}