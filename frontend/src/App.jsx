import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';  
import Navbar from './components/Navbar';

function App() {

  return (
    <Box minH={"100vh"}  bg={{ base: "gray.100", _dark: "gray.900" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App
