import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileLayout } from "./screens/components/Layout";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
    </BrowserRouter>
  );
}
