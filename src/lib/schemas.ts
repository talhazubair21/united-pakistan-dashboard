import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean().optional(),
});

export const userSchema = yup.object({
  fullName: yup.string().min(2, "Name must be at least 2 characters").required("Full name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  phone: yup.string().min(10, "Enter a valid phone number").required("Phone is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().oneOf(["Super Admin", "Admin", "Publisher"]).required("Role is required"),
  status: yup.string().oneOf(["Draft", "In Review", "Published"]).required("Status is required"),
});

export const bookSchema = yup.object({
  titleEn: yup.string().required("English title is required"),
  titleUr: yup.string().required("Urdu title is required"),
  authorEn: yup.string().required("English author is required"),
  authorUr: yup.string().required("Urdu author is required"),
  descriptionEn: yup.string().required("English description is required"),
  descriptionUr: yup.string().required("Urdu description is required"),
  year: yup.string().matches(/^\d{4}$/, "Enter a valid year").required("Year is required"),
  pages: yup.string().matches(/^\d+$/, "Enter a valid page count").required("Pages is required"),
  category: yup.string().required("Category is required"),
  status: yup.string().oneOf(["Draft", "In Review", "Published"]).required("Status is required"),
});

export const columnSchema = yup.object({
  titleEn: yup.string().required("English title is required"),
  titleUr: yup.string().required("Urdu title is required"),
  excerptEn: yup.string().required("English excerpt is required"),
  excerptUr: yup.string().required("Urdu excerpt is required"),
  bodyEn: yup.string().required("English body is required"),
  bodyUr: yup.string().required("Urdu body is required"),
  status: yup.string().oneOf(["Draft", "In Review", "Published"]).required("Status is required"),
});

export const unitedTimesSchema = yup.object({
  issueNumber: yup.string().matches(/^\d+$/, "Enter a valid issue number").required("Issue number is required"),
  issueDate: yup.string().required("Issue date is required"),
  coverTitleEn: yup.string().required("English cover title is required"),
  coverTitleUr: yup.string().required("Urdu cover title is required"),
  summaryEn: yup.string().required("English summary is required"),
  summaryUr: yup.string().required("Urdu summary is required"),
  pages: yup.string().matches(/^\d+$/, "Enter valid pages").required("Pages is required"),
  topics: yup.string().required("Topics are required"),
  status: yup.string().oneOf(["Draft", "In Review", "Published"]).required("Status is required"),
});

export const partyMemberSchema = yup.object({
  fullNameEn: yup.string().required("English name is required"),
  fullNameUr: yup.string().required("Urdu name is required"),
  positionEn: yup.string().required("English position is required"),
  positionUr: yup.string().required("Urdu position is required"),
  bioEn: yup.string().required("English biography is required"),
  bioUr: yup.string().required("Urdu biography is required"),
  location: yup.string().required("Location is required"),
  memberSince: yup.string().matches(/^\d{4}$/, "Enter a valid year").required("Member since is required"),
  phone: yup.string().min(10, "Enter a valid phone").required("Phone is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  status: yup.string().oneOf(["Draft", "In Review", "Published"]).required("Status is required"),
});

export const eventSchema = yup.object({
  titleEn: yup.string().required("English title is required"),
  titleUr: yup.string().required("Urdu title is required"),
  descriptionEn: yup.string().required("English description is required"),
  descriptionUr: yup.string().required("Urdu description is required"),
  locationEn: yup.string().required("English location is required"),
  locationUr: yup.string().required("Urdu location is required"),
  eventType: yup.string().required("Event type is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  capacity: yup.string().matches(/^\d+$/, "Enter valid capacity").required("Capacity is required"),
  status: yup.string().oneOf(["Draft", "In Review", "Published"]).required("Status is required"),
});

export type LoginValues = yup.InferType<typeof loginSchema>;
export type UserValues = yup.InferType<typeof userSchema>;
export type BookValues = yup.InferType<typeof bookSchema>;
export type ColumnValues = yup.InferType<typeof columnSchema>;
export type UnitedTimesValues = yup.InferType<typeof unitedTimesSchema>;
export type PartyMemberValues = yup.InferType<typeof partyMemberSchema>;
export type EventValues = yup.InferType<typeof eventSchema>;
