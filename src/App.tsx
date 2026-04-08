import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LayoutWrapper } from './components/Layout';
import { ToastProvider } from './components/Toast';
import { StreakProvider } from './context/StreakContext';
import { StudentsPage } from './pages/StudentsPage';
import { JournalPage } from './pages/JournalPage';
import { MarketPage } from './pages/MarketPage';
import { ActivityPage } from './pages/ActivityPage';
import { DailyPage } from './pages/DailyPage';

export default function App() {
  return (
    <Router>
      <StreakProvider>
      <ToastProvider>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<StudentsPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/daily" element={<DailyPage />} />
          </Routes>
        </LayoutWrapper>
      </ToastProvider>
      </StreakProvider>
    </Router>
  );
}
