export type Status = "Draft" | "In Review" | "Published";
export type Role = "Super Admin" | "Admin" | "Publisher";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
  created: string;
  avatarColor: string;
}

export interface Book {
  id: string;
  titleEn: string;
  titleUr: string;
  authorEn: string;
  authorUr: string;
  descriptionEn: string;
  descriptionUr: string;
  year: string;
  pages: string;
  category: string;
  status: Status;
  created: string;
}

export interface Column {
  id: string;
  titleEn: string;
  titleUr: string;
  excerptEn: string;
  excerptUr: string;
  bodyEn: string;
  bodyUr: string;
  status: Status;
  publishedDate: string;
}

export interface UnitedTimesIssue {
  id: string;
  issueNumber: string;
  issueDate: string;
  coverTitleEn: string;
  coverTitleUr: string;
  summaryEn: string;
  summaryUr: string;
  pages: string;
  topics: string;
  status: Status;
}

export interface PartyMember {
  id: string;
  fullNameEn: string;
  fullNameUr: string;
  positionEn: string;
  positionUr: string;
  bioEn: string;
  bioUr: string;
  location: string;
  memberSince: string;
  phone: string;
  email: string;
  status: Status;
}

export interface Event {
  id: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  locationEn: string;
  locationUr: string;
  eventType: string;
  date: string;
  time: string;
  capacity: string;
  status: Status;
}

export interface VisitorLog {
  id: string;
  ip: string;
  country: string;
  page: string;
  referrer: string;
  browser: string;
  date: string;
  duration: string;
}

export const USERS: User[] = [
  { id: "1", name: "Tariq Ali", email: "t.ali@unitedtimes.pk", phone: "+92 300 1234567", role: "Super Admin", status: "Published", created: "Oct 12, 2024", avatarColor: "#475569" },
  { id: "2", name: "Zahra Hussain", email: "zahra.h@unitedtimes.pk", phone: "+92 321 9876543", role: "Admin", status: "Published", created: "Nov 04, 2024", avatarColor: "#0F766E" },
  { id: "3", name: "Imran Qureshi", email: "imran.q@unitedtimes.pk", phone: "+92 333 4567890", role: "Publisher", status: "Published", created: "Jan 18, 2025", avatarColor: "#B45309" },
  { id: "4", name: "Nadia Farooq", email: "n.farooq@unitedtimes.pk", phone: "+92 345 6789012", role: "Publisher", status: "In Review", created: "Feb 02, 2025", avatarColor: "#6D28D9" },
  { id: "5", name: "Sajjad Mahmud", email: "sajjad.m@unitedtimes.pk", phone: "+92 311 2345678", role: "Admin", status: "Draft", created: "Feb 20, 2025", avatarColor: "#52525B" },
  { id: "6", name: "Fatima Khan", email: "f.khan@unitedtimes.pk", phone: "+92 300 8765432", role: "Publisher", status: "Published", created: "Dec 15, 2024", avatarColor: "#BE185D" },
  { id: "7", name: "Usman Raza", email: "usman.r@unitedtimes.pk", phone: "+92 322 3456789", role: "Publisher", status: "Draft", created: "Sep 28, 2024", avatarColor: "#A16207" },
  { id: "8", name: "Sadia Malik", email: "sadia.m@unitedtimes.pk", phone: "+92 303 5678901", role: "Admin", status: "Published", created: "Nov 22, 2024", avatarColor: "#1D4ED8" },
];

