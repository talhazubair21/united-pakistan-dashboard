import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { UsersList } from "@/pages/users/UsersList";
import { UserForm } from "@/pages/users/UserForm";
import { BooksList } from "@/pages/books/BooksList";
import { BookForm } from "@/pages/books/BookForm";
import { ColumnsList } from "@/pages/columns/ColumnsList";
import { ColumnForm } from "@/pages/columns/ColumnForm";
import { UnitedTimesList } from "@/pages/united-times/UnitedTimesList";
import { UnitedTimesForm } from "@/pages/united-times/UnitedTimesForm";
import { PartyMembersList } from "@/pages/party-members/PartyMembersList";
import { PartyMemberForm } from "@/pages/party-members/PartyMemberForm";
import { EventsList } from "@/pages/events/EventsList";
import { EventForm } from "@/pages/events/EventForm";
import { VisitorLogs } from "@/pages/VisitorLogs";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/users" component={UsersList} />
      <Route path="/users/add" component={() => <UserForm mode="add" />} />
      <Route path="/users/:id/edit" component={() => <UserForm mode="edit" />} />
      <Route path="/books" component={BooksList} />
      <Route path="/books/add" component={() => <BookForm mode="add" />} />
      <Route path="/books/:id/edit" component={() => <BookForm mode="edit" />} />
      <Route path="/columns" component={ColumnsList} />
      <Route path="/columns/add" component={() => <ColumnForm mode="add" />} />
      <Route path="/columns/:id/edit" component={() => <ColumnForm mode="edit" />} />
      <Route path="/united-times" component={UnitedTimesList} />
      <Route path="/united-times/add" component={() => <UnitedTimesForm mode="add" />} />
      <Route path="/united-times/:id/edit" component={() => <UnitedTimesForm mode="edit" />} />
      <Route path="/party-members" component={PartyMembersList} />
      <Route path="/party-members/add" component={() => <PartyMemberForm mode="add" />} />
      <Route path="/party-members/:id/edit" component={() => <PartyMemberForm mode="edit" />} />
      <Route path="/events" component={EventsList} />
      <Route path="/events/add" component={() => <EventForm mode="add" />} />
      <Route path="/events/:id/edit" component={() => <EventForm mode="edit" />} />
      <Route path="/visitor-logs" component={VisitorLogs} />
    </Switch>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <WouterRouter base={base}>
      <Router />
      <Toaster />
    </WouterRouter>
  );
}

export default App;
