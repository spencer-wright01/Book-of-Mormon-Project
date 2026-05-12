export const missions = [
  {
    id: "brass-plates-mission",
    missionNumber: 1,
    title: "The Brass Plates Mission",
    character: "Nephi",
    scriptureReference: "1 Nephi 3:7",
    scriptureFocusId: "brass-plates-mission",
    principle: "Faith and obedience",
    reward: "Gauntlets of Obedience",
    shortSummary:
      "Nephi is asked to return to Jerusalem for the brass plates. The journey is difficult, but he teaches that the Lord prepares a way for us to obey.",
    scenes: [
      {
        id: "brass-plates-scene-1",
        narration:
          "Lehi asks his sons to return to Jerusalem and bring back the brass plates. It is a long and dangerous mission, and the family knows it will require courage.",
      },
      {
        id: "brass-plates-scene-2",
        narration:
          "Some of the brothers feel discouraged. The road looks hard, and the task feels bigger than they expected.",
        prompt: "What kind of response follows Nephi's example?",
        choices: [
          {
            id: "trust",
            text: "Trust the Lord and keep going.",
            feedback:
              "That choice follows Nephi's example of faith and obedience.",
          },
          {
            id: "quit",
            text: "Give up because the mission feels too hard.",
            feedback:
              "That feeling is understandable, but Nephi teaches us to move forward with faith.",
          },
          {
            id: "wait",
            text: "Wait until someone else shows courage first.",
            feedback:
              "Nephi chose to act. Obedience often begins with personal faith.",
          },
        ],
        correctChoiceId: "trust",
      },
      {
        id: "brass-plates-scene-3",
        narration:
          "Nephi says that he will go and do what the Lord has commanded. His words show confidence that God will prepare a way.",
      },
      {
        id: "brass-plates-scene-4",
        narration:
          "The mission still takes effort, patience, and trust. Faith does not remove every challenge, but it helps disciples keep going.",
        prompt: "When a commandment feels hard, what is the best next step?",
        choices: [
          {
            id: "pray-and-act",
            text: "Pray, trust God, and do the next right thing.",
            feedback:
              "Yes. Faith and obedience work together as we move forward.",
          },
          {
            id: "complain",
            text: "Complain until the problem disappears.",
            feedback:
              "Complaining does not build faith. Nephi chose trust and action.",
          },
          {
            id: "ignore",
            text: "Ignore the commandment for now.",
            feedback:
              "Waiting to obey can pull us away from the blessings God wants to give.",
          },
        ],
        correctChoiceId: "pray-and-act",
      },
    ],
    challengeQuestions: [
      {
        id: "brass-plates-q1",
        question: "Who is the main Book of Mormon figure in this mission?",
        options: ["Nephi", "Enos", "Captain Moroni"],
        correctAnswer: "Nephi",
        explanation:
          "This mission is based on Nephi's faithful response when he was asked to help obtain the brass plates.",
      },
      {
        id: "brass-plates-q2",
        question: "What principle does this mission teach most clearly?",
        options: [
          "Faith and obedience",
          "Pride and self-reliance",
          "Winning arguments",
        ],
        correctAnswer: "Faith and obedience",
        explanation:
          "1 Nephi 3:7 is remembered because Nephi trusted the Lord and chose obedience.",
      },
      {
        id: "brass-plates-q3",
        question: "What can you do when something righteous feels difficult?",
        options: [
          "Pray and keep doing the next right thing",
          "Give up right away",
          "Assume God is not helping",
        ],
        correctAnswer: "Pray and keep doing the next right thing",
        explanation:
          "Nephi's example shows that disciples can trust the Lord and move forward even when the way is hard.",
      },
    ],
    reflectionQuestion:
      "What is one good thing you can keep doing this week even if it feels hard at first?",
  },
  {
    id: "prayer-in-the-wilderness",
    missionNumber: 2,
    title: "The Prayer in the Wilderness",
    character: "Enos",
    scriptureReference: "Enos 1:4-8",
    scriptureFocusId: "prayer-in-the-wilderness",
    principle: "Sincere prayer",
    reward: "Shield of Faith",
    shortSummary:
      "Enos pours out his whole soul to God in prayer. He learns that sincere prayer can bring forgiveness, peace, and love for others.",
    scenes: [
      {
        id: "enos-scene-1",
        narration:
          "Enos goes into the forest carrying the teachings of his father in his heart. He wants to understand his standing before God.",
      },
      {
        id: "enos-scene-2",
        narration:
          "Instead of offering a quick and distracted prayer, Enos prays with real desire and faith.",
        prompt: "What kind of prayer matches Enos's example?",
        choices: [
          {
            id: "sincere",
            text: "A sincere prayer from the heart",
            feedback:
              "Yes. Enos prayed with deep feeling and real intent.",
          },
          {
            id: "careless",
            text: "A rushed prayer with no attention",
            feedback:
              "Prayer can be simple, but Enos teaches the power of sincere effort.",
          },
          {
            id: "silent-quit",
            text: "Deciding not to pray at all",
            feedback:
              "Enos turned toward God instead of away from Him.",
          },
        ],
        correctChoiceId: "sincere",
      },
      {
        id: "enos-scene-3",
        narration:
          "As Enos prays mightily, he receives assurance and peace from God. His heart begins to change.",
      },
      {
        id: "enos-scene-4",
        narration:
          "After receiving help for himself, Enos starts praying for others too. Real prayer can enlarge our love and concern.",
        prompt: "What often happens when we truly turn to God?",
        choices: [
          {
            id: "care-for-others",
            text: "We care more about other people too",
            feedback:
              "Correct. Enos's prayer led him to think about the needs of others.",
          },
          {
            id: "become-proud",
            text: "We become proud because we prayed",
            feedback:
              "Prayer is meant to humble and guide us, not make us proud.",
          },
          {
            id: "stop-needing-god",
            text: "We no longer need God",
            feedback:
              "Prayer helps us draw nearer to God, not move away from Him.",
          },
        ],
        correctChoiceId: "care-for-others",
      },
    ],
    challengeQuestions: [
      {
        id: "enos-q1",
        question: "Where did Enos go as he prayed and wrestled before God?",
        options: ["Into the forest", "Onto a ship", "Into a palace"],
        correctAnswer: "Into the forest",
        explanation:
          "Enos 1 describes Enos praying in the forest as he sought the Lord with sincerity.",
      },
      {
        id: "enos-q2",
        question: "What principle is connected to Enos's experience?",
        options: ["Sincere prayer", "Military strength", "Secret knowledge"],
        correctAnswer: "Sincere prayer",
        explanation:
          "Enos teaches that real prayer can bring forgiveness, peace, and spiritual direction.",
      },
      {
        id: "enos-q3",
        question: "How can Enos's example help in your own life?",
        options: [
          "Pray honestly and trust God to hear you",
          "Avoid talking to God when life feels serious",
          "Only pray when everything is easy",
        ],
        correctAnswer: "Pray honestly and trust God to hear you",
        explanation:
          "Enos shows that sincere prayer matters, especially when we deeply need help and peace.",
      },
    ],
    reflectionQuestion:
      "When could you set aside a few quiet minutes this week to pray with more honesty and focus?",
  },
  {
    id: "change-of-alma",
    missionNumber: 3,
    title: "The Change of Alma",
    character: "Alma the Younger",
    scriptureReference: "Mosiah 27 and Alma 36",
    scriptureFocusId: "change-of-alma",
    principle: "Repentance through Jesus Christ",
    reward: "Breastplate of Repentance",
    shortSummary:
      "Alma the Younger turns from rebellion to discipleship through the mercy of Jesus Christ. His story teaches that people can truly repent, change, and come back to God.",
    scenes: [
      {
        id: "alma-scene-1",
        narration:
          "Alma the Younger spends time leading people away from the Church. His choices hurt both himself and others.",
      },
      {
        id: "alma-scene-2",
        narration:
          "A heavenly messenger stops Alma and calls him to remember God. Alma begins to understand the seriousness of sin and the need for mercy.",
      },
      {
        id: "alma-scene-3",
        narration:
          "In great sorrow, Alma remembers what he has been taught about Jesus Christ and cries out for mercy.",
        prompt: "What is the turning point in Alma's story?",
        choices: [
          {
            id: "christ",
            text: "He turns to Jesus Christ for mercy",
            feedback:
              "Yes. Alma's change begins as he calls upon Jesus Christ.",
          },
          {
            id: "hide",
            text: "He hides and pretends nothing happened",
            feedback:
              "Pretending does not heal the soul. Alma had to truly turn to God.",
          },
          {
            id: "boast",
            text: "He boasts that he can fix himself alone",
            feedback:
              "Alma teaches dependence on the Savior, not pride.",
          },
        ],
        correctChoiceId: "christ",
      },
      {
        id: "alma-scene-4",
        narration:
          "Alma is filled with joy after turning to Christ. His life changes, and he begins helping others come unto God.",
      },
      {
        id: "alma-scene-5",
        narration:
          "The story does not teach that mistakes do not matter. It teaches that Jesus Christ can help people repent and become new.",
        prompt: "What truth should you remember from Alma's experience?",
        choices: [
          {
            id: "change-is-possible",
            text: "Through Jesus Christ, change is possible",
            feedback:
              "Correct. Alma's story is one of real repentance and real hope.",
          },
          {
            id: "mistakes-define-you",
            text: "Your mistakes define you forever",
            feedback:
              "That is not Alma's message. The Savior makes repentance and change possible.",
          },
          {
            id: "repentance-is-hopeless",
            text: "Repentance is only for other people",
            feedback:
              "Alma's story shows that repentance is a gift available through Christ.",
          },
        ],
        correctChoiceId: "change-is-possible",
      },
    ],
    challengeQuestions: [
      {
        id: "alma-q1",
        question: "Which Book of Mormon person changes through repentance in this mission?",
        options: ["Alma the Younger", "Nephi", "The brother of Jared"],
        correctAnswer: "Alma the Younger",
        explanation:
          "This mission centers on Alma the Younger and his powerful change through Jesus Christ.",
      },
      {
        id: "alma-q2",
        question: "What principle is taught by Mosiah 27 and Alma 36?",
        options: [
          "Repentance through Jesus Christ",
          "Trusting only yourself",
          "Ignoring spiritual warnings",
        ],
        correctAnswer: "Repentance through Jesus Christ",
        explanation:
          "Alma's story teaches that the Savior can forgive, heal, and transform people who turn to Him.",
      },
      {
        id: "alma-q3",
        question: "What is a good application of Alma's story?",
        options: [
          "Turn to Jesus Christ when you need forgiveness and change",
          "Assume you can never improve",
          "Hide mistakes and stop trying",
        ],
        correctAnswer: "Turn to Jesus Christ when you need forgiveness and change",
        explanation:
          "Alma's experience teaches hope. Repentance is real, and Jesus Christ is central to it.",
      },
    ],
    reflectionQuestion:
      "How can remembering Jesus Christ help you respond better when you make a mistake?",
  },
  {
    id: "shining-stones",
    missionNumber: 4,
    title: "The Shining Stones",
    character: "Brother of Jared",
    scriptureReference: "Ether 2-3",
    scriptureFocusId: "shining-stones",
    principle: "Faith and revelation",
    reward: "Helmet of Revelation",
    shortSummary:
      "The brother of Jared prepares stones and asks the Lord to touch them so they can give light. His story teaches faithful action, inspired questions, and trust in revelation.",
    scenes: [
      {
        id: "jared-scene-1",
        narration:
          "The brother of Jared and his people need light for their journey. The problem is real, and they still choose to bring it to the Lord.",
      },
      {
        id: "jared-scene-2",
        narration:
          "Instead of waiting without doing anything, the brother of Jared prepares stones and brings them to God.",
        prompt: "What does his example teach?",
        choices: [
          {
            id: "faithful-action",
            text: "Faith includes acting and asking God for help",
            feedback:
              "Yes. The brother of Jared showed faith by preparing something to offer and then seeking revelation.",
          },
          {
            id: "do-nothing",
            text: "Faith means never trying anything first",
            feedback:
              "The story shows both effort and dependence on the Lord.",
          },
          {
            id: "solve-alone",
            text: "You should solve every problem without God",
            feedback:
              "That is the opposite of the principle taught here.",
          },
        ],
        correctChoiceId: "faithful-action",
      },
      {
        id: "jared-scene-3",
        narration:
          "The Lord touches the stones, and they give light. Revelation comes as the brother of Jared trusts and asks in faith.",
      },
      {
        id: "jared-scene-4",
        narration:
          "This story teaches that God can guide people who bring honest questions and willing hearts.",
        prompt: "When you do not know what to do, what is a wise response?",
        choices: [
          {
            id: "ask-god",
            text: "Ask God, think faithfully, and listen for guidance",
            feedback:
              "Correct. Revelation often grows as we seek the Lord with faith.",
          },
          {
            id: "panic",
            text: "Panic and decide that there is no answer",
            feedback:
              "The story encourages faithful seeking, not despair.",
          },
          {
            id: "ignore",
            text: "Ignore the problem and hope it solves itself",
            feedback:
              "The brother of Jared acted with faith and brought the need to God.",
          },
        ],
        correctChoiceId: "ask-god",
      },
    ],
    challengeQuestions: [
      {
        id: "jared-q1",
        question: "What object did the brother of Jared bring before the Lord for light?",
        options: ["Stones", "Swords", "Banners"],
        correctAnswer: "Stones",
        explanation:
          "In Ether 2-3, the brother of Jared prepares stones and asks the Lord to touch them.",
      },
      {
        id: "jared-q2",
        question: "What principle best matches this mission?",
        options: ["Faith and revelation", "Pride and fear", "Hiding from questions"],
        correctAnswer: "Faith and revelation",
        explanation:
          "The story teaches that God can guide us as we ask in faith and seek revelation.",
      },
      {
        id: "jared-q3",
        question: "What is a strong personal application from this story?",
        options: [
          "Bring questions to God and act in faith",
          "Assume God never guides people",
          "Wait without praying or thinking",
        ],
        correctAnswer: "Bring questions to God and act in faith",
        explanation:
          "The brother of Jared shows that faithful action and revelation can work together.",
      },
    ],
    reflectionQuestion:
      "What question or decision in your life could you bring to God with more faith this week?",
  },
  {
    id: "title-of-liberty",
    missionNumber: 5,
    title: "The Title of Liberty",
    character: "Captain Moroni",
    scriptureReference: "Alma 46",
    scriptureFocusId: "title-of-liberty",
    principle: "Courage and covenant loyalty",
    reward: "Belt of Covenant",
    shortSummary:
      "Captain Moroni raises the Title of Liberty to help his people remember God and their sacred commitments. The mission teaches courage, loyalty to covenants, and standing for what is right.",
    scenes: [
      {
        id: "moroni-scene-1",
        narration:
          "Danger rises among the people, and Captain Moroni sees that hearts need to remember God, freedom, and their sacred responsibilities.",
      },
      {
        id: "moroni-scene-2",
        narration:
          "Captain Moroni creates the Title of Liberty as a visible reminder to choose righteousness and courage.",
        prompt: "Why is remembering covenants important?",
        choices: [
          {
            id: "remember-god",
            text: "It helps us remember God and choose what is right",
            feedback:
              "Yes. Captain Moroni wanted the people to remember their commitments and act with courage.",
          },
          {
            id: "look-strong",
            text: "It only helps people look impressive",
            feedback:
              "The purpose was deeper than appearance. It was about loyalty and righteousness.",
          },
          {
            id: "win-approval",
            text: "It helps people win attention from others",
            feedback:
              "Captain Moroni's message focused on faithfulness, not popularity.",
          },
        ],
        correctChoiceId: "remember-god",
      },
      {
        id: "moroni-scene-3",
        narration:
          "The people gather, remember their duty before God, and choose to stand together for a righteous cause.",
      },
      {
        id: "moroni-scene-4",
        narration:
          "Courage is not just being bold. It is remembering what matters most and staying loyal to it.",
        prompt: "What is a good example of covenant loyalty?",
        choices: [
          {
            id: "keep-promises",
            text: "Keeping promises to God even when it is unpopular",
            feedback:
              "Correct. True courage includes loyalty to righteous commitments.",
          },
          {
            id: "follow-crowd",
            text: "Following the crowd to avoid standing out",
            feedback:
              "Captain Moroni's example points toward conviction, not drift.",
          },
          {
            id: "forget-god",
            text: "Forgetting spiritual commitments when life gets busy",
            feedback:
              "The Title of Liberty was meant to help people remember, not forget.",
          },
        ],
        correctChoiceId: "keep-promises",
      },
    ],
    challengeQuestions: [
      {
        id: "moroni-q1",
        question: "Who raised the Title of Liberty in this mission?",
        options: ["Captain Moroni", "Enos", "Alma the Younger"],
        correctAnswer: "Captain Moroni",
        explanation:
          "Alma 46 focuses on Captain Moroni and his call for the people to remember God and their commitments.",
      },
      {
        id: "moroni-q2",
        question: "What principle is taught in this mission?",
        options: [
          "Courage and covenant loyalty",
          "Running from every hard decision",
          "Winning praise from others",
        ],
        correctAnswer: "Courage and covenant loyalty",
        explanation:
          "The Title of Liberty represents courage, loyalty, and remembering sacred promises.",
      },
      {
        id: "moroni-q3",
        question: "How could you apply this mission in daily life?",
        options: [
          "Stand for what is right and remember your promises to God",
          "Change beliefs whenever pressure appears",
          "Hide your values to make things easier",
        ],
        correctAnswer: "Stand for what is right and remember your promises to God",
        explanation:
          "Captain Moroni's example teaches brave, faithful loyalty to righteous commitments.",
      },
    ],
    reflectionQuestion:
      "What promise, value, or good habit do you want to remember more boldly this week?",
  },
  {
    id: "light-at-bountiful",
    missionNumber: 6,
    title: "The Light at Bountiful",
    character: "Jesus Christ visits the Nephites",
    scriptureReference: "3 Nephi 11",
    scriptureFocusId: "light-at-bountiful",
    principle: "Coming unto Christ",
    reward: "Lightsaber of Truth",
    shortSummary:
      "Jesus Christ appears to the Nephites and invites them to come unto Him. This mission teaches that He is the center of the Book of Mormon and the true source of hope and discipleship.",
    scenes: [
      {
        id: "bountiful-scene-1",
        narration:
          "At Bountiful, the people hear a heavenly voice and then behold the resurrected Jesus Christ. The moment is sacred and full of peace.",
      },
      {
        id: "bountiful-scene-2",
        narration:
          "Jesus invites the people to come forward and know who He is. His invitation is personal and full of mercy.",
        prompt: "What is the center of this mission?",
        choices: [
          {
            id: "christ",
            text: "Jesus Christ is the center",
            feedback:
              "Yes. This mission points directly to the Savior and His invitation to come unto Him.",
          },
          {
            id: "fame",
            text: "Becoming famous for being spiritual",
            feedback:
              "That misses the message. The focus is on Christ, not attention.",
          },
          {
            id: "self",
            text: "Depending only on yourself",
            feedback:
              "The passage teaches discipleship centered on Jesus Christ.",
          },
        ],
        correctChoiceId: "christ",
      },
      {
        id: "bountiful-scene-3",
        narration:
          "The people come one by one. The Savior's invitation shows that He knows and welcomes individuals.",
      },
      {
        id: "bountiful-scene-4",
        narration:
          "To come unto Christ is more than learning facts. It means hearing Him, trusting Him, and following Him.",
        prompt: "What does it mean to come unto Christ?",
        choices: [
          {
            id: "follow-him",
            text: "Hear Him, trust Him, and follow Him",
            feedback:
              "Correct. Discipleship is personal, faithful, and centered on the Savior.",
          },
          {
            id: "ignore-him",
            text: "Ignore His words if they feel challenging",
            feedback:
              "The invitation of 3 Nephi 11 is to come nearer, not pull away.",
          },
          {
            id: "compare",
            text: "Only compare yourself to other people",
            feedback:
              "This chapter points hearts toward Jesus Christ, not toward rivalry.",
          },
        ],
        correctChoiceId: "follow-him",
      },
    ],
    challengeQuestions: [
      {
        id: "bountiful-q1",
        question: "Who appears to the people in this mission?",
        options: [
          "Jesus Christ",
          "Captain Moroni",
          "The brother of Jared",
        ],
        correctAnswer: "Jesus Christ",
        explanation:
          "3 Nephi 11 records the visit of Jesus Christ to the Nephites.",
      },
      {
        id: "bountiful-q2",
        question: "What principle is most clearly taught in this mission?",
        options: [
          "Coming unto Christ",
          "Trusting doubt above truth",
          "Focusing only on outward success",
        ],
        correctAnswer: "Coming unto Christ",
        explanation:
          "The Savior's visit teaches that He is central to the Book of Mormon and to discipleship.",
      },
      {
        id: "bountiful-q3",
        question: "What is one way to apply this mission?",
        options: [
          "Listen to Jesus Christ and try to follow Him",
          "Treat the Savior as unimportant",
          "Wait to learn about Christ some other day",
        ],
        correctAnswer: "Listen to Jesus Christ and try to follow Him",
        explanation:
          "The invitation of 3 Nephi 11 is to come unto Jesus Christ personally and faithfully.",
      },
    ],
    reflectionQuestion:
      "What is one small way you can listen to Jesus Christ and follow Him more closely this week?",
  },
];

export default missions;
