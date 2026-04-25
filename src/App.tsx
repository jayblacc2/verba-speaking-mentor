import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MobileLayout } from "./screens/components/Layout";
import { AnimatePresence } from "motion/react";

// Screens
import Welcome from "./screens/Welcome";
import SignIn from "./screens/SignIn";
import Onboarding from "./screens/Onboarding";
import Explore from "./screens/Explore";
import Conversation from "./screens/Conversation";
import Summary from "./screens/Summary";
import Review from "./screens/Review";
import Flashcards from "./screens/Flashcards";
import Progress from "./screens/Progress";
import Profile from "./screens/Profile";

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
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