export const BOOKS: Book[] = [
  { id: "1", titleEn: "The Idea of Pakistan", titleUr: "پاکستان کا تصور", authorEn: "Ayesha Jalal", authorUr: "عائشہ جلال", descriptionEn: "A comprehensive historical account of Pakistan's founding ideology.", descriptionUr: "پاکستان کے بنیادی نظریے کا ایک جامع تاریخی بیان۔", year: "2022", pages: "420", category: "History", status: "Published", created: "Mar 14, 2024" },
  { id: "2", titleEn: "Decade in Review", titleUr: "دہائی کا جائزہ", authorEn: "Faisal Khan", authorUr: "فیصل خان", descriptionEn: "Political analysis of the last decade in Pakistan.", descriptionUr: "پاکستان میں گزشتہ دہائی کا سیاسی تجزیہ۔", year: "2023", pages: "310", category: "Politics", status: "Published", created: "Apr 02, 2024" },
  { id: "3", titleEn: "Rural Voices", titleUr: "دیہی آوازیں", authorEn: "Sana Tariq", authorUr: "ثنا طارق", descriptionEn: "Stories and struggles of rural communities across Pakistan.", descriptionUr: "پاکستان بھر میں دیہی برادریوں کی کہانیاں اور جدوجہد۔", year: "2024", pages: "240", category: "Society", status: "In Review", created: "May 18, 2024" },
  { id: "4", titleEn: "Economic Crossroads", titleUr: "اقتصادی چوراہے", authorEn: "Hamid Mir", authorUr: "حامد میر", descriptionEn: "Pakistan's economy at a defining moment.", descriptionUr: "پاکستان کی معیشت ایک فیصلہ کن موڑ پر۔", year: "2024", pages: "380", category: "Economy", status: "Draft", created: "Jun 01, 2024" },
  { id: "5", titleEn: "Beyond Borders", titleUr: "سرحدوں سے پرے", authorEn: "Mehreen Hassan", authorUr: "مہرین حسن", descriptionEn: "Foreign policy perspectives from the ground.", descriptionUr: "زمینی سطح سے خارجہ پالیسی کے نقطہ نظر۔", year: "2023", pages: "290", category: "Politics", status: "Published", created: "Jul 22, 2024" },
  { id: "6", titleEn: "Heritage of the Indus", titleUr: "وادئ سندھ کا ورثہ", authorEn: "Rafia Zakaria", authorUr: "رافیہ ذکریا", descriptionEn: "An exploration of civilizational roots along the Indus.", descriptionUr: "دریائے سندھ کے کنارے تہذیبی جڑوں کی ایک تلاش۔", year: "2022", pages: "510", category: "History", status: "Published", created: "Aug 11, 2024" },
];

export const COLUMNS: Column[] = [
  { id: "1", titleEn: "The Quiet Cost of Coalition Politics", titleUr: "اتحادی سیاست کی خاموش قیمت", excerptEn: "Coalition governments have long been seen as a sign of democratic maturity.", excerptUr: "اتحادی حکومتوں کو عرصے سے جمہوری پختگی کی نشانی سمجھا جاتا رہا ہے۔", bodyEn: "Full article body here...", bodyUr: "مکمل مضمون یہاں...", status: "Published", publishedDate: "Nov 10, 2024" },
  { id: "2", titleEn: "Rethinking Urban Planning in Lahore", titleUr: "لاہور میں شہری منصوبہ بندی پر نظر ثانی", excerptEn: "Lahore is at a critical juncture in its urban development story.", excerptUr: "لاہور اپنی شہری ترقی کی کہانی میں ایک اہم موڑ پر ہے۔", bodyEn: "Full article body here...", bodyUr: "مکمل مضمون یہاں...", status: "Published", publishedDate: "Oct 28, 2024" },
  { id: "3", titleEn: "Climate and Crops: The New Crisis", titleUr: "موسم اور فصلیں: نیا بحران", excerptEn: "Pakistan's agricultural sector faces existential pressure from climate change.", excerptUr: "پاکستان کا زرعی شعبہ موسمیاتی تبدیلی کے وجودی دباؤ کا سامنا کر رہا ہے۔", bodyEn: "Full article body here...", bodyUr: "مکمل مضمون یہاں...", status: "In Review", publishedDate: "Dec 05, 2024" },
  { id: "4", titleEn: "Media Independence Under Scrutiny", titleUr: "میڈیا کی آزادی زیر جانچ", excerptEn: "Freedom of the press remains a contested terrain in Pakistan.", excerptUr: "پاکستان میں پریس کی آزادی ایک متنازعہ میدان ہے۔", bodyEn: "Full article body here...", bodyUr: "مکمل مضمون یہاں...", status: "Draft", publishedDate: "" },
];

