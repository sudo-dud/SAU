/**
 * Academic & Literary Editorial Data Store
 * University Department of English Language & Literature
 */

export interface Article {
  id: string;
  volume: string;
  issue: string;
  date: string;
  kicker: string;
  genre: 'Critical Essay' | 'Poetry' | 'Department News' | 'Faculty Research' | 'Translations';
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    institution: string;
    bio: string;
    avatar: string;
  };
  readTime: string;
  doi: string;
  coverImage: string;
  coverCaption: string;
  abstract: string;
  leadParagraph: string;
  bodySections: {
    heading?: string;
    paragraphs: string[];
    pullQuote?: string;
    pullQuoteAttribution?: string;
    marginNote?: {
      anchorIndex: number;
      label: string;
      text: string;
    };
  }[];
  citations: {
    mla: string;
    chicago: string;
    apa: string;
  };
  tags: string[];
}

export interface SocietyEvent {
  id: string;
  society: string;
  title: string;
  date: string;
  time: string;
  location: string;
  host: string;
  capacity: number;
  registeredCount: number;
  category: 'Colloquium' | 'Workshop' | 'Performance' | 'Debate' | 'Reading';
  description: string;
  prerequisites?: string;
  featured: boolean;
}

export interface Society {
  id: string;
  name: string;
  tagline: string;
  founded: number;
  president: string;
  facultyAdvisor: string;
  membersCount: number;
  meetingSchedule: string;
  description: string;
  category: string;
}

export interface LiteraryPrize {
  id: string;
  name: string;
  established: number;
  endowment: string;
  deadline: string;
  status: 'Open for Submissions' | 'Under Review' | 'Concluded';
  description: string;
  recentWinner: {
    year: number;
    recipient: string;
    workTitle: string;
    affiliation: string;
  };
}

export const CURRENT_ISSUE = {
  volume: 'Volume XIV',
  number: 'Issue 3',
  term: 'Michaelmas Term 2026',
  date: 'October 25, 2026',
  mottoLatin: 'Literae Scriptae Manent',
  mottoEnglish: 'The written word endures',
  editorInChief: 'Prof. Julian Harwicke, FBA',
  issn: 'ISSN 1042-8719',
};

