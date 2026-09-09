// 50 MCQs on Modes of Communication (Simplex, Half-Duplex, Full-Duplex)
const questionsData = [
  {
    id: 1,
    category: "Fundamentals",
    question: "How many basic modes of communication are commonly discussed in data communication?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "The three basic modes are Simplex, Half-Duplex, and Full-Duplex."
  },
  {
    id: 2,
    category: "Simplex Mode",
    question: "Which mode allows data transmission in only one direction?",
    options: ["Half-Duplex", "Full-Duplex", "Simplex", "Multiplex"],
    correctAnswer: 2,
    explanation: "Simplex allows data to travel in only one direction."
  },
  {
    id: 3,
    category: "Half-Duplex Mode",
    question: "Which mode allows communication in both directions, but not simultaneously?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "Half-Duplex allows both devices to communicate, but only one device can transmit at a time."
  },
  {
    id: 4,
    category: "Full-Duplex Mode",
    question: "Which mode allows communication in both directions simultaneously?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Full-Duplex allows both devices to send and receive data at the same time."
  },
  {
    id: 5,
    category: "Direction of Data Flow",
    question: "Which mode is represented by A → B?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "Both B and C"],
    correctAnswer: 0,
    explanation: "A → B represents communication in only one direction, which is Simplex."
  },
  {
    id: 6,
    category: "Direction of Data Flow",
    question: "Which mode is represented by A → B OR B → A?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "Both directions are possible, but communication occurs one direction at a time."
  },
  {
    id: 7,
    category: "Direction of Data Flow",
    question: "Which mode is represented by A ⇄ B simultaneously?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Full-Duplex supports simultaneous communication in both directions."
  },
  {
    id: 8,
    category: "Real-Life Examples",
    question: "Which is a common example of Simplex communication?",
    options: ["Telephone", "Walkie-talkie", "Television broadcasting", "Video call"],
    correctAnswer: 2,
    explanation: "Television broadcasting primarily sends information from the station to viewers."
  },
  {
    id: 9,
    category: "Real-Life Examples",
    question: "Which is a common example of Half-Duplex communication?",
    options: ["Television", "Walkie-talkie", "Telephone", "Video call"],
    correctAnswer: 1,
    explanation: "Walkie-talkies allow two-way communication, but users normally take turns transmitting."
  },
  {
    id: 10,
    category: "Real-Life Examples",
    question: "Which is a common example of Full-Duplex communication?",
    options: ["TV broadcast", "Walkie-talkie", "Telephone conversation", "Radio broadcast"],
    correctAnswer: 2,
    explanation: "In a telephone conversation, both people can speak and listen simultaneously."
  },
  {
    id: 11,
    category: "Simplex Characteristics",
    question: "In Simplex communication, the receiver:",
    options: ["Can transmit simultaneously", "Can transmit after receiving", "Only receives", "Both sends and receives"],
    correctAnswer: 2,
    explanation: "Simplex communication is one-way, so the receiver does not send data back."
  },
  {
    id: 12,
    category: "Half-Duplex Characteristics",
    question: "In Half-Duplex communication, both devices:",
    options: ["Can only receive", "Can transmit, but not simultaneously", "Can transmit simultaneously", "Cannot transmit"],
    correctAnswer: 1,
    explanation: "Both devices can transmit, but they must take turns."
  },
  {
    id: 13,
    category: "Full-Duplex Characteristics",
    question: "In Full-Duplex communication, both devices can:",
    options: ["Only receive", "Only transmit", "Transmit and receive simultaneously", "Transmit only one at a time"],
    correctAnswer: 2,
    explanation: "Full-Duplex allows simultaneous transmission and reception."
  },
  {
    id: 14,
    category: "Conceptual",
    question: "Which mode requires communication devices to take turns?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "Half-Duplex allows two-way communication, but only one side transmits at a time."
  },
  {
    id: 15,
    category: "Conceptual",
    question: "Which mode allows both sending and receiving at the same time?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Simultaneous two-way communication is the defining characteristic of Full-Duplex."
  },
  {
    id: 16,
    category: "Scenario-Based",
    question: "A TV station sends programs to viewers, and viewers only receive the programs. Which mode is this?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 0,
    explanation: "The communication flows in one direction: TV Station → Viewer."
  },
  {
    id: 17,
    category: "Scenario-Based",
    question: "Two people use a walkie-talkie. One person must stop speaking before the other can reply. Which mode is this?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "Both people can communicate, but they must take turns."
  },
  {
    id: 18,
    category: "Scenario-Based",
    question: "Two people are talking on a telephone and both can speak at the same time. Which mode is this?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Both directions can operate simultaneously."
  },
  {
    id: 19,
    category: "Scenario-Based",
    question: "A communication system allows A to send data to B, then B sends a reply to A, but not at the same time. Which mode is this?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "Communication is possible in both directions, but not simultaneously."
  },
  {
    id: 20,
    category: "Scenario-Based",
    question: "A communication system allows A and B to send data at the same time. Which mode is this?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Simultaneous two-way communication is Full-Duplex."
  },
  {
    id: 21,
    category: "Conceptual Statements",
    question: "Which statement is TRUE?",
    options: [
      "Simplex allows two-way communication",
      "Half-Duplex allows simultaneous communication",
      "Full-Duplex allows simultaneous two-way communication",
      "Full-Duplex allows only one-way communication"
    ],
    correctAnswer: 2,
    explanation: "Full-Duplex allows both devices to transmit and receive at the same time."
  },
  {
    id: 22,
    category: "Conceptual Statements",
    question: "Which statement is FALSE?",
    options: [
      "Simplex is one-way",
      "Half-Duplex is two-way",
      "Full-Duplex is two-way",
      "Half-Duplex allows simultaneous transmission in both directions"
    ],
    correctAnswer: 3,
    explanation: "Simultaneous two-way transmission is a feature of Full-Duplex, not Half-Duplex."
  },
  {
    id: 23,
    category: "Logic & Flow",
    question: "If A can send data to B but B cannot send data to A, the communication is:",
    options: ["Full-Duplex", "Half-Duplex", "Simplex", "Bidirectional"],
    correctAnswer: 2,
    explanation: "Only one direction is available."
  },
  {
    id: 24,
    category: "Logic & Flow",
    question: "If A and B can communicate in both directions but must take turns, the communication is:",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "Both directions are possible, but only one direction is active at a time."
  },
  {
    id: 25,
    category: "Logic & Flow",
    question: "If A and B can communicate simultaneously, the communication is:",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Both directions can operate at the same time."
  },
  {
    id: 26,
    category: "Application & Suitability",
    question: "Which mode is best suited when communication only needs to go from a central source to users?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 0,
    explanation: "When reverse communication is not required, Simplex is sufficient."
  },
  {
    id: 27,
    category: "Interactivity",
    question: "Which mode is generally more interactive for conversations?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Both users can communicate simultaneously."
  },
  {
    id: 28,
    category: "Terminology & Standards",
    question: "Which of the following is NOT one of the three basic communication modes?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "Ethernet"],
    correctAnswer: 3,
    explanation: "Simplex, Half-Duplex and Full-Duplex are communication modes. Ethernet is a networking technology/standard."
  },
  {
    id: 29,
    category: "Fundamentals",
    question: "Which mode is characterized by a fixed one-way flow of information?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 0,
    explanation: "Simplex has a fixed direction of data flow."
  },
  {
    id: 30,
    category: "Matching Pairs",
    question: "Which pair is correctly matched?",
    options: [
      "Simplex — Telephone conversation",
      "Half-Duplex — Walkie-talkie",
      "Full-Duplex — TV broadcasting",
      "Simplex — Video call"
    ],
    correctAnswer: 1,
    explanation: "Walkie-talkies support two-way communication but users normally take turns."
  },
  {
    id: 31,
    category: "Simplex Mode",
    question: "Which mode has only one sender and one receiver direction in the communication process?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "Both B and C"],
    correctAnswer: 0,
    explanation: "Simplex provides communication in only one direction."
  },
  {
    id: 32,
    category: "Directional Capability",
    question: "Which mode allows the direction of transmission to change?",
    options: ["Simplex only", "Half-Duplex and Full-Duplex", "Simplex and Half-Duplex only", "None"],
    correctAnswer: 1,
    explanation: "Both Half-Duplex and Full-Duplex support communication in both directions."
  },
  {
    id: 33,
    category: "Differences & Comparison",
    question: "What is the main difference between Half-Duplex and Full-Duplex?",
    options: [
      "Half-Duplex is one-way",
      "Full-Duplex is one-way",
      "Half-Duplex does not allow simultaneous transmission",
      "There is no difference"
    ],
    correctAnswer: 2,
    explanation: "Both are two-way modes, but Full-Duplex allows simultaneous communication while Half-Duplex does not."
  },
  {
    id: 34,
    category: "Differences & Comparison",
    question: "What is the main difference between Simplex and Half-Duplex?",
    options: [
      "Simplex is one-way, Half-Duplex is two-way",
      "Simplex is simultaneous",
      "Half-Duplex is one-way",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Simplex allows only one direction, while Half-Duplex allows communication in both directions."
  },
  {
    id: 35,
    category: "Comparison",
    question: "Which mode provides the highest level of two-way interaction?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Full-Duplex supports simultaneous communication in both directions."
  },
  {
    id: 36,
    category: "Identification",
    question: "A communication system permits only one device to transmit at a time, but either device can transmit. This is:",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "Either device can transmit, but they cannot transmit simultaneously."
  },
  {
    id: 37,
    category: "Identification",
    question: "A communication system allows one device to transmit while the other receives, and this can happen simultaneously in the opposite direction as well. This is:",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Both directions operate simultaneously."
  },
  {
    id: 38,
    category: "Application & Suitability",
    question: "Which communication mode is suitable for a broadcast system where feedback is unnecessary?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "All"],
    correctAnswer: 0,
    explanation: "Broadcast systems generally send information from one source to many receivers without requiring reverse communication."
  },
  {
    id: 39,
    category: "Scenario-Based",
    question: "If a user has to wait until another user finishes transmitting before replying, which mode is being used?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "Taking turns is the key characteristic of Half-Duplex."
  },
  {
    id: 40,
    category: "Scenario-Based",
    question: "If two users can speak and listen at the same time, which mode is being used?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Speaking and listening simultaneously represents Full-Duplex."
  },
  {
    id: 41,
    category: "Keywords & Mnemonics",
    question: "Which keyword is most strongly associated with Simplex?",
    options: ["Simultaneous", "One-way", "Take turns", "Two-way"],
    correctAnswer: 1,
    explanation: "The easiest way to identify Simplex is one-way communication."
  },
  {
    id: 42,
    category: "Keywords & Mnemonics",
    question: "Which keyword is most strongly associated with Half-Duplex?",
    options: ["One-way", "Simultaneous", "Take turns", "Broadcast"],
    correctAnswer: 2,
    explanation: "Half-Duplex allows two-way communication, but devices take turns transmitting."
  },
  {
    id: 43,
    category: "Keywords & Mnemonics",
    question: "Which keyword is most strongly associated with Full-Duplex?",
    options: ["One-way", "Take turns", "Simultaneous", "Broadcast"],
    correctAnswer: 2,
    explanation: "Full-Duplex allows both directions to operate simultaneously."
  },
  {
    id: 44,
    category: "Critical Thinking",
    question: "Which mode would be inappropriate if both users need to communicate at exactly the same time?",
    options: ["Simplex", "Half-Duplex", "Both Simplex and Half-Duplex", "Full-Duplex"],
    correctAnswer: 2,
    explanation: "Simplex does not allow reverse communication, while Half-Duplex does not allow simultaneous transmission. Full-Duplex is appropriate."
  },
  {
    id: 45,
    category: "Critical Thinking",
    question: "Which mode would be inappropriate if communication must occur in both directions?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "Both B and C"],
    correctAnswer: 0,
    explanation: "Simplex only allows communication in one direction."
  },
  {
    id: 46,
    category: "Progression & Hierarchy",
    question: "Which of the following represents the correct progression?",
    options: [
      "Simplex → Half-Duplex → Full-Duplex",
      "Full-Duplex → Half-Duplex → Simplex",
      "Half-Duplex → Simplex → Full-Duplex",
      "Simplex → Full-Duplex → Half-Duplex"
    ],
    correctAnswer: 0,
    explanation: "The communication capability increases from one-way to two-way sequential and finally two-way simultaneous communication."
  },
  {
    id: 47,
    category: "Device Scenarios",
    question: "A device receives information but has no facility to send information back. Which mode is this?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 0,
    explanation: "The communication has only one direction."
  },
  {
    id: 48,
    category: "Device Scenarios",
    question: "A device can both send and receive, but it must switch between sending and receiving. Which mode is this?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 1,
    explanation: "The device can communicate in both directions but not simultaneously."
  },
  {
    id: 49,
    category: "Device Scenarios",
    question: "A device can send and receive data at the same time. Which mode is this?",
    options: ["Simplex", "Half-Duplex", "Full-Duplex", "None"],
    correctAnswer: 2,
    explanation: "Simultaneous sending and receiving is Full-Duplex."
  },
  {
    id: 50,
    category: "Summary & Core Rule",
    question: "Which statement correctly summarizes all three communication modes?",
    options: [
      "Simplex = One-way; Half-Duplex = Two-way one-at-a-time; Full-Duplex = Two-way simultaneous",
      "Simplex = Two-way; Half-Duplex = One-way; Full-Duplex = No communication",
      "Simplex = Simultaneous; Half-Duplex = One-way; Full-Duplex = One-at-a-time",
      "All modes are the same"
    ],
    correctAnswer: 0,
    explanation: "This is the most important concept: Simplex → One Way; Half-Duplex → Two Way, One at a Time; Full-Duplex → Two Way, Same Time."
  }
];
