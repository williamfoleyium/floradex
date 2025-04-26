import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Keep this here
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Encyclopedia from './pages/Encyclopedia/Encyclopedia';
import MyPlants from './pages/MyPlants/MyPlants';
import PlantDetails from './pages/PlantDetails/PlantDetails';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register.jsx';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/layout/ScrollToTop/ScrollToTop';
import styles from './App.module.css';

// import { render, screen } from '@testing-library/react';


function App() {
  const currentUser = useSelector(state => state.auth.user);

  return (
    <Router>
      <ScrollToTop />
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Encyclopedia />} />
            <Route path="/my-plants" element={
              <ProtectedRoute>
                <MyPlants userId={currentUser?._id} />
              </ProtectedRoute>
            } />
            <Route path="/plant/:id" element={<PlantDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
