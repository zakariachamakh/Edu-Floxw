import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { LearnersList } from "./pages/LearnersList";
import { LearnerProfile } from "./pages/LearnerProfile";
import { Settings } from "./pages/Settings";
import { Schedule } from "./pages/Schedule";
import { Reports } from "./pages/Reports";
import { Tasks } from "./pages/Tasks";
import { Classes } from "./pages/Classes";
import { AccountSecurity } from "./pages/AccountSecurity";
import { Billing } from "./pages/Billing";
import { FeesAndPayments } from "./pages/FeesAndPayments";
import { Onboarding } from "./pages/Onboarding";
import { Communications } from "./pages/Communications";
import { StudentRegistrationWizard } from "./pages/StudentRegistrationWizard";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="learners" element={<LearnersList />} />
          <Route path="learners/new" element={<StudentRegistrationWizard />} />
          <Route path="learners/:id" element={<LearnerProfile />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="communications" element={<Communications />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="classes" element={<Classes />} />
          <Route path="account-security" element={<AccountSecurity />} />
          <Route path="billing" element={<Billing />} />
          <Route path="payments" element={<FeesAndPayments />} />
          <Route path="onboarding" element={<Onboarding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
