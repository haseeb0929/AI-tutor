export const courses = [
  {
    id: 1,
    name: "Computer Networks",
    quiz: [
      // CLO1: Physical Layer
      {
        question: "Which of the following is a function of the Physical Layer?",
        options: [
          "Routing",
          "Data compression",
          "Bit transmission",
          "Error detection"
        ],
        answer: 2,
        clo: "CLO1"
      },
      {
        question: "What is the unit of data at the Physical Layer?",
        options: ["Packet", "Segment", "Frame", "Bit"],
        answer: 3,
        clo: "CLO1"
      },

      {
        question: "Which transmission medium provides the highest bandwidth?",
        options: ["Twisted pair", "Coaxial cable", "Fiber optic", "Wireless"],
        answer: 2,
        clo: "CLO1"
      },
      {
        question: "Which encoding method converts digital data into digital signals?",
        options: ["Modulation", "NRZ", "Demodulation", "Multiplexing"],
        answer: 1,
        clo: "CLO1"
      },

      // CLO2: Data Link Layer
      // {
      //   question: "Which of the following is a responsibility of the Data Link Layer?",
      //   options: [
      //     "Logical addressing",
      //     "Framing",
      //     "Routing",
      //     "Session management"
      //   ],
      //   answer: 1,
      //   clo: "CLO2"
      // },
      // {
      //   question: "What is the purpose of MAC addresses?",
      //   options: [
      //     "Identify logical network paths",
      //     "Identify a network adapter",
      //     "Encrypt network traffic",
      //     "Assign IP addresses"
      //   ],
      //   answer: 1,
      //   clo: "CLO2"
      // },
      // {
      //   question: "Which of the following works at the Data Link Layer?",
      //   options: ["Router", "Switch", "Hub", "Gateway"],
      //   answer: 1,
      //   clo: "CLO2"
      // },
      // {
      //   question: "Which protocol is used to prevent collisions in LAN?",
      //   options: ["CSMA/CD", "FTP", "IP", "SMTP"],
      //   answer: 0,
      //   clo: "CLO2"
      // },
      // {
      //   question: "Which type of error detection method adds a parity bit?",
      //   options: ["Checksum", "CRC", "Parity check", "Hamming code"],
      //   answer: 2,
      //   clo: "CLO2"
      // },

      // // CLO3: Network Layer
      // {
      //   question: "Which protocol is used at the Network Layer?",
      //   options: ["UDP", "IP", "TCP", "ARP"],
      //   answer: 1,
      //   clo: "CLO3"
      // },
      // {
      //   question: "What is the main function of the Network Layer?",
      //   options: ["Error detection", "Routing", "Encryption", "Flow control"],
      //   answer: 1,
      //   clo: "CLO3"
      // },
      // {
      //   question: "Which of the following uses logical addressing?",
      //   options: ["Switch", "Hub", "Router", "Bridge"],
      //   answer: 2,
      //   clo: "CLO3"
      // },
      // {
      //   question: "IPv4 addresses are made up of how many bits?",
      //   options: ["16", "32", "64", "128"],
      //   answer: 1,
      //   clo: "CLO3"
      // },
      // {
      //   question: "Which protocol maps IP addresses to MAC addresses?",
      //   options: ["DNS", "DHCP", "ARP", "ICMP"],
      //   answer: 2,
      //   clo: "CLO3"
      // },

      // // CLO4: Transport Layer
      // {
      //   question: "Which of the following is a connection-oriented protocol?",
      //   options: ["UDP", "IP", "TCP", "ICMP"],
      //   answer: 2,
      //   clo: "CLO4"
      // },
      // {
      //   question: "Which layer is responsible for end-to-end delivery?",
      //   options: [
      //     "Network Layer",
      //     "Transport Layer",
      //     "Data Link Layer",
      //     "Application Layer"
      //   ],
      //   answer: 1,
      //   clo: "CLO4"
      // },
      // {
      //   question: "Which of the following ensures reliable data transfer?",
      //   options: ["UDP", "TCP", "IP", "FTP"],
      //   answer: 1,
      //   clo: "CLO4"
      // },
      // {
      //   question: "What is the unit of data at the Transport Layer?",
      //   options: ["Frame", "Segment", "Packet", "Bit"],
      //   answer: 1,
      //   clo: "CLO4"
      // },
      // {
      //   question: "Which port number is used by HTTP?",
      //   options: ["21", "23", "80", "110"],
      //   answer: 2,
      //   clo: "CLO4"
      // },

      // // CLO5: Session Layer
      // {
      //   question: "Which layer establishes, manages, and terminates sessions?",
      //   options: [
      //     "Session Layer",
      //     "Transport Layer",
      //     "Network Layer",
      //     "Presentation Layer"
      //   ],
      //   answer: 0,
      //   clo: "CLO5"
      // },
      // {
      //   question: "Which of these is a function of the Session Layer?",
      //   options: [
      //     "Data encryption",
      //     "Routing",
      //     "Session checkpointing",
      //     "MAC addressing"
      //   ],
      //   answer: 2,
      //   clo: "CLO5"
      // },
      // {
      //   question: "Which layer provides dialog control between devices?",
      //   options: ["Data Link", "Session", "Transport", "Physical"],
      //   answer: 1,
      //   clo: "CLO5"
      // },

      // // CLO6: Presentation Layer
      // {
      //   question: "What is the role of the Presentation Layer?",
      //   options: [
      //     "Data encryption and compression",
      //     "Routing",
      //     "Error control",
      //     "Bit transmission"
      //   ],
      //   answer: 0,
      //   clo: "CLO6"
      // },
      // {
      //   question: "Which layer is responsible for data format translation?",
      //   options: ["Application", "Presentation", "Session", "Transport"],
      //   answer: 1,
      //   clo: "CLO6"
      // },
      // {
      //   question: "Which of the following is handled by the Presentation Layer?",
      //   options: ["Framing", "Syntax translation", "Routing", "Windowing"],
      //   answer: 1,
      //   clo: "CLO6"
      // },

      // // CLO7: Application Layer
      // {
      //   question: "Which protocol is used to retrieve emails from a server?",
      //   options: ["SMTP", "FTP", "POP3", "Telnet"],
      //   answer: 2,
      //   clo: "CLO7"
      // },
      // {
      //   question: "Which layer interacts directly with the end user?",
      //   options: ["Application Layer", "Session Layer", "Transport Layer", "Network Layer"],
      //   answer: 0,
      //   clo: "CLO7"
      // },
      // {
      //   question: "Which protocol is used to access web pages?",
      //   options: ["TCP", "HTTP", "DNS", "IP"],
      //   answer: 1,
      //   clo: "CLO7"
      // },
      // {
      //   question: "Which of the following uses port 25?",
      //   options: ["POP3", "SMTP", "IMAP", "FTP"],
      //   answer: 1,
      //   clo: "CLO7"
      // },
      // {
      //   question: "What is the main function of the Application Layer?",
      //   options: ["Providing network services to users", "Routing", "Framing", "Encryption"],
      //   answer: 0,
      //   clo: "CLO7"
      // }
    ],
    clos: {
      CLO1: "Understand the functionality of the Physical Layer",
      // CLO2: "Understand the responsibilities of the Data Link Layer",
      // CLO3: "Understand the operations of the Network Layer",
      // CLO4: "Understand the role of the Transport Layer in reliable delivery",
      // CLO5: "Understand session management in the Session Layer",
      // CLO6: "Understand data representation in the Presentation Layer",
      // CLO7: "Understand end-user services in the Application Layer"
    }
  }
];