export const UNITED_TIMES_ISSUES: UnitedTimesIssue[] = [
  { id: "1", issueNumber: "87", issueDate: "2024-11-01", coverTitleEn: "The Silent Shift in Rural Voting", coverTitleUr: "دیہی ووٹنگ میں خاموش تبدیلی", summaryEn: "This issue covers the dramatic shifts in rural voting patterns.", summaryUr: "یہ شمارہ دیہی ووٹنگ کے نمونوں میں劇تبدیلیوں کا احاطہ کرتا ہے۔", pages: "36", topics: "Elections, Agriculture, Economy", status: "Published" },
  { id: "2", issueNumber: "86", issueDate: "2024-10-01", coverTitleEn: "Pakistan at the Economic Crossroads", coverTitleUr: "پاکستان اقتصادی چوراہے پر", summaryEn: "An in-depth look at Pakistan's economic challenges.", summaryUr: "پاکستان کے اقتصادی چیلنجوں پر گہری نظر۔", pages: "40", topics: "Economy, Finance, IMF", status: "Published" },
  { id: "3", issueNumber: "85", issueDate: "2024-09-01", coverTitleEn: "Floods and Forgotten Communities", coverTitleUr: "سیلاب اور بھولی ہوئی برادریاں", summaryEn: "Documenting the aftermath of the 2024 monsoon floods.", summaryUr: "2024ء کے مون سون سیلاب کے بعد کا دستاویزی ریکارڈ۔", pages: "32", topics: "Environment, Relief, Society", status: "Published" },
  { id: "4", issueNumber: "88", issueDate: "2024-12-01", coverTitleEn: "Year in Review: 2024", coverTitleUr: "سال کا جائزہ: 2024", summaryEn: "A comprehensive review of the major events of 2024.", summaryUr: "2024 کے اہم واقعات کا ایک جامع جائزہ۔", pages: "44", topics: "Politics, Economy, Society, Sports", status: "Draft" },
];

export const PARTY_MEMBERS: PartyMember[] = [
  { id: "1", fullNameEn: "Ayesha Malik", fullNameUr: "عائشہ ملک", positionEn: "Regional Coordinator – Punjab", positionUr: "علاقائی کوآرڈینیٹر – پنجاب", bioEn: "Ayesha has served the party for over 15 years across Punjab.", bioUr: "عائشہ نے 15 سال سے زائد عرصے تک پنجاب بھر میں پارٹی کی خدمت کی ہے۔", location: "Lahore", memberSince: "2009", phone: "+92 300 5556789", email: "ayesha@unitedparty.pk", status: "Published" },
  { id: "2", fullNameEn: "Bilal Chaudhry", fullNameUr: "بلال چوہدری", positionEn: "Secretary General", positionUr: "سیکریٹری جنرل", bioEn: "Bilal oversees party operations and strategic planning at the national level.", bioUr: "بلال قومی سطح پر پارٹی کے کاموں اور تزویراتی منصوبہ بندی کی نگرانی کرتے ہیں۔", location: "Islamabad", memberSince: "2005", phone: "+92 321 1112233", email: "bilal@unitedparty.pk", status: "Published" },
  { id: "3", fullNameEn: "Sana Tariq", fullNameUr: "ثنا طارق", positionEn: "Youth Wing Head", positionUr: "یوتھ ونگ سربراہ", bioEn: "Sana leads the party's youth outreach programs nationwide.", bioUr: "ثنا ملک بھر میں پارٹی کے یوتھ آؤٹ ریچ پروگرام کی قیادت کرتی ہیں۔", location: "Karachi", memberSince: "2018", phone: "+92 333 9998877", email: "sana@unitedparty.pk", status: "Published" },
  { id: "4", fullNameEn: "Khalid Mehmood", fullNameUr: "خالد محمود", positionEn: "KP Regional Head", positionUr: "کے پی علاقائی سربراہ", bioEn: "Khalid represents the party's interests in Khyber Pakhtunkhwa.", bioUr: "خالد خیبر پختونخوا میں پارٹی کے مفادات کی نمائندگی کرتے ہیں۔", location: "Peshawar", memberSince: "2011", phone: "+92 345 7776655", email: "khalid@unitedparty.pk", status: "In Review" },
];