export const ARTICLES: Article[] = [
  {
    id: 'cartography-of-solitude',
    volume: 'Vol. XIV',
    issue: 'No. 3',
    date: 'Autumn 2026',
    kicker: 'CRITICAL MONOGRAPH · ROMANTIC STUDIES',
    genre: 'Critical Essay',
    title: 'The Cartography of Solitude: Revisiting Romantic Sublime in the Post-Digital Age',
    subtitle: 'On Wordsworth’s Prelude, algorithmic alienation, and the reclamation of contemplative distance.',
    author: {
      name: 'Dr. Alistair Vance',
      role: 'Chair of Victorian & Romantic Studies',
      institution: 'Radcliffe Quadrangle, Faculty of English',
      bio: 'Alistair Vance specializes in 18th- and 19th-century British poetry and aesthetics. His monograph "The Inhabited Silence" received the Rose Mary Crawshay Cup.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    readTime: '14 min read',
    doi: '10.1080/lit.2026.0418',
    coverImage: 'https://images.unsplash.com/photo-1507842229458-5777a83d3e69?auto=format&fit=crop&w=1200&q=80',
    coverCaption: 'Figure 1: The Long Room at Trinity College, Dublin. Photograph courtesy of Department Special Collections.',
    abstract: 'This treatise examines the epistemological transformation of the romantic "solitary thinker" against twenty-first-century hyper-connectivity. By tracing William Wordsworth’s dialectic of wanderer and landscape, we argue that the modern condition does not destroy the sublime, but fractures its contemplative containment.',
    leadParagraph: 'When William Wordsworth crossed the Simplon Pass in the late summer of 1790, his disappointment at having unwittingly traversed the crest of the Alps without a melodramatic crescendo became the very fulcrum upon which his poetic imagination pivoted. The physical summit was an anticlimax; it was only in retrospection—where memory folded upon sensation—that the mind recognized its own boundless, terrifying autonomy.',
    bodySections: [
      {
        heading: 'I. The Displaced Mountain: From Topography to Interiority',
        paragraphs: [
          'In Book VI of The Prelude, the poet acknowledges that the imagination is not an echo of nature, but an abyss that swallows empirical sensation. The modern reader, trapped in ubiquitous digital surveillance and algorithmic immediacy, approaches the romantic landscape not as an exile from society, but as an exile from stillness itself.',
          'To be truly alone in the nineteenth century was to accept vulnerability before vast abiotic indifference. Today, solitude is an engineered commodity—sold as mindfulness retreats or digital detoxes—yet the sublime requires no curated comfort. It demands the terror of unmediated scale.',
        ],
        pullQuote: 'Language is not merely a vehicle of thought, but the very crucible wherein human interiority is minted.',
        pullQuoteAttribution: 'The Prelude, Book VI, Lines 592–616',
        marginNote: {
          anchorIndex: 1,
          label: 'Note on Simplon',
          text: 'Wordsworth’s 1805 manuscript differs markedly from the 1850 posthumous revision, toning down the Jacobin radicalism while intensifying transcendental diction.',
        },
      },
      {
        heading: 'II. The Chorus of the Screen vs. The Archival Murmur',
        paragraphs: [
          'Contrast this Alpine vertigo with the contemporary reading condition. Where the broadsheet and the folio demanded sequential, deliberate absorption, modern reading surfaces are hyperlinked labyrinths designed for accelerated dispersion. The reader no longer inhabits a solitary hermeneutic circle; they are constantly shadowed by simulated consensus.',
          'Yet within university reading rooms—amongst the scent of calfskin, linen rag, and oak desks—one observes a deliberate resistance. The student who sets aside device telemetry to parse five stanzas of Keats is enacting an insurrectionary defense of human cognitive pacing.',
        ],
        marginNote: {
          anchorIndex: 0,
          label: 'Archival Provenance',
          text: 'See Special Collections MS. Don. d. 102 for William Hazlitt’s annotated copy of the Lyrical Ballads.',
        },
      },
      {
        heading: 'III. Conclusion: Toward an Architecture of Silence',
        paragraphs: [
          'The reclamation of literary study is therefore not an antiquarian retreat, but an act of critical preservation. When we read long sentences with sustained, exacting care, we refuse the truncation of human empathy. In the words of Samuel Taylor Coleridge, "the act of contemplation makes the eye a mirror, but the soul an engine of wonder."',
        ],
      },
    ],
    citations: {
      mla: 'Vance, Alistair. "The Cartography of Solitude: Revisiting Romantic Sublime in the Post-Digital Age." The Quill & Folio, vol. 14, no. 3, 2026, pp. 12–29.',
      chicago: 'Vance, Alistair. 2026. "The Cartography of Solitude: Revisiting Romantic Sublime in the Post-Digital Age." The Quill & Folio 14 (3): 12–29.',
      apa: 'Vance, A. (2026). The cartography of solitude: Revisiting romantic sublime in the post-digital age. The Quill & Folio, 14(3), 12–29.',
    },
    tags: ['Romanticism', 'Wordsworth', 'Aesthetics', 'Philosophy of Reading', 'Digital Humanities'],
  },
  {
    id: 'metrical-disobedience',
    volume: 'Vol. XIV',
    issue: 'No. 3',
    date: 'Autumn 2026',
    kicker: 'POETICS & METRICS · MID-CENTURY FORMS',
    genre: 'Poetry',
    title: 'Metrical Disobedience: Soundscapes of Mid-Century Modernists',
    subtitle: 'How H.D. and Marianne Moore restructured the cadences of English syllabic verse.',
    author: {
      name: 'Evelyn Chen',
      role: 'Doctoral Candidate & Senior Poetry Editor',
      institution: 'Wadham College, Department of English',
      bio: 'Evelyn Chen is an award-winning poet and scholar of modernist prosody. Her work has appeared in Poetry London and Parnassus.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
    readTime: '9 min read',
    doi: '10.1080/lit.2026.0419',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    coverCaption: 'Figure 2: Typesetting proof sheets from the Hogarth Press, Richmond.',
    abstract: 'An investigation into how women modernists deliberately dismantled accentual-syllabic hegemony in favor of botanical and syllabic precision.',
    leadParagraph: 'When Marianne Moore asserted that poetry must present for inspection "imaginary gardens with real toads in them," she was offering more than a vivid aphorism; she was laying out an architectural manifesto for metrical resistance.',
    bodySections: [
      {
        heading: 'Syllabic Scaffolding and Botanical Precision',
        paragraphs: [
          'Unlike the swaggering free verse of Pound or the conservative classical measures of Eliot, Moore count-structured her stanzas with strict, eccentric syllable counts that defied traditional stress patterns.',
          'In reading Moore aloud, the human breath is forced into unexpected intervals, demanding an acoustic vigilance rarely elicited by regular iambics.',
        ],
        pullQuote: 'To disregard the metronome is not to surrender rhythm, but to discover its physiological heartbeat.',
        pullQuoteAttribution: 'Chen, "Metrical Disobedience," p. 44',
      },
    ],
    citations: {
      mla: 'Chen, Evelyn. "Metrical Disobedience: Soundscapes of Mid-Century Modernists." The Quill & Folio, vol. 14, no. 3, 2026, pp. 31–45.',
      chicago: 'Chen, Evelyn. 2026. "Metrical Disobedience: Soundscapes of Mid-Century Modernists." The Quill & Folio 14 (3): 31–45.',
      apa: 'Chen, E. (2026). Metrical disobedience: Soundscapes of mid-century modernists. The Quill & Folio, 14(3), 31–45.',
    },
    tags: ['Modernism', 'Marianne Moore', 'H.D.', 'Prosody', 'Feminist Poetics'],
  },
  {
    id: 'first-folio-marginalia',
    volume: 'Vol. XIV',
    issue: 'No. 3',
    date: 'Autumn 2026',
    kicker: 'ARCHIVAL DISCOVERY · EARLY MODERN DRAMA',
    genre: 'Faculty Research',
    title: 'Marginalia in the First Folio: Unearthing an Unrecorded Stage Direction',
    subtitle: 'A newly deciphered 1632 ink annotation reveals an alternative blocking for Hamlet’s gravedigger scene.',
    author: {
      name: 'Prof. Marcus Sterling, FSA',
      role: 'Regius Professor of Renaissance Literature',
      institution: 'Merton College, Early Modern Institute',
      bio: 'Marcus Sterling has edited four plays for the Arden Shakespeare and curates the Renaissance Paleography Project.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    readTime: '11 min read',
    doi: '10.1080/lit.2026.0420',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80',
    coverCaption: 'Figure 3: Multispectral scan of leaf qq3r showing iron gall ink under 385nm ultraviolet light.',
    abstract: 'Through multispectral imaging conducted at the Bodleian conservation facility, paleographers have resolved a seventeenth-century prompter’s marginalia in Shakespeare’s First Folio (Copy 14). The note specifies an unrecorded prop transaction between Horatio and the Clown.',
    leadParagraph: 'For three centuries, copy 14 of the 1623 Shakespeare First Folio sat in the library of an Oxfordshire manor before entering university custody in 1928. While its margins were long presumed to contain only mundane water damage, modern spectral scrutiny has revealed an astonishing theatrical record.',
    bodySections: [
      {
        heading: 'The Iron Gall Inscriptions of Act V',
        paragraphs: [
          'Directly beside Horatio’s brief assent, "Ay, my lord," faint cursive script in secretary hand reads: "Here he hands to him a parchment rowle." This simple notation overturns traditional assumptions about textual transmission in early Caroline performances.',
        ],
        pullQuote: 'The archival page is never static; beneath seventeenth-century dust lies the vibrant choreography of the Elizabethan stage.',
      },
    ],
    citations: {
      mla: 'Sterling, Marcus. "Marginalia in the First Folio: Unearthing an Unrecorded Stage Direction." The Quill & Folio, vol. 14, no. 3, 2026, pp. 48–62.',
      chicago: 'Sterling, Marcus. 2026. "Marginalia in the First Folio: Unearthing an Unrecorded Stage Direction." The Quill & Folio 14 (3): 48–62.',
      apa: 'Sterling, M. (2026). Marginalia in the first folio: Unearthing an unrecorded stage direction. The Quill & Folio, 14(3), 48–62.',
    },
    tags: ['Shakespeare', 'First Folio', 'Paleography', 'Textual Criticism', 'Renaissance Drama'],
  },
  {
    id: 'translation-as-sanctuary',
    volume: 'Vol. XIV',
    issue: 'No. 3',
    date: 'Autumn 2026',
    kicker: 'TRANSLATION & POLITICS · IRISH STUDIES',
    genre: 'Translations',
    title: 'Translation as Sanctuary: Polyglot Resistance in 19th-Century Dublin',
    subtitle: 'Gaelic ballads rendered into classical hexameters as covert political subversion.',
    author: {
      name: 'Dr. Siobhan O’Connor',
      role: 'Associate Professor of Celtic Languages & Literature',
      institution: 'St. John’s College, Celtic Studies Unit',
      bio: 'Siobhan O’Connor investigates nineteenth-century translation politics and the preservation of oral literature.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    readTime: '12 min read',
    doi: '10.1080/lit.2026.0421',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    coverCaption: 'Figure 4: Manuscript fragment of James Clarence Mangan’s unpublished notebooks, c. 1845.',
    abstract: 'An analytical re-evaluation of James Clarence Mangan and Samuel Ferguson, demonstrating how classical linguistic disguise allowed seditious anti-colonial verse to circulate openly.',
    leadParagraph: 'In the cold winter of 1845, while an t-Amhrán Náisiúnta existed only in the spoken cadences of Connacht cottages, Dublin scholars engaged in a curious intellectual smuggling operation. By masking rebel laments within the respectable guise of Latin and German translations, they outflanked colonial censors with linguistic sleight of hand.',
    bodySections: [
      {
        heading: 'The Double Mask of Mangan',
        paragraphs: [
          'Mangan regularly claimed he was translating from Turkish, Persian, or Spanish, when in fact he was channeling raw Gaelic grief into unforgettable English verse. The exoticized facade gave him political immunity.',
        ],
      },
    ],
    citations: {
      mla: 'O’Connor, Siobhan. "Translation as Sanctuary: Polyglot Resistance in 19th-Century Dublin." The Quill & Folio, vol. 14, no. 3, 2026, pp. 64–78.',
      chicago: 'O’Connor, Siobhan. 2026. "Translation as Sanctuary: Polyglot Resistance in 19th-Century Dublin." The Quill & Folio 14 (3): 64–78.',
      apa: 'O’Connor, S. (2026). Translation as sanctuary: Polyglot resistance in 19th-century Dublin. The Quill & Folio, 14(3), 64–78.',
    },
    tags: ['Translation', 'Irish Literature', 'Gaelic Poetry', 'Censorship', '19th Century'],
  },
  {
    id: 'department-bulletin-curriculum',
    volume: 'Vol. XIV',
    issue: 'No. 3',
    date: 'Autumn 2026',
    kicker: 'DEPARTMENTAL GAZETTE · ACADEMIC GOVERNANCE',
    genre: 'Department News',
    title: 'The 2027 Faculty Tripos Reform: Expanding Decolonial Textualities',
    subtitle: 'The Board of the Faculty of English unrolls updated syllabus integrating Indigenous oralities.',
    author: {
      name: 'Faculty Academic Council',
      role: 'Board of the Faculty of English',
      institution: 'St. Cross Building, University Road',
      bio: 'Official communique ratified at the Michaelmas Faculty Congregation.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    readTime: '6 min read',
    doi: '10.1080/lit.2026.0422',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    coverCaption: 'Figure 5: Faculty Board room in the Radcliffe Humanities Building.',
    abstract: 'Summary of the unanimous resolution adopted by the English Faculty Board restructuring the second-year Honour School syllabus to bridge canonical British verse with global anglophone postcolonial archives.',
    leadParagraph: 'Following an extensive eighteen-month student and faculty consultation, the Department of English Language and Literature has officially promulgated the restructured curriculum for Michaelmas 2027.',
    bodySections: [
      {
        heading: 'Syllabus Innovations and Archival Access',
        paragraphs: [
          'Key adjustments include dedicated modules in Caribbean poetic prosody, trans-Atlantic abolitionist print networks, and computational analysis of early vernacular ballads.',
        ],
      },
    ],
    citations: {
      mla: 'Faculty Board of English. "The 2027 Faculty Tripos Reform." The Quill & Folio, vol. 14, no. 3, 2026, pp. 80–84.',
      chicago: 'Faculty Board of English. 2026. "The 2027 Faculty Tripos Reform." The Quill & Folio 14 (3): 80–84.',
      apa: 'Faculty Board of English. (2026). The 2027 faculty tripos reform. The Quill & Folio, 14(3), 80–84.',
    },
    tags: ['Curriculum', 'Pedagogy', 'Faculty Governance', 'Postcolonial Studies'],
  },
];

export const SOCIETIES: Society[] = [
  {
    id: 'oxford-debating-union',
    name: 'The Collegiate Dialectic Union',
    tagline: 'Defending forensic inquiry and parliamentary rhetoric since 1823',
    founded: 1823,
    president: 'Julian Montgomery (Balliol)',
    facultyAdvisor: 'Prof. Alistair Vance',
    membersCount: 420,
    meetingSchedule: 'Every Thursday, 20:15 in the Debating Chamber',
    description: 'The oldest undergraduate forensic society dedicated to high-table debate, literary dialectic, and the examination of contemporary ethical paradoxes.',
    category: 'Forensics & Public Rhetoric',
  },
  {
    id: 'inklings-poetry-guild',
    name: 'The Inklings Poetry & Verse Workshop',
    tagline: 'Close-reading, metrical discipline, and mutual editorial critique',
    founded: 1933,
    president: 'Beatrix Thorne (Somerville)',
    facultyAdvisor: 'Dr. Siobhan O’Connor',
    membersCount: 165,
    meetingSchedule: 'Tuesdays, 17:30 in the Radcliffe Snug',
    description: 'A weekly closed circle where undergraduate and graduate poets submit drafts under double-blind peer review for rigorous prosodic feedback.',
    category: 'Creative Writing & Poetics',
  },
  {
    id: 'elizabethan-dramatic-society',
    name: 'The Elizabethan & Jacobean Players',
    tagline: 'Reviving early modern performance traditions in collegiate cloisters',
    founded: 1884,
    president: 'Cassian Croft (Exeter)',
    facultyAdvisor: 'Prof. Marcus Sterling',
    membersCount: 210,
    meetingSchedule: 'Wednesdays and Sundays in Magdalen Cloister',
    description: 'Specializing in original-pronunciation staging, early stagecraft combat, and neglected Jacobean revenge tragedies performed outdoors.',
    category: 'Dramatic Performance',
  },
  {
    id: 'comparative-philology-circle',
    name: 'The Old English & Philology Guild',
    tagline: 'Translating Beowulf, Old Norse sagas, and Gothic runes',
    founded: 1911,
    president: 'Astrid Lindholm (St. Hugh’s)',
    facultyAdvisor: 'Dr. K. E. Arbuthnot',
    membersCount: 88,
    meetingSchedule: 'Alternate Fridays, 16:00 in Taylorian Room 3',
    description: 'A gathering of linguistic adventurers deciphering medieval manuscripts, palaeographical ligatures, and historical Germanic dialects.',
    category: 'Linguistics & Manuscripts',
  },
  {
    id: 'undergraduate-review-board',
    name: 'The Student Gazette Editorial Board',
    tagline: 'Curating undergraduate literary criticism, essays, and reviews',
    founded: 1952,
    president: 'Leo Thorne (Merton)',
    facultyAdvisor: 'Dr. Evelyn Chen',
    membersCount: 45,
    meetingSchedule: 'Mondays, 19:00 at Department Boardroom',
    description: 'The student-run editorial board responsible for reading, copyediting, and publishing the quarterly undergraduate literary broadside.',
    category: 'Publishing & Editorial',
  },
];

export const SOCIETY_EVENTS: SocietyEvent[] = [
  {
    id: 'event-1',
    society: 'The Inklings Poetry & Verse Workshop',
    title: 'Masterclass: Ekphrastic Lyricism with Guest Laureate Rowan Davies',
    date: 'Thursday, October 29, 2026',
    time: '17:00 – 19:30',
    location: 'Ashmolean Museum, Gallery of Antiquities',
    host: 'Rowan Davies (T.S. Eliot Prize Nominee)',
    capacity: 35,
    registeredCount: 28,
    category: 'Workshop',
    description: 'A walking workshop examining marble statuary and translating visual spatial tension into accentual-syllabic English verse.',
    prerequisites: 'Bring notebook and two draft stanzas.',
    featured: true,
  },
  {
    id: 'event-2',
    society: 'The Collegiate Dialectic Union',
    title: 'Michaelmas Term Debate: "This House Would Abolish the Authorial Canon"',
    date: 'Friday, October 30, 2026',
    time: '20:15 – 22:30',
    location: 'Union Chamber, Frewin Court',
    host: 'Julian Montgomery & Guest Proposition from Cambridge',
    capacity: 250,
    registeredCount: 194,
    category: 'Debate',
    description: 'The annual inter-varsity clash debating whether institutional syllabi should abandon historical prestige hierarchies.',
    featured: true,
  },
  {
    id: 'event-3',
    society: 'The Elizabethan & Jacobean Players',
    title: 'Casting Call & Cold Readings: "The Duchess of Malfi" (Uncut 1614 Text)',
    date: 'Monday, November 2, 2026',
    time: '18:00 – 21:00',
    location: 'New College Cloisters',
    host: 'Director Cassian Croft',
    capacity: 40,
    registeredCount: 22,
    category: 'Performance',
    description: 'Open auditions for all matriculated students. Parts available for Ferdinand, Bosola, the Duchess, and ensemble players.',
    prerequisites: 'Memorization of 15 lines of Jacobean blank verse encouraged.',
    featured: false,
  },
  {
    id: 'event-4',
    society: 'The Old English & Philology Guild',
    title: 'Palaeography Practicum: Decoding 11th-Century Cotton Vitellius Ligatures',
    date: 'Wednesday, November 4, 2026',
    time: '15:30 – 17:30',
    location: 'Weston Library, Rare Books Seminar Rm 2',
    host: 'Dr. K. E. Arbuthnot',
    capacity: 20,
    registeredCount: 19,
    category: 'Colloquium',
    description: 'Hands-on examination of high-resolution digital facsimiles of the Nowell Codex with ultraviolet enhancement demonstration.',
    featured: false,
  },
  {
    id: 'event-5',
    society: 'The Student Gazette Editorial Board',
    title: 'Manuscript Review Symposium: Submissions for the Winter Folio',
    date: 'Saturday, November 7, 2026',
    time: '11:00 – 16:00',
    location: 'English Faculty Building, Room 104',
    host: 'Leo Thorne & Evelyn Chen',
    capacity: 30,
    registeredCount: 14,
    category: 'Reading',
    description: 'Editorial roundtable evaluating anonymized student poetry, short stories, and critical monographs for the upcoming print edition.',
    featured: false,
  },
];

export const LITERARY_PRIZES: LiteraryPrize[] = [
  {
    id: 'shelley-poetry-prize',
    name: 'The Percy Bysshe Shelley Memorial Medal for Lyric Verse',
    established: 1924,
    endowment: '£3,500 + Publication in Folio',
    deadline: 'December 1, 2026',
    status: 'Open for Submissions',
    description: 'Awarded annually to an outstanding unpublished suite of poems (maximum 200 lines) displaying exceptional acoustic invention.',
    recentWinner: {
      year: 2025,
      recipient: 'Helena Sterling',
      workTitle: 'Liturgies for an Estuary',
      affiliation: 'Lady Margaret Hall',
    },
  },
  {
    id: 'johnsonian-monograph',
    name: 'The Samuel Johnson Critical Monograph Award',
    established: 1948,
    endowment: '£4,000 + Archival Research Fellowship',
    deadline: 'January 15, 2027',
    status: 'Open for Submissions',
    description: 'Honoring the most rigorous undergraduate or graduate critical dissertation on 18th-century letters, satire, or lexicography.',
    recentWinner: {
      year: 2025,
      recipient: 'Arthur Pendelton',
      workTitle: 'The Irony of Subscriptions: Pope’s Iliad and Commercial Autonomy',
      affiliation: 'Christ Church',
    },
  },
  {
    id: 'charlotte-bronte-fiction',
    name: 'The Charlotte Brontë Prize for Narrative Prose',
    established: 1976,
    endowment: '£2,500 + London Literary Agency Review',
    deadline: 'November 20, 2026',
    status: 'Open for Submissions',
    description: 'For an exceptional novella or short story exploring psychological displacement, landscape, and moral threshold.',
    recentWinner: {
      year: 2025,
      recipient: 'Nadia Qasim',
      workTitle: 'The Salt Cellar at Low Water',
      affiliation: 'St. Hilda’s College',
    },
  },
];
