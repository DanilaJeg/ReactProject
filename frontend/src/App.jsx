import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx";
import Degrees from "./pages/Degrees.jsx";
import Cohorts from "./pages/Cohorts.jsx";
import SingleDegree from "./pages/SingleDegree.jsx";
import SingleDegreeCohort from "./pages/SingleDegreeCohort.jsx"
import SingleStudent from "./pages/SingleStudent.jsx";
import CreateDegree from "./pages/CreateDegree.jsx";
import CohortModules from "./pages/CohortModules.jsx";
import CreateCohort from "./pages/CreateCohort.jsx";
import Modules from "./pages/Modules.jsx";
import SingleModule from "./pages/SingleModule.jsx";
import ModuleStudents from "./pages/ModuleStudent.jsx";
import CreateModule from "./pages/CreateModule.jsx";
import Students from "./pages/Students.jsx";
import CreateStudent from "./pages/CreateStudent.jsx";
import SetGrades from "./pages/SetGrade.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/degree" element={<Degrees />} />
        <Route path="/degree/:shortcode" element={<SingleDegree />} />
        <Route path="/cohort/:cohortID" element={<SingleDegreeCohort />} />
        <Route path="/degree/create" element={<CreateDegree />} />
        <Route path="/cohort" element={<Cohorts />} />
        <Route path="/student/:studentID" element={<SingleStudent />} />
        <Route path="/cohort/:cohortID/modules" element={<CohortModules />} />
        <Route path="/cohort/create" element={<CreateCohort />} />
        <Route path="/module" element={<Modules />} />
        <Route path="/module/:code" element={<SingleModule />} />
        <Route path="/module/:moduleCode/student" element={<ModuleStudents />} />
        <Route path="/module/create" element={< CreateModule />} />
        <Route path="/student" element={<Students />}/>
        <Route path="/student/create" element={<CreateStudent />}/>
        <Route path="/student/:studentID/grade" element={<SetGrades />}/>
      </Routes>
    </Router>
  );
}

export default App;
