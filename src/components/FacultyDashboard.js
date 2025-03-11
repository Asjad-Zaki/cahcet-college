import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/FacultyDashboard.css';

const FacultyDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('details');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStudents, setAttendanceStudents] = useState([]);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedEntry, setSelectedEntry] = useState('');
  const [attendancePercentages, setAttendancePercentages] = useState({});

  // Dropdown options
  const branches = ['CSE', 'AIDS', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];
  const academicYears = ['2025', '2026', '2027', '2028'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const sections = ['A', 'B'];

  // Filters for assessments & attendance
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');

  // Data from backend
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [assessmentStudents, setAssessmentStudents] = useState([]);

  // Student search
  const [studentRollNoInput, setStudentRollNoInput] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [studentMarks, setStudentMarks] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentError, setStudentError] = useState('');

  const navigate = useNavigate();

  // Helper functions to group data by semester
  const groupMarksBySemester = (marks) =>
    marks.reduce((acc, mark) => {
      const sem = mark.semester ? mark.semester.toString() : 'Unknown';
      if (!acc[sem]) acc[sem] = [];
      acc[sem].push(mark);
      return acc;
    }, {});

  const groupAttendanceBySemester = (attendance) =>
    attendance.reduce((acc, record) => {
      const sem = record.semester ? record.semester.toString() : 'Unknown';
      if (!acc[sem]) acc[sem] = [];
      acc[sem].push(record);
      return acc;
    }, {});

  // Fetch faculty details
  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const token = localStorage.getItem('facultyToken');
        const email = localStorage.getItem('facultyEmail');
        if (!token || !email) {
          navigate('/faculty-login');
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`http://localhost:5000/api/faculty/details?email=${email}`, { headers });
        setFacultyDetails(res.data);
      } catch (error) {
        console.error('Error fetching faculty details:', error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('facultyToken');
          localStorage.removeItem('facultyEmail');
          navigate('/');
        }
      }
    };
    fetchFacultyDetails();
  }, [navigate]);

  // Fetch subjects when filters change
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/subjects/list`, {
          params: { batchYear: selectedAcademicYear, semester: selectedSemester, branch: selectedBranch },
        });
        setSubjects(res.data);
      } catch (error) {
        console.error('Error fetching subjects:', error.message);
      }
    };
    if (selectedAcademicYear && selectedSemester && selectedBranch) {
      fetchSubjects();
    }
  }, [selectedAcademicYear, selectedSemester, selectedBranch]);

  // Fetch students for assessments
  const handleFetchAssessmentStudents = async () => {
    if (!selectedBranch || !selectedAcademicYear || !selectedSemester || !selectedSection || !selectedSubject || !selectedExamType) {
      alert('Please select all filters for assessments.');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/faculty/students`, {
        params: {
          branch: selectedBranch,
          section: selectedSection,
          subjectCode: selectedSubject,
          academicYear: selectedAcademicYear,
          semester: selectedSemester,
        },
      });
      setAssessmentStudents(res.data);
    } catch (error) {
      console.error('Error fetching assessment students:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students for attendance
  const handleFetchAttendanceStudents = async () => {
    if (!selectedBranch || !selectedAcademicYear || !selectedSemester || !selectedSection || !selectedSubject) {
      alert('Please select all filters for attendance.');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/faculty/students`, {
        params: {
          branch: selectedBranch,
          section: selectedSection,
          subjectCode: selectedSubject,
          academicYear: selectedAcademicYear,
          semester: selectedSemester,
        },
      });
      // Initialize all students with 'P' (Present) status by default
      const studentsWithAttendance = res.data.map(student => ({
        ...student,
        record: 'P' // Default to Present
      }));
      setAttendanceStudents(studentsWithAttendance);
    } catch (error) {
      console.error('Error fetching attendance students:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save assessments
  const handleSaveAssessments = async () => {
    if (!selectedBranch || !selectedSection || !selectedSubject || assessmentStudents.length === 0 || !selectedExamType) {
      alert('Please ensure all filters are selected and students are fetched.');
      return;
    }
    const assessments = assessmentStudents.map((student) => ({
      rollNumber: student.rollNumber,
      marks: Math.min(parseFloat(student[selectedExamType] || 0), 100.0),
    }));
    try {
      await axios.post(`http://localhost:5000/api/faculty/marks`, {
        branch: selectedBranch,
        section: selectedSection,
        semester: selectedSemester,
        batchYear: selectedAcademicYear,
        subjectCode: selectedSubject,
        examType: selectedExamType,
        assessments,
      });
      alert('Assessments saved successfully!');
      setSelectedTab('details');
    } catch (error) {
      console.error('Error saving assessments:', error.message);
      alert('Error saving assessments.');
    }
  };

  // Save attendance
  const handleSaveAttendance = async () => {
    if (!selectedBranch || !selectedSection || !selectedSubject || attendanceStudents.length === 0) {
      alert('Please ensure all filters are selected and students are fetched.');
      return;
    }
  
    const attendanceData = attendanceStudents.map((student) => ({
      rollNumber: student.rollNumber,
      record: student.record, // ✅ Ensure `record` is used, NOT `status`
      attendance_date: selectedDate
    }));
  
    // ✅ Debugging: Log the request payload
    console.log("Sending Attendance Data:", {
      branch: selectedBranch,
      section: selectedSection,
      semester: selectedSemester,
      batchYear: selectedAcademicYear,
      subject_code: selectedSubject, // ✅ Ensure correct field name
      attendance_date: selectedDate,
      attendanceData,
    });
  
    try {
      const response = await axios.post(`http://localhost:5000/api/faculty/attendance`, {
        branch: selectedBranch,
        section: selectedSection,
        semester: selectedSemester,
        batchYear: selectedAcademicYear,
        subject_code: selectedSubject, // ✅ Ensure correct field name
        attendance_date: selectedDate,
        attendanceData,
      });
  
      console.log("Response from Server:", response.data); // ✅ Debugging response
      alert('Attendance saved successfully!');
      setSelectedTab('details');
    } catch (error) {
      console.error('Error saving attendance:', error.response?.data || error.message);
      alert(`Error saving attendance: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  // Calculate attendance percentage
  const handleCalculatePercentage = async () => {
    if (!selectedBranch || !selectedSection || !selectedSubject || !fromDate || !toDate) {
      alert('Please select all required filters and date range.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/faculty/attendance/percentage`, {
        params: {
          branch: selectedBranch,
          section: selectedSection,
          semester: selectedSemester,
          batchYear: selectedAcademicYear,
          subject_code: selectedSubject,
          from_date: fromDate,
          to_date: toDate
        }
      });

      setAttendancePercentages(response.data);
    } catch (error) {
      console.error('Error calculating attendance percentage:', error.message);
      alert('Error calculating attendance percentage.');
    } finally {
      setLoading(false);
    }
  };

  // Handle student search
  const handleStudentSearch = async () => {
    if (!studentRollNoInput) {
      alert('Please enter a roll number.');
      return;
    }
    try {
      setStudentLoading(true);
      setStudentError('');
      const studentRes = await axios.get(`http://localhost:5000/api/students/${studentRollNoInput}`);
      setStudentData(studentRes.data);
      const marksRes = await axios.get(`http://localhost:5000/api/students/marks`, {
        params: { rollNumber: studentRollNoInput },
      });
      setStudentMarks(marksRes.data);
      const attendanceRes = await axios.get(`http://localhost:5000/api/students/attendance`, {
        params: { rollNumber: studentRollNoInput },
      });
      setStudentAttendance(attendanceRes.data);
    } catch (error) {
      console.error('Error fetching student data:', error.message);
      setStudentError('Error fetching student data.');
    } finally {
      setStudentLoading(false);
    }
  };

  // Render tab content wrapped in a common container (.tab-content)
  const renderTabContent = () => {
    if (loading) return <p>Loading data...</p>;

    switch (selectedTab) {
      case 'details':
        return (
          <div className="tab-content details-tab">
            <h2>Faculty Details</h2>
            <button className="logout" onClick={() => { localStorage.removeItem('facultyToken'); navigate('/'); }}>
              Logout
            </button>
            {facultyDetails ? (
              <>
                <p><strong>Name:</strong> {facultyDetails.name}</p>
                <p><strong>Email:</strong> {facultyDetails.email}</p>
                <p><strong>Branch:</strong> {facultyDetails.branch || 'N/A'}</p>
              </>
            ) : (
              <p>Loading faculty details...</p>
            )}
          </div>
        );

      case 'assessment':
        return (
          <div className="tab-content assessment-tab">
            <button className="homebutton" onClick={() => setSelectedTab('details')}>
              Home
            </button>
            <h2>Assessment</h2>
            <div className="filters-container">
              <div className="filter-group">
                <label>Branch:</label>
                <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                  <option value="">-- Select Branch --</option>
                  {branches.map((b) => (<option key={b} value={b}>{b}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label>Academic Year:</label>
                <select value={selectedAcademicYear} onChange={(e) => setSelectedAcademicYear(e.target.value)}>
                  <option value="">-- Select Year --</option>
                  {academicYears.map((year) => (<option key={year} value={year}>{year}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label>Semester:</label>
                <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                  <option value="">-- Select Semester --</option>
                  {semesters.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label>Section:</label>
                <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                  <option value="">-- Select Section --</option>
                  {sections.map((sec) => (<option key={sec} value={sec}>{sec}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label>Subject:</label>
                <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                  <option value="">-- Select Subject --</option>
                  {subjects.map((subject) => (
                    <option key={subject.subject_code} value={subject.subject_code}>
                      {subject.subject_name} ({subject.subject_code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="filter-group">
                <label>Exam Type:</label>
                <select value={selectedExamType} onChange={(e) => setSelectedExamType(e.target.value)}>
                  <option value="">-- Select Exam --</option>
                  <option value="CAT1">CAT1</option>
                  <option value="CAT2">CAT2</option>
                  <option value="MODEL">MODEL</option>
                </select>
              </div>
            </div>
            <button className="btn-primary" onClick={handleFetchAssessmentStudents}>
              Fetch Students
            </button>
            {loading && <p>Loading students...</p>}
            {assessmentStudents.length > 0 && (
              <div className="table-container">
                <h3>Students List (Assessments):</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Roll No.</th>
                      <th>Name</th>
                      <th>{selectedExamType} Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentStudents.map((student, index) => (
                      <tr key={student.rollNumber}>
                        <td>{student.rollNumber}</td>
                        <td>{student.name}</td>
                        <td>
                          <input
                            type="number"
                            className="marks-input"
                            value={student[selectedExamType] || ''}
                            onChange={(e) => {
                              const updated = [...assessmentStudents];
                              updated[index][selectedExamType] = e.target.value;
                              setAssessmentStudents(updated);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table><br />
                <button className="btn-primary" onClick={handleSaveAssessments}>
                  Save Assessments
                </button>
              </div>
            )}
          </div>
        );

      case 'attendance':
        return (
          <div className="tab-content attendance-tab">
            <button className="homebutton" onClick={() => setSelectedTab('details')}>
              Home
            </button>
            <h2>Attendance</h2>
            <div className="filters-container">
              <div className="filter-group">
                <label>Branch:</label>
                <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                  <option value="">-- Select Branch --</option>
                  {branches.map((b) => (<option key={b} value={b}>{b}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label>Academic Year:</label>
                <select value={selectedAcademicYear} onChange={(e) => setSelectedAcademicYear(e.target.value)}>
                  <option value="">-- Select Year --</option>
                  {academicYears.map((year) => (<option key={year} value={year}>{year}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label>Semester:</label>
                <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                  <option value="">-- Select Semester --</option>
                  {semesters.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label>Section:</label>
                <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                  <option value="">-- Select Section --</option>
                  {sections.map((sec) => (<option key={sec} value={sec}>{sec}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label>Subject:</label>
                <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                  <option value="">-- Select Subject --</option>
                  {subjects.map((subject) => (
                    <option key={subject.subject_code} value={subject.subject_code}>
                      {subject.subject_name} ({subject.subject_code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="filter-group">
                  <label>From Date:</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="filter-group">
                  <label>To Date:</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Entry:</label>
                  <select value={selectedEntry} onChange={(e) => setSelectedEntry(e.target.value)}>
                    <option value="">-- Select Entry --</option>
                    <option value="Entry1">Entry 1</option>
                    <option value="Entry2">Entry 2</option>
                  </select>
                </div>
            </div>
            <div className="button-group">
              <button className="btn-primary" onClick={handleFetchAttendanceStudents}>
                Fetch Students
              </button>
              <button 
                className="btn-primary" 
                onClick={handleCalculatePercentage}
                style={{ marginLeft: '10px' }}
              >
                Calculate Percentage
              </button>
            </div>
            {loading && <p>Loading...</p>}
            {Object.keys(attendancePercentages).length > 0 && (
              <div className="percentage-results">
                <h3>Attendance Percentages</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Roll No.</th>
                      <th>Name</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(attendancePercentages).map(([rollNumber, data]) => (
                      <tr key={rollNumber}>
                        <td>{rollNumber}</td>
                        <td>{data.name}</td>
                        <td>{data.percentage.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {attendanceStudents.length > 0 && (
              <div className="table-container">
                <h3>Students List (Attendance):</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Roll No.</th>
                      <th>Name</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceStudents.map((student, index) => (
                      <tr key={student.rollNumber}>
                        <td>{student.rollNumber}</td>
                        <td>{student.name}</td>
                        <td>
                          <button
                            className={`attendance-button ${student.record === 'P' ? 'present' : 'absent'}`}
                            onClick={() => {
                              const updatedStudents = [...attendanceStudents];
                              updatedStudents[index].record = updatedStudents[index].record === 'P' ? 'A' : 'P';
                              setAttendanceStudents(updatedStudents);
                            }}
                          >
                            {student.record}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table><br />
                <button className="btn-primary" onClick={handleSaveAttendance}>
                  Save Attendance
                </button>
              </div>
            )}
          </div>
        );

      case 'students':
        // Group the student's marks and attendance by semester
        const groupedMarks = groupMarksBySemester(studentMarks);
        const groupedAttendance = groupAttendanceBySemester(studentAttendance);
        return (
          <div className="tab-content students-tab">
            <button className="homebutton" onClick={() => setSelectedTab('details')}>
              Home
            </button>
            <h2>Student Details</h2>
            <div className="search-student">
              <input
                type="text"
                placeholder="Enter Roll Number"
                value={studentRollNoInput}
                onChange={(e) => setStudentRollNoInput(e.target.value)}
              />
              <button className="btn-primary" onClick={handleStudentSearch}>
                Search
              </button>
            </div>
            {studentLoading && <p>Loading student data...</p>}
            {studentError && <p className="error">{studentError}</p>}
            {studentData && (
              <div className="student-details">
                <center><strong><h2>Basic Details</h2></strong></center>
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Name:</strong></td>
                      <td>{studentData.name}</td>
                    </tr>
                    <tr>
                      <td><strong>Roll Number:</strong></td>
                      <td>{studentData.rollNumber}</td>
                    </tr>
                    <tr>
                      <td><strong>DOB:</strong></td>
                      <td>{studentData.dob}</td>
                    </tr>
                    <tr>
                      <td><strong>Register Number:</strong></td>
                      <td>{studentData.registerNumber}</td>
                    </tr>
                    <tr>
                      <td><strong>Branch:</strong></td>
                      <td>{studentData.branch}</td>
                    </tr>
                    <tr>
                      <td><strong>Section:</strong></td>
                      <td>{studentData.section}</td>
                    </tr>
                    <tr>
                      <td><strong>Batch Year:</strong></td>
                      <td>{studentData.batchYear}</td>
                    </tr>
                    <tr>
                      <td><strong>Year Of Entry:</strong></td>
                      <td>{studentData.yearOfEntry}</td>
                    </tr>
                    <tr>
                      <td><strong>Father's Name:</strong></td>
                      <td>{studentData.fatherName}</td>
                    </tr>
                    <tr>
                      <td><strong>Father's Occupation:</strong></td>
                      <td>{studentData.fatherOccupation}</td>
                    </tr>
                    <tr>
                      <td><strong>Educational Occupation:</strong></td>
                      <td>{studentData.educationOccupation}</td>
                    </tr>
                    <tr>
                      <td><strong>Family Background:</strong></td>
                      <td>{studentData.familyBackground}</td>
                    </tr>
                    <tr>
                      <td><strong>Parent Phone No:</strong></td>
                      <td>{studentData.parentPhoneNo}</td>
                    </tr>
                    <tr>
                      <td><strong>Address:</strong></td>
                      <td>{studentData.address}</td>
                    </tr>
                    <tr>
                      <td><strong>Languages Known:</strong></td>
                      <td>{studentData.languagesKnown}</td>
                    </tr>
                    <tr>
                      <td><strong>Guardian Name:</strong></td>
                      <td>{studentData.guardianName}</td>
                    </tr>
                    <tr>
                      <td><strong>Last School Name:</strong></td>
                      <td>{studentData.lastSchoolName}</td>
                    </tr>
                    <tr>
                      <td><strong>Medium Of Instructions:</strong></td>
                      <td>{studentData.mediumOfInstructions}</td>
                    </tr>
                    <tr>
                      <td><strong>Maths:</strong></td>
                      <td>{studentData.maths}</td>
                    </tr>
                    <tr>
                      <td><strong>Physics:</strong></td>
                      <td>{studentData.physics}</td>
                    </tr>
                    <tr>
                      <td><strong>Chemistry:</strong></td>
                      <td>{studentData.chemistry}</td>
                    </tr>
                    <tr>
                      <td><strong>Cut Off:</strong></td>
                      <td>{studentData.cutOff}</td>
                    </tr>
                    <tr>
                      <td><strong>Quota:</strong></td>
                      <td>{studentData.quota}</td>
                    </tr>
                    <tr>
                      <td><strong>First Year Counselor:</strong></td>
                      <td>{studentData.firstYearCounselor}</td>
                    </tr>
                    <tr>
                      <td><strong>Second Year Counselor:</strong></td>
                      <td>{studentData.secondYearCounselor}</td>
                    </tr>
                    <tr>
                      <td><strong>Third Year Counselor:</strong></td>
                      <td>{studentData.thirdYearCounselor}</td>
                    </tr>
                    <tr>
                      <td><strong>Final Year Counselor:</strong></td>
                      <td>{studentData.finalYearCounselor}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {studentMarks.length > 0 && (
              <div className="student-results">
                <center><strong><h2>Results</h2></strong></center>
                {Object.keys(groupedMarks).map((sem) => (
                  <div key={sem} className="semester-results">
                    <strong><h4>Semester {sem}</h4></strong>
                    <table>
                      <thead>
                        <tr>
                          <th>Subject Code</th>
                          <th>CAT1</th>
                          <th>CAT2</th>
                          <th>Model</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedMarks[sem].map((mark) => (
                          <tr key={mark.marks_id}>
                            <td>{mark.subject_code}</td>
                            <td>{mark.cat1 || 'N/A'}</td>
                            <td>{mark.cat2 || 'N/A'}</td>
                            <td>{mark.model || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
            {studentAttendance.length > 0 && (
              <div className="student-attendance">
                <center><strong><h2>Attendance</h2></strong></center>
                {Object.keys(groupedAttendance).map((sem) => (
                  <div key={sem} className="semester-attendance">
                    <strong><h4>Semester {sem}</h4></strong>
                    <table>
                      <thead>
                        <tr>
                          <th>Subject Code</th>
                          <th>Attendance Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedAttendance[sem].map((att) => (
                          <tr key={att.attendance_id}>
                            <td>{att.subject_code}</td>
                            <td>{att.record || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <div className="faculty-dashboard">
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ display: isSidebarOpen ? "none" : "block" }}
      >
        <FiMenu size={24} />
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>
          <FiX size={24} />
        </button>
        <div className="sidebar-content">
          <button onClick={() => { setSelectedTab('details'); setIsSidebarOpen(false); }}>
            Faculty Details
          </button>
          <button onClick={() => { setSelectedTab('assessment'); setIsSidebarOpen(false); }}>
            Assessments
          </button>
          <button onClick={() => { setSelectedTab('attendance'); setIsSidebarOpen(false); }}>
            Attendance
          </button>
          <button onClick={() => { setSelectedTab('students'); setIsSidebarOpen(false); }}>
            Students
          </button>
        </div>
      </div>

      <div className="main-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FacultyDashboard;