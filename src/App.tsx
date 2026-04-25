import { AnimatePresence } from "motion/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "./components/Toast";
import { MobileLayout } from "./screens/components/Layout";

// Screens
import Conversation from "./screens/Conversation";
import Explore from "./screens/Explore";
import Flashcards from "./screens/Flashcards";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Progress from "./screens/Progress";
import Review from "./screens/Review";
import SignIn from "./screens/SignIn";
import Summary from "./screens/Summary";
import Welcome from "./screens/Welcome";

import History from "./screens/History";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore: React Router type definition for Routes is missing standard React key prop */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected / Main App Routes */}
        <Route element={<MobileLayout />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/review" element={<Review />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}