export const EVENTS: Event[] = [
  { id: "1", titleEn: "Annual General Assembly", titleUr: "سالانہ عام اجلاس", descriptionEn: "The annual general assembly of the United Party bringing together delegates from all provinces.", descriptionUr: "یونائیٹڈ پارٹی کا سالانہ عام اجلاس جس میں تمام صوبوں کے مندوبین شریک ہوتے ہیں۔", locationEn: "Islamabad Marriott Hotel", locationUr: "اسلام آباد میریٹ ہوٹل", eventType: "Internal", date: "2024-11-14", time: "09:00", capacity: "500", status: "Published" },
  { id: "2", titleEn: "Press Briefing: Regional Security", titleUr: "پریس بریفنگ: علاقائی سلامتی", descriptionEn: "A press briefing on the current regional security situation.", descriptionUr: "موجودہ علاقائی سلامتی کی صورتحال پر پریس بریفنگ۔", locationEn: "UT Headquarters, Media Room", locationUr: "یو ٹی ہیڈکوارٹر، میڈیا روم", eventType: "Press", date: "2024-11-22", time: "14:00", capacity: "80", status: "Published" },
  { id: "3", titleEn: "Book Launch: Decade in Review", titleUr: "کتاب کا اجرا: دہائی کا جائزہ", descriptionEn: "Official launch of the annual political review publication.", descriptionUr: "سالانہ سیاسی جائزے کی اشاعت کا باضابطہ اجرا۔", locationEn: "National Library Auditorium", locationUr: "نیشنل لائبریری آڈیٹوریم", eventType: "Public", date: "2024-12-05", time: "17:00", capacity: "300", status: "Published" },
  { id: "4", titleEn: "Sindh Provincial Conference", titleUr: "سندھ صوبائی کانفرنس", descriptionEn: "Annual conference of Sindh party members to discuss regional agenda.", descriptionUr: "علاقائی ایجنڈے پر بحث کے لیے سندھ پارٹی ممبران کی سالانہ کانفرنس۔", locationEn: "Karachi Arts Council", locationUr: "کراچی آرٹس کونسل", eventType: "Internal", date: "2024-12-18", time: "10:00", capacity: "250", status: "Draft" },
];

export const VISITOR_LOGS: VisitorLog[] = [
  { id: "1", ip: "203.215.145.22", country: "Pakistan", page: "/home", referrer: "google.com", browser: "Chrome 120", date: "Nov 12, 2024 14:23", duration: "4m 12s" },
  { id: "2", ip: "41.102.45.67", country: "Saudi Arabia", page: "/columns", referrer: "Direct", browser: "Safari 17", date: "Nov 12, 2024 13:58", duration: "7m 45s" },
  { id: "3", ip: "110.38.66.110", country: "Pakistan", page: "/books", referrer: "twitter.com", browser: "Firefox 119", date: "Nov 12, 2024 13:44", duration: "2m 30s" },
  { id: "4", ip: "5.62.56.189", country: "United Kingdom", page: "/events", referrer: "Direct", browser: "Chrome 120", date: "Nov 12, 2024 13:30", duration: "1m 15s" },
  { id: "5", ip: "188.214.22.45", country: "UAE", page: "/home", referrer: "facebook.com", browser: "Chrome 120", date: "Nov 12, 2024 13:15", duration: "5m 00s" },
  { id: "6", ip: "111.68.103.65", country: "Pakistan", page: "/party-members", referrer: "google.com", browser: "Edge 119", date: "Nov 12, 2024 12:55", duration: "3m 40s" },
  { id: "7", ip: "213.55.95.201", country: "USA", page: "/books", referrer: "Direct", browser: "Safari 17", date: "Nov 12, 2024 12:44", duration: "9m 22s" },
  { id: "8", ip: "39.45.12.77", country: "Pakistan", page: "/home", referrer: "whatsapp.com", browser: "Chrome Mobile", date: "Nov 12, 2024 12:30", duration: "6m 10s" },
  { id: "9", ip: "154.16.34.89", country: "Canada", page: "/columns", referrer: "Direct", browser: "Chrome 120", date: "Nov 12, 2024 12:18", duration: "8m 33s" },
  { id: "10", ip: "117.247.65.43", country: "Pakistan", page: "/united-times", referrer: "google.com", browser: "Firefox 120", date: "Nov 12, 2024 12:05", duration: "4m 55s" },
];
