import React from 'react';
import { Routes, Route } from 'react-router';
import { Link } from 'react-router';
import { createContext, useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import MainPage from './pages/MainPage';
import NewPage from './pages/NewPage';
import SharePage from './pages/SharePage';
import ParticipatePage from './pages/ParticipatePage';
import StartPage from './pages/StartPage';
import StatusPage from './pages/StatusPage';
import ResultPage from './pages/ResultPage';

export const EventContext = createContext({
  nickname: null,
  results: null,
  setNickname: () => {},
  setResults: () => {}
})

export default function App() {
  const [nickname, setNickname] = useState(null);
  const [results, setResults] = useState(null);
  
  return (
    <EventContext value={{ nickname, setNickname, results, setResults }}>
      <div className='container'>
        <div className='header'>
          <img src={logo} id="logo" alt="img" />
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new" element={<NewPage />} / >
          <Route path="/share/:eventId" element={<SharePage />} />
          <Route path="/participate/:eventId" element={<ParticipatePage />} />
          <Route path="/start/:eventId" element={<StartPage />} />
          <Route path="/status/:eventId" element={<StatusPage />} />
          <Route path="/result/:eventId" element={<ResultPage />} />
        </Routes>
      </div>
    </EventContext>
  );
}