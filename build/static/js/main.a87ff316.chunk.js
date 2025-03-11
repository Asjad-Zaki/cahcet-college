(this["webpackJsonpcollege-management"]=this["webpackJsonpcollege-management"]||[]).push([[0],{20:function(e,t,a){},24:function(e,t,a){e.exports=a(41)},30:function(e,t,a){},31:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),r=a(21),c=a.n(r),u=(a(30),a(8)),s=a(4),m=a(42);a(31);var o=()=>{const[e,t]=Object(l.useState)(""),[a,r]=Object(l.useState)(""),[c,u]=Object(l.useState)(""),o=Object(s.p)();return n.a.createElement("form",{onSubmit:async t=>{t.preventDefault(),u("");try{const t=await m.a.post("http://localhost:5000/api/students/login",{rollNumber:e,dob:a}),{token:l,studentDetails:n}=t.data;localStorage.setItem("studentToken",l),localStorage.setItem("studentRollNo",n.rollNumber),localStorage.setItem("studentName",n.name),localStorage.setItem("studentBranch",n.branch),localStorage.setItem("studentDob",n.dob),o("/student-dashboard")}catch(c){var l,n;u((null===(l=c.response)||void 0===l||null===(n=l.data)||void 0===n?void 0:n.message)||"Login failed. Please try again.")}}},n.a.createElement("h1",null,n.a.createElement("strong",null,"Student Login")),n.a.createElement("input",{type:"text",placeholder:"Roll Number",value:e,onChange:e=>t(e.target.value),required:!0}),n.a.createElement("input",{type:"date",placeholder:"Date of Birth",value:a,onChange:e=>r(e.target.value),required:!0}),n.a.createElement("button",{type:"submit"},"Login"),c&&n.a.createElement("p",{className:"error"},c))},i=a(18);a(36);var E=()=>{const[e,t]=Object(l.useState)(""),[a,r]=Object(l.useState)(""),c=Object(s.p)();return n.a.createElement("form",{onSubmit:async t=>{t.preventDefault();const l=Object(i.a)();try{const t=await Object(i.b)(l,e,a),n=await t.user.getIdToken();localStorage.setItem("facultyToken",n),localStorage.setItem("facultyEmail",e),console.log(n);const r=await m.a.post("http://localhost:5000/api/faculty/login",{idToken:n,email:e});console.log("Faculty Details:",r.data.facultyDetails),c("/faculty-dashboard")}catch(n){console.error("Login error:",n.message),alert("Login failed: "+n.message)}}},n.a.createElement("h2",null,"Faculty Login"),n.a.createElement("input",{type:"email",value:e,onChange:e=>t(e.target.value),placeholder:"Email",required:!0}),n.a.createElement("input",{type:"password",value:a,onChange:e=>r(e.target.value),placeholder:"Password",required:!0}),n.a.createElement("button",{type:"submit"},"Login"))};a(20);var d=()=>{const[e,t]=Object(l.useState)({name:"",rollNumber:"",dob:"",registerNumber:"",branch:"",section:"",batchYear:"",yearOfEntry:"",fatherName:"",fatherOccupation:"",educationOccupation:"",familyBackground:"",parentPhoneNo:"",address:"",languagesKnown:"",guardianName:"",lastSchoolName:"",mediumOfInstructions:"",maths:"",physics:"",chemistry:"",cutOff:"",quota:"",firstYearCounselor:"",secondYearCounselor:"",thirdYearCounselor:"",finalYearCounselor:""}),a=Object(s.p)(),r=e=>{const{name:a,value:l}=e.target;t(e=>({...e,[a]:l}))};return n.a.createElement("div",{className:"register-container"},n.a.createElement("div",{className:"register-card"},n.a.createElement("h2",null,"Student Registration"),n.a.createElement("form",{onSubmit:async t=>{t.preventDefault();try{const t=await m.a.post("http://localhost:5000/api/students/register",e);console.log("Registration successful:",t.data),alert("Student registered successfully!"),a("/")}catch(l){console.error("Error during registration:",l),alert("Registration failed. Please try again.")}}},n.a.createElement("input",{type:"text",name:"name",value:e.name,onChange:r,placeholder:"Name",className:"register-input",required:!0}),n.a.createElement("input",{type:"number",name:"rollNumber",value:e.rollNumber,onChange:r,placeholder:"Roll Number",className:"register-input",required:!0}),n.a.createElement("input",{type:"date",name:"dob",value:e.dob,onChange:r,className:"register-input",required:!0}),n.a.createElement("input",{type:"number",name:"registerNumber",value:e.registerNumber,onChange:r,placeholder:"Register Number",className:"register-input",required:!0}),n.a.createElement("select",{name:"branch",value:e.branch,onChange:r,className:"register-input",required:!0},n.a.createElement("option",{value:"",disabled:!0},"Select Branch"),n.a.createElement("option",{value:"CSE"},"CSE"),n.a.createElement("option",{value:"IT"},"IT"),n.a.createElement("option",{value:"AIDS"},"AIDS"),n.a.createElement("option",{value:"ECE"},"ECE"),n.a.createElement("option",{value:"EEE"},"EEE"),n.a.createElement("option",{value:"MECH"},"MECH"),n.a.createElement("option",{value:"CIVIL"},"CIVIL")),n.a.createElement("select",{name:"section",value:e.section,onChange:r,className:"register-input",required:!0},n.a.createElement("option",{value:"",disabled:!0},"Select Section"),n.a.createElement("option",{value:"A"},"A"),n.a.createElement("option",{value:"B"},"B")),n.a.createElement("select",{name:"batchYear",value:e.batchYear,onChange:r,className:"register-input",required:!0},n.a.createElement("option",{value:"",disabled:!0},"Select Batch Year"),n.a.createElement("option",{value:"2025"},"2025"),n.a.createElement("option",{value:"2026"},"2026"),n.a.createElement("option",{value:"2027"},"2027"),n.a.createElement("option",{value:"2028"},"2028")),n.a.createElement("input",{type:"number",name:"yearOfEntry",value:e.yearOfEntry,onChange:r,placeholder:"Year of Entry",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"fatherName",value:e.fatherName,onChange:r,placeholder:"Father's Name",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"fatherOccupation",value:e.fatherOccupation,onChange:r,placeholder:"Father's Occupation",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"educationOccupation",value:e.educationOccupation,onChange:r,placeholder:"Education Occupation",className:"register-input",required:!0}),n.a.createElement("textarea",{name:"familyBackground",value:e.familyBackground,onChange:r,placeholder:"Family Background",className:"register-input",required:!0}),n.a.createElement("input",{type:"number",name:"parentPhoneNo",value:e.parentPhoneNo,onChange:r,placeholder:"Parent's Phone Number",className:"register-input",required:!0}),n.a.createElement("textarea",{name:"address",value:e.address,onChange:r,placeholder:"Address",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"languagesKnown",value:e.languagesKnown,onChange:r,placeholder:"Languages Known",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"guardianName",value:e.guardianName,onChange:r,placeholder:"Guardian Name",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"lastSchoolName",value:e.lastSchoolName,onChange:r,placeholder:"Last School Name",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"mediumOfInstructions",value:e.mediumOfInstructions,onChange:r,placeholder:"Medium of Instructions",className:"register-input",required:!0}),n.a.createElement("input",{type:"number",name:"maths",value:e.maths,onChange:r,placeholder:"Marks in Maths",className:"register-input",required:!0}),n.a.createElement("input",{type:"number",name:"physics",value:e.physics,onChange:r,placeholder:"Marks in Physics",className:"register-input",required:!0}),n.a.createElement("input",{type:"number",name:"chemistry",value:e.chemistry,onChange:r,placeholder:"Marks in Chemistry",className:"register-input",required:!0}),n.a.createElement("input",{type:"number",name:"cutOff",value:e.cutOff,onChange:r,placeholder:"CutOff",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"quota",value:e.quota,onChange:r,placeholder:"Quota",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"firstYearCounselor",value:e.firstYearCounselor,onChange:r,placeholder:"Counselor Name (1st Year)",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"secondYearCounselor",value:e.secondYearCounselor,onChange:r,placeholder:"Counselor Name (2nd Year)",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"thirdYearCounselor",value:e.thirdYearCounselor,onChange:r,placeholder:"Counselor Name (3rd Year)",className:"register-input",required:!0}),n.a.createElement("input",{type:"text",name:"finalYearCounselor",value:e.finalYearCounselor,onChange:r,placeholder:"Counselor Name (Final Year)",className:"register-input",required:!0}),n.a.createElement("button",{type:"submit",className:"submit-button"},"Register"))))};var p=()=>{const[e,t]=Object(l.useState)({name:"",email:"",password:"",branch:""}),a=Object(s.p)(),r=e=>{const{name:a,value:l}=e.target;t(e=>({...e,[a]:l}))};return n.a.createElement("div",{className:"register-container"},n.a.createElement("div",{className:"register-card"},n.a.createElement("h2",null,"Faculty Registration"),n.a.createElement("form",{onSubmit:async t=>{t.preventDefault();try{const t=await m.a.post("http://localhost:5000/api/faculty/register",e);console.log("Registration successful:",t.data),alert("Faculty registered successfully"),a("/")}catch(l){console.error("Error registering faculty:",l),alert("Error occurred while registering")}}},n.a.createElement("input",{type:"text",placeholder:"Faculty Name",name:"name",value:e.name,onChange:r,className:"register-input",required:!0}),n.a.createElement("input",{type:"email",placeholder:"Email",name:"email",value:e.email,onChange:r,className:"register-input",required:!0}),n.a.createElement("input",{type:"password",placeholder:"Password",name:"password",value:e.password,onChange:r,className:"register-input",required:!0}),n.a.createElement("select",{name:"branch",value:e.branch,onChange:r,className:"register-input",required:!0},n.a.createElement("option",{value:"",disabled:!0},"Select Branch"),n.a.createElement("option",{value:"CSE"},"CSE"),n.a.createElement("option",{value:"IT"},"IT"),n.a.createElement("option",{value:"AIDS"},"AIDS"),n.a.createElement("option",{value:"ECE"},"ECE"),n.a.createElement("option",{value:"EEE"},"EEE"),n.a.createElement("option",{value:"MECH"},"MECH"),n.a.createElement("option",{value:"CIVIL"},"CIVIL")),n.a.createElement("button",{type:"submit",className:"register-btn"},"Register Faculty"))))};a(37);var g=()=>n.a.createElement("div",{className:"form-container"},n.a.createElement("h2",null,"Login Page"),n.a.createElement("div",{className:"role-selection"},n.a.createElement("h3",null,"Select Your Role"),n.a.createElement(u.b,{to:"/student-login"},n.a.createElement("button",null,"Login as Student")),n.a.createElement(u.b,{to:"/faculty-login"},n.a.createElement("button",null,"Login as Faculty"))),n.a.createElement("div",{className:"register-section"},n.a.createElement("h4",null,"Don't have an account?"),n.a.createElement(u.b,{to:"/form-container"},n.a.createElement("button",null,"Register"))));a(38);var h=()=>n.a.createElement("div",{className:"form-container"},n.a.createElement("h2",null,"Registration Page"),n.a.createElement("div",{className:"register-options"},n.a.createElement(u.b,{to:"/student-register"},n.a.createElement("button",null,"Register as Student")),n.a.createElement(u.b,{to:"/faculty-register"},n.a.createElement("button",null,"Register as Faculty"))));a(39);var b=()=>{const[e,t]=Object(l.useState)("details"),[a,r]=Object(l.useState)(!1),c=["CSE","AIDS","IT","ECE","EEE","MECH","CIVIL"],u=["2025","2026","2027","2028"],o=["1","2","3","4","5","6","7","8"],i=["A","B"],[E,d]=Object(l.useState)(""),[p,g]=Object(l.useState)(""),[h,b]=Object(l.useState)(""),[v,y]=Object(l.useState)(""),[N,f]=Object(l.useState)(""),[S,C]=Object(l.useState)(""),[j,O]=Object(l.useState)(null),[k,Y]=Object(l.useState)([]),[A,I]=Object(l.useState)([]),[w,q]=Object(l.useState)([]),[L,B]=Object(l.useState)(""),[R,D]=Object(l.useState)(null),[F,T]=Object(l.useState)([]),[x,P]=Object(l.useState)([]),[_,M]=Object(l.useState)(!1),[H,K]=Object(l.useState)(""),V=Object(s.p)();Object(l.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("facultyToken"),t=localStorage.getItem("facultyEmail");if(!e||!t)return void V("/faculty-login");const a={Authorization:"Bearer "+e},l=await m.a.get("http://localhost:5000/api/faculty/details?email="+t,{headers:a});O(l.data)}catch(t){var e;console.error("Error fetching faculty details:",t.message),401===(null===(e=t.response)||void 0===e?void 0:e.status)&&(localStorage.removeItem("facultyToken"),localStorage.removeItem("facultyEmail"),V("/"))}})()},[V]),Object(l.useEffect)(()=>{p&&h&&E&&(async()=>{try{const e=await m.a.get("http://localhost:5000/api/subjects",{params:{batchYear:p,semester:h,branch:E}});Y(e.data)}catch(e){console.error("Error fetching subjects:",e.message)}})()},[p,h,E]);const Q=async()=>{if(E&&p&&h&&v&&N&&S)try{r(!0);const e=await m.a.get("http://localhost:5000/api/faculty/students",{params:{branch:E,section:v,subjectCode:N,academicYear:p,semester:h}});I(e.data)}catch(e){console.error("Error fetching assessment students:",e.message)}finally{r(!1)}else alert("Please select branch, academic year, semester, section, subject, and exam type for assessments.")},G=async()=>{if(E&&p&&h&&v&&N)try{r(!0);const e=await m.a.get("http://localhost:5000/api/faculty/students",{params:{branch:E,section:v,subjectCode:N,academicYear:p,semester:h}});q(e.data)}catch(e){console.error("Error fetching attendance students:",e.message)}finally{r(!1)}else alert("Please select branch, academic year, semester, section, and subject for attendance.")},U=async()=>{if(!E||!v||!N||0===A.length||!S)return void alert("Please ensure all filters are selected and assessment students are fetched.");const e=A.map(e=>({rollNumber:e.rollNumber,marks:Math.min(parseFloat(e[S]||0),100)}));try{await m.a.post("http://localhost:5000/api/faculty/marks",{branch:E,section:v,semester:h,batchYear:p,subjectCode:N,examType:S,assessments:e}),alert("Assessments stored successfully!"),t("details")}catch(a){console.error("Error saving assessments:",a.message),alert("Error saving assessments.")}},z=async()=>{if(!E||!v||!N||0===w.length)return void alert("Please ensure all filters are selected and attendance students are fetched.");const e=w.map(e=>({rollNumber:e.rollNumber,attendance:Math.min(parseFloat(e.attendance||0),100)}));try{await m.a.post("http://localhost:5000/api/faculty/attendance",{branch:E,section:v,semester:h,batchYear:p,subjectCode:N,attendanceData:e}),alert("Attendance stored successfully!"),t("details")}catch(a){console.error("Error saving attendance:",a.message),alert("Error saving attendance.")}},J=(e,t,a,l,n)=>{const r=[...e];let c=parseFloat(n);isNaN(c)&&(c=0),c>100&&(c=100),r[a][l]=c,t(r)},W=()=>{localStorage.removeItem("facultyToken"),localStorage.removeItem("facultyEmail"),V("/")},X=async()=>{if(L)try{M(!0),K("");const e=await m.a.get("http://localhost:5000/api/students/"+L);D(e.data);const t=await m.a.get("http://localhost:5000/api/students/marks",{params:{rollNumber:L}});T(t.data);const a=await m.a.get("http://localhost:5000/api/students/attendance",{params:{rollNumber:L}});P(a.data)}catch(e){console.error("Error fetching student data:",e.message),K("Error fetching student data")}finally{M(!1)}else alert("Please enter a roll number")},Z=()=>n.a.createElement("button",{className:"homebutton",onClick:()=>t("details")},"Home");return n.a.createElement("div",{className:"faculty-dashboard"},n.a.createElement("div",{className:"sidebar"},n.a.createElement("button",{onClick:()=>t("details")},"Faculty Details"),n.a.createElement("button",{onClick:()=>t("assessment")},"Assessments"),n.a.createElement("button",{onClick:()=>t("attendance")},"Attendance"),n.a.createElement("button",{onClick:()=>t("students")},"Students")),n.a.createElement("div",{className:"main-content"},(()=>{if(a)return n.a.createElement("p",null,"Loading data...");switch(e){case"details":return n.a.createElement("div",{className:"details-tab"},n.a.createElement("h2",null,"Faculty Details"),n.a.createElement("button",{className:"logout",onClick:W},"Logout"),j?n.a.createElement(n.a.Fragment,null,n.a.createElement("p",null,n.a.createElement("strong",null,"Name:")," ",j.name),n.a.createElement("p",null,n.a.createElement("strong",null,"Email:")," ",j.email),n.a.createElement("p",null,n.a.createElement("strong",null,"Branch:")," ",j.branch||"N/A")):n.a.createElement("p",null,"Loading faculty details..."));case"assessment":return n.a.createElement("div",{className:"assessment-tab"},n.a.createElement(Z,null),n.a.createElement("h2",null,"Assessment"),n.a.createElement("label",null,"Select Branch:"),n.a.createElement("select",{value:E,onChange:e=>d(e.target.value)},n.a.createElement("option",{value:""},"-- Select Branch --"),c.map(e=>n.a.createElement("option",{key:e,value:e},e))),"\u2003\u2003\u2003\u2003\u2003\u2003",n.a.createElement("label",null,"Select Academic Year:"),n.a.createElement("select",{value:p,onChange:e=>g(e.target.value)},n.a.createElement("option",{value:""},"-- Select Academic Year --"),u.map(e=>n.a.createElement("option",{key:e,value:e},e))),"\u2003\u2003",n.a.createElement("br",null),n.a.createElement("label",null,"Select Semester:"),n.a.createElement("select",{value:h,onChange:e=>b(e.target.value)},n.a.createElement("option",{value:""},"-- Select Semester --"),o.map(e=>n.a.createElement("option",{key:e,value:e},e))),"\u2003\u2003\u2003\u2003",n.a.createElement("label",null,"Select Section:"),n.a.createElement("select",{value:v,onChange:e=>y(e.target.value)},n.a.createElement("option",{value:""},"-- Select Section --"),i.map(e=>n.a.createElement("option",{key:e,value:e},e))),"\u2003\u2003",n.a.createElement("br",null),n.a.createElement("label",null,"Select Subject:"),n.a.createElement("select",{value:N,onChange:e=>f(e.target.value)},n.a.createElement("option",{value:""},"-- Select Subject --"),k.map(e=>n.a.createElement("option",{key:e.subject_code,value:e.subject_code},e.subject_name," (",e.subject_code,")"))),n.a.createElement("br",null),n.a.createElement("label",null,"Select Exam Type:"),n.a.createElement("select",{value:S,onChange:e=>C(e.target.value)},n.a.createElement("option",{value:""},"-- Select Exam Type --"),n.a.createElement("option",{value:"CAT1"},"CAT1"),n.a.createElement("option",{value:"CAT2"},"CAT2"),n.a.createElement("option",{value:"MODEL"},"MODEL")),n.a.createElement("center",null,n.a.createElement("button",{onClick:Q},"Fetch Students")),a&&n.a.createElement("p",null,"Loading students..."),A.length>0&&n.a.createElement("div",null,n.a.createElement("h3",null,"Students List (Assessments):"),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Roll No."),n.a.createElement("th",null,"Name"),n.a.createElement("th",null,S," Marks"))),n.a.createElement("tbody",null,A.map((e,t)=>n.a.createElement("tr",{key:e.rollNumber},n.a.createElement("td",null,e.rollNumber),n.a.createElement("td",null,e.name),n.a.createElement("td",null,n.a.createElement("input",{type:"number",value:e[S]||"",onChange:e=>J(A,I,t,S,e.target.value)})))))),n.a.createElement("center",null,n.a.createElement("button",{onClick:U},"Save Assessments"))));case"attendance":return n.a.createElement("div",{className:"attendance-tab"},n.a.createElement(Z,null),n.a.createElement("h2",null,"Attendance"),n.a.createElement("label",null,"Select Branch:"),n.a.createElement("select",{value:E,onChange:e=>d(e.target.value)},n.a.createElement("option",{value:""},"-- Select Branch --"),c.map(e=>n.a.createElement("option",{key:e,value:e},e))),"\u2003\u2003\u2003\u2003\u2003",n.a.createElement("label",null,"Select Academic Year:"),n.a.createElement("select",{value:p,onChange:e=>g(e.target.value)},n.a.createElement("option",{value:""},"-- Select Academic Year --"),u.map(e=>n.a.createElement("option",{key:e,value:e},e))),n.a.createElement("br",null),n.a.createElement("label",null,"Select Semester:"),n.a.createElement("select",{value:h,onChange:e=>b(e.target.value)},n.a.createElement("option",{value:""},"-- Select Semester --"),o.map(e=>n.a.createElement("option",{key:e,value:e},e))),"\u2003\u2003\u2003",n.a.createElement("label",null,"Select Section:"),n.a.createElement("select",{value:v,onChange:e=>y(e.target.value)},n.a.createElement("option",{value:""},"-- Select Section --"),i.map(e=>n.a.createElement("option",{key:e,value:e},e))),n.a.createElement("br",null),n.a.createElement("label",null,"Select Subject:"),n.a.createElement("select",{value:N,onChange:e=>f(e.target.value)},n.a.createElement("option",{value:""},"-- Select Subject --"),k.map(e=>n.a.createElement("option",{key:e.subject_code,value:e.subject_code},e.subject_name," (",e.subject_code,")"))),n.a.createElement("center",null,n.a.createElement("button",{onClick:G},"Fetch Students")),a&&n.a.createElement("p",null,"Loading students..."),w.length>0&&n.a.createElement("div",null,n.a.createElement("h3",null,"Students List (Attendance):"),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Roll No."),n.a.createElement("th",null,"Name"),n.a.createElement("th",null,"Attendance (%)"))),n.a.createElement("tbody",null,w.map((e,t)=>n.a.createElement("tr",{key:e.rollNumber},n.a.createElement("td",null,e.rollNumber),n.a.createElement("td",null,e.name),n.a.createElement("td",null,n.a.createElement("input",{type:"number",value:e.attendance||"",onChange:e=>J(w,q,t,"attendance",e.target.value)})))))),n.a.createElement("center",null,n.a.createElement("button",{onClick:z},"Save Attendance"))));case"students":const e=F.reduce((e,t)=>{const a=t.semester?t.semester.toString():"Unknown";return e[a]||(e[a]=[]),e[a].push(t),e},{}),t=x.reduce((e,t)=>{const a=t.semester?t.semester.toString():"Unknown";return e[a]||(e[a]=[]),e[a].push(t),e},{});return n.a.createElement("div",{className:"students-tab"},n.a.createElement(Z,null),n.a.createElement("h2",null,"Student Details"),n.a.createElement("div",{className:"search-student"},n.a.createElement("input",{type:"text",placeholder:"Enter Roll Number",value:L,onChange:e=>B(e.target.value)}),n.a.createElement("button",{onClick:X},"Search")),_&&n.a.createElement("p",null,"Loading student data..."),H&&n.a.createElement("p",{className:"error"},H),R&&n.a.createElement("div",{className:"student-details"},n.a.createElement("center",null,n.a.createElement("strong",null,n.a.createElement("h3",null,"Basic Details"))),n.a.createElement("table",null,n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Name:")),n.a.createElement("td",null,R.name)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Roll Number:")),n.a.createElement("td",null,R.rollNumber)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"DOB:")),n.a.createElement("td",null,R.dob)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Register Number:")),n.a.createElement("td",null,R.registerNumber)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Branch:")),n.a.createElement("td",null,R.branch)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Section:")),n.a.createElement("td",null,R.section)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Batch Year:")),n.a.createElement("td",null,R.batchYear)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Year Of Entry:")),n.a.createElement("td",null,R.yearOfEntry)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Father's Name:")),n.a.createElement("td",null,R.fatherName)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Father's Occupation:")),n.a.createElement("td",null,R.fatherOccupation)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Educational Occupation:")),n.a.createElement("td",null,R.educationOccupation)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Family Background:")),n.a.createElement("td",null,R.familyBackground)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Parent Phone No:")),n.a.createElement("td",null,R.parentPhoneNo)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Address:")),n.a.createElement("td",null,R.address)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Languages Known:")),n.a.createElement("td",null,R.languagesKnown)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Guardian Name:")),n.a.createElement("td",null,R.guardianName)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Last School Name:")),n.a.createElement("td",null,R.lastSchoolName)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Medium Of Instructions:")),n.a.createElement("td",null,R.mediumOfInstructions)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Maths:")),n.a.createElement("td",null,R.maths)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Physics:")),n.a.createElement("td",null,R.physics)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Chemistry:")),n.a.createElement("td",null,R.chemistry)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Cut Off:")),n.a.createElement("td",null,R.cutOff)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Quota:")),n.a.createElement("td",null,R.quota)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"First Year Counselor:")),n.a.createElement("td",null,R.firstYearCounselor)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Second Year Counselor:")),n.a.createElement("td",null,R.secondYearCounselor)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Third Year Counselor:")),n.a.createElement("td",null,R.thirdYearCounselor)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Final Year Counselor:")),n.a.createElement("td",null,R.finalYearCounselor)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Created At:")),n.a.createElement("td",null,R.createdAt)),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("strong",null,"Updated At:")),n.a.createElement("td",null,R.updatedAt))))),F.length>0&&n.a.createElement("div",{className:"student-results"},n.a.createElement("center",null,n.a.createElement("strong",null,n.a.createElement("h3",null,"Results"))),Object.keys(e).map(t=>n.a.createElement("div",{key:t,className:"semester-results"},n.a.createElement("strong",null,n.a.createElement("h4",null,"Semester ",t)),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Subject Code"),n.a.createElement("th",null,"CAT1"),n.a.createElement("th",null,"CAT2"),n.a.createElement("th",null,"Model"))),n.a.createElement("tbody",null,e[t].map(e=>n.a.createElement("tr",{key:e.marks_id},n.a.createElement("td",null,e.subject_code),n.a.createElement("td",null,e.cat1||"N/A"),n.a.createElement("td",null,e.cat2||"N/A"),n.a.createElement("td",null,e.model||"N/A")))))))),x.length>0&&n.a.createElement("div",{className:"student-attendance"},n.a.createElement("center",null,n.a.createElement("strong",null,n.a.createElement("h3",null,"Attendance"))),Object.keys(t).map(e=>n.a.createElement("div",{key:e,className:"semester-attendance"},n.a.createElement("strong",null,n.a.createElement("h4",null,"Semester ",e)),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Subject Code"),n.a.createElement("th",null,"Attendance (%)"))),n.a.createElement("tbody",null,t[e].map(e=>n.a.createElement("tr",{key:e.attendance_id},n.a.createElement("td",null,e.subject_code),n.a.createElement("td",null,null!==e.attendance_percentage?e.attendance_percentage:"N/A")))))))));default:return n.a.createElement("p",null,"Select a tab to view content.")}})()))};a(40);var v=()=>{const[e,t]=Object(l.useState)("details"),[a,r]=Object(l.useState)(null),[c,u]=Object(l.useState)({}),[o,i]=Object(l.useState)({}),[E,d]=Object(l.useState)({}),[p,g]=Object(l.useState)(!0),h=Object(s.p)();Object(l.useEffect)(()=>{(async()=>{const e=localStorage.getItem("studentRollNo");if(e)try{const t=await m.a.get("http://localhost:5000/api/students/"+e);if(console.log("Student Response:",t.data),t.data){const a=t.data;r(a);const l=await m.a.get("http://localhost:5000/api/subjects",{params:{branch:a.branch,batchYear:a.batchYear}});u(b(l.data));const n=await m.a.get("http://localhost:5000/api/students/marks",{params:{rollNumber:e}});i(v(n.data));const c=await m.a.get("http://localhost:5000/api/students/attendance",{params:{rollNumber:e}});d(y(c.data))}}catch(t){console.error("Error fetching data:",t.message)}finally{g(!1)}else h("/student-login")})()},[h]);const b=e=>e.reduce((e,t)=>{const a=t.semester;return e[a]||(e[a]=[]),e[a].push(t),e},{}),v=e=>e.reduce((e,t)=>{const a=t.semester;return e[a]||(e[a]=[]),e[a].push(t),e},{}),y=e=>e.reduce((e,t)=>{const a=t.semester;return e[a]||(e[a]=[]),e[a].push(t),e},{}),N=()=>{localStorage.removeItem("studentRollNo"),h("/")},f=()=>n.a.createElement("button",{onClick:()=>t("details"),style:{margin:"5px"}},"Home");return n.a.createElement("div",{className:"student-dashboard"},n.a.createElement("div",{className:"sidebar"},n.a.createElement("button",{onClick:()=>t("details")},"Details"),n.a.createElement("button",{onClick:()=>t("subjects")},"Subjects"),n.a.createElement("button",{onClick:()=>t("attendance")},"Attendance"),n.a.createElement("button",{onClick:()=>t("results")},"Results")),n.a.createElement("div",{className:"main-content"},(()=>{if(p)return n.a.createElement("p",null,"Loading data...");switch(e){case"details":return n.a.createElement("div",{className:"details-tab"},n.a.createElement("h2",null,"Student Details"),n.a.createElement("button",{className:"logout",onClick:N},"Logout"),a?n.a.createElement(n.a.Fragment,null,n.a.createElement("p",null,n.a.createElement("strong",null,"Name:")," ",a.name),n.a.createElement("p",null,n.a.createElement("strong",null,"DOB:")," ",a.dob),n.a.createElement("p",null,n.a.createElement("strong",null,"Roll Number:")," ",a.rollNumber),n.a.createElement("p",null,n.a.createElement("strong",null,"Register Number:")," ",a.registerNumber),n.a.createElement("p",null,n.a.createElement("strong",null,"Branch:")," ",a.branch),n.a.createElement("p",null,n.a.createElement("strong",null,"Section:")," ",a.section),n.a.createElement("strong",null,"Counsellor Name's:"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("strong",null,"1st Year:")," ",a.firstYearCounselor),n.a.createElement("li",null,n.a.createElement("strong",null,"2nd Year:")," ",a.secondYearCounselor),n.a.createElement("li",null,n.a.createElement("strong",null,"3rd Year:")," ",a.thirdYearCounselor),n.a.createElement("li",null,n.a.createElement("strong",null,"4th Year:")," ",a.finalYearCounselor))):n.a.createElement("p",null,"No details available."));case"subjects":return n.a.createElement("div",{className:"subjects-tab"},n.a.createElement(f,null),n.a.createElement("h2",null,"Subjects"),Object.keys(c).map(e=>n.a.createElement("div",{key:e,className:"semester-table"},n.a.createElement("h3",null,"Semester ",e),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Subject Code"),n.a.createElement("th",null,"Subject Name"))),n.a.createElement("tbody",null,c[e].map((e,t)=>n.a.createElement("tr",{key:e.subject_id||t},n.a.createElement("td",null,e.subject_code),n.a.createElement("td",null,e.subject_name))))))));case"attendance":return n.a.createElement("div",{className:"attendance-tab"},n.a.createElement(f,null),n.a.createElement("h2",null,"Attendance"),Object.keys(E).length>0?Object.keys(E).map(e=>n.a.createElement("div",{key:e,className:"semester-attendance"},n.a.createElement("h3",null,"Semester ",e),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Subject Code"),n.a.createElement("th",null,"Attendance (%)"))),n.a.createElement("tbody",null,E[e].map((e,t)=>n.a.createElement("tr",{key:e.attendance_id||t},n.a.createElement("td",null,e.subject_code),n.a.createElement("td",null,null!==e.attendance_percentage?e.attendance_percentage:"N/A"))))))):n.a.createElement("p",null,"No attendance records available."));case"results":return n.a.createElement("div",{className:"results-tab"},n.a.createElement(f,null),n.a.createElement("h2",null,"Results"),Object.keys(o).length>0?Object.keys(o).map(e=>n.a.createElement("div",{key:e,className:"semester-results"},n.a.createElement("h3",null,"Semester ",e),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Subject Code"),n.a.createElement("th",null,"CAT 1"),n.a.createElement("th",null,"CAT 2"),n.a.createElement("th",null,"Model"))),n.a.createElement("tbody",null,o[e].map((e,t)=>n.a.createElement("tr",{key:e.marks_id||t},n.a.createElement("td",null,e.subject_code),n.a.createElement("td",null,e.cat1||"N/A"),n.a.createElement("td",null,e.cat2||"N/A"),n.a.createElement("td",null,e.model||"N/A"))))))):n.a.createElement("p",null,"No marks available."));case"changeCourse":return n.a.createElement("div",{className:"change-course-tab"},n.a.createElement(f,null),n.a.createElement("h2",null,"Change Course"),n.a.createElement("p",null,"Feature to modify courses will be implemented here."));default:return n.a.createElement("p",null,"Select a tab to view content.")}})()))};var y=function(){return n.a.createElement(u.a,null,n.a.createElement(s.c,null,n.a.createElement(s.a,{path:"/",element:n.a.createElement(g,null)}),n.a.createElement(s.a,{path:"/form-container",element:n.a.createElement(h,null)}),n.a.createElement(s.a,{path:"/student-login",element:n.a.createElement(o,null)}),n.a.createElement(s.a,{path:"/faculty-login",element:n.a.createElement(E,null)}),n.a.createElement(s.a,{path:"/student-register",element:n.a.createElement(d,null)}),n.a.createElement(s.a,{path:"/faculty-register",element:n.a.createElement(p,null)}),n.a.createElement(s.a,{path:"/faculty-dashboard",element:n.a.createElement(b,null)}),n.a.createElement(s.a,{path:"/student-dashboard",element:n.a.createElement(v,null)})))};var N=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,43)).then(t=>{let{getCLS:a,getFID:l,getFCP:n,getLCP:r,getTTFB:c}=t;a(e),l(e),n(e),r(e),c(e)})},f=a(22),S=a(23);const C=Object(f.a)({apiKey:"AIzaSyBWbBOnHDCYmVhYTBRyMSlwIecxMSQnl5Q",authDomain:"smartedu-collegemanagement.firebaseapp.com",projectId:"smartedu-collegemanagement",storageBucket:"smartedu-collegemanagement.firebasestorage.app",messagingSenderId:"117284112982",appId:"1:117284112982:web:d5f2bac5fe5df9d79709f7",measurementId:"G-DKW0DR8H14"});Object(S.a)(C);c.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(y,null))),N()}},[[24,1,2]]]);
//# sourceMappingURL=main.a87ff316.chunk.js.map