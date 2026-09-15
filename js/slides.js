/* ===========================================================================
   HackGrid'26 — "The Last Generation to Copy-Paste Code"
   Slide content. This is the file you edit to change what's on screen.

   Every slide is an object. `type` picks the layout, `notes` is what shows
   in presenter view (press S, or P for the second-screen window).
   Source of truth: talk-outline.md
   =========================================================================== */

window.DECK = {
  meta: {
    title: 'The Last Generation to Copy-Paste Code',
    subtitle: 'And, what it means for you',
    event: "HackGrid'26",
    speaker: 'Madhav Bahl',
    handle: 'TheLeanProgrammer',
    // The live Q&A board — powers the always-on QR (press Q), slide 14 and the
    // closing AMA slide. `questionBoardImage` is the QR people actually scan;
    // `questionBoardUrl` is what gets printed underneath for anyone typing it.
    questionBoardUrl: 'www.menti.com/al5ub5bucuch',
    questionBoardImage: 'assets/img/qr-menti.png',
    linksUrl: 'https://linktr.ee/theleanprogrammer'
  },

  // Act titles drive the dividers, the agenda and the progress rail.
  acts: [
    { n: 0, name: 'A story of two boys',        blurb: 'The cold open' },
    { n: 1, name: 'My journey: VIT till now',   blurb: '3–4 min' },
    { n: 2, name: 'The AI buzzword decoder',    blurb: '~20 min' },
    { n: 3, name: 'The placement scene in the AI era', blurb: '10–15 min' },
    { n: 4, name: 'The 16 timeless rules',      blurb: 'The long one' },
    { n: 5, name: 'The IT industry in the AI world', blurb: '5–7 min' },
    { n: 6, name: 'How to grow in the AI era',  blurb: '10–12 min' },
    { n: 7, name: 'Close + AMA',                blurb: 'Open floor' }
  ],

  slides: [

    /* ===================== ACT 0 — A STORY OF TWO BOYS ==================== */

    {
      act: 0, type: 'title',
      title: 'The Last Generation to Copy-Paste Code',
      subtitle: 'And, what it means for you',
      footer: "HackGrid'26",
      notes: 'Land the title, then go straight into the story. No long self-intro — the story IS the intro.'
    },
    {
      act: 0, type: 'statement', size: 'md',
      text: "Before I tell you who I am, and why you should be listening to me, let me tell you a <em>&lsquo;motivational&rsquo;</em> story of two boys.",
      aside: "well, the upcoming few slides are going to be embarrassing for me,<br>but it&rsquo;s ok, I&rsquo;ll not be shy",
      notes: "The quotes around 'motivational' are deliberate. Keep the self-aware wink — a little eye-roll in the delivery. The aside at the bottom is the throwaway line — deliver it under your breath, don't announce it."
    },
    {
      act: 0, type: 'boy', boy: 1,
      text: 'This guy got <strong>69/100</strong> in English in his board exams.',
      sub: '(And failed Chemistry in pre-boards.)',
      image: 'assets/img/act0/image1.jpg',
      notes: 'Boy 1 beat. Rapid-fire pacing starts here. The school photo is safe for the twist — nobody connects a Class-6 face to the adult on stage. Let them look at it for a second; it pays off the "this is going to be embarrassing" line from the previous slide.'
    },
    {
      act: 0, type: 'boy', boy: 2,
      text: 'The other boy? Got <strong>Rank #1</strong> in Computer Science in his university.',
      image: 'assets/img/act0/image2.jpg',
      notes: 'Boy 2 beat. Play it like a different, more impressive person — the warm grade on the photo does half that work for you. Note this is a visibly older face than slide 3, so keep the "two different people" framing in your delivery until the reveal.'
    },
    {
      act: 0, type: 'boy', boy: 1,
      text: 'This guy never thought he could <strong>become a writer.</strong>',
      image: 'assets/img/act0/image3.jpg',
      notes: 'Back to boy 1. Keep the rhythm snappy — but let the photo land for a beat, it is the biggest laugh in the act. Sets up the Medium Top Writer payoff on the next slide.'
    },
    {
      act: 0, type: 'boy', boy: 2,
      text: 'This other guy became a <strong>2X Top Writer on Medium</strong>, and authored a book on powerlifting.',
      images: [
        { src: 'assets/img/act0/image4.png', alt: 'Medium top writer notification' },
        { src: 'assets/img/act0/image5.png', alt: 'Insane Gains — ebook cover' }
      ],
      aside: 'Want this ebook? Get in touch with me &mdash; <span class="aside-link">https://www.instagram.com/theleanprogrammer/</span>',
      notes: 'Boy 2 — two receipts for one claim: the Medium badge and the book. Point at each as you say it. The ebook offer at the bottom is a real call to action, so give the room a second to photograph it. HEADS UP: the Medium screenshot has "GREAT WORK, MADHAV BAHL" in it — front rows can read that, which hands them the slide-12 twist early. Crop or blur that line if you want the reveal fully protected.'
    },
    {
      act: 0, type: 'boy', boy: 1,
      text: 'The first guy: <strong>lazy, unmotivated, and fat.</strong>',
      image: 'assets/img/act0/image6.png',
      imagePos: '50% 30%',
      notes: 'Say it flatly. Self-deprecating, not fishing for sympathy — the photo is doing the work, you do not need to sell it. This is the "before" that slide 8 pays off.'
    },
    {
      act: 0, type: 'boy', boy: 1,
      text: 'And one day, he decided to change his life &mdash; and <strong>worked hard for it.</strong>',
      image: 'assets/img/act0/image7.jpg',
      imagePos: '50% 35%',
      notes: 'The first hint that boy 1 has a second half to his story — the audience should feel a small itch here. You cut the "six-pack abs" line because the photo says it; do not say it out loud, just let them look. Direct contrast with slide 7.'
    },
    {
      act: 0, type: 'boy', boy: 1,
      text: 'The first guy was <strong>SUPER shy</strong> about speaking in public.',
      image: 'assets/img/act0/image8.jpg',
      imagePos: '95% center',
      notes: 'Boy 1. The photo does the joke for you — head down, hiding behind the laptop. Sets up the 150+ talks reversal two slides later.'
    },
    {
      act: 0, type: 'boy', boy: 2,
      text: 'The second guy now has <strong>85k+ followers</strong> on LinkedIn.',
      notes: 'Boy 2.'
    },
    {
      act: 0, type: 'boy', boy: 2,
      text: 'Loves public speaking. Has given <strong>150+ talks</strong> in colleges across India.',
      // Each photo has a different aspect ratio, so each gets its own crop to
      // keep the subject centred once it is squared off.
      tiles: [
        { src: 'assets/img/act0/image9.jpg',  pos: '38% center', alt: 'Speaking at a podium' },
        { src: 'assets/img/act0/image10.jpg', pos: '0% center',  alt: 'Presenting flat vs material design' },
        { src: 'assets/img/act0/image11.jpg', pos: 'center 42%', alt: 'Speaking at a VIT podium' },
        { src: 'assets/img/act0/image12.jpg', pos: 'center center', alt: 'Speaking at a VIT podium' }
      ],
      notes: 'Boy 2. The last beat before the reveal — pick up the pace, then stop dead. Two of these four are VIT podiums, so it is worth one line: "a couple of these were shot in this building." The room will react.'
    },
    {
      act: 0, type: 'reveal',
      text: 'And is now <strong>standing in front of you.</strong>',
      image: 'assets/img/madhav-now.png',
      notes: 'THE REVEAL. The two boys collapse into one person. Let it breathe — do not talk over the applause or the gasp. Count to three before the next slide.'
    },
    {
      act: 0, type: 'statement', size: 'lg',
      text: 'The only difference between the first boy and the second boy? <strong class="accent">Mindset.</strong>',
      beats: ['Think.', 'Decide.', 'Achieve.'],
      notes: 'Click / press → to bring in Think, Decide, Achieve one at a time. Three punches, not one sentence.'
    },
    {
      act: 0, type: 'statement', size: 'xxl',
      text: 'Why was I telling you this?',
      sub: 'If I can do it, anyone can.',
      qr: true,
      notes: '<strong>Say this over the slide &mdash; do not read it off the screen:</strong><br><br>' +
             '<strong>1.</strong> "I\'m not telling you this to brag about the last 5&ndash;6 years. I\'m telling you because if a lazy, unmotivated guy like me could change, <strong>so can you.</strong>"<br><br>' +
             '<strong>2.</strong> "And I hope you now find me qualified to give this talk, and to have a real interaction with you."<br><br>' +
             '<strong>3.</strong> "But here\'s the thing: I am <strong>NOT your teacher</strong>, and I don\'t want to be. What I want is a completely open discussion. Any of you can stand up, share your views, disagree with me, and ask questions, at <strong>ANY</strong> point during this session."<br><br>' +
             '<em>Three beats. The screen stays on one line so the room watches you, not the slide. CUE THE QUESTION BOARD on beat 3 &mdash; the QR is bottom-right, press Q for the full-screen version.</em>'
    },

    /* ============================ AGENDA ================================= */

    {
      act: 0, type: 'toc',
      heading: "What we'll cover today",
      notes: 'Five seconds. Do not read it out line by line — just let them see the shape of the journey. The current act highlights automatically at every divider.'
    },

    /* ==================== ACT 1 — MY JOURNEY: VIT TILL NOW ================ */

    { act: 1, type: 'act-divider', notes: 'Quick act. Act 0 already did "who am I" — this is just the professional arc. 3–4 minutes, no lingering.' },
    {
      act: 1, type: 'statement', size: 'lg',
      kicker: 'The one habit that compounded',
      text: 'The one habit that changed everything: <strong class="accent">I learned in public.</strong>',
      notes: 'SEED, and now the first thing you say in Act 1 — state the thesis, then spend the act showing the work behind it. You pay this off in Act 6. Frame it personally: posting what I built and sharing what I learned is what compounded into a network, a brand, and opportunities. Plant it here, harvest it in Act 6.'
    },
    {
      act: 1, type: 'timeline',
      heading: 'VIT &rarr; now',
      nodes: [
        { label: 'VIT',                      sub: 'The degree' },
        { label: 'Various clubs / chapters', sub: 'ADG, IEEE CS, ACM, NCC' },
        { label: 'Many internships',         sub: 'Trust me, I was underconfident' },
        { label: 'My job at Microsoft',      sub: 'Learnt many tech stacks, and shipped endless features' },
        { label: 'Today',                    sub: 'Senior engineer, building in AI' }
      ],
      punchline: 'The degree got me the interview. <strong class="accent">Shipping got me the career.</strong>',
      notes: 'Keep it fast — context, not a brag. The ONE line to land is the punchline. Do not linger on the resume. The "I was underconfident" beat on the internships is the honest one — it is what keeps this from sounding like a CV.'
    },
    /* The old expectation-vs-reality split, broken into a rapid-fire meme run:
       two "parents think" beats, three "actually do" beats, then the point. */

    { act: 1, type: 'meme', side: 'parents',
      heading: 'What my parents think I do',
      gif: 'assets/img/act1/meme1.gif',
      caption: 'Typing furiously',
      notes: 'Start the run. Do not explain the memes — click, let them laugh, move. Whole run should take about 40 seconds.' },

    { act: 1, type: 'meme', side: 'parents',
      heading: 'What my parents think I do',
      gif: 'assets/img/act1/meme2.gif',
      caption: 'Hacker man',
      notes: 'Beat 2 of 2. Land it and switch straight into the reality half — the change of heading is the joke.' },

    { act: 1, type: 'meme', side: 'actual',
      heading: 'What I actually do',
      gif: 'assets/img/act1/meme3.gif',
      caption: 'Figuring out <em>what</em> to build &mdash; and <em>why</em>',
      notes: 'The heading flips here and the colour flips with it. This is the real answer to the slide.' },

    { act: 1, type: 'meme', side: 'actual',
      heading: 'What I actually do',
      gif: 'assets/img/act1/meme4.gif',
      caption: 'Talking to people',
      notes: 'The one students least expect. Worth half a beat longer than the others.' },

    { act: 1, type: 'meme', side: 'actual',
      heading: 'What I actually do',
      gif: 'assets/img/act1/meme5.gif',
      caption: 'Shipping',
      notes: 'Literal ship. Do not explain the pun, it is funnier if you just let it sit. "Shipping" also seeds Act 3 and Act 6, where one shipped project beats a CGPA point.' },

    {
      act: 1, type: 'statement', size: 'xl', mood: 'accent',
      text: 'The job is about <strong class="accent">judgement</strong>, not just code.',
      notes: 'The point of the whole run. Say it once, do not elaborate, move on to the learn-in-public seed.'
    },

    /* ================= ACT 2 — THE AI BUZZWORD DECODER ==================== */
    /* `cut: true` marks the slides flagged as lowest-priority in the outline.
       Press X during the talk to skip every cut-flagged slide and save ~4 min. */

    { act: 2, type: 'act-divider',
      subtitle: 'The rapid fire &mdash; I have chocolates',
      notes: '<strong>Announce the format before you start — the rules are the whole game:</strong>\n\n' +
             '<strong>1.</strong> I will start with the simple buzzwords and explain those myself.\n' +
             '<strong>2.</strong> After that we go rapid fire, and you shout the answers.\n' +
             '<strong>3.</strong> Here is the catch — <strong>the winner is NOT whoever recites the definition.</strong> ' +
             'The chocolate goes to whoever gives the most fun example to explain that buzzword.\n\n' +
             'Say rule 3 slowly, it changes how the whole room listens. Definitions can be memorised; a good example proves you actually understood it — which is the point of this entire act.\n\n' +
             'Hold up the chocolates as you say it. Goal: by the end, the room knows every hyped AI term in the market. ~35 sec each. Cut/merge freely — press X to drop the low-priority ones.' },

    { act: 2, type: 'tier', tier: 1, label: 'Tier 1', heading: 'What even <em>is</em> this', notes: 'Fastest tier. If you are running long, merge 1–4 into two slides.' },

    { act: 2, type: 'concept', n: 1, term: 'Artificial Intelligence (AI)',
      script: 'The umbrella word. Any machine doing something that <strong>looks</strong> smart. Half the "AI" in ads is just marketing.',
      notes: 'State it plainly and move — the dhaba photos on the next slide are the laugh, not this one.' },

    { act: 2, type: 'showcase',
      images: [
        { src: 'assets/img/act2/c1a.jpg', alt: 'Gulshan No 1 Dhaba' },
        { src: 'assets/img/act2/c1b.jpg', alt: 'Dhaba' },
        { src: 'assets/img/act2/c1c.jpg', alt: 'Gulshan Dhaba' }
      ],
      text: 'Just like the name <strong>&ldquo;Gulshan&rdquo;</strong> or <strong>&ldquo;Sukhdev&rdquo;</strong> is enough to get you customers, the word <strong class="accent">&ldquo;AI&rdquo;</strong> is enough to&hellip;',
      notes: 'Let them look at the photos first, then read the line and STOP on the ellipsis. Do not finish the sentence — the room will finish it for you, and that is the first real laugh of the act. Sets the debunking tone for everything that follows.' },

    { act: 2, type: 'concept', n: 2, term: 'Machine Learning (ML)',
      script: "You don't code every rule. You show it thousands of examples and it learns the pattern itself.",
      image: 'assets/img/act2/c2.jpg',
      imageAlt: 'Taare Zameen Par — Nikumbh teaching Ishaan',
      notes: 'Let the still do the work — most of the room will name the film before you do. Ishaan does not learn from a rulebook, he learns from patterns and examples. That is the whole definition.' },

    { act: 2, type: 'concept-title', n: 3, term: 'Deep Learning / Neural Networks',
      notes: 'Just name it and pause. Ask the room if anyone can explain it before you click — the diagram on the next slide is the answer, and it lands harder if they have tried first.' },

    { act: 2, type: 'neural', n: 3, term: 'Deep Learning / Neural Networks',
      script: 'Stacked layers of simple units. The engine under almost everything modern.',
      inputImage: 'assets/img/act2/c3.jpg',
      layers: [
        { label: 'What comes in', example: 'the raw photo',               n: 4, kind: 'in'  },
        { label: 'Simple questions', example: '&ldquo;is there an edge here?&rdquo;',   n: 5, kind: 'mid' },
        { label: 'Harder questions', example: '&ldquo;does that look like a whisker?&rdquo;', n: 5, kind: 'mid' },
        { label: 'The answer', example: '&ldquo;it&rsquo;s a cat&rdquo;',  n: 2, kind: 'out' }
      ],
      caption: 'Every desk reads the notes from the row behind it, makes <strong>one small judgement</strong>, and passes its own note forward. No single desk knows the answer &mdash; the answer is what falls out of the far end of the chain.',
      notes: 'THIS IS THE "PASSES A NOTE UP THE CHAIN" SLIDE. Walk it left to right with your hand.\n\n' +
             'The office: the front row only sees raw pixels. Each desk asks one tiny question — "is there an edge here?" — writes the answer on a note, and passes it back. The next row never sees the photo at all, only the notes; it combines them into slightly bigger ideas — "that cluster of edges looks like a whisker". The row after that combines THOSE into bigger ideas still. By the last desk, the notes have become "cat".\n\n' +
             'The two points that matter: (1) no single desk is smart — each does one trivial judgement; (2) "deep" just means there are many rows. That is the whole idea. Then move.' },

    { act: 2, type: 'family-tree', n: 4, term: 'The family tree',
      ref: 'Nested steel tiffin dabbas, each inside a bigger one.',
      script: 'AI is the biggest dabba, ML sits inside it, Deep Learning inside that, GenAI is the smallest and hottest one.',
      layers: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'GenAI'],
      notes: 'Visual slide — this one sums up 1 to 3. Point at the boxes as you say the dabba line. Good place to pause for a breath.' },

    { act: 2, type: 'concept-title', n: 5, term: 'Narrow AI vs AGI vs ASI',
      notes: 'Name the three, then pause before clicking. Ask who has heard "AGI" thrown around — most hands go up, and almost nobody can define it. That is exactly the gap the next slide closes.' },

    { act: 2, type: 'ladder', n: 5, term: 'Narrow AI vs AGI vs ASI',
      ref: 'Chitti from Robot.',
      script: 'The ladder everyone argues about. <strong>We might be somewhere between step one and step two today.</strong>',
      rungs: [
        { name: 'Narrow AI', desc: 'A calculator, or an Alexa alarm.', state: 'here',
          img: 'assets/img/act2/c5a.jpg', alt: 'An Alexa speaker showing the time' },
        { name: 'AGI',       desc: 'Chitti with the red chip — can do anything a human can.', state: 'next',
          img: 'assets/img/act2/c5b.jpg', alt: 'Chitti from Robot' },
        { name: 'ASI',       desc: 'Robot 2.0 gone rogue / Skynet — smarter than all of us combined.', state: 'far',
          img: 'assets/img/act2/c5c.jpg', alt: 'Robot 2.0' }
      ],
      notes: 'This is your first real myth-bust and it calms the room down before Act 3. The hedge is deliberate — "somewhere between step one and step two" is more honest than either the hype or the doom, and honesty is what buys you credibility for the rest of the act. Note the YOU ARE HERE badge still sits on Narrow AI; if anyone pushes, that is the point to concede that the line is genuinely blurry now.' },

    { act: 2, type: 'tier', tier: 2, label: 'Tier 2', heading: 'The stuff you <em>already</em> use', notes: 'Energy lifts here — they recognise everything in this tier.' },

    { act: 2, type: 'concept-title', n: 6, term: 'Generative AI (GenAI)',
      notes: 'The one term in this tier everyone already uses daily without knowing the name. Say it, let it register, then click.' },

    { act: 2, type: 'concept', n: 6, term: 'Generative AI (GenAI)',
      ref: 'The one friend who can sketch, write a shayari, and edit a video, all on demand.',
      image: 'assets/img/act2/c6.jpg',
      script: 'Old AI <em>recognised</em> things. GenAI <em>creates</em> new things: text, images, music, video.',
      notes: 'The recognise-vs-create distinction is the whole point. Say it slowly.' },

    { act: 2, type: 'concept-title', n: 7, term: 'Large Language Model (LLM)',
      notes: 'Everyone in the room has used one this week. Ask who can say what the three letters stand for before you click — far fewer hands.' },

    { act: 2, type: 'concept', n: 7, term: 'Large Language Model (LLM)',
      ref: 'The Chatur type who has read the entire internet, answer ready for everything.',
      image: 'assets/img/act2/c7.jpeg',
      imageAlt: 'Chatur from 3 Idiots',
      script: 'The engine behind ChatGPT, Claude, Gemini. Trained to predict the next word, extremely well.',
      notes: 'Chatur comes back at #11 for hallucination. Plant him here.' },

    { act: 2, type: 'concept', n: 8, term: 'Tokens', cut: true,
      ref: 'Old SMS packs where you paid per character, so you wrote "gud n8".',
      script: "AI doesn't read words, it reads chunks called tokens &mdash; and you pay per token. That is literally how it counts and bills.",
      notes: 'CUTTABLE if running long. The "gud n8" line is worth keeping if you have the time though.' },

    { act: 2, type: 'concept', n: 9, term: 'Prompt / Prompt Engineering',
      ref: 'The genie: you get the wish exactly as you said it, not as you meant it.',
      image: 'assets/img/act2/c10.gif',
      imageAlt: 'Genie: your wish has been granted',
      script: 'How you ask decides what you get. Vague question, cursed answer. <strong>This is a real skill now.</strong>',
      notes: 'Flag forward: "we are going to test this live later" — sets up the Prompt Battle in Act 6.' },

    { act: 2, type: 'concept', n: 10, term: 'Context Window',
      panels: [
        { src: 'assets/img/act2/c11a.jpeg', alt: 'Ghajini covered in tattooed notes',
          caption: 'Tattooed on his body &mdash; <strong>still in the window</strong>' },
        { src: 'assets/img/act2/c11b.jpg', alt: 'Ghajini having forgotten',
          caption: 'When the requests go <strong>out of the context window</strong>' }
      ],
      script: 'How much the AI can hold in its head at once. Talk too long and it forgets how the chat started.',
      notes: 'Ghajini always lands. Do the tattoo mime if the room is warm.\n\nRead the two panels left to right: everything tattooed on him is what the model can still see. The moment a request scrolls past the window it is simply gone — not deprioritised, gone — and you get the second panel. That is why long chats start contradicting themselves.' },

    { act: 2, type: 'concept', n: 11, term: 'Hallucination',
      image: 'assets/img/act2/c12.jpeg',
      imageAlt: 'Chatur delivering the tampered speech',
      script: 'When the AI confidently makes things up. It would rather bluff than admit it doesn&rsquo;t know.',
      notes: 'Callback to #7 — same Chatur, now mid-speech. This is the most practically important term in the tier, so do not rush it.\n\nThe detail that matters is the confidence: he never pauses, never hedges, never suspects a thing. That is exactly the failure mode — the model does not know it is wrong, so it will not warn you. Which is why you check anything that matters.' },

    { act: 2, type: 'concept', n: 12, term: 'Multimodal',
      ref: 'One all-rounder who can see, hear, read, and speak at the same time.',
      image: 'assets/img/act2/c13.png',
      imageStyle: 'cutout',
      imageAlt: 'An all-rounder',
      script: "Modern AI isn't just text. It takes images, audio, and video, all together.",
      notes: 'Quick one — the all-rounder pun does the work, you barely need to explain it. If the room is warm, name him and let them react.' },

    { act: 2, type: 'tier', tier: 3, label: 'Tier 3', heading: 'How they are made <em>smarter</em>', notes: 'This tier is where you sound like you actually know the field. Worth the time.' },

    { act: 2, type: 'concept', n: 13, term: 'Pre-training', cut: true,
      ref: 'The gurukul phase: years of reading everything before you specialise.',
      image: 'assets/img/act2/c14.png',
      imageAlt: 'A gurukul',
      script: 'The giant foundational learning on huge chunks of the internet.',
      notes: 'CUTTABLE — #14 fine-tuning carries the idea on its own if you drop this. Though with the gurukul image on screen the pairing is stronger: this slide is the years of learning everything, the next is choosing your specialisation.' },

    { act: 2, type: 'concept-title', n: 14, term: 'Fine-tuning',
      notes: 'The natural follow-on from pre-training: you have read everything, now you pick a specialisation. Name it, pause, then click.' },

    { act: 2, type: 'concept', n: 14, term: 'Fine-tuning',
      ref: 'Chak De India: a random set of players trained into one specialised team. Or MBBS, then MD.',
      image: 'assets/img/act2/c15-web.jpg',
      imageAlt: 'MBBS, then MD',
      script: 'Take a general model and train it further for one specific job.',
      notes: 'The MBBS-then-MD line is the one that clicks for students — and the image is now that half of the reference, so point at it as you say it.\n\nThe contrast with the previous slide is the whole idea: gurukul was reading everything, this is choosing one thing and going deep.' },

    { act: 2, type: 'concept-title', n: 15, term: 'RLHF',
      notes: 'Just the four letters. Ask if anyone can expand it — almost nobody can, and it is the term behind why ChatGPT feels polite. Then click for the full form.' },

    { act: 2, type: 'concept', n: 15, term: 'RLHF',
      expand: 'Reinforcement Learning from Human Feedback',
      ref: 'Training a dog with treats. Or parents drilling sanskaar until you behave.',
      script: 'Humans thumbs-up and thumbs-down the answers until the AI learns to be helpful and polite.',
      panels: [
        { src: 'assets/img/act2/c16a.jpg', alt: 'Rewarding a dog with a treat',
          caption: 'A treat when it gets it <strong>right</strong>' },
        { src: 'assets/img/act2/c16b.png', alt: 'Parampara, Pratishtha, Anushasan',
          caption: '<strong>Sanskaar</strong>, drilled in until you behave' }
      ],
      notes: 'The sanskaar line is a guaranteed laugh — let the second panel land before you explain anything.\n\nThe point underneath: nobody programmed politeness in. Humans sat there rating thousands of answers good or bad, and the model learned the pattern. Same as the dog, same as the drilling.' },

    { act: 2, type: 'concept', n: 16, term: 'RAG (Retrieval-Augmented Generation)',
      ref: "Open-book exam: it checks the textbook &mdash; your company's own docs &mdash; before answering instead of trusting memory.",
      script: 'How companies make AI answer correctly on their private data.',
      notes: 'IMPORTANT — they will be asked to build one of these in Act 6. Say the words "you will build one of these today-ish".' },

    { act: 2, type: 'concept', n: 17, term: 'Embeddings + Vector Database',
      ref: 'A dating app matching by vibe, or "similar songs" on Spotify. Meaning turned into numbers so similar things sit close together.',
      script: 'The trick that powers search-by-meaning, and RAG under the hood.',
      notes: 'Pairs directly with #16 (RAG). Keep them adjacent.' },

    { act: 2, type: 'concept', n: 18, term: 'Grounding / Citations', cut: true,
      ref: "Receipts. A journalist citing sources vs your uncle's WhatsApp forward.",
      script: 'Forcing the AI to back its answers with real sources so it stops bluffing.',
      notes: 'CUTTABLE. The WhatsApp-uncle line is strong though — keep if the room is enjoying itself.' },

    { act: 2, type: 'tier', tier: 4, label: 'Tier 4', heading: 'The frontier everyone is hyping <em>now</em>', notes: 'This is the tier they came for. Slow down slightly and give it room.' },

    { act: 2, type: 'concept', n: 19, term: 'Foundation / Frontier Models',
      ref: 'The flagship phones everyone compares: GPT, Claude, Gemini, Llama.',
      script: 'The big base engines that everything else is built on top of.',
      notes: '' },

    { act: 2, type: 'concept', n: 20, term: 'AI Agents / Agentic AI',
      ref: 'Jarvis actually booking the flight and running the code, not just chatting. Or the Professor running the whole heist.',
      script: '<strong>The 2026 buzzword.</strong> AI that takes actions in the real world, not just spits out text.',
      notes: 'Money Heist callback — Act 4 uses the Professor again. Nice thread.' },

    { act: 2, type: 'concept', n: 21, term: 'Tool Use / Function Calling',
      ref: 'Doraemon reaching into the pocket and pulling out the exact gadget for the problem.',
      script: 'Giving the AI hands: the ability to use apps, run code, search the web.',
      notes: '' },

    { act: 2, type: 'concept', n: 22, term: 'MCP (Model Context Protocol)',
      ref: 'USB-C: one universal port so any AI can plug into any tool.',
      script: 'The standard that makes agents actually useful. Finally, one charger for everything.',
      notes: 'The "one charger" line gets a groan-laugh. Enjoy it.' },

    { act: 2, type: 'concept', n: 23, term: 'Multi-agent systems',
      ref: 'A heist crew or a cricket team: each a specialist, one captain coordinating.',
      script: 'Instead of one AI, a team of them, each doing what it is best at.',
      notes: '' },

    { act: 2, type: 'concept', n: 24, term: 'Reasoning / "Thinking" models',
      ref: 'CID\'s ACP Pradyuman, "kuch to gadbad hai", working it out step by step. Or "show your working" for full marks.',
      script: 'Newer models that think in steps before answering, so they crack much harder problems.',
      notes: 'Do the Pradyuman voice. You know you want to.' },

    { act: 2, type: 'concept', n: 25, term: 'Vibe Coding', highlight: true,
      ref: 'Telling the tailor "make me something like SRK wore" and he stitches it. You describe, it builds.',
      script: 'You describe an app in plain English and the AI writes the code. <strong>This is exactly what this whole talk&rsquo;s title is about.</strong>',
      notes: 'THE TITLE SLIDE OF THE ACT. Point back at the talk title. "The last generation to copy-paste code — this is why." Big beat.' },

    { act: 2, type: 'tier', tier: 5, label: 'Tier 5', heading: 'The industry and safety words', notes: 'Last tier. Pick up the pace again.' },

    { act: 2, type: 'concept', n: 26, term: 'Open vs Closed models',
      ref: "Mom sharing the full recipe (open: Llama, DeepSeek) vs KFC's secret masala (closed: GPT, Claude).",
      script: 'Whether the recipe is public or locked. A big ongoing fight.',
      notes: '' },

    { act: 2, type: 'concept', n: 27, term: 'Distillation',
      ref: "The whole class photocopying the topper's notes: you get the gyaan without doing all the work.",
      script: 'A small cheap model trained to copy a big expensive one. This is how DeepSeek shook the market.',
      notes: '' },

    { act: 2, type: 'concept', n: 28, term: 'Compute / GPUs (the chip war)',
      ref: 'Petrol for the AI car. Whoever hoards the most GPUs wins, and NVIDIA sells the petrol.',
      script: "AI's real bottleneck isn't ideas, it's chips. That is why NVIDIA became one of the most valuable companies on earth.",
      notes: '' },

    { act: 2, type: 'concept', n: 29, term: 'Scaling Laws', cut: true,
      ref: 'Gym gains: more weight and more food means more muscle, up to a point, then diminishing returns.',
      script: 'The bet that bigger model + more data + more compute keeps getting smarter. Whether it is plateauing is the billion-dollar debate.',
      notes: 'CUTTABLE. But the gym analogy is on-brand for you — keep it if you can.' },

    { act: 2, type: 'concept', n: 30, term: 'AI Alignment / Safety',
      ref: 'Ra.One (misaligned, evil) vs G.One (aligned, good). The genie taking your wish too literally.',
      script: 'Making a super-capable AI actually <em>want</em> what we want, not just do what we literally said.',
      notes: '' },

    { act: 2, type: 'concept', n: 31, term: 'Prompt Injection / Jailbreaking',
      ref: 'Sweet-talking the strict watchman with a sob story to sneak inside.',
      script: 'Tricking an AI into breaking its own rules with clever words. <strong>The new hacking.</strong>',
      notes: 'Hackathon crowd — "the new hacking" will get them. Good energy beat.' },

    { act: 2, type: 'concept', n: 32, term: 'Deepfakes',
      ref: 'The body-double / hamshakal trope: a fake Don who looks exactly like Don.',
      script: 'AI-made fake photos, voices, and videos so real you cannot tell. Handle with care.',
      notes: 'Last core concept. Then straight into the Turing Test / activity.' },

    { act: 2, type: 'concept', n: 33, term: 'Turing Test', cut: true, optional: true,
      ref: 'Your own "Human or AI?" game, coming up next.',
      script: 'The old question: can you tell you are talking to a machine? Increasingly, no.',
      notes: 'OPTIONAL CLOSER — but it bridges perfectly into the activity. Keep it if you are running the activity.' },

    { act: 2, type: 'concept', n: 34, term: 'The AI bubble / hype cycle', cut: true, optional: true,
      ref: 'Crypto and NFT flashbacks.',
      script: 'Honest question to end on: how much of this is real and how much is hype? Fair answer: <strong>both.</strong>',
      notes: 'OPTIONAL CLOSER. The honesty here sets up Act 3 Slide 0 nicely ("Honestly, I don\'t know").' },

    { act: 2, type: 'activity',
      label: 'Activity',
      heading: 'Human or AI?',
      steps: [
        'A shayari &mdash; who wrote it?',
        'A code snippet &mdash; who wrote it?',
        'An image &mdash; who made it?'
      ],
      instruction: 'Crowd votes on each. Show of hands, loud and fast.',
      notes: 'Bridges straight out of the Turing Test. Have your 3 items ready as images in assets/img — press → to step through. Keep it to 2–3 minutes.' },
    /* ============ ACT 3 — THE PLACEMENT SCENE IN THE AI ERA =============== */

    { act: 3, type: 'act-divider', notes: 'The most relevant act for this room. Arc: name the fear honestly → cut through BOTH fear and hype → show the real map → define the new bar → hand off to Act 6. Numbers are ammunition, not a stats lecture.' },

    {
      act: 3, type: 'statement', size: 'xl', mood: 'dark',
      text: 'Will AI replace me?',
      sub: "Honestly, I don't know.",
      notes: 'EMOTIONAL COLD OPEN. Open on silence. Let the question hang. Do NOT rush to reassure. "Honestly, I don\'t know" is the whole move — that honesty earns their trust for the next 15 minutes. Hold the pause, then pivot: "But here is what I DO know about where this is going."'
    },
    {
      act: 3, type: 'statement', size: 'xl', mood: 'dark',
      text: 'Will I even get placed?',
      kicker: 'The 2 a.m. question',
      meme: '"This is fine" dog in the burning room = CS students during placement season.',
      notes: 'Say the quiet part out loud. This fear is not stupid — the ground genuinely moved under them. Validate it before you fix it.'
    },
    {
      act: 3, type: 'stat',
      heading: 'Fresher hiring just hit a two-decade low.',
      stats: [
        { value: '-44%', label: 'entry-level tech openings, year on year' },
        { value: '~0', label: 'freshers onboarded by one big firm in a full quarter' }
      ],
      source: 'Xpheno; 2026 reports',
      punchline: 'The bad news is real, not imaginary.',
      notes: "Don't sugarcoat. Let it land for a second before the next slide flips it. The one big firm is Wipro, reportedly."
    },
    {
      act: 3, type: 'stat', mood: 'up',
      heading: 'Not frozen. Just pickier.',
      stats: [
        { value: '9,000+', label: 'people added by TCS in a single quarter — its strongest in nearly four years' },
        { value: '~25,000', label: 'Cognizant fresher intake, expanding about 20%' }
      ],
      source: 'TCS Q1 FY27; Cognizant 2026',
      punchline: 'Anyone saying "there are zero jobs" is <strong>wrong.</strong>',
      notes: 'The doom-scrollers oversell it. TCS and Infosys are back on campuses in big numbers. This is the turn — let the relief show on your face.'
    },
    {
      act: 3, type: 'versus', spine: true,
      heading: 'Both sides are wrong.',
      left:  { label: 'Fear says', text: 'AI killed all the jobs.' },
      right: { label: 'Hype says', text: 'Become an AI engineer by next semester.' },
      punchline: 'Context is the whole game now. Raw IQ was never the bottleneck.',
      notes: 'THE SPINE OF THE WHOLE ACT. Sit here. Do not rush. The truth is narrower and way more manageable than either panic — this reframe is the thing they should remember.'
    },
    {
      act: 3, type: 'statement', size: 'lg',
      kicker: 'What changed #1',
      text: "AI didn't delete the job. It <strong class=\"accent\">raised the floor</strong> of what the job assumes.",
      sub: 'Recruiters now assume basic AI fluency the way they once assumed you knew Git.',
      footnote: 'At TCS, ~60% of fresher hires were AI-skilled last year — up from barely 10–15% three years ago. [FACE Prep; TCS CHRO, 2026]',
      notes: 'A fresher joining in 2026 is handed an AI assistant on day one and expected to be faster because of it. The bar moved up — it did not vanish.'
    },
    {
      act: 3, type: 'statement', size: 'lg',
      kicker: 'What changed #2',
      text: 'The "degree = guaranteed IT job" pipeline is <strong class="accent">over.</strong>',
      footnote: 'Skilled tracks: ~6–9 LPA. Premium tracks (e.g. TCS Prime): up to ~11 LPA. Plain mass track stays at the bottom. Same company, very different outcomes — based on skill, not college. [FACE Prep, 2026]',
      notes: 'The era of tens of thousands of guaranteed, identical mass offers is fading. Companies want skilled or specialist freshers now, and they pay more for them. Hit "based on skill, not college" — this room needs to hear that.'
    },
    {
      act: 3, type: 'buckets',
      heading: 'Where the jobs actually are',
      sub: 'Four buckets, not one.',
      items: [
        { n: 1, name: 'Mass-hire services', detail: 'TCS, Infosys, Wipro, Cognizant, Accenture, Capgemini, HCL, Tech Mahindra' },
        { n: 2, name: 'Product &amp; captives', detail: 'Google, Microsoft, Amazon, Zoho, Freshworks, GCCs' },
        { n: 3, name: 'Niche &amp; domain', detail: 'VLSI, embedded, analytics, fintech' },
        { n: 4, name: 'International / remote-first', detail: 'Small, but growing fastest for AI/ML' }
      ],
      punchline: 'And zoom out: freshers are now hired hard by e-commerce, startups, retail and manufacturing too.',
      meme: 'Distracted boyfriend — you staring at TCS while startups and product firms wave.',
      notes: 'Stop tunnel-visioning on TCS. More doors than your placement cell shows you. If tight on time, let the NEXT slide (the diagram) replace this spoken list rather than doing both.'
    },
    {
      act: 3, type: 'flow',
      heading: 'The four paths',
      root: 'Where are the jobs?',
      branches: [
        { n: 1, name: 'Mass-hire services',       detail: 'TCS, Infosys, Wipro, Cognizant, Accenture, HCL, TechM<br>High volume, lower CTC, open to every college' },
        { n: 2, name: 'Product &amp; captives / GCCs', detail: 'Google, Microsoft, Amazon, Zoho, Freshworks<br>Higher CTC, longer screening, harder to crack' },
        { n: 3, name: 'Niche &amp; domain',           detail: 'VLSI, embedded, analytics, fintech<br>Fewer seats, higher pay, needs targeted prep' },
        { n: 4, name: 'International / remote',    detail: 'Remote-first, mostly AI/ML roles<br>Small today, growing the fastest' }
      ],
      punchline: 'For a tier-2/3 student, paths <strong>1</strong> and <strong>2</strong> are the realistic focus &mdash; but keep an eye on <strong>4</strong>. That is where the AI-era money is quietly moving.',
      notes: 'Same four buckets as the previous slide, now as one picture so it sticks. Visual pause — let them read it.'
    },
    {
      act: 3, type: 'statement', size: 'lg',
      kicker: 'What interviews test now',
      text: 'DSA still opens the door. <strong class="accent">It&rsquo;s just not the whole house anymore.</strong>',
      beats: [
        'DSA: a shrinking but still-real gate. Clear the filter &mdash; grinding 1000 problems is no longer the moat.',
        'System design: rising fast, far more future-proof.',
        'New AI rounds: "build something with an LLM", basic RAG, prompt sense.'
      ],
      footnote: 'The single biggest differentiator: being able to explain <strong>WHY</strong> you chose this over that, with specifics. Memorised answers lose to a candidate who can narrate tradeoffs.',
      notes: 'Three shifts — reveal one at a time. Land the footnote hard; it is the setup for the roadmap on the next slide.'
    },
    {
      act: 3, type: 'roadmap',
      heading: 'The actual interview prep roadmap',
      phases: [
        { n: 1, name: 'Clear the gate', items: [
            'DSA patterns: ~150&ndash;200 curated problems, <em>not</em> 1000',
            'CS core: OS, DBMS, CN, OOP'
        ]},
        { n: 2, name: 'Build your edge', items: [
            'One deployed project: live link + GitHub, ideally an LLM/RAG app',
            'System design basics: caching, queues, DB choice, API design',
            'AI fluency: build with an LLM, a basic RAG, call an API'
        ]},
        { n: 3, name: 'Win the room', items: [
            'Tradeoff narration: explain <strong>WHY</strong> you chose X over Y',
            'Company-specific mocks for your target tier',
            'Communication + HR rounds'
        ]}
      ],
      highlight: 'Tradeoff narration',
      notes: 'Walk it left to right. Phase 1 is just the filter — do enough DSA to clear it, then STOP grinding. Phase 2 is where you separate from the crowd; the deployed project beats everything else here. Phase 3 is polish, and tradeoff narration is the single highest-return thing on the whole roadmap. Tell them: pick a target company tier first, then calibrate depth.'
    },
    {
      act: 3, type: 'statement', size: 'xl',
      kicker: 'The new resume math',
      text: 'One shipped project beats <strong class="accent">half a CGPA point.</strong>',
      footnote: 'Premium tracks literally review a deployed project before they make the offer.',
      sub: 'Marks got you the test. Shipping gets you the job.',
      notes: 'A working project live on the internet, with a GitHub link, now carries more weight at interview than your branch or a 0.4 CGPA difference.'
    },
    {
      act: 3, type: 'statement', size: 'xl', mood: 'accent',
      text: "AI didn't remove the entry-level job. It raised the floor. <strong class=\"accent\">Your whole game is clearing that new floor.</strong>",
      notes: 'Land it. PAUSE. Then hand off: "So how do you actually clear it? That is the rest of this talk." Sets up the Act 6 payoff.'
    },
    {
      act: 3, type: 'activity',
      label: 'Gut-check',
      heading: 'Quick show of hands.',
      steps: ['How many of you have ONE project that is live on the internet right now &mdash; that I could open on my phone?'],
      instruction: 'Count it out loud. Whatever the number, it makes the point land harder because they just felt it.',
      punchline: 'That number is exactly what the rest of this talk is about.',
      notes: 'Closes the act. Use the result as the bridge into Act 6 whichever way it goes — a low number proves the opportunity, a high number lets you raise the bar.'
    },
    /* ============== ACT 4 — THE 16 TIMELESS RULES ========================= */
    /* The rules group into three arcs, badged on screen:
       belief & destiny (1–5) · duality & detachment (6–9) · people & self-mastery (10–16)

       NOTE ON THE THREE `quote-slot` SLIDES: the Kalam / Dinkar / Peterson
       passages are third-party copyrighted text and are referenced by
       attribution only here. Paste the full text from your existing deck into
       the `text` field of each one before the talk. */

    { act: 4, type: 'act-divider',
      subtitle: "Use them to become so good they can't ignore you",
      kicker: 'Or, ignore them to stay average',
      notes: 'The longest act by far, but most slides are single-line rapid beats so it moves faster than 50 suggests. Decide beforehand whether all 16 rules survive or you trim to the strongest 8–10.' },

    { act: 4, type: 'section-card', label: 'Section 1',
      text: 'The 16 rules that are unbreakable',
      notes: 'Section title card.' },

    { act: 4, type: 'statement', size: 'lg',
      text: 'Why was I telling you my story?',
      sub: "What's the one learning that you can take from my personal experiences that I shared with you just now?",
      notes: 'THE CALLBACK to Act 0. This is where the loop closes — make the connection explicit so the audience feels it click. Take a real answer from the crowd if someone offers one.' },

    { act: 4, type: 'rule', rule: 1, arc: 'belief',
      text: 'You can achieve anything you truly believe in!',
      notes: 'Rule 1. Direct payoff of the two-boys story.' },

    { act: 4, type: 'hook',
      text: 'Have you watched Money Heist?',
      sub: 'Remember how things almost became unimaginably complex and chaotic towards the end?',
      notes: 'Show of hands. Most of the room will have seen it.' },

    { act: 4, type: 'hook',
      text: 'Or, did you notice what Bruce Wayne went through?',
      sub: 'Did you notice how totally messed up his life became before he was able to defeat Joker?',
      notes: 'Second hook for the same rule. Two references so nobody is left out.' },

    { act: 4, type: 'rule', rule: 2, arc: 'belief',
      text: 'If everything is going against your plan, you are very close to your goal.',
      notes: 'Rule 2.' },

    { act: 4, type: 'hook',
      text: 'Do you want to know why?',
      sub: "I tried my BEST to get abs when I was in college, but somehow I just COULDN'T, no matter how hard I tried&hellip;",
      notes: 'Personal example. Callback to the six-pack line from Act 0 — the audience already knows how this ends.' },

    { act: 4, type: 'rule', rule: 3, arc: 'belief',
      text: "Things don't come to you when you want them. They come to you when you are ready for them!",
      notes: 'Rule 3.' },

    { act: 4, type: 'hook',
      text: "What's the biggest learning from Bhagavad Gita?",
      sub: 'Tell me&hellip;',
      notes: 'Genuinely ask. Wait for answers — this is an interaction beat, not a rhetorical question.' },

    { act: 4, type: 'verse',
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br>मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      translation: 'You have the right to work only, but never to its fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction.',
      source: 'Bhagavad Gita, Chapter 2, Verse 47',
      notes: 'The most famous verse in the Gita. Let the Sanskrit sit on screen for a beat before you read the translation.' },

    { act: 4, type: 'rule', rule: 4, arc: 'belief',
      text: 'The bad part is, that you have absolutely no control over the results&hellip;',
      notes: 'Rule 4. Deliberately deflating — Rule 5 is the lift.' },

    { act: 4, type: 'hook', image: 'assets/img/kalam.jpg',
      text: 'Can you imagine him as an Air Force pilot?',
      sub: 'Sounds unreasonable, right?',
      imageNote: 'APJ Abdul Kalam',
      notes: 'Add a photo of APJ Abdul Kalam at assets/img/kalam.jpg. Everyone knows he was rejected for the Air Force — that is the whole point.' },

    { act: 4, type: 'quote-slot',
      attribution: 'APJ Abdul Kalam',
      work: 'Wings of Fire',
      hint: 'The "Desire, when it stems from the heart and spirit&hellip;" passage.',
      text: '',
      notes: 'PASTE THE FULL PASSAGE from your existing slide into the `text` field of this slide in js/slides.js. Left out here for copyright.' },

    { act: 4, type: 'hook',
      text: "The time when I couldn't go to US&hellip;",
      sub: 'Of course, not as inspiring &mdash; but even I have many such stories, and I bet you too have these!',
      notes: 'Your own story. Keep it short — it is the bridge to Rule 5, not the destination.' },

    { act: 4, type: 'rule', rule: 5, arc: 'belief',
      text: "The good part is, that when you don't get what you want, it's because God has bigger plans for you!",
      notes: 'Rule 5. The lift after Rule 4. Closes the belief-and-destiny arc.' },

    { act: 4, type: 'creed', autoBeat: 1,
      lines: [
        { k: 'Fear',      v: 'only God' },
        { k: 'Love',      v: 'everyone' },
        { k: 'Believe',   v: 'in the power of universe' },
        { k: 'Work hard', v: 'daily' }
      ],
      notes: 'Four-line creed. Reveal one line at a time, slowly. This is a breathing slide — no rush.' },

    { act: 4, type: 'hook', pattern: 'Can you imagine&hellip;',
      text: 'Professor without heist?',
      notes: 'Start of the "can you imagine X without Y" run. Five in a row, rapid fire, building to Rule 6. Do not pause between them.' },
    { act: 4, type: 'hook', pattern: 'Can you imagine&hellip;',
      text: 'Bhagat Singh without British Empire?',
      notes: 'Rapid fire — beat 2 of 5.' },
    { act: 4, type: 'hook', pattern: 'Can you imagine&hellip;',
      text: 'MS Dhoni without his passion for cricket?',
      notes: 'Rapid fire — beat 3 of 5.' },
    { act: 4, type: 'hook', pattern: 'Can you imagine&hellip;',
      text: 'Ram without Ravan?',
      notes: 'Rapid fire — beat 4 of 5. The energy should be climbing.' },
    { act: 4, type: 'hook', pattern: 'Can you imagine&hellip;',
      text: 'Krishna without Kansa?',
      notes: 'Rapid fire — beat 5 of 5. Then hit the rule.' },

    { act: 4, type: 'rule', rule: 6, arc: 'duality',
      text: "No hero exists without a villain. That's the law of duality!",
      notes: 'Rule 6. Opens the duality-and-detachment arc.' },

    { act: 4, type: 'hook',
      text: 'Tell me!',
      sub: 'Did Alexander the Great not kill people?',
      notes: 'Provocative on purpose. Let it be uncomfortable for a second.' },
    { act: 4, type: 'hook',
      text: 'Tell me!',
      sub: 'OR, did people not die during Mahabharata?',
      notes: 'Second provocation, same shape.' },
    { act: 4, type: 'hook',
      text: "Still, you feel it's not bad, isn't it?",
      sub: 'And, there are a million more examples.',
      notes: 'The resolution of the two provocations. Sets up the Gita verse.' },

    { act: 4, type: 'verse',
      sanskrit: 'सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ।<br>ततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि॥',
      translation: 'Fight for the sake of duty, treating alike happiness and distress, loss and gain, victory and defeat. Fulfilling your responsibility in this way, you will never incur sin.',
      source: 'Bhagavad Gita, Chapter 2, Verse 38',
      notes: 'The answer to both provocations. Duty over outcome.' },

    { act: 4, type: 'rule', rule: 7, arc: 'duality',
      text: "People who don't take things personally, are attached to a mission, and do their duty are more likely to succeed in life.",
      notes: 'Rule 7. Longest rule on screen — slow down and read it with them.' },

    { act: 4, type: 'hook',
      text: 'How do people get strong?',
      sub: 'Do they become Spiderman in a night, like Peter Parker?',
      notes: '' },
    { act: 4, type: 'hook',
      text: 'How do some people manage to clear the most difficult exams?',
      sub: 'Do they study one night before?',
      notes: 'Rhetorical pair. The room knows the answer — let them say "no".' },

    { act: 4, type: 'rule', rule: 8, arc: 'duality',
      text: "All results come from 'progressive overload'.",
      notes: 'Rule 8. Gym vocabulary, universal principle. Explain progressive overload in one sentence if the room looks blank.' },

    { act: 4, type: 'hook',
      text: 'Ram Setu&hellip;',
      sub: 'Do you know this incident from Ramayan?',
      notes: 'Setup for the Ramcharitmanas doha.' },

    { act: 4, type: 'verse', lang: 'hi',
      sanskrit: 'विनय न मानत जलधि जड़, गए तीनि दिन बीति।<br>बोले राम सकोप तब, भय बिनु होइ न प्रीति॥',
      translation: 'You should have the power to declare a war, and still choose peace.',
      source: 'Ramcharitmanas',
      notes: 'Ram asked the ocean politely for three days. Only when he raised his bow did it yield. "भय बिनु होइ न प्रीति" — that is the line.' },

    { act: 4, type: 'quote-slot',
      attribution: 'Ramdhari Singh Dinkar',
      work: 'Kurukshetra',
      hint: 'The "क्षमा, दया, तप, त्याग&hellip;" excerpt.',
      text: '',
      notes: 'PASTE THE FULL POEM from your existing slide into the `text` field in js/slides.js. Left out here for copyright.' },

    { act: 4, type: 'rule', rule: 9, arc: 'duality',
      text: 'To win in life, you need 3 "C": Confidence, Competence, and being Combat Ready!',
      beats: ['Confidence', 'Competence', 'Combat Ready'],
      notes: 'Rule 9. Closes the duality arc. Three C\'s — reveal them one at a time.' },

    { act: 4, type: 'quote-slot',
      attribution: 'Dr. Jordan B. Peterson',
      hint: 'On a good man being a dangerous man who keeps it under voluntary control.',
      text: '',
      notes: 'PASTE THE FULL QUOTE from your existing slide into the `text` field in js/slides.js. Left out here for copyright.' },

    { act: 4, type: 'hook',
      text: 'Quick question&hellip;',
      sub: 'Imagine yourself talking to 2 separate people. The first one just keeps talking. The second one asks you questions, and listens to you more. Whom do you like / trust / respect more?',
      notes: 'Genuine interaction beat. Wait for the answer — they will say the second one. Then hit Rule 10.' },

    { act: 4, type: 'rule', rule: 10, arc: 'people',
      text: 'All human beings have a tendency to feel more important / powerful when they are being listened to.',
      sub: 'How to use this? <strong>Ask lots of questions while speaking.</strong>',
      notes: 'Rule 10. Opens the people-and-self-mastery arc. Point out that you have been doing this to them all session — that gets a laugh and proves the point.' },

    { act: 4, type: 'hook',
      text: 'Did you know?',
      sub: 'Working out increases endorphin levels, which reduces your stress and boosts your self-confidence and overall sense of wellbeing?',
      notes: '' },

    { act: 4, type: 'rule', rule: 11, arc: 'people',
      text: "Trust in God, and a good workout &mdash; that's all you need to boost your mood.",
      sub: "Trust in <em>nature</em> if you're an atheist. You NEED to have some faith &mdash; if not God, then have faith in nature.",
      notes: 'Rule 11. The sub-line matters — it keeps the whole room included. Do not skip it.' },

    { act: 4, type: 'rule', rule: 12, arc: 'people',
      text: 'No one can care about you as much as you yourself.',
      sub: 'This doesn&rsquo;t mean you have to be selfish. This means <strong>no one else is responsible for you.</strong>',
      notes: 'Rule 12. The clarification is essential — without it this sounds cynical.' },

    { act: 4, type: 'hook',
      text: 'Bhaag Milkha Bhaag',
      sub: 'Do you remember the scene where he finally wins the nationals, but when he comes back, his girlfriend already got married? And he asked his teacher: "What is he winning? What is he losing?"',
      notes: '' },

    { act: 4, type: 'rule', rule: 13, arc: 'people',
      text: 'You are going to lose friends in the process.',
      sub: 'But, you are going to get new friends as well!',
      notes: 'Rule 13. Heavy one for a student crowd — many are living this right now. Give it a beat.' },

    { act: 4, type: 'hook',
      text: 'Escape velocity',
      sub: 'Do you know how a space shuttle goes to space?',
      notes: '' },
    { act: 4, type: 'hook',
      text: 'Road work?',
      sub: 'Do you know why a boxer does&hellip;',
      notes: 'Second setup for Rule 14.' },

    { act: 4, type: 'rule', rule: 14, arc: 'people',
      text: 'Speed defies gravity! A rabbit will always beat a turtle!',
      sub: "The rabbit from our old story was lazy &mdash; don't listen to that story.",
      notes: 'Rule 14. Deliberately contrarian to the fable everyone grew up on. That is what makes it memorable.' },

    { act: 4, type: 'hook',
      text: 'Can you control the actions of the person sitting next to you?',
      sub: 'Or, your friend? Or, your partner? Or, your relatives? Or, anyone in the world?',
      notes: 'Have them literally look at the person next to them. Physical beat, wakes the room up.' },

    { act: 4, type: 'rule', rule: 15, arc: 'people',
      text: 'Your mind is the only thing you can ever control!',
      sub: "But that's the only thing you need to control. <strong>If you control your mind, you can control the world!</strong>",
      notes: 'Rule 15.' },

    { act: 4, type: 'statement', size: 'xl', mood: 'accent',
      text: 'The outer world is a <strong class="accent">delayed reflection</strong> of your inner world.',
      notes: 'Not a numbered rule — a standalone landing beat. Let it sit in silence.' },

    { act: 4, type: 'hook',
      text: 'Can you crack IIT by reading NCERT?',
      sub: 'This is the final one, I swear ;)',
      notes: 'The wink is in the original. Keep it — signals to the room that the long act is ending.' },

    { act: 4, type: 'rule', rule: 16, arc: 'people', last: true,
      text: 'Being just "one step ahead" is a sure-shot way to win in life!',
      notes: 'Rule 16. THE LAST RULE. This is also the quiet thesis of the whole talk — in the AI era, one step ahead is all it takes. Land it and pause before Act 5.' },
    /* ============ ACT 5 — THE IT INDUSTRY IN THE AI WORLD ================= */

    { act: 5, type: 'act-divider', notes: 'Quick act — zoomed out from "your first job" to the industry itself. Five fast slides. Punchy, sentiment over stats. 5–7 minutes.' },

    {
      act: 5, type: 'statement', size: 'lg',
      text: "The 'bench army' era is <strong class=\"accent\">ending.</strong>",
      sub: 'For two decades the model was simple: hire thousands of freshers, park them on the bench, train them, bill them out.',
      footnote: 'AI just automated the bottom of that pyramid.',
      meme: 'Dinosaurs looking up at the incoming meteor.',
      notes: 'Say it honestly, not fearfully. This is a structural observation, not a doom prediction.'
    },
    {
      act: 5, type: 'statement', size: 'lg',
      text: 'The real action shifted from services to <strong class="accent">GCCs.</strong>',
      define: { term: 'GCC — Global Capability Center (a "captive")', body: "A global company's own engineering office in India, instead of outsourcing to a services firm. Think Google, Microsoft, Walmart, JPMorgan running big India centres where staff work directly for the parent, not a middleman." },
      footnote: 'That is where the better-paid product work lives now.',
      notes: 'SPELL OUT THE TERM — most students genuinely will not know it. Then the punch: if your whole map is TCS and Infosys, you are staring at the shrinking half.'
    },
    {
      act: 5, type: 'two-col',
      heading: "What's dying vs what's booming",
      left:  { label: 'Dying', tone: 'down', items: ['Rote ticket-work', 'Manual testing', 'Copy-paste coding', 'L1 support'] },
      right: { label: 'Booming', tone: 'up', items: ['Building with AI', 'Data and ML', 'Cloud and platform', 'Product engineering'] },
      punchline: 'The work that gets automated first is the work that <strong>never asked you to think.</strong>',
      meme: 'Drake meme — no to rote testing, yes to shipping with AI.',
      notes: 'Note "copy-paste coding" in the dying column — point at it and call back to the talk title. That is the single best callback in the deck.'
    },
    {
      act: 5, type: 'pyramid',
      heading: 'The pyramid is becoming a diamond',
      sub: 'Fewer juniors doing rote work. More skilled people building.',
      punchline: 'Scary if you wanted the guaranteed bench seat. <strong class="accent">Pure leverage if you are the skilled one.</strong>',
      notes: 'The old staffing pyramid with its huge fresher base is flattening. Smaller teams ship bigger things now. The animation does the explaining — just let it play.'
    },
    {
      act: 5, type: 'statement', size: 'xl', mood: 'accent',
      text: "The industry isn't shrinking. <strong class=\"accent\">It's rewiring.</strong>",
      sub: 'Fewer rote seats, more builder seats.',
      footnote: 'The question is not "will there be jobs". It is "which side of the rewiring are you on".',
      notes: 'Leverage, not doom. Hands straight into Act 6 — keep the energy lifting.'
    },

    /* ============== ACT 6 — HOW TO GROW IN THE AI ERA ===================== */

    { act: 6, type: 'act-divider', notes: 'THE PAYOFF. Everything before this was the map; this is the move. Keep energy high — this is the emotional climax before the AMA.' },

    {
      act: 6, type: 'statement', size: 'xl',
      text: "Enough about the world. <strong class=\"accent\">Let's talk about you.</strong>",
      notes: 'The pivot the whole talk was built toward. Say it with a lift in energy. The mood changes here from "here is the scary map" to "here is exactly what you do about it."'
    },
    {
      act: 6, type: 'statement', size: 'xl',
      kicker: 'Become the person who ships',
      text: 'One shipped project beats a <strong class="accent">9 CGPA.</strong>',
      sub: 'Not another course. Not another certificate. One real thing that is live on the internet, with a link you can open right now.',
      footnote: 'Build small, but finish it and deploy it. Marks got you the interview; shipping gets you the job.',
      meme: '"Talk is cheap. Show me the code." — Linus Torvalds.',
      notes: 'The single highest-leverage move a student can make. Callback to the show-of-hands from Act 3 — "remember how many hands went up?"'
    },
    {
      act: 6, type: 'statement', size: 'xl',
      kicker: 'Learn in public',
      text: 'Build. Post. Repeat.',
      sub: 'A fresher with no network can build one from scratch by working in the open.',
      footnote: 'Most students never do this because it feels cringe. <strong>That is exactly why it works.</strong> Do it anyway.',
      meme: '"nobody: / me posting my tiny project on LinkedIn" — own the cringe.',
      notes: 'HARVEST THE SEED from Act 1, Slide 3. Say it out loud: "remember the one habit I said changed everything? This is it." Post what you build on LinkedIn and X, write up how you did it. Every post is proof of work.'
    },
    {
      act: 6, type: 'skills',
      heading: "You don't need a PhD. You need to build <em>ONE</em> thing with AI.",
      items: [
        { name: 'Prompting well',        detail: 'The highest-return hour you will spend' },
        { name: 'A basic RAG',           detail: 'Chat over your own notes' },
        { name: 'A simple agent',        detail: 'Something that takes an action' },
        { name: 'Evaluating AI output',  detail: 'Knowing when it is wrong' }
      ],
      punchline: 'Pick <strong>one</strong>. Build one small project &mdash; a chatbot over your notes, a resume screener, a study buddy &mdash; and you are already ahead of most of your batch.',
      footnote: 'The barrier is lower than it has ever been. So the excuse is gone.',
      notes: 'Four skills matter right now. They do not need to master all four. "The excuse is gone" is the line — say it directly to the room.'
    },
    {
      act: 6, type: 'activity', big: true,
      label: 'Activity &mdash; live',
      heading: "Let's settle prompting, live.",
      steps: [
        'Take a lazy one-line prompt from the audience.',
        'Run it on Claude / ChatGPT on the projector.',
        'Rewrite it specific and detailed. Run it again.',
        'Show the gap on screen.'
      ],
      instruction: 'Three minutes. This teaches the single most useful AI skill better than any slide could.',
      notes: 'YOUR ENERGY PEAK — milk it. Have the browser tab already open and logged in before the talk. Have a backup screenshot in assets/img in case the venue wifi dies.'
    },
    {
      act: 6, type: 'statement', size: 'xl',
      kicker: 'Stay T-shaped',
      text: 'AI is the branch. <strong class="accent">Fundamentals are the trunk.</strong>',
      sub: 'Do not skip DSA and system design to chase AI.',
      footnote: 'AI on top of zero fundamentals is a house on sand, and the first hard interview question exposes it. Deep in one thing, working knowledge across many.',
      meme: 'Buff Doge (fundamentals) vs Cheems (AI hype with no basics). Or house on rock vs house on sand.',
      notes: 'Important counterweight — you have spent the whole talk hyping AI, so this is where you keep them honest. Keep the trunk strong, then grow the branch.'
    },
    {
      act: 6, type: 'statement', size: 'xxl', mood: 'accent',
      text: "AI won't take your job. <strong class=\"accent\">An engineer who uses AI will.</strong> Go be that engineer.",
      notes: 'THE ONE LINE TO CARRY HOME. If they forget everything else today, this is the sentence that should survive. Say it. Pause. Let it land. This is the emotional takeaway of the entire talk.'
    },
    {
      act: 6, type: 'challenge',
      kicker: 'Your move this weekend',
      text: 'Ship one tiny thing by <strong class="accent">Monday.</strong>',
      steps: ['Pick a small idea', 'Build it with AI help', 'Deploy it', 'Post the link'],
      notes: 'Convert the inspiration into action before it fades. The whole playbook compressed into a single weekend. Then open the floor: "That\'s what I wanted to share. Now let\'s talk."'
    },

    /* ==================== ACT 7 — CLOSE + AMA ============================= */

    { act: 7, type: 'act-divider', notes: 'Close + AMA. The outreach payoff.' },

    {
      act: 7, type: 'close',
      takeaway: "AI won't take your job. An engineer who uses AI will.",
      cta: 'Go be that engineer.',
      handles: [
        { platform: 'LinkedIn',  handle: '/in/madhavbahl' },
        { platform: 'X',         handle: '@TheLeanProgrammer' },
        { platform: 'Instagram', handle: '@theleanprogrammer' },
        { platform: 'GitHub',    handle: '/MadhavBahlMD' }
      ],
      notes: 'EDIT the handles in js/slides.js if any are wrong. One takeaway, plus where to find you. Then straight into questions.'
    },
    {
      act: 7, type: 'ama',
      heading: 'Ask me anything.',
      sub: 'The board has been open since slide 14.',
      notes: 'Point at the QR. If the board is quiet, seed it with the two questions you get at every talk. Stay on this slide for the rest of the session — press Q for the full-screen QR if people need it bigger.'
    }

  ]
};
