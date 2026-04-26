import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import type { ComponentType } from "react";
import { useAuthSessionSync, useCurrentProfileQuery, useCurrentSessionQuery } from "@/api/auth.api";
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

function ProtectedRoute({ component: Component }: { component: ComponentType }) {
  const { data: session, isLoading } = useCurrentSessionQuery();
  const { data: profile, isLoading: isProfileLoading } = useCurrentProfileQuery();

  if (isLoading || isProfileLoading) return null;
  if (!session) return <Redirect to="/login" />;
  if (!profile) return <Redirect to="/login" />;

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/users" component={() => <ProtectedRoute component={UsersList} />} />
      <Route path="/users/add" component={() => <ProtectedRoute component={() => <UserForm mode="add" />} />} />
      <Route path="/users/:id/edit" component={() => <ProtectedRoute component={() => <UserForm mode="edit" />} />} />
      <Route path="/books" component={() => <ProtectedRoute component={BooksList} />} />
      <Route path="/books/add" component={() => <ProtectedRoute component={() => <BookForm mode="add" />} />} />
      <Route path="/books/:id/edit" component={() => <ProtectedRoute component={() => <BookForm mode="edit" />} />} />
      <Route path="/columns" component={() => <ProtectedRoute component={ColumnsList} />} />
      <Route path="/columns/add" component={() => <ProtectedRoute component={() => <ColumnForm mode="add" />} />} />
      <Route path="/columns/:id/edit" component={() => <ProtectedRoute component={() => <ColumnForm mode="edit" />} />} />
      <Route path="/united-times" component={() => <ProtectedRoute component={UnitedTimesList} />} />
      <Route path="/united-times/add" component={() => <ProtectedRoute component={() => <UnitedTimesForm mode="add" />} />} />
      <Route path="/united-times/:id/edit" component={() => <ProtectedRoute component={() => <UnitedTimesForm mode="edit" />} />} />
      <Route path="/party-members" component={() => <ProtectedRoute component={PartyMembersList} />} />
      <Route path="/party-members/add" component={() => <ProtectedRoute component={() => <PartyMemberForm mode="add" />} />} />
      <Route path="/party-members/:id/edit" component={() => <ProtectedRoute component={() => <PartyMemberForm mode="edit" />} />} />
      <Route path="/events" component={() => <ProtectedRoute component={EventsList} />} />
      <Route path="/events/add" component={() => <ProtectedRoute component={() => <EventForm mode="add" />} />} />
      <Route path="/events/:id/edit" component={() => <ProtectedRoute component={() => <EventForm mode="edit" />} />} />
      <Route path="/visitor-logs" component={() => <ProtectedRoute component={VisitorLogs} />} />
    </Switch>
  );
}

function App() {
  useAuthSessionSync();
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <WouterRouter base={base}>
      <Router />
      <Toaster />
    </WouterRouter>
  );
}

export default App;
