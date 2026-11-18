/* =========================================================
   MEDCARE HMS - CONNECTED JAVASCRIPT
========================================================= */


/* =========================================================
   LOGIN PROTECTION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /*
      Agar aap login system use kar rahe ho to ye protection
      uncomment kar sakte ho.

      if (localStorage.getItem("medcareLoggedIn") !== "true") {
          window.location.href = "login.html";
      }
    */

    initializeData();
    ensureLargeDemoDataset();
    injectPremiumModules();
    setupNavigation();
    setupForms();
    setupSearch();
    setupTheme();
    setupNotifications();
    loadSettings();

    loadPatients();
    loadDoctors();
    loadAppointments();
    loadInvoices();
    updateDashboard();

    if (window.lucide) {
        lucide.createIcons();
    }

    initializeCharts();

});


/* =========================================================
   DEFAULT DATA
========================================================= */

function initializeData() {

    if (!localStorage.getItem("medcarePatients")) {

        const patients = [

            {
                id: "PT-001",
                name: "Rahul Sharma",
                age: 34,
                gender: "Male",
                phone: "9876543210"
            },

            {
                id: "PT-002",
                name: "Priya Malhotra",
                age: 29,
                gender: "Female",
                phone: "9876501234"
            }

        ];

        localStorage.setItem(
            "medcarePatients",
            JSON.stringify(patients)
        );
    }


    if (!localStorage.getItem("medcareDoctors")) {

        const doctors = [

            {
               
               id: "DR-001",
               name: "Dr. Anjali Mehta",
               specialization: "Cardiologist",
               department: "Cardiology",
               experience: 12,
               status: "Available"

            },

            {
                id: "DR-002",
                name: "Dr. Rohit Kumar",
                specialization: "Neurologist",
                department: "Neurology",
                experience: 9,
                status: "Available"
            },

            {
                id: "DR-003",
                name: "Dr. Neha Singh",
                specialization: "Pediatrician",
                department: "Pediatrics",
                experience: 7,
                status: "In Surgery"
            },

            {
                id: "DR-004",
                name: "Dr. Vikram Shah",
                specialization: "Orthopedic Surgeon",
                department: "Orthopedic",
                experience: 14,
                status: "Available"
            }

        ];

        localStorage.setItem(
            "medcareDoctors",
            JSON.stringify(doctors)
        );
    }


    if (!localStorage.getItem("medcareAppointments")) {

        const appointments = [

            {
                id: "AP-001",
                patient: "Rahul Sharma",
                doctor: "Dr. Anjali Mehta",
                department: "Cardiology",
                date: "2026-09-02",
                time: "09:30",
                status: "Confirmed"
            },

            {
                id: "AP-002",
                patient: "Priya Malhotra",
                doctor: "Dr. Rohit Kumar",
                department: "Neurology",
                date: "2026-09-02",
                time: "10:15",
                status: "Pending"
            }

        ];

        localStorage.setItem(
            "medcareAppointments",
            JSON.stringify(appointments)
        );
    }


    if (!localStorage.getItem("medcareInvoices")) {

        const invoices = [

            {
                id: "INV-1001",
                patient: "Rahul Sharma",
                service: "Cardiology Consultation",
                amount: 2500,
                date: "2026-09-02",
                status: "Paid"
            },

            {
                id: "INV-1002",
                patient: "Priya Malhotra",
                service: "Neurology Consultation",
                amount: 3200,
                date: "2026-09-02",
                status: "Pending"
            }

        ];

        localStorage.setItem(
            "medcareInvoices",
            JSON.stringify(invoices)
        );
    }

}



/* =========================================================
   LARGE DEMO DATASET - 80 PATIENTS / 80 BILLS
   Keeps existing user records and adds presentation-ready
   hospital demo records until the project has 80 patients.
========================================================= */
function ensureLargeDemoDataset() {
    let patients = getData("medcarePatients");
    let doctors = getData("medcareDoctors");
    let invoices = getData("medcareInvoices");
    let appointments = getData("medcareAppointments");

    const names = [
        ["Aarav Verma","Male",28,"Software Engineer"],["Ananya Gupta","Female",31,"Teacher"],
        ["Vikram Singh","Male",45,"Businessman"],["Kavya Sharma","Female",24,"Student"],
        ["Rohan Mehta","Male",37,"Bank Manager"],["Sneha Kapoor","Female",42,"Accountant"],
        ["Arjun Malhotra","Male",51,"Architect"],["Isha Jain","Female",27,"Graphic Designer"],
        ["Aditya Rao","Male",33,"Sales Executive"],["Neha Agarwal","Female",39,"HR Manager"],
        ["Kunal Bansal","Male",56,"Retired Officer"],["Pooja Yadav","Female",35,"Lawyer"],
        ["Manish Tiwari","Male",48,"Government Employee"],["Simran Kaur","Female",26,"Fashion Designer"],
        ["Nitin Joshi","Male",41,"Teacher"],["Riya Saxena","Female",30,"Pharmacist"],
        ["Sahil Arora","Male",29,"Entrepreneur"],["Meera Nair","Female",46,"Professor"],
        ["Deepak Mishra","Male",58,"Business Owner"],["Tanvi Sethi","Female",22,"Student"],
        ["Rajiv Khanna","Male",63,"Retired Banker"],["Shreya Das","Female",34,"Journalist"],
        ["Mohit Chawla","Male",40,"Civil Engineer"],["Aditi Roy","Female",29,"Designer"],
        ["Yash Thakur","Male",36,"Consultant"],["Nisha Verma","Female",44,"School Principal"],
        ["Aman Srivastava","Male",25,"Developer"],["Divya Iyer","Female",38,"Scientist"],
        ["Harsh Vohra","Male",52,"Retailer"],["Komal Arora","Female",33,"Nurse"],
        ["Rajat Sinha","Male",47,"Professor"],["Priyanka Bose","Female",28,"Content Writer"],
        ["Varun Sharma","Male",32,"Marketing Manager"],["Sakshi Jain","Female",41,"Interior Designer"],
        ["Abhishek Roy","Male",55,"Contractor"],["Muskan Khan","Female",25,"Student"],
        ["Gaurav Gupta","Male",43,"Operations Manager"],["Ritika Shah","Female",36,"HR Executive"],
        ["Tarun Kapoor","Male",49,"Businessman"],["Payal Mehra","Female",32,"Teacher"],
        ["Ankit Yadav","Male",27,"Technician"],["Shalini Nanda","Female",48,"Homemaker"],
        ["Suresh Patel","Male",61,"Retired Teacher"],["Bhavna Joshi","Female",37,"Accountant"],
        ["Rishabh Jain","Male",23,"Student"],["Mansi Arora","Female",29,"Event Manager"],
        ["Vivek Sharma","Male",50,"Engineer"],["Pallavi Singh","Female",43,"Lecturer"],
        ["Akash Kumar","Male",34,"Analyst"],["Nandini Rao","Female",31,"Doctor"],
        ["Pranav Gupta","Male",39,"Business Analyst"],["Ayesha Khan","Female",27,"Teacher"],
        ["Lokesh Mehta","Male",46,"Manager"],["Shivani Sood","Female",35,"Architect"],
        ["Devendra Singh","Male",59,"Farmer"],["Reema Kapoor","Female",40,"Consultant"],
        ["Ashish Bhatia","Male",44,"Entrepreneur"],["Garima Saxena","Female",33,"Designer"],
        ["Pankaj Verma","Male",57,"Transport Manager"],["Monika Rani","Female",26,"Student"],
        ["Sameer Khan","Male",38,"Sales Manager"],["Rashmi Gupta","Female",45,"Teacher"],
        ["Vikas Jain","Male",53,"Factory Manager"],["Preeti Sharma","Female",30,"Dietitian"],
        ["Naveen Kumar","Male",35,"IT Manager"],["Swati Agarwal","Female",39,"Bank Officer"],
        ["Rohit Saini","Male",42,"Business Owner"],["Alka Mishra","Female",55,"Homemaker"],
        ["Chirag Goel","Male",24,"Student"],["Poonam Yadav","Female",34,"Clerk"],
        ["Sanjay Rao","Male",60,"Retired Engineer"],["Jyoti Nair","Female",47,"Professor"],
        ["Ravi Shukla","Male",31,"Photographer"],["Kiran Malhotra","Female",28,"Researcher"],
        ["Imran Ali","Male",36,"Mechanic"],["Sonia Mehta","Female",42,"Manager"],
        ["Hemant Gupta","Male",54,"Trader"],["Lavanya Reddy","Female",25,"Student"]
    ];
    const clinical = [
        ["Hypertension","Cardiology Consultation","Dr. Anjali Mehta",4800],
        ["Migraine","Neurology Consultation","Dr. Rohit Kumar",3600],
        ["Type 2 Diabetes","Endocrinology Review","Dr. Vikram Shah",5200],
        ["Fever & Infection","General Medicine","Dr. Neha Singh",2800],
        ["Knee Pain","Orthopedic Consultation","Dr. Vikram Shah",6500],
        ["Asthma","Pulmonology Consultation","Dr. Anjali Mehta",4300],
        ["Gastritis","Gastroenterology Review","Dr. Rohit Kumar",3100],
        ["Skin Allergy","Dermatology Consultation","Dr. Neha Singh",2600],
        ["Back Pain","Physiotherapy & Orthopedic","Dr. Vikram Shah",5700],
        ["Thyroid Disorder","Endocrinology Review","Dr. Anjali Mehta",3900]
    ];
    const departments = ["Cardiology","Neurology","Orthopedic","General Medicine","Pulmonology","Gastroenterology","Dermatology","Pediatrics"];
    const doctorPool = ["Dr. Anjali Mehta","Dr. Rohit Kumar","Dr. Neha Singh","Dr. Vikram Shah"];

    while (patients.length < 80) {
        const i = patients.length - 2;
        const n = names[Math.max(0, Math.min(i, names.length-1))];
        const idx = patients.length + 1;
        const phone = "98" + String(70000000 + idx * 731).slice(-8);
        patients.push({
            id: "PT-" + String(idx).padStart(3,"0"),
            name: n[0], age: n[2], gender: n[1], profession: n[3],
            phone, email: n[0].toLowerCase().replace(/[^a-z]/g,".") + "@example.com",
            bloodGroup: ["A+","B+","O+","AB+","A-","B-"][idx % 6],
            address: "Ghaziabad, Uttar Pradesh, India",
            complaint: clinical[(idx-1)%clinical.length][0],
            allergies: idx%5===0 ? "Penicillin" : "None known",
            medicalHistory: "Demo medical history for presentation",
            registeredAt: "2026-09-" + String((idx%28)+1).padStart(2,"0")
        });
    }

    const existingByPatient = new Set(invoices.map(i => i.patient));
    const baseInvoiceNo = Math.max(1000, ...invoices.map(i => parseInt(String(i.id).replace(/\D/g,"")) || 0));
    for (let i = 0; i < patients.length && i < 80; i++) {
        const patient = patients[i];
        if (existingByPatient.has(patient.name)) continue;
        const c = clinical[i % clinical.length];
        const total = c[3] + ((i % 7) * 450) + (i % 3 === 0 ? 1250 : 0);
        const paid = i < 65 ? total : (i < 75 ? Math.round(total * 0.55) : 0);
        const status = paid >= total ? "Paid" : paid > 0 ? "Partially Paid" : "Pending";
        const billDate = "2026-09-" + String((i % 28) + 1).padStart(2,"0");
        invoices.push({
            id: "INV-" + String(baseInvoiceNo + invoices.length - invoices.length + i + 1).padStart(4,"0"),
            patient: patient.name, patientId: patient.id,
            diagnosis: c[0], doctor: c[2],
            service: c[1] + " + Hospital Services",
            amount: total, paidAmount: paid,
            balanceDue: Math.max(0,total-paid),
            date: billDate,
            paymentMode: paid===0 ? "Pending" : ["UPI","Cash","Card","Insurance","Net Banking"][i%5],
            status,
            notes: status === "Paid" ? "Payment received in full." : status === "Partially Paid" ? "Advance payment received; balance pending." : "Payment pending.",
            items: (function(){
                const consultation = Math.round(total * 0.22);
                const laboratory = Math.round(total * 0.18);
                const pharmacy = Math.round(total * 0.16);
                const room = Math.round(total * 0.24);
                const nursing = total - consultation - laboratory - pharmacy - room;
                return [
                    {description:"Doctor Consultation", purpose:c[0], amount:consultation},
                    {description:"Laboratory / Diagnostic Services", purpose:c[0] + " evaluation", amount:laboratory},
                    {description:"Pharmacy / Medicines", purpose:"Prescribed medicines", amount:pharmacy},
                    {description:"Room / Hospital Services", purpose:"Patient care", amount:room},
                    {description:"Nursing & Clinical Care", purpose:"Hospital care", amount:nursing}
                ];
            })()
        });
        const appointmentIndex = appointments.length + 1;
        appointments.push({
            id: "AP-" + String(appointmentIndex).padStart(3,"0"),
            patient: patient.name, doctor: c[2],
            department: departments[i%departments.length],
            date: billDate, time: ["09:30","10:15","11:00","12:30","14:00","15:15","16:30"][i%7],
            status: i%5===0 ? "Completed" : i%4===0 ? "Pending" : "Confirmed"
        });
    }

    localStorage.setItem("medcarePatients", JSON.stringify(patients));
    localStorage.setItem("medcareInvoices", JSON.stringify(invoices));
    localStorage.setItem("medcareAppointments", JSON.stringify(appointments));
}


/* =========================================================
   HELPERS
========================================================= */

function getData(key) {

    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    catch (error) {
        return [];
    }

}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function setupNavigation() {

    document.querySelectorAll(".menu-item[data-page]")
        .forEach(function (item) {

            item.addEventListener("click", function (event) {

                event.preventDefault();

                const page = this.dataset.page;

                showPage(page);

            });

        });

}


function showPage(pageName) {

    document.querySelectorAll(".page")
        .forEach(function (page) {

            page.classList.remove("active");

        });


    document.querySelectorAll(".menu-item")
        .forEach(function (item) {

            item.classList.remove("active");

        });


    const page = document.getElementById(pageName);

    if (page) {
        page.classList.add("active");
    }


    const menu = document.querySelector(
        `.menu-item[data-page="${pageName}"]`
    );

    if (menu) {
        menu.classList.add("active");
    }


    const titleMap = {

        dashboard: "Dashboard",
        patients: "Patients",
        doctors: "Doctors",
        appointments: "Appointments",
        departments: "Departments",
        billing: "Billing",
        reports: "Reports",
        settings: "Settings",
        nursing: "Nursing Department", icu: "Intensive Care Unit (ICU)", supervisors: "Supervisors",
        admissions: "Admissions & Discharge", rooms: "Rooms & Beds", treatment: "Medical Records",
        laboratory: "Laboratory", radiology: "Radiology & Imaging", pharmacy: "Pharmacy", dietary: "Dietary & Nutrition",
        frontdesk: "Front Desk & Reception", finance: "Finance & Accounts", staff: "Staff & HR",
        inventory: "Inventory & Supplies", emergency: "Emergency Department"

    };


    const title = document.getElementById("pageTitle");

    if (title) {
        title.textContent =
            titleMap[pageName] || "Dashboard";
    }


    if (pageName === "appointments") {
        loadAppointments();
    }

    if (pageName === "patients") {
        loadPatients();
    }

    if (pageName === "doctors") {
        loadDoctors();
    }

    if (pageName === "billing") {
        loadInvoices();
    }

    if (pageName === "reports") {
        loadReportLanding();
    }

    if (pageName === "settings") {
        loadSettings();
    }

    if (PREMIUM_MODULES[pageName]) {
        const premiumPage = document.getElementById(pageName);
        if (premiumPage) premiumPage.hidden = false;
        loadPremiumModule(pageName);
    }

    if (window.lucide) {
        lucide.createIcons();
    }

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

    if (id === "appointmentModal") {
        populateAppointmentPatients();
        populateAppointmentDoctors();
    }

    if (id === "invoiceModal") {
        populateInvoicePatients();
    }

}


function closeModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("show");

}


/* =========================================================
   PATIENTS
========================================================= */

function setupForms() {

    const patientForm =
        document.getElementById("patientForm");

    if (patientForm) {

        patientForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const patients =
                    getData("medcarePatients");


                const val = id => document.getElementById(id)?.value?.trim() || "";
                const newPatient = {
                    id: "PT-" + String(patients.length + 1).padStart(3, "0"),
                    name: val("patientName"),
                    age: val("patientAge"),
                    dob: val("patientDob"),
                    gender: val("patientGender"),
                    bloodGroup: val("patientBloodGroup"),
                    profession: val("patientProfession"),
                    fatherName: val("patientFatherName"),
                    spouseName: val("patientSpouseName"),
                    emergencyName: val("patientEmergencyName"),
                    emergencyPhone: val("patientEmergencyPhone"),
                    phone: val("patientPhone"),
                    email: val("patientEmail"),
                    address: val("patientAddress"),
                    complaint: val("patientComplaint"),
                    allergies: val("patientAllergies"),
                    medicalDetails: val("patientMedicalDetails"),
                    registeredAt: new Date().toISOString()
                };


                patients.push(newPatient);

                saveData(
                    "medcarePatients",
                    patients
                );


                patientForm.reset();

                closeModal("patientModal");

                loadPatients();

                updateDashboard();

                showToast(
                    "Patient registered successfully"
                );

            }
        );

    }


    const doctorForm =
        document.getElementById("doctorForm");

    if (doctorForm) {

        doctorForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const doctors =
                    getData("medcareDoctors");


                const newDoctor = {

                    id:
                        "DR-" +
                        String(doctors.length + 1)
                            .padStart(3, "0"),

                    name:
                        document.getElementById(
                            "doctorName"
                        ).value.trim(),

                    specialization:
                        document.getElementById(
                            "doctorSpecialization"
                        ).value.trim(),

                    department:
                        document.getElementById(
                            "doctorDepartment"
                        ).value,

                    experience:
                        document.getElementById(
                            "doctorExperience"
                        ).value,

                    status:
                        document.getElementById("doctorStatus")?.value || "Available",

                    phone:
                        document.getElementById("doctorPhone")?.value.trim() || "",

                    email:
                        document.getElementById("doctorEmail")?.value.trim() || "",

                    license:
                        document.getElementById("doctorLicense")?.value.trim() || "",

                    education:
                        document.getElementById("doctorEducation")?.value.trim() || "",

                    room:
                        document.getElementById("doctorRoom")?.value.trim() || "",

                    consultationFee:
                        document.getElementById("doctorFee")?.value || "2500",

                    bio:
                        document.getElementById("doctorBio")?.value.trim() || ""

                };


                doctors.push(newDoctor);

                saveData(
                    "medcareDoctors",
                    doctors
                );


                doctorForm.reset();

                closeModal("doctorModal");

                loadDoctors();

                updateDashboard();

                showToast(
                    "Doctor added successfully"
                );

            }
        );

    }


    const appointmentForm =
        document.getElementById("appointmentForm");

    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const appointments =
                    getData("medcareAppointments");


                const patient =
                    document.getElementById(
                        "appointmentPatient"
                    ).value;

                const doctor =
                    document.getElementById(
                        "appointmentDoctor"
                    ).value;

                const doctorData =
                    getData("medcareDoctors")
                        .find(function (item) {
                            return item.name === doctor;
                        });


                const newAppointment = {

                    id:
                        "AP-" +
                        String(appointments.length + 1)
                            .padStart(3, "0"),

                    patient: patient,

                    doctor: doctor,

                    department:
                        doctorData
                            ? doctorData.department
                            : "General Medicine",

                    date:
                        document.getElementById(
                            "appointmentDate"
                        ).value,

                    time:
                        document.getElementById(
                            "appointmentTime"
                        ).value,

                    type: document.getElementById("appointmentType")?.value || "In-Person",
                    contact: document.getElementById("appointmentContact")?.value.trim() || "",
                    notes: document.getElementById("appointmentNotes")?.value.trim() || "",
                    status: "Pending",
                    createdAt: new Date().toISOString()

                };


                appointments.push(
                    newAppointment
                );


                saveData(
                    "medcareAppointments",
                    appointments
                );


                appointmentForm.reset();

                closeModal("appointmentModal");

                loadAppointments();

                updateDashboard();

                showToast(
                    "Appointment booked successfully"
                );

            }
        );

    }


    const invoiceForm =
        document.getElementById("invoiceForm");

    if (invoiceForm) {

        invoiceForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const invoices =
                    getData("medcareInvoices");


                const totalAmount = Number(document.getElementById("invoiceAmount")?.value || 0);
                const paidAmount = Math.min(totalAmount, Number(document.getElementById("invoicePaid")?.value || 0));
                const newInvoice = {
                    id: "INV-" + String(1001 + invoices.length),
                    patient: document.getElementById("invoicePatient").value,
                    diagnosis: document.getElementById("invoiceDiagnosis")?.value.trim() || "General treatment",
                    doctor: document.getElementById("invoiceDoctor")?.value.trim() || "Consultant Physician",
                    service: document.getElementById("invoiceService")?.value.trim() || "Hospital Service",
                    amount: totalAmount,
                    paidAmount: paidAmount,
                    balance: Math.max(0, totalAmount - paidAmount),
                    paymentMode: document.getElementById("invoicePaymentMode")?.value || "Cash",
                    notes: document.getElementById("invoiceNotes")?.value.trim() || "",
                    date: new Date().toISOString().split("T")[0],
                    status: document.getElementById("invoiceStatus")?.value || (paidAmount >= totalAmount ? "Paid" : paidAmount > 0 ? "Partially Paid" : "Pending")
                };


                invoices.push(newInvoice);

                saveData(
                    "medcareInvoices",
                    invoices
                );


                invoiceForm.reset();

                closeModal("invoiceModal");

                loadInvoices();

                updateDashboard();

                showToast(
                    "Invoice created successfully"
                );

            }
        );

    }

}


/* =========================================================
   LOAD PATIENTS
========================================================= */

function loadPatients() {

    const patients =
        getData("medcarePatients");

    const table =
        document.getElementById("patientTable");

    if (!table) return;


    table.innerHTML = "";


    patients.forEach(function (patient) {

        const initials =
            getInitials(patient.name);


        table.innerHTML += `

            <tr>

                <td>${patient.id}</td>

                <td>

                    <div class="person">

                        <div class="person-avatar">
                            ${initials}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(patient.name)}
                            </strong>

                            <span>
                                Registered patient
                            </span>

                        </div>

                    </div>

                </td>

                <td>${patient.age}</td>

                <td>${patient.gender}</td>

                <td>${escapeHTML(patient.profession || "—")}</td>

                <td>${patient.phone}</td>

                <td>
                    <span class="status completed">
                        Active
                    </span>
                </td>

                <td>

                    <button
                        class="action-btn"
                        onclick="viewPatient('${patient.id}')">

                        <i data-lucide="eye"></i>

                    </button>
                    
                </td>

            </tr>

        `;

    });


    const count =
        document.getElementById("patientCount");

    if (count) {

        count.textContent =
            `${patients.length} registered patient${patients.length !== 1 ? "s" : ""}`;

    }


    const badge =
        document.getElementById("patientBadge");

    if (badge) {
        badge.textContent = patients.length;
    }


    if (window.lucide) {
        lucide.createIcons();
    }

}


/* =========================================================
   DOCTORS
========================================================= */

function loadDoctors() {
    const doctors = getData("medcareDoctors");
    const grid = document.getElementById("doctorGrid");
    if (!grid) return;

    const query = (document.getElementById("doctorSearch")?.value || "").trim().toLowerCase();
    const filtered = doctors.filter(doctor => `${doctor.name || ""} ${doctor.specialization || ""} ${doctor.department || ""}`.toLowerCase().includes(query));

    const defaultTime = "09:00 AM – 05:00 PM";
    grid.innerHTML = filtered.length ? filtered.map(doctor => {
        const initials = getInitials((doctor.name || "Doctor").replace(/^Dr\.\s*/i, ""));
        const status = doctor.status || "Available";
        const statusClass = /surgery|busy/i.test(status) ? "busy" : (/leave|offline/i.test(status) ? "offline" : "available");
        const appointments = getData("medcareAppointments").filter(a => a.doctor === doctor.name).length;
        const workingTime = doctor.availability || doctor.workingTime || defaultTime;
        const fee = doctor.consultationFee ? `₹${Number(doctor.consultationFee).toLocaleString("en-IN")}` : "₹2,500";
        const avatar = doctor.photo ? `<img src="${escapeAttribute(doctor.photo)}" alt="${escapeAttribute(doctor.name || "Doctor")}">` : escapeHTML(initials);
        return `
            <article class="doctor-card-modern" onclick="viewDoctor('${escapeAttribute(doctor.id)}')" tabindex="0" aria-label="View profile of ${escapeAttribute(doctor.name || "Doctor")}" onkeydown="if(event.key==='Enter'||event.key===' ') { event.preventDefault(); viewDoctor('${escapeAttribute(doctor.id)}'); }">
                <div class="doctor-card-banner">
                    <span class="doctor-department-pill"><i data-lucide="building-2"></i>${escapeHTML(doctor.department || "General")}</span>
                    <span class="doctor-card-arrow"><i data-lucide="arrow-up-right"></i></span>
                </div>
                <div class="doctor-card-body">
                    <div class="doctor-card-avatar-wrap"><div class="doctor-card-avatar">${avatar}</div><span class="doctor-presence ${statusClass}"></span></div>
                    <div class="doctor-card-title"><div><h3>${escapeHTML(doctor.name || "Doctor")}</h3><p>${escapeHTML(doctor.specialization || "Medical Specialist")}</p></div><span class="doctor-status-chip ${statusClass}"><span></span>${escapeHTML(status)}</span></div>
                    <div class="doctor-card-working"><i data-lucide="clock-3"></i><div><small>Working Hours</small><strong>${escapeHTML(workingTime)}</strong></div></div>
                    <div class="doctor-card-metrics"><div><i data-lucide="briefcase-business"></i><span><b>${escapeHTML(String(doctor.experience || 0))}</b> yrs experience</span></div><div><i data-lucide="indian-rupee"></i><span><b>${escapeHTML(fee)}</b> consultation</span></div></div>
                    <div class="doctor-card-footer"><span><i data-lucide="calendar-check-2"></i>${appointments} appointments</span><span class="doctor-view-link">View Details <i data-lucide="chevron-right"></i></span></div>
                </div>
            </article>`;
    }).join("") : `<div class="doctor-empty"><i data-lucide="search-x"></i><h3>No doctors found</h3><p>Try another name, specialty or department.</p></div>`;

    const available = doctors.filter(d => (d.status || "Available").toLowerCase() === "available").length;
    const busy = doctors.filter(d => /surgery|busy/i.test(d.status || "")).length;
    const departments = new Set(doctors.map(d => d.department).filter(Boolean)).size;
    setText("doctorTotalCount", doctors.length); setText("doctorAvailableCount", available); setText("doctorBusyCount", busy); setText("doctorDepartmentCount", departments);
    if (window.lucide) lucide.createIcons();
}

function filterDoctors(value) { loadDoctors(); }

function viewDoctor(id) {
    const doctor = getData("medcareDoctors").find(item => item.id === id);
    if (!doctor) return;

    const appointments = getData("medcareAppointments").filter(a => a.doctor === doctor.name);
    const patients = new Set(appointments.map(a => a.patient).filter(Boolean)).size;
    const initials = getInitials((doctor.name || "Doctor").replace(/^Dr\.\s*/i, ""));
    const status = doctor.status || "Available";
    const statusClass = /surgery|busy/i.test(status) ? "busy" : (/leave|offline/i.test(status) ? "offline" : "available");
    const workingTime = doctor.availability || doctor.workingTime || "09:00 AM – 05:00 PM";
    const fee = doctor.consultationFee ? `₹${Number(doctor.consultationFee).toLocaleString("en-IN")}` : "₹2,500";

    const avatar = document.getElementById("ddAvatar");
    if (avatar) avatar.innerHTML = doctor.photo ? `<img src="${escapeAttribute(doctor.photo)}" alt="${escapeAttribute(doctor.name || "Doctor")}">` : escapeHTML(initials);
    setText("ddName", doctor.name || "Doctor"); setText("ddStatus", status); setText("ddSpecialization", doctor.specialization || "Medical Specialist");
    setText("ddDepartment", doctor.department || "General Medicine"); setText("ddId", doctor.id || "N/A"); setText("ddExperience", `${doctor.experience || 0} years`);
    setText("ddAppointments", appointments.length); setText("ddPatients", patients); setText("ddDepartment2", doctor.department || "General Medicine");
    setText("ddSpecialization2", doctor.specialization || "Medical Specialist"); setText("ddExperience2", `${doctor.experience || 0} years`);
    setText("ddLicense", doctor.license || "Not provided"); setText("ddEducation", doctor.education || "MBBS, MD");
    setText("ddConsultation", doctor.consultationType || "In-person & Teleconsultation"); setText("ddBio", doctor.bio || "Experienced medical professional dedicated to providing patient-focused care, accurate diagnosis and personalized treatment.");
    setText("ddPhone", doctor.phone || "Not provided"); setText("ddEmail", doctor.email || "Not provided"); setText("ddRoom", doctor.room || "Not assigned");
    setText("ddFeeHero", fee); setText("ddRating", doctor.rating || "4.8");

    const parts = workingTime.split(/\s*[–-]\s*/);
    setText("ddWorkingHours", parts[0] || workingTime); setText("ddWorkingHoursSub", parts[1] ? `to ${parts[1]}` : "Standard clinic hours");

    const statusEl = document.getElementById("ddStatus"); if (statusEl) statusEl.className = `doctor-profile-status ${statusClass}`;
    const presence = document.getElementById("ddPresence"); if (presence) presence.className = `doctor-profile-presence ${statusClass}`;
    const schedule = document.getElementById("ddSchedule");
    if (schedule) {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        schedule.innerHTML = days.map(day => `<div><b>${day}</b><span>${escapeHTML(workingTime)}</span></div>`).join("");
    }

    document.getElementById("doctorListHeader")?.setAttribute("hidden", "true");
    document.getElementById("doctorSummaryBar")?.setAttribute("hidden", "true");
    document.getElementById("doctorGrid")?.setAttribute("hidden", "true");
    const profile = document.getElementById("doctorProfileView"); if (profile) profile.hidden = false;
    window.currentDoctorId = id; window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.lucide) lucide.createIcons();
}

function closeDoctorProfile() {
    document.getElementById("doctorListHeader")?.removeAttribute("hidden"); document.getElementById("doctorSummaryBar")?.removeAttribute("hidden"); document.getElementById("doctorGrid")?.removeAttribute("hidden");
    const profile = document.getElementById("doctorProfileView"); if (profile) profile.hidden = true;
    window.currentDoctorId = null; window.scrollTo({ top: 0, behavior: "smooth" }); if (window.lucide) lucide.createIcons();
}

function bookDoctorAppointment() {
    const doctor = getData("medcareDoctors").find(d => d.id === window.currentDoctorId); if (!doctor) return;
    showPage("appointments");
    setTimeout(() => { openAppointmentModal(); const select = document.getElementById("appointmentDoctor"); if (select) select.value = doctor.name; }, 80);
}

function copyDoctorContact() {
    const doctor = getData("medcareDoctors").find(d => d.id === window.currentDoctorId); if (!doctor) return;
    const text = `${doctor.name || "Doctor"}\n${doctor.specialization || "Medical Specialist"}\nPhone: ${doctor.phone || "Not provided"}\nEmail: ${doctor.email || "Not provided"}`;
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(() => showToast("Doctor contact details copied")).catch(() => showToast("Contact details ready to copy"));
    else showToast("Doctor contact details copied");
}

function printDoctorProfile() { window.print(); }

function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }

/* =========================================================
   APPOINTMENTS
========================================================= */

function loadAppointments(filter = "") {

    const appointments =
        getData("medcareAppointments");
    const query = String(filter || "").trim().toLowerCase();
    const visibleAppointments = query ? appointments.filter(a => `${a.patient||""} ${a.doctor||""} ${a.department||""} ${a.status||""} ${a.date||""}`.toLowerCase().includes(query)) : appointments;

    const table =
        document.getElementById("appointmentTable");

    if (!table) return;


    table.innerHTML = "";


    visibleAppointments.forEach(function (appointment) {

        table.innerHTML += `

            <tr>

                <td>

                    <div class="person">

                        <div class="person-avatar">
                            ${getInitials(appointment.patient)}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(appointment.patient)}
                            </strong>

                            <span>
                                Appointment
                            </span>

                        </div>

                    </div>

                </td>

                <td>
                    ${escapeHTML(appointment.doctor)}
                </td>

                <td>
                    ${escapeHTML(appointment.department)}
                </td>

                <td>
                    ${formatDate(appointment.date)}
                </td>

                <td>
                    ${formatTime(appointment.time)}
                </td>

                <td>

                    <span class="status ${
                        appointment.status === "Completed"
                            ? "completed"
                            : appointment.status === "Confirmed"
                                ? "confirmed"
                                : "pending"
                    }">

                        ${appointment.status}

                    </span>

                </td>

                <td>
                    <div class="appointment-row-actions">
                        <button class="btn btn-light btn-sm" onclick="viewAppointment('${escapeAttribute(appointment.id)}')" title="View appointment"><i data-lucide="eye"></i></button>
                        <button class="btn btn-light btn-sm" onclick="printAppointmentById('${escapeAttribute(appointment.id)}')" title="Print appointment"><i data-lucide="printer"></i></button>
                        <button class="btn btn-primary btn-sm" onclick="downloadAppointmentWordById('${escapeAttribute(appointment.id)}')" title="Download Word"><i data-lucide="file-text"></i></button>
                    </div>
                </td>

            </tr>

        `;

    });


    const badge =
        document.getElementById(
            "appointmentBadge"
        );

    if (badge) {
        badge.textContent =
            appointments.length;
    }


    if (window.lucide) {
        lucide.createIcons();
    }

}




function filterAppointments(value) {
    loadAppointments(value);
    if (window.lucide) lucide.createIcons();
}

function filterDepartments(value) {
    const query = String(value || "").trim().toLowerCase();
    document.querySelectorAll("#departmentGrid .department-card").forEach(card => {
        card.style.display = !query || card.textContent.toLowerCase().includes(query) ? "" : "none";
    });
    if(typeof slideDepartments==='function'){ window.setTimeout(()=>slideDepartments(0),30); }
}

/* =========================================================
   APPOINTMENT DROPDOWNS
========================================================= */

function populateAppointmentPatients() {

    const select =
        document.getElementById(
            "appointmentPatient"
        );

    if (!select) return;


    const patients =
        getData("medcarePatients");


    select.innerHTML =
        `<option value="">Select patient</option>`;


    patients.forEach(function (patient) {

        select.innerHTML += `

            <option value="${escapeAttribute(patient.name)}">
                ${escapeHTML(patient.name)}
            </option>

        `;

    });

}


function populateAppointmentDoctors() {

    const select =
        document.getElementById(
            "appointmentDoctor"
        );

    if (!select) return;


    const doctors =
        getData("medcareDoctors");


    select.innerHTML =
        `<option value="">Select doctor</option>`;


    doctors.forEach(function (doctor) {

        select.innerHTML += `

            <option value="${escapeAttribute(doctor.name)}">
                ${escapeHTML(doctor.name)}
            </option>

        `;

    });

}


function openAppointmentModal() {

    populateAppointmentPatients();

    populateAppointmentDoctors();

    const patientSelect = document.getElementById("appointmentPatient");
    const contactInput = document.getElementById("appointmentContact");
    if (patientSelect && !patientSelect.dataset.bound) {
        patientSelect.addEventListener("change", function(){
            const patient = getData("medcarePatients").find(p => p.name === this.value);
            if (contactInput) contactInput.value = patient?.phone || "";
        });
        patientSelect.dataset.bound = "1";
    }

    openModal("appointmentModal");
    setTimeout(()=>{
        const first = document.querySelector("#appointmentModal input, #appointmentModal select");
        if(first) first.focus();
        if(window.lucide) lucide.createIcons();
    },120);

}


/* =========================================================
   APPOINTMENT RECORD / WORD DOCUMENT
========================================================= */
function getAppointmentById(id){
    return getData("medcareAppointments").find(a => String(a.id) === String(id));
}

function buildAppointmentDocument(appointment){
    const patient = getData("medcarePatients").find(p => p.name === appointment.patient) || {};
    const doctor = getData("medcareDoctors").find(d => d.name === appointment.doctor) || {};
    const e = v => escapeHTML(String(v ?? "—"));
    const type = appointment.type || "In-Person";
    const isOnline = /online|tele/i.test(type);
    const meeting = isOnline ? "Online consultation link / meeting details can be added by the hospital coordinator." : "Please arrive 10–15 minutes before the scheduled consultation.";
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Appointment ${e(appointment.id)}</title><style>
    body{font-family:Arial,sans-serif;color:#172033;background:#f5f8fb;padding:30px}.sheet{max-width:850px;margin:auto;background:#fff;border:1px solid #d9e2ea;border-radius:18px;padding:34px;box-shadow:0 8px 30px rgba(20,50,70,.08)}
    .head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}.brand h1{margin:0;color:#0b7080;font-size:25px}.brand p{margin:5px 0;color:#667886;font-size:12px}.tag{padding:9px 13px;border-radius:10px;background:#eaf7f7;color:#0b7780;font-weight:800;font-size:11px}.rule{height:3px;background:linear-gradient(90deg,#0f8b8d,#1664a5);margin:22px 0;border-radius:10px}
    .title h2{margin:0;font-size:24px;color:#173b4c}.title p{color:#71838d}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}.item{padding:14px;background:#f7fafc;border:1px solid #e4edf1;border-radius:12px}.item b{display:block;font-size:10px;text-transform:uppercase;color:#71838d;letter-spacing:.5px;margin-bottom:5px}.item span{font-size:13px;font-weight:700}.full{grid-column:1/-1}.notice{margin-top:20px;padding:16px;border-left:4px solid #0f8b8d;background:#eef8f8;border-radius:8px;color:#45616c}.footer{margin-top:40px;padding-top:18px;border-top:1px solid #e4edf1;display:flex;justify-content:space-between}.sign{text-align:right;font-family:cursive;font-size:21px}.small{font-size:10px;color:#7c8d97}@media(max-width:700px){body{padding:12px}.sheet{padding:20px}.grid{grid-template-columns:1fr}.full{grid-column:auto}.head{flex-direction:column}}
    </style></head><body><div class="sheet"><div class="head"><div class="brand"><h1>MEDCARE MULTI-SPECIALITY HOSPITAL</h1><p>Advanced Care • Compassionate Service • Trusted Healthcare</p><p>New Delhi, India • +91 98765 43210 • info@medcarehospital.com</p></div><div class="tag">APPOINTMENT ${e(appointment.id)}</div></div><div class="rule"></div><div class="title"><h2>Appointment Confirmation</h2><p>Official patient appointment record</p></div><div class="grid"><div class="item"><b>Patient</b><span>${e(appointment.patient)}</span></div><div class="item"><b>Patient ID</b><span>${e(patient.id)}</span></div><div class="item"><b>Consulting Doctor</b><span>${e(appointment.doctor)}</span></div><div class="item"><b>Department / Specialty</b><span>${e(appointment.department || doctor.department || doctor.specialization)}</span></div><div class="item"><b>Date</b><span>${e(formatDate(appointment.date))}</span></div><div class="item"><b>Time</b><span>${e(formatTime(appointment.time))}</span></div><div class="item"><b>Appointment Type</b><span>${e(type)}</span></div><div class="item"><b>Status</b><span>${e(appointment.status || "Pending")}</span></div><div class="item"><b>Patient Contact</b><span>${e(appointment.contact || patient.phone)}</span></div><div class="item"><b>Created</b><span>${e(appointment.createdAt ? new Date(appointment.createdAt).toLocaleString("en-IN") : "Hospital system record")}</span></div><div class="item full"><b>Reason / Notes</b><span>${e(appointment.notes || "Routine consultation / follow-up visit")}</span></div></div><div class="notice"><strong>${isOnline ? "Online consultation" : "Visit instructions"}</strong><br>${e(meeting)}</div><div class="footer"><div><b>Hospital Coordinator</b><div class="small">MedCare Hospital Appointment Desk</div></div><div class="sign">MedCare HMS<br><span class="small">Authorized System Record</span></div></div></div></body></html>`;
}

function viewAppointment(id){
    const a=getAppointmentById(id); if(!a) return;
    window.currentAppointmentId=id;
    const patient=getData("medcarePatients").find(p=>p.name===a.patient)||{};
    const doctor=getData("medcareDoctors").find(d=>d.name===a.doctor)||{};
    const e=v=>escapeHTML(String(v??"—"));
    document.getElementById("appointmentRecordTitle").textContent=`${a.patient} • ${a.id}`;
    document.getElementById("appointmentRecordContent").innerHTML=`<div class="appointment-paper"><div class="appointment-paper-head"><div><span>MEDCARE MULTI-SPECIALITY HOSPITAL</span><h1>Appointment Confirmation</h1><p>Official appointment record • ${e(a.id)}</p></div><div class="appointment-status-large">${e(a.status||"Pending")}</div></div><div class="appointment-detail-grid"><div><label>Patient</label><strong>${e(a.patient)}</strong><small>${e(patient.id)}</small></div><div><label>Consulting Doctor</label><strong>${e(a.doctor)}</strong><small>${e(doctor.specialization||doctor.department||a.department)}</small></div><div><label>Date</label><strong>${e(formatDate(a.date))}</strong></div><div><label>Time</label><strong>${e(formatTime(a.time))}</strong></div><div><label>Department</label><strong>${e(a.department)}</strong></div><div><label>Type</label><strong>${e(a.type||"In-Person")}</strong></div><div><label>Contact</label><strong>${e(a.contact||patient.phone||"—")}</strong></div><div><label>Patient Email</label><strong>${e(patient.email||"—")}</strong></div><div class="full"><label>Reason / Notes</label><strong>${e(a.notes||"Routine consultation / follow-up visit")}</strong></div></div><div class="appointment-instruction"><i data-lucide="info"></i><div><strong>${/online|tele/i.test(a.type||"")?"Online consultation":"Hospital visit"}</strong><span>${/online|tele/i.test(a.type||"")?"Online consultation selected. Add meeting link/details through the hospital coordinator before the appointment.":"Please arrive 10–15 minutes before the scheduled consultation and carry the patient ID."}</span></div></div></div>`;
    openModal("appointmentRecordModal"); if(window.lucide) lucide.createIcons();
}

function downloadAppointmentWordById(id){ const a=getAppointmentById(id); if(!a)return; downloadFile(buildAppointmentDocument(a),`MedCare_Appointment_${String(a.id).replace(/[^a-z0-9]+/gi,"_")}.doc`,`application/msword`); showToast("Appointment Word document downloaded"); }
function printAppointmentById(id){ const a=getAppointmentById(id); if(!a)return; const w=window.open("","_blank","width=950,height=900"); if(!w){showToast("Please allow pop-ups to print the appointment");return;} w.document.write(buildAppointmentDocument(a));w.document.close();w.focus();setTimeout(()=>w.print(),350); }
function downloadAppointmentWord(){ const id=window.currentAppointmentId; if(id) downloadAppointmentWordById(id); }
function printAppointment(){ const id=window.currentAppointmentId; if(id) printAppointmentById(id); }

/* =========================================================
   BILLING
========================================================= */

function populateInvoicePatients() {

    const select =
        document.getElementById(
            "invoicePatient"
        );

    if (!select) return;


    const patients =
        getData("medcarePatients");


    select.innerHTML =
        `<option value="">Select patient</option>`;


    patients.forEach(function (patient) {

        select.innerHTML += `

            <option value="${escapeAttribute(patient.name)}">
                ${escapeHTML(patient.name)}
            </option>

        `;

    });

}


function loadInvoices(filter = "") {
    const invoices = getData("medcareInvoices");
    const query = String(filter || "").trim().toLowerCase();
    const visibleInvoices = query ? invoices.filter(invoice => `${invoice.id||""} ${invoice.patient||""} ${invoice.doctor||""} ${invoice.diagnosis||""} ${invoice.service||""} ${invoice.status||""} ${invoice.date||""}`.toLowerCase().includes(query)) : invoices;
    const table = document.getElementById("invoiceTable");
    if (!table) return;
    table.innerHTML = "";
    visibleInvoices.forEach(function(invoice){
        const total = Number(invoice.amount)||0;
        const paid = Number(invoice.paidAmount ?? (invoice.status === "Paid" ? total : 0))||0;
        const balance = Math.max(0, total-paid);
        const status = invoice.status || (balance===0 ? "Paid" : paid>0 ? "Partially Paid" : "Pending");
        table.innerHTML += `<tr>
          <td><strong>#${escapeHTML(invoice.id)}</strong></td>
          <td>${escapeHTML(invoice.patient)}</td>
          <td><div class="bill-service-cell"><strong>${escapeHTML(invoice.diagnosis || invoice.service)}</strong><span>${escapeHTML(invoice.service || "Hospital service")}</span></div></td>
          <td>${escapeHTML(invoice.doctor || "Consultant Physician")}</td>
          <td><strong>₹${total.toLocaleString("en-IN")}</strong></td>
          <td>₹${paid.toLocaleString("en-IN")}</td>
          <td>₹${balance.toLocaleString("en-IN")}</td>
          <td>${formatDate(invoice.date)}</td>
          <td><span class="status ${status === "Paid" ? "completed" : status === "Pending" ? "pending" : "in-progress"}">${escapeHTML(status)}</span></td>
          <td><button class="btn btn-light btn-sm" onclick="viewInvoice('${escapeAttribute(invoice.id)}')"><i data-lucide="file-text"></i> View Bill</button></td>
        </tr>`;
    });
    updateBillingStats();
    if(window.lucide) lucide.createIcons();
}


function filterBilling(value) {
    loadInvoices(value);
    if (window.lucide) lucide.createIcons();
}


function getInvoiceItems(invoice){
    if(Array.isArray(invoice.items) && invoice.items.length) return invoice.items;
    return [{
        description: invoice.service || "Hospital Service",
        purpose: invoice.diagnosis || "General treatment",
        amount: Number(invoice.amount)||0
    }];
}

function viewInvoice(id){
    const invoice=getData("medcareInvoices").find(i=>String(i.id)===String(id));
    if(!invoice) return;
    const patient=getData("medcarePatients").find(p=>p.name===invoice.patient)||{};
    const total=Number(invoice.amount)||0;
    const paid=Number(invoice.paidAmount ?? (invoice.status === "Paid" ? total : 0))||0;
    const balance=Math.max(0,total-paid);
    const doc=invoice.doctor||"Consultant Physician";
    const disease=invoice.diagnosis||invoice.service||"General treatment";
    const paper=`<div class="hospital-bill-paper" id="billPaper"><div class="bill-head"><div class="bill-logo"><i data-lucide="hospital"></i></div><div><h1>MEDCARE MULTI-SPECIALITY HOSPITAL</h1><p>Hospital Billing &amp; Patient Accounts</p><span>New Delhi, India • +91 98765 43210 • info@medcarehospital.com</span></div><div class="bill-title">INVOICE<br><b>${escapeHTML(invoice.id)}</b></div></div><div class="bill-rule"></div><div class="bill-meta"><div><label>Patient</label><strong>${escapeHTML(invoice.patient||"—")}</strong></div><div><label>Patient ID</label><strong>${escapeHTML(patient.id||"—")}</strong></div><div><label>Age / Gender</label><strong>${escapeHTML(patient.age||"—")} / ${escapeHTML(patient.gender||"—")}</strong></div><div><label>Profession</label><strong>${escapeHTML(patient.profession||"—")}</strong></div><div><label>Diagnosis / Disease</label><strong>${escapeHTML(disease)}</strong></div><div><label>Consulting Doctor</label><strong>${escapeHTML(doc)}</strong></div><div><label>Bill Date</label><strong>${escapeHTML(invoice.date||"—")}</strong></div><div><label>Payment Mode</label><strong>${escapeHTML(invoice.paymentMode||"—")}</strong></div></div><table class="bill-items"><thead><tr><th>Description</th><th>Diagnosis / Purpose</th><th>Amount</th></tr></thead><tbody>${getInvoiceItems(invoice).map(item=>`<tr><td>${escapeHTML(item.description)}</td><td>${escapeHTML(item.purpose)}</td><td>₹${Number(item.amount||0).toLocaleString("en-IN")}</td></tr>`).join("")}</tbody></table><div class="bill-total-grid"><div><p><b>Notes:</b> ${escapeHTML(invoice.notes||"No additional notes")}</p><p><b>Payment Status:</b> ${escapeHTML(invoice.status||"Pending")}</p></div><div><div><span>Total Bill</span><strong>₹${total.toLocaleString("en-IN")}</strong></div><div><span>Amount Paid</span><strong>₹${paid.toLocaleString("en-IN")}</strong></div><div class="balance"><span>Balance Due</span><strong>₹${balance.toLocaleString("en-IN")}</strong></div></div></div><div class="bill-footer"><div><b>Patient / Attendant Signature</b><span></span></div><div><b>Authorized Billing Officer</b><span></span></div></div></div>`;
    document.getElementById("invoiceRecordContent").innerHTML=paper;
    window.currentInvoiceId=invoice.id;
    openModal("invoiceRecordModal");
    if(window.lucide) lucide.createIcons();
}

function buildInvoiceWord(invoice){
    const patient=getData("medcarePatients").find(p=>p.name===invoice.patient)||{};
    const total=Number(invoice.amount)||0; const paid=Number(invoice.paidAmount ?? (invoice.status === "Paid" ? total : 0))||0; const balance=Math.max(0,total-paid);
    const e=v=>escapeHTML(String(v??""));
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${e(invoice.id)} - MedCare Bill</title><style>body{font-family:Arial,sans-serif;color:#182033;margin:0;padding:24px;background:#fff}.sheet{max-width:820px;margin:auto;border:1px solid #d8e0eb;padding:28px}.head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #155eef;padding-bottom:15px}.head h1{margin:0;color:#155eef;font-size:23px}.head p{margin:4px 0;color:#667085}.inv{font-weight:700;color:#155eef;text-align:right}.grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:20px 0;padding:15px;background:#f6f8fb}.grid b{display:block;font-size:10px;text-transform:uppercase;color:#697586;margin-bottom:3px}.items{width:100%;border-collapse:collapse}.items th,.items td{border:1px solid #d9e0ea;padding:10px;text-align:left}.items th{background:#f1f5f9}.items td:last-child,.items th:last-child{text-align:right}.summary{display:flex;justify-content:flex-end;margin-top:18px}.summary table{width:320px;border-collapse:collapse}.summary td{padding:7px;border-bottom:1px solid #e4e7ec}.summary .due td{font-size:16px;font-weight:700;background:#eef5ff}.footer{display:flex;justify-content:space-between;margin-top:45px}.sig{border-top:1px solid #667085;width:220px;padding-top:7px;text-align:center}.note{margin-top:20px;padding:12px;background:#fffdf2}.small{font-size:11px;color:#667085}</style></head><body><div class="sheet"><div class="head"><div><h1>MEDCARE MULTI-SPECIALITY HOSPITAL</h1><p>Hospital Billing & Patient Accounts</p><p class="small">New Delhi, India • +91 98765 43210 • info@medcarehospital.com</p></div><div class="inv">INVOICE<br>${e(invoice.id)}</div></div><div class="grid"><div><b>Patient</b>${e(invoice.patient)}</div><div><b>Patient ID</b>${e(patient.id||"—")}</div><div><b>Age / Gender</b>${e(patient.age||"—")} / ${e(patient.gender||"—")}</div><div><b>Profession</b>${e(patient.profession||"—")}</div><div><b>Diagnosis / Disease</b>${e(invoice.diagnosis||invoice.service)}</div><div><b>Consulting Doctor</b>${e(invoice.doctor||"Consultant Physician")}</div><div><b>Bill Date</b>${e(invoice.date)}</div><div><b>Payment Mode</b>${e(invoice.paymentMode||"—")}</div></div><table class="items"><tr><th>Description</th><th>Diagnosis / Purpose</th><th>Amount</th></tr>${getInvoiceItems(invoice).map(item=>`<tr><td>${e(item.description)}</td><td>${e(item.purpose)}</td><td>₹${Number(item.amount||0).toLocaleString("en-IN")}</td></tr>`).join("")}</table><div class="summary"><table><tr><td>Total Bill</td><td>₹${total.toLocaleString("en-IN")}</td></tr><tr><td>Amount Paid</td><td>₹${paid.toLocaleString("en-IN")}</td></tr><tr class="due"><td>Balance Due</td><td>₹${balance.toLocaleString("en-IN")}</td></tr></table></div><div class="note"><b>Payment Status:</b> ${e(invoice.status||"Pending")}<br><b>Notes:</b> ${e(invoice.notes||"No additional notes")}</div><div class="footer"><div class="sig">Patient / Attendant Signature</div><div class="sig">Authorized Billing Officer</div></div></div></body></html>`;
}

function downloadInvoiceWord(){const invoice=getData("medcareInvoices").find(i=>String(i.id)===String(window.currentInvoiceId));if(!invoice)return;downloadFile(buildInvoiceWord(invoice),`MedCare_Bill_${invoice.id}.doc`,`application/msword`);showToast("MS Word-compatible bill downloaded");}
function printInvoice(){const invoice=getData("medcareInvoices").find(i=>String(i.id)===String(window.currentInvoiceId));if(!invoice)return;const w=window.open("","_blank","width=950,height=900");if(!w){showToast("Please allow pop-ups to print the bill");return;}w.document.write(buildInvoiceWord(invoice));w.document.close();w.focus();setTimeout(()=>w.print(),300);}


function updateBillingStats() {

    const invoices =
        getData("medcareInvoices");


    let total = 0;
    let paid = 0;
    let pending = 0;


    invoices.forEach(function (invoice) {

        const amount = Number(invoice.amount) || 0;
        const paidAmount = Math.min(amount, Number(invoice.paidAmount ?? (invoice.status === "Paid" ? amount : 0)) || 0);
        const dueAmount = Math.max(0, amount - paidAmount);

        total += amount;
        paid += paidAmount;
        pending += dueAmount;

    });


    const revenue =
        document.getElementById(
            "billingRevenue"
        );

    const paidElement =
        document.getElementById(
            "billingPaid"
        );

    const pendingElement =
        document.getElementById(
            "billingPending"
        );


    if (revenue) {
        revenue.textContent =
            "₹" + total.toLocaleString("en-IN");
    }

    if (paidElement) {
        paidElement.textContent =
            "₹" + paid.toLocaleString("en-IN");
    }

    if (pendingElement) {
        pendingElement.textContent = "₹" + pending.toLocaleString("en-IN");
    }
    const countElement=document.getElementById("billingInvoiceCount");
    if(countElement) countElement.textContent=invoices.length;

}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const patients =
        getData("medcarePatients");

    const doctors =
        getData("medcareDoctors");

    const appointments =
        getData("medcareAppointments");

    const invoices =
        getData("medcareInvoices");


    const patientCount =
        document.getElementById(
            "dashboardPatientCount"
        );

    const doctorCount =
        document.getElementById(
            "dashboardDoctorCount"
        );

    const appointmentCount =
        document.getElementById(
            "dashboardAppointmentCount"
        );

    const revenue =
        document.getElementById(
            "dashboardRevenue"
        );

    const donut =
        document.getElementById(
            "donutPatientCount"
        );


    if (patientCount) {
        patientCount.textContent =
            patients.length;
    }

    if (doctorCount) {
        doctorCount.textContent =
            doctors.length;
    }

    if (appointmentCount) {
        appointmentCount.textContent =
            appointments.length;
    }


    let totalRevenue = 0;

    invoices.forEach(function (invoice) {

        totalRevenue +=
            Number(invoice.amount) || 0;

    });


    if (revenue) {

        revenue.textContent =
            "₹" +
            totalRevenue.toLocaleString("en-IN");

    }


    if (donut) {
        donut.textContent =
            patients.length;
    }


    renderDashboardAppointments(
        appointments
    );

    renderSchedule(
        appointments
    );

    updateBillingStats();

}


/* =========================================================
   DASHBOARD APPOINTMENTS
========================================================= */

function renderDashboardAppointments(
    appointments
) {

    const table =
        document.getElementById(
            "dashboardAppointmentTable"
        );

    if (!table) return;


    table.innerHTML = "";


    appointments
        .slice(0, 5)
        .forEach(function (appointment) {

            table.innerHTML += `

                <tr>

                    <td>

                        <div class="person">

                            <div class="person-avatar">
                                ${getInitials(appointment.patient)}
                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(appointment.patient)}
                                </strong>

                                <span>
                                    Appointment
                                </span>

                            </div>

                        </div>

                    </td>

                    <td>
                        ${escapeHTML(appointment.doctor)}
                    </td>

                    <td>
                        ${escapeHTML(appointment.department)}
                    </td>

                    <td>
                        ${formatDate(appointment.date)}
                    </td>

                    <td>

                        <span class="status ${
                            appointment.status === "Confirmed"
                                ? "confirmed"
                                : appointment.status === "Completed"
                                    ? "completed"
                                    : "pending"
                        }">

                            ${appointment.status}

                        </span>

                    </td>

                </tr>

            `;

        });

}


/* =========================================================
   SCHEDULE
========================================================= */

function renderSchedule(appointments) {

    const container =
        document.getElementById(
            "scheduleList"
        );

    if (!container) return;


    container.innerHTML = "";


    appointments
        .slice(0, 5)
        .forEach(function (appointment) {

            const timeParts =
                formatTimeParts(
                    appointment.time
                );


            container.innerHTML += `

                <div class="schedule-item">

                    <div class="schedule-time">

                        <strong>
                            ${timeParts.time}
                        </strong>

                        <span>
                            ${timeParts.period}
                        </span>

                    </div>

                    <div class="schedule-line"></div>

                    <div class="schedule-info">

                        <strong>
                            ${escapeHTML(appointment.patient)}
                        </strong>

                        <span>
                            ${escapeHTML(appointment.doctor)}
                        </span>

                    </div>

                </div>

            `;

        });

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const search =
        document.getElementById(
            "patientSearch"
        );

    if (search) {

        search.addEventListener(
            "input",
            function () {

                const value =
                    this.value
                        .toLowerCase()
                        .trim();


                document
                    .querySelectorAll(
                        "#patientTable tr"
                    )
                    .forEach(function (row) {

                        row.style.display =
                            row.textContent
                                .toLowerCase()
                                .includes(value)
                                    ? ""
                                    : "none";

                    });

            }
        );

    }


    const globalSearch =
        document.getElementById(
            "globalSearch"
        );

    if (globalSearch) {

        globalSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    const value =
                        this.value
                            .toLowerCase()
                            .trim();


                    if (!value) return;


                    const patients = getData("medcarePatients");
                    const doctors = getData("medcareDoctors");

                    const foundPatient = patients.find(function (patient) {
                        return String(patient.name || "").toLowerCase().includes(value);
                    });
                    const foundDoctor = doctors.find(function (doctor) {
                        return String(doctor.name || "").toLowerCase().includes(value);
                    });

                    if (foundPatient) {
                        showPage("patients");
                        const patientSearch = document.getElementById("patientSearch");
                        if (patientSearch) {
                            patientSearch.value = value;
                            patientSearch.dispatchEvent(new Event("input"));
                        }
                    } else if (foundDoctor) {
                        showPage("doctors");
                        const doctorSearch = document.querySelector(".doctor-search-wrap input");
                        if (doctorSearch) {
                            doctorSearch.value = value;
                            doctorSearch.dispatchEvent(new Event("input"));
                        }
                    } else {
                        showToast("No matching patient or doctor found");
                    }

                }

            }
        );

    }

}


/* =========================================================
   EXPORT PATIENTS
========================================================= */

function exportPatientCSV() {
    exportPatients();
}

function exportPatients() {

    const patients =
        getData("medcarePatients");


    let csv =
        "ID,Name,Age,Gender,Phone\n";


    patients.forEach(function (patient) {

        csv +=
            `"${patient.id}","${patient.name}",` +
            `"${patient.age}","${patient.gender}",` +
            `"${patient.phone}"\n`;

    });


    downloadFile(
        csv,
        "medcare-patients.csv",
        "text/csv"
    );


    showToast(
        "Patient data exported"
    );

}


/* =========================================================
   REPORTS
========================================================= */

function formatCurrency(value) {
    return "₹" + (Number(value) || 0).toLocaleString("en-IN");
}

function reportData() {
    const patients = getData("medcarePatients");
    const appointments = getData("medcareAppointments");
    const invoices = getData("medcareInvoices");

    const revenue = invoices.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const paid = invoices.filter(i => String(i.status || "").toLowerCase() === "paid").reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const pending = invoices.filter(i => String(i.status || "").toLowerCase() !== "paid").reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    return { patients, appointments, invoices, revenue, paid, pending };
}

function loadReportLanding() {
    const data = reportData();
    const male = data.patients.filter(p => String(p.gender || "").toLowerCase() === "male").length;
    const female = data.patients.filter(p => String(p.gender || "").toLowerCase() === "female").length;
    const completed = data.appointments.filter(a => /completed|confirmed/i.test(a.status || "")).length;
    const pendingAppointments = data.appointments.filter(a => /pending/i.test(a.status || "")).length;

    const strip = document.getElementById("reportSummaryStrip");
    if (strip) strip.innerHTML = `
        <div class="report-summary-item"><span>Total Patients</span><strong>${data.patients.length}</strong></div>
        <div class="report-summary-item"><span>Total Appointments</span><strong>${data.appointments.length}</strong></div>
        <div class="report-summary-item"><span>Total Revenue</span><strong>${formatCurrency(data.revenue)}</strong></div>
        <div class="report-summary-item"><span>Pending Billing</span><strong>${formatCurrency(data.pending)}</strong></div>`;

    const p = document.getElementById("patientReportMini");
    if (p) p.innerHTML = `<div class="report-mini-stat"><span>Total</span><strong>${data.patients.length}</strong></div><div class="report-mini-stat"><span>Female</span><strong>${female}</strong></div>`;

    const a = document.getElementById("appointmentReportMini");
    if (a) a.innerHTML = `<div class="report-mini-stat"><span>Total</span><strong>${data.appointments.length}</strong></div><div class="report-mini-stat"><span>Pending</span><strong>${pendingAppointments}</strong></div>`;

    const r = document.getElementById("revenueReportMini");
    if (r) r.innerHTML = `<div class="report-mini-stat"><span>Revenue</span><strong>${formatCurrency(data.revenue)}</strong></div><div class="report-mini-stat"><span>Paid</span><strong>${formatCurrency(data.paid)}</strong></div>`;

    if (window.lucide) lucide.createIcons();
}

function generateReport() {
    const data = reportData();
    const report = `MEDCARE HOSPITAL MANAGEMENT SYSTEM\nHOSPITAL SUMMARY REPORT\nGenerated: ${new Date().toLocaleString()}\n\nPatients: ${data.patients.length}\nAppointments: ${data.appointments.length}\nDoctors: ${getData("medcareDoctors").length}\nTotal Revenue: ${formatCurrency(data.revenue)}\nPaid Revenue: ${formatCurrency(data.paid)}\nPending Revenue: ${formatCurrency(data.pending)}\n`;
    downloadFile(report, "medcare-hospital-summary.txt", "text/plain");
    showToast("Hospital summary downloaded");
}

function reportRows(type) {
    const data = reportData();
    if (type === "patients") return data.patients.map(p => [p.id || "-", p.name || "-", p.age || "-", p.gender || "-", p.phone || "-"]);
    if (type === "appointments") return data.appointments.map(a => [a.id || "-", a.patient || "-", a.doctor || "-", a.date || "-", a.time || "-", a.status || "-"]);
    return data.invoices.map(i => [i.id || "-", i.patient || "-", i.service || "-", i.date || "-", formatCurrency(i.amount), i.status || "-"]);
}

function openReport(type) {
    const data = reportData();
    let title, subtitle, kpis, bars, headers;

    if (type === "patients") {
        const male = data.patients.filter(p => String(p.gender || "").toLowerCase() === "male").length;
        const female = data.patients.filter(p => String(p.gender || "").toLowerCase() === "female").length;
        const ages = data.patients.map(p => Number(p.age)).filter(Boolean);
        const avgAge = ages.length ? Math.round(ages.reduce((a,b)=>a+b,0)/ages.length) : 0;
        title = "Patient Report"; subtitle = "Patient registration, demographics and activity overview.";
        kpis = [["Total Patients",data.patients.length],["Male",male],["Female",female],["Avg. Age",avgAge ? avgAge + " yrs" : "-"]];
        bars = [["Male",male,data.patients.length],["Female",female,data.patients.length]];
        headers = ["Patient ID","Patient Name","Age","Gender","Phone"];
    } else if (type === "appointments") {
        const confirmed = data.appointments.filter(a => /confirmed|completed/i.test(a.status || "")).length;
        const pending = data.appointments.filter(a => /pending/i.test(a.status || "")).length;
        const cancelled = data.appointments.filter(a => /cancel/i.test(a.status || "")).length;
        title = "Appointment Report"; subtitle = "Appointment volume, status and scheduling overview.";
        kpis = [["Total Appointments",data.appointments.length],["Confirmed",confirmed],["Pending",pending],["Cancelled",cancelled]];
        bars = [["Confirmed",confirmed,data.appointments.length],["Pending",pending,data.appointments.length],["Cancelled",cancelled,data.appointments.length]];
        headers = ["Appointment ID","Patient","Doctor","Date","Time","Status"];
    } else {
        const paidCount = data.invoices.filter(i => /paid/i.test(i.status || "")).length;
        const pendingCount = data.invoices.length - paidCount;
        title = "Revenue Report"; subtitle = "Billing, collections and payment status overview.";
        kpis = [["Total Revenue",formatCurrency(data.revenue)],["Paid",formatCurrency(data.paid)],["Pending",formatCurrency(data.pending)],["Invoices",data.invoices.length]];
        bars = [["Paid",data.paid,data.revenue],["Pending",data.pending,data.revenue]];
        headers = ["Invoice ID","Patient","Service","Date","Amount","Status"];
    }

    const rows = reportRows(type);
    const max = Math.max(...bars.map(b => Number(b[2]) || 0), 1);
    const content = document.getElementById("reportModalContent");
    const modalTitle = document.getElementById("reportModalTitle");
    if (!content) return;
    if (modalTitle) modalTitle.textContent = title;

    content.innerHTML = `
        <div class="report-view" data-report-type="${type}">
            <div class="report-view-head">
                <div><h2>${title}</h2><p>${subtitle} &nbsp; • &nbsp; ${new Date().toLocaleString()}</p></div>
                <div class="report-actions">
                    <button class="report-action-btn" onclick="downloadReportCSV('${type}')"><i data-lucide="file-spreadsheet"></i> Download CSV</button>
                    <button class="report-action-btn primary" onclick="printReport('${type}')"><i data-lucide="printer"></i> Print / Save PDF</button>
                </div>
            </div>
            <div class="report-kpis">${kpis.map(k=>`<div class="report-kpi"><span>${k[0]}</span><strong>${k[1]}</strong></div>`).join("")}</div>
            <div class="report-content-grid">
                <div class="report-panel"><h4>Quick Breakdown</h4><div class="report-bars">${bars.map(b=>`<div class="report-bar-row"><span>${b[0]}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${Math.min(100,((Number(b[1])||0)/max)*100)}%"></div></div><strong>${b[1]}</strong></div>`).join("")}</div></div>
                <div class="report-panel"><h4>Report Details</h4><div class="report-table-wrap"><table class="report-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.length ? rows.map(row=>`<tr>${row.map((cell,idx)=>`<td>${idx===row.length-1 && /status/i.test(headers[idx]) ? `<span class="report-badge">${cell}</span>` : cell}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="${headers.length}" style="text-align:center;padding:30px">No records available</td></tr>`}</tbody></table></div></div>
            </div>
            <div class="report-download-box"><div><strong>Download this report</strong><span>Export the complete ${title.toLowerCase()} data for sharing, review or offline analysis.</span></div><div class="report-download-actions"><button class="report-action-btn" onclick="downloadReportCSV('${type}')"><i data-lucide="download"></i> Download CSV</button><button class="report-action-btn primary" onclick="printReport('${type}')"><i data-lucide="file-down"></i> Save as PDF</button></div></div>
        </div>`;

    openModal("reportViewModal");
    if (window.lucide) lucide.createIcons();
}

function downloadReportCSV(type) {
    const data = reportRows(type);
    let headers, filename;
    if (type === "patients") { headers=["Patient ID","Patient Name","Age","Gender","Phone"]; filename="MedCare_Patient_Report.csv"; }
    else if (type === "appointments") { headers=["Appointment ID","Patient","Doctor","Date","Time","Status"]; filename="MedCare_Appointment_Report.csv"; }
    else { headers=["Invoice ID","Patient","Service","Date","Amount","Status"]; filename="MedCare_Revenue_Report.csv"; }
    const csv = [headers, ...data].map(row => row.map(v => `"${String(v ?? "").replace(/"/g,'""')}"`).join(",")).join("\n");
    downloadFile(csv, filename, "text/csv;charset=utf-8");
    showToast("Report downloaded as CSV");
}

function printReport(type) {
    const data = reportData();
    let title, headers, rows;
    if (type === "patients") { title="Patient Report"; headers=["Patient ID","Patient Name","Age","Gender","Phone"]; rows=reportRows(type); }
    else if (type === "appointments") { title="Appointment Report"; headers=["Appointment ID","Patient","Doctor","Date","Time","Status"]; rows=reportRows(type); }
    else { title="Revenue Report"; headers=["Invoice ID","Patient","Service","Date","Amount","Status"]; rows=reportRows(type); }
    const win = window.open("", "_blank", "width=1100,height=750");
    if (!win) { showToast("Please allow pop-ups to print the report"); return; }
    win.document.write(`<!doctype html><html><head><title>MedCare HMS - ${title}</title><style>body{font-family:Arial,sans-serif;padding:35px;color:#172033}h1{margin:0 0 5px}p{color:#64748b}table{width:100%;border-collapse:collapse;margin-top:25px}th,td{padding:10px;border:1px solid #e2e8f0;text-align:left;font-size:12px}th{background:#f1f5f9}.brand{color:#2563eb;font-weight:700}@media print{button{display:none}}</style></head><body><div class="brand">MedCare HMS</div><h1>${title}</h1><p>Generated on ${new Date().toLocaleString()}</p><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></body></html>`);
    win.document.close(); win.focus(); setTimeout(()=>win.print(),250);
}

function exportReport() { generateReport(); }

/* =========================================================
   PREMIUM SETTINGS CENTER
========================================================= */
const SETTINGS_KEY = "medcareSettings";
function settingsDefaults(){return {hospitalName:"MedCare Multi-Speciality Hospital",hospitalCode:"MC-HMS-001",phone:"+91 98765 43210",email:"info@medcarehospital.com",admin:"Hospital Administrator",website:"www.medcarehospital.com",address:"New Delhi, India",city:"New Delhi",state:"Delhi",pin:"110001",country:"India",mapLink:"",loginProtection:false,roleAccess:true,audit:true,appointments:true,admissions:true,billing:true,icu:true,lab:true,pharmacy:true,theme:localStorage.getItem("medcareDarkMode")==="true"?"dark":"light"};}
function getSettings(){try{return Object.assign(settingsDefaults(),JSON.parse(localStorage.getItem(SETTINGS_KEY)||"{}"));}catch(e){return settingsDefaults();}}
function setInput(id,v){const e=document.getElementById(id);if(e)e.value=v??"";}
function setCheck(id,v){const e=document.getElementById(id);if(e)e.checked=!!v;}
function loadSettings(){
 const s=getSettings();
 const page=document.getElementById("settings"); if(!page)return;
 const isDark = s.theme === "dark";
 document.body.classList.toggle("dark-theme", isDark);
 document.body.setAttribute("data-theme", isDark ? "dark" : "light");
 page.innerHTML=`<div class="settings-center">
 <div class="settings-hero"><div class="settings-brandline"><div class="settings-brand-mark"><i data-lucide="hospital"></i></div><div><span class="settings-eyebrow">MEDCARE HMS • INDIA</span><h2>Settings & Administration</h2><p>Manage hospital profile, security, notifications, appearance and storage from one premium control center.</p><div class="india-project-badge"><span class="tri tri-saffron"></span><span class="tri tri-white"></span><span class="tri tri-green"></span><strong>BCA Final Semester</strong><span>•</span><span>Professional Hospital Management System</span></div></div></div><div class="settings-hero-actions"><button class="btn btn-secondary" onclick="downloadSettingsReport()"><i data-lucide="file-down"></i> Settings Report</button><button class="btn btn-primary" onclick="saveSettings()"><i data-lucide="save"></i> Save Changes</button></div></div>
 <div class="settings-overview" id="settingsOverview"></div>
 <div class="settings-layout"><aside class="settings-nav">
 ${[["hospitalSetting","hospital","Hospital Profile"],["securitySetting","shield-check","Security & Access"],["notificationSetting","bell","Notifications"],["appearanceSetting","palette","Appearance"],["locationSetting","map-pin","Hospital Location"],["storageSetting","database","Storage & Backup"]].map((x,i)=>`<button class="settings-nav-item ${i===0?"active":""}" onclick="scrollToSetting('${x[0]}',this)"><i data-lucide="${x[1]}"></i><span>${x[2]}</span></button>`).join("")}
 </aside><div class="settings-content">
 <section class="settings-panel" id="hospitalSetting"><div class="settings-panel-head"><div class="settings-icon"><i data-lucide="hospital"></i></div><div><h3>Hospital Profile</h3><p>Basic information used across MedCare HMS and generated reports.</p></div></div><div class="settings-form-grid">
 <label>Hospital Name<input id="setHospitalName"></label><label>Hospital Code<input id="setHospitalCode"></label><label>Phone<input id="setPhone"></label><label>Email<input id="setEmail" type="email"></label><label>Administrator<input id="setAdmin"></label><label>Website<input id="setWebsite"></label><label class="settings-wide">Hospital Address<textarea id="setAddress" rows="3"></textarea></label></div></section>
 <section class="settings-panel" id="securitySetting"><div class="settings-panel-head"><div class="settings-icon"><i data-lucide="shield-check"></i></div><div><h3>Security & Access</h3><p>Control local demo authentication, permissions and activity tracking.</p></div></div><div class="toggle-list">
 ${[["setLogin","Login Protection","Require login before dashboard access."],["setRole","Role-Based Access","Restrict modules according to user roles."],["setAudit","Audit Activity","Keep a local activity trail for important actions."]].map(x=>`<label class="toggle-row"><span><strong>${x[1]}</strong><small>${x[2]}</small></span><input type="checkbox" id="${x[0]}" class="switch-input"><span class="switch-ui"></span></label>`).join("")}</div></section>
 <section class="settings-panel" id="notificationSetting"><div class="settings-panel-head"><div class="settings-icon"><i data-lucide="bell"></i></div><div><h3>Notifications</h3><p>Choose hospital events that should generate system alerts.</p></div></div><div class="check-grid">
 ${[["setAppointments","Appointment reminders"],["setAdmissions","Admission & discharge alerts"],["setBilling","Billing & payment alerts"],["setICU","ICU critical alerts"],["setLab","Laboratory result alerts"],["setPharmacy","Low pharmacy stock alerts"]].map(x=>`<label><input type="checkbox" id="${x[0]}"><span>${x[1]}</span></label>`).join("")}</div></section>
 <section class="settings-panel" id="appearanceSetting"><div class="settings-panel-head"><div class="settings-icon"><i data-lucide="palette"></i></div><div><h3>Appearance</h3><p>Switch between the clinical light and dark administration views.</p></div></div><div class="appearance-options"><button class="appearance-option" data-theme-option="light" onclick="setAppearance('light')"><i data-lucide="sun"></i><strong>Light</strong><span>Clean clinical workspace</span></button><button class="appearance-option" data-theme-option="dark" onclick="setAppearance('dark')"><i data-lucide="moon"></i><strong>Dark</strong><span>Low-light administration view</span></button></div></section>
 <section class="settings-panel" id="locationSetting"><div class="settings-panel-head"><div class="settings-icon"><i data-lucide="map-pin"></i></div><div><h3>Hospital Location</h3><p>Location information included in hospital settings and reports.</p></div></div><div class="settings-form-grid"><label>City<input id="setCity"></label><label>State<input id="setState"></label><label>PIN Code<input id="setPin"></label><label>Country<input id="setCountry"></label><label class="settings-wide">Map / Location Link<input id="setMapLink"></label></div></section>
 <section class="settings-panel" id="storageSetting"><div class="settings-panel-head"><div class="settings-icon"><i data-lucide="database"></i></div><div><h3>Storage & Backup</h3><p>Monitor browser LocalStorage and safely export or restore your HMS demo data.</p></div></div><div class="storage-card"><div class="storage-top"><div><span>LocalStorage Usage</span><strong id="storageUsedText">0 KB</strong></div><span class="storage-status" id="storageStatus">Healthy</span></div><div class="storage-track"><div class="storage-progress" id="storageProgress"></div></div><div class="storage-meta"><span id="storageKeysText">0 data keys</span><span>Browser-local storage</span></div></div><div class="storage-actions"><button class="storage-action" onclick="backupHospitalData()"><i data-lucide="download"></i><span><strong>Backup Hospital Data</strong><small>Download all browser data as a JSON backup.</small></span></button><button class="storage-action" onclick="document.getElementById('restoreFileInput').click()"><i data-lucide="upload"></i><span><strong>Restore Backup</strong><small>Restore a previous MedCare JSON backup.</small></span></button><button class="storage-action" onclick="downloadSettingsReport()"><i data-lucide="file-text"></i><span><strong>Export Settings Report</strong><small>Download a readable configuration report.</small></span></button><button class="storage-action danger-action" onclick="clearMedCareData()"><i data-lucide="trash-2"></i><span><strong>Clear Demo Data</strong><small>Remove MedCare data after confirmation.</small></span></button></div><input type="file" id="restoreFileInput" accept="application/json,.json" hidden onchange="restoreHospitalData(event)"></section>
 <div class="settings-save-bar"><span><i data-lucide="check-circle-2"></i> Settings are saved in this browser using LocalStorage.</span><button class="btn btn-primary" onclick="saveSettings()">Save Settings</button></div>
 </div></div></div>`;
 setInput("setHospitalName",s.hospitalName);setInput("setHospitalCode",s.hospitalCode);setInput("setPhone",s.phone);setInput("setEmail",s.email);setInput("setAdmin",s.admin);setInput("setWebsite",s.website);setInput("setAddress",s.address);setInput("setCity",s.city);setInput("setState",s.state);setInput("setPin",s.pin);setInput("setCountry",s.country);setInput("setMapLink",s.mapLink);
 setCheck("setLogin",s.loginProtection);setCheck("setRole",s.roleAccess);setCheck("setAudit",s.audit);setCheck("setAppointments",s.appointments);setCheck("setAdmissions",s.admissions);setCheck("setBilling",s.billing);setCheck("setICU",s.icu);setCheck("setLab",s.lab);setCheck("setPharmacy",s.pharmacy); updateSettingsOverview(s);updateStorageMeter();document.querySelectorAll(".appearance-option").forEach(function(btn){btn.classList.toggle("selected",btn.dataset.themeOption===s.theme);});if(window.lucide)lucide.createIcons();
}
function collectSettings(){return {hospitalName:document.getElementById("setHospitalName")?.value.trim()||"",hospitalCode:document.getElementById("setHospitalCode")?.value.trim()||"",phone:document.getElementById("setPhone")?.value.trim()||"",email:document.getElementById("setEmail")?.value.trim()||"",admin:document.getElementById("setAdmin")?.value.trim()||"",website:document.getElementById("setWebsite")?.value.trim()||"",address:document.getElementById("setAddress")?.value.trim()||"",city:document.getElementById("setCity")?.value.trim()||"",state:document.getElementById("setState")?.value.trim()||"",pin:document.getElementById("setPin")?.value.trim()||"",country:document.getElementById("setCountry")?.value.trim()||"",mapLink:document.getElementById("setMapLink")?.value.trim()||"",loginProtection:!!document.getElementById("setLogin")?.checked,roleAccess:!!document.getElementById("setRole")?.checked,audit:!!document.getElementById("setAudit")?.checked,appointments:!!document.getElementById("setAppointments")?.checked,admissions:!!document.getElementById("setAdmissions")?.checked,billing:!!document.getElementById("setBilling")?.checked,icu:!!document.getElementById("setICU")?.checked,lab:!!document.getElementById("setLab")?.checked,pharmacy:!!document.getElementById("setPharmacy")?.checked,theme:document.body.classList.contains("dark-theme")?"dark":"light"};}
function saveSettings(){const s=collectSettings();localStorage.setItem(SETTINGS_KEY,JSON.stringify(s));document.body.classList.toggle("dark-theme",s.theme==="dark");document.body.setAttribute("data-theme",s.theme==="dark"?"dark":"light");localStorage.setItem("medcareDarkMode",s.theme==="dark"?"true":"false");updateSettingsOverview(s);updateStorageMeter();document.querySelectorAll(".appearance-option").forEach(function(btn){btn.classList.toggle("selected",btn.dataset.themeOption===s.theme);});showToast("Settings saved successfully");if(window.lucide)lucide.createIcons();}
function updateSettingsOverview(s){const box=document.getElementById("settingsOverview");if(!box)return;box.innerHTML=`<div class="settings-overview-card"><span class="overview-icon"><i data-lucide="hospital"></i></span><div><small>Hospital</small><strong>${escapeHTML(s.hospitalName||"MedCare Hospital")}</strong><em>${escapeHTML(s.hospitalCode||"MC-HMS")}</em></div></div><div class="settings-overview-card"><span class="overview-icon"><i data-lucide="shield-check"></i></span><div><small>Security</small><strong>${s.roleAccess?"Role Access On":"Basic Access"}</strong><em>${s.audit?"Audit enabled":"Audit disabled"}</em></div></div><div class="settings-overview-card"><span class="overview-icon"><i data-lucide="database"></i></span><div><small>Storage</small><strong>${localStorage.length} data keys</strong><em>LocalStorage connected</em></div></div><div class="settings-overview-card"><span class="overview-icon"><i data-lucide="bell"></i></span><div><small>Alerts</small><strong>${[s.appointments,s.admissions,s.billing,s.icu,s.lab,s.pharmacy].filter(Boolean).length}/6 enabled</strong><em>Hospital notifications</em></div></div>`;if(window.lucide)lucide.createIcons();}
function updateStorageMeter(){let bytes=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);bytes+=(k?k.length:0)+(localStorage.getItem(k)||"").length;}const kb=bytes/1024;const pct=Math.min(bytes/(5*1024*1024)*100,100);const t=document.getElementById("storageUsedText"),p=document.getElementById("storageProgress"),k=document.getElementById("storageKeysText"),st=document.getElementById("storageStatus");if(t)t.textContent=kb<1024?kb.toFixed(1)+" KB":(kb/1024).toFixed(2)+" MB";if(p)p.style.width=Math.max(pct,1)+"%";if(k)k.textContent=localStorage.length+" data keys";if(st)st.textContent=pct>80?"High usage":pct>60?"Monitor":"Healthy";}
function scrollToSetting(id,b){document.querySelectorAll(".settings-nav-item").forEach(x=>x.classList.remove("active"));if(b)b.classList.add("active");document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});}
function setAppearance(mode){
    const isDark = mode === "dark";
    document.body.classList.toggle("dark-theme", isDark);
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("medcareDarkMode", isDark ? "true" : "false");
    const s = getSettings();
    s.theme = mode;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    document.querySelectorAll(".appearance-option").forEach(function(btn){ btn.classList.remove("selected"); });
    const selected = document.querySelector(`.appearance-option[data-theme-option="${mode}"]`);
    if(selected) selected.classList.add("selected");
    showToast((isDark ? "Dark" : "Light") + " appearance applied");
    if(window.lucide) lucide.createIcons();
}
function backupHospitalData(){const storage={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);storage[k]=localStorage.getItem(k);}downloadFile(JSON.stringify({app:"MedCare HMS",version:"Premium V7",exportedAt:new Date().toISOString(),storage},null,2),"MedCare_HMS_Backup_"+new Date().toISOString().slice(0,10)+".json","application/json");showToast("Hospital data backup downloaded");}
function restoreHospitalData(e){const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=function(x){try{const data=JSON.parse(x.target.result);if(!data.storage||typeof data.storage!=="object")throw Error();if(!confirm("Restore this backup? Current browser data will be replaced."))return;localStorage.clear();Object.entries(data.storage).forEach(([k,v])=>localStorage.setItem(k,String(v)));showToast("Backup restored. Reloading...");setTimeout(()=>location.reload(),700);}catch(err){showToast("Invalid MedCare backup file");}};reader.readAsText(file);e.target.value="";}
function clearMedCareData(){if(!confirm("Clear demo hospital records? Your saved Settings will be kept. Make a backup first if you need the records later."))return;const savedSettings=localStorage.getItem(SETTINGS_KEY);const savedTheme=localStorage.getItem("medcareDarkMode");localStorage.clear();if(savedSettings)localStorage.setItem(SETTINGS_KEY,savedSettings);if(savedTheme)localStorage.setItem("medcareDarkMode",savedTheme);showToast("Demo records cleared. Settings kept. Reloading...");setTimeout(()=>location.reload(),700);}
function downloadSettingsReport(){const s=getSettings();let bytes=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);bytes+=(k?k.length:0)+(localStorage.getItem(k)||"").length;}const lines=["MEDCARE HMS — SETTINGS REPORT","Generated: "+new Date().toLocaleString(),"","HOSPITAL PROFILE","Hospital Name: "+s.hospitalName,"Hospital Code: "+s.hospitalCode,"Phone: "+s.phone,"Email: "+s.email,"Administrator: "+s.admin,"Address: "+s.address,"Location: "+[s.city,s.state,s.pin,s.country].filter(Boolean).join(", "),"","SECURITY & ACCESS","Login Protection: "+(s.loginProtection?"Enabled":"Disabled"),"Role-Based Access: "+(s.roleAccess?"Enabled":"Disabled"),"Audit Activity: "+(s.audit?"Enabled":"Disabled"),"","NOTIFICATIONS","Appointments: "+(s.appointments?"Enabled":"Disabled"),"Admissions: "+(s.admissions?"Enabled":"Disabled"),"Billing: "+(s.billing?"Enabled":"Disabled"),"ICU: "+(s.icu?"Enabled":"Disabled"),"Laboratory: "+(s.lab?"Enabled":"Disabled"),"Pharmacy: "+(s.pharmacy?"Enabled":"Disabled"),"","APPEARANCE","Theme: "+s.theme,"","STORAGE","LocalStorage Keys: "+localStorage.length,"Approx. Storage Used: "+(bytes/1024).toFixed(2)+" KB","Storage Type: Browser LocalStorage"];downloadFile(lines.join("\n"),"MedCare_HMS_Settings_Report.txt","text/plain;charset=utf-8");showToast("Settings report downloaded");}

/* =========================================================
   DOWNLOAD HELPER
========================================================= */

function downloadFile(
    content,
    fileName,
    type
) {

    const blob =
        new Blob(
            [content],
            { type: type }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}


/* =========================================================
   VIEW FUNCTIONS
========================================================= */

function viewPatient(id) {
    const patient = getData("medcarePatients").find(item => item.id === id);
    if (!patient) return;
    window.currentPatientId = id;
    const appointments = getData("medcareAppointments").filter(a => a.patient === patient.name);
    const doctors = getData("medcareDoctors");
    const latestAppointment = appointments[appointments.length - 1];
    const doctor = latestAppointment ? doctors.find(d => d.name === latestAppointment.doctor) : doctors[0];
    const doctorName = doctor?.name || "Dr. Anjali Mehta";
    const doctorSpecialty = doctor?.specialization || doctor?.department || "Consultant Physician";
    const visitDate = latestAppointment?.date || new Date().toISOString().slice(0,10);
    const complaint = patient.complaint || patient.medicalDetails?.split(/[.;]/)[0] || "General consultation";
    const allergies = patient.allergies || "No known allergy reported";
    const prescription = patient.prescription || {
        diagnosis: "Clinical assessment / follow-up",
        medicines: [
            {name:"Paracetamol 500 mg", dose:"1 tablet", frequency:"After food • Twice daily", duration:"3 days"},
            {name:"Pantoprazole 40 mg", dose:"1 tablet", frequency:"Before breakfast • Once daily", duration:"5 days"}
        ],
        advice: "Take medicines regularly, maintain hydration and return for review if symptoms persist or worsen.",
        followup: "Review after 5 days or earlier if required."
    };
    const content = document.getElementById("patientRecordContent");
    const esc = v => escapeHTML(String(v ?? ""));
    content.innerHTML = `
      <div class="prescription-paper" id="prescriptionPaper">
        <div class="prescription-letterhead">
          <div class="hospital-emblem"><i data-lucide="hospital"></i></div>
          <div class="hospital-headline"><h1>MEDCARE MULTI-SPECIALITY HOSPITAL</h1><p>Advanced Care • Compassionate Service • Trusted Healthcare</p><span>New Delhi, India • Phone: +91 98765 43210 • info@medcarehospital.com</span></div>
          <div class="rx-mark">Rx</div>
        </div>
        <div class="prescription-rule"></div>
        <div class="patient-meta-grid">
          <div><label>Patient Name</label><strong>${esc(patient.name)}</strong></div>
          <div><label>Patient ID</label><strong>${esc(patient.id)}</strong></div>
          <div><label>Age / Gender</label><strong>${esc(patient.age)} years / ${esc(patient.gender)}</strong></div>
          <div><label>Blood Group</label><strong>${esc(patient.bloodGroup || "—")}</strong></div>
          <div><label>Profession</label><strong>${esc(patient.profession || "—")}</strong></div>
          <div><label>Father / Guardian</label><strong>${esc(patient.fatherName || "—")}</strong></div>
          <div><label>Husband / Wife</label><strong>${esc(patient.spouseName || "—")}</strong></div>
          <div><label>Contact</label><strong>${esc(patient.phone || "—")}</strong></div>
          <div><label>Visit Date</label><strong>${esc(visitDate)}</strong></div>
        </div>
        <div class="patient-address-line"><b>Address:</b> ${esc(patient.address || "Not provided")}</div>
        <div class="doctor-banner"><div><span>CONSULTING PHYSICIAN</span><strong>${esc(doctorName)}</strong><small>${esc(doctorSpecialty)}</small></div><div class="doctor-sign-mini">Authorized Medical Consultant</div></div>
        <div class="clinical-strip"><div><label>Chief Complaint</label><strong>${esc(complaint)}</strong></div><div><label>Allergies</label><strong>${esc(allergies)}</strong></div><div><label>Diagnosis</label><strong>${esc(prescription.diagnosis)}</strong></div></div>
        <section class="rx-section"><div class="rx-title"><span>Rx</span><div><h2>Prescription</h2><p>Medication and dosage instructions</p></div></div>
          <div class="medicine-list">${prescription.medicines.map((m,i)=>`<div class="medicine-row"><div class="medicine-no">${i+1}</div><div class="medicine-name"><strong>${esc(m.name)}</strong><span>${esc(m.dose)}</span></div><div><label>Frequency</label><strong>${esc(m.frequency)}</strong></div><div><label>Duration</label><strong>${esc(m.duration)}</strong></div></div>`).join("")}</div>
        </section>
        <section class="doctor-notes"><div class="note-heading"><i data-lucide="pen-line"></i><h3>Doctor's Notes & Advice</h3></div><p class="handwritten-note">${esc(prescription.advice)}</p><div class="followup"><b>Follow-up:</b> ${esc(prescription.followup)}</div></section>
        <div class="prescription-footer"><div><span>Emergency Contact</span><strong>${esc(patient.emergencyName || "—")} ${patient.emergencyPhone ? "• " + esc(patient.emergencyPhone) : ""}</strong></div></div>`;
    document.getElementById("patientRecordTitle").textContent = `${patient.name} • ${patient.id}`;
    openModal("patientRecordModal");
    if (window.lucide) lucide.createIcons();
}

function getCurrentPatientForDocument(){
    return getData("medcarePatients").find(p => p.id === window.currentPatientId);
}

function buildPatientPrescriptionDocument(patient){
    const appointments = getData("medcareAppointments").filter(a => a.patient === patient.name);
    const doctors = getData("medcareDoctors");
    const appt = appointments[appointments.length - 1];
    const doctor = appt ? doctors.find(d => d.name === appt.doctor) : doctors[0];
    const doctorName = doctor?.name || "Dr. Anjali Mehta";
    const specialty = doctor?.specialization || doctor?.department || "Consultant Physician";
    const prescription = patient.prescription || {diagnosis:"Clinical assessment / follow-up", medicines:[{name:"Paracetamol 500 mg",dose:"1 tablet",frequency:"After food • Twice daily",duration:"3 days"},{name:"Pantoprazole 40 mg",dose:"1 tablet",frequency:"Before breakfast • Once daily",duration:"5 days"}],advice:"Take medicines regularly, maintain hydration and return for review if symptoms persist or worsen.",followup:"Review after 5 days or earlier if required."};
    const e=v=>escapeHTML(String(v??""));
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Prescription - ${e(patient.name)}</title><style>body{font-family:Arial,sans-serif;color:#172033;padding:35px;line-height:1.5}.sheet{max-width:850px;margin:auto;border:1px solid #d7dee9;padding:34px}.head{text-align:center}.head h1{margin:0;color:#155eef;font-size:24px}.head p{margin:4px}.rule{border-top:3px solid #155eef;margin:20px 0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#f5f8fc;padding:18px}.grid b{display:block;color:#68758a;font-size:11px;text-transform:uppercase}.doctor{margin:22px 0;padding:14px 18px;border-left:5px solid #155eef;background:#eef5ff}.rx{font-size:38px;color:#155eef;font-family:Georgia,serif}.med{border-bottom:1px solid #ddd;padding:12px 0}.note{margin-top:22px;padding:18px;background:#fffdf2;font-family:"Segoe Print",cursive}</style></head><body><div class="sheet"><div class="head"><h1>MEDCARE MULTI-SPECIALITY HOSPITAL</h1><p>Advanced Care • Compassionate Service • Trusted Healthcare</p><p>New Delhi, India • +91 98765 43210 • info@medcarehospital.com</p></div><div class="rule"></div><div class="grid"><div><b>Patient Name</b>${e(patient.name)}</div><div><b>Patient ID</b>${e(patient.id)}</div><div><b>Age / Gender</b>${e(patient.age)} / ${e(patient.gender)}</div><div><b>Blood Group</b>${e(patient.bloodGroup||"—")}</div><div><b>Father / Guardian</b>${e(patient.fatherName||"—")}</div><div><b>Husband / Wife</b>${e(patient.spouseName||"—")}</div><div><b>Phone</b>${e(patient.phone||"—")}</div><div><b>Visit Date</b>${e(appt?.date||new Date().toISOString().slice(0,10))}</div></div><p><b>Address:</b> ${e(patient.address||"Not provided")}</p><div class="doctor"><b>CONSULTING PHYSICIAN</b><br><strong>${e(doctorName)}</strong><br>${e(specialty)}</div><h2><span class="rx">Rx</span> Prescription</h2><p><b>Diagnosis:</b> ${e(prescription.diagnosis)}</p>${prescription.medicines.map((m,i)=>`<div class="med"><b>${i+1}. ${e(m.name)}</b><br>${e(m.dose)} • ${e(m.frequency)} • ${e(m.duration)}</div>`).join("")}<div class="note"><b>Doctor's Notes & Advice</b><br>${e(prescription.advice)}<br><br><b>Follow-up:</b> ${e(prescription.followup)}</div></div></body></html>`;
}

function downloadPatientPrescriptionWord(){
    const patient=getCurrentPatientForDocument(); if(!patient) return;
    const html=buildPatientPrescriptionDocument(patient);
    downloadFile(html, `MedCare_Prescription_${String(patient.name).replace(/[^a-z0-9]+/gi,"_")}.doc`, "application/msword");
    showToast("Prescription Word document downloaded");
}

function printPatientPrescription(){
    const patient=getCurrentPatientForDocument(); if(!patient) return;
    const w=window.open("", "_blank", "width=950,height=900");
    if(!w){showToast("Please allow pop-ups to print the prescription");return;}
    w.document.write(buildPatientPrescriptionDocument(patient)); w.document.close(); w.focus(); setTimeout(()=>w.print(),350);
}



/* =========================================================
   NOTIFICATIONS
========================================================= */

function setupNotifications() {

    const button =
        document.getElementById(
            "notificationBtn"
        );

    const overlay =
        document.getElementById(
            "overlay"
        );


    if (button) {

        button.addEventListener(
            "click",
            function () {

                const drawer =
                    document.getElementById(
                        "notificationDrawer"
                    );

                drawer.classList.add("show");

                if (overlay) {
                    overlay.classList.add("show");
                }

            }
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeNotifications
        );

    }

}


function closeNotifications() {

    const drawer =
        document.getElementById(
            "notificationDrawer"
        );

    const overlay =
        document.getElementById(
            "overlay"
        );


    if (drawer) {
        drawer.classList.remove("show");
    }

    if (overlay) {
        overlay.classList.remove("show");
    }

}


/* =========================================================
   THEME
========================================================= */

function setupTheme() {
    const button = document.getElementById("themeBtn");
    const saved = localStorage.getItem("medcareDarkMode");
    const settings = getSettings();
    const isDark = saved === "true" || settings.theme === "dark";

    document.body.classList.toggle("dark-theme", isDark);
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");

    if(button){
        button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        button.title = isDark ? "Switch to light mode" : "Switch to dark mode";
        button.onclick = function(){
            const nextDark = !document.body.classList.contains("dark-theme");
            setAppearance(nextDark ? "dark" : "light");
            button.setAttribute("aria-label", nextDark ? "Switch to light mode" : "Switch to dark mode");
            button.title = nextDark ? "Switch to light mode" : "Switch to dark mode";
        };
    }
}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser(event) {

    if (event) {
        event.preventDefault();
    }


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) return;


    localStorage.removeItem(
        "medcareLoggedIn"
    );

    localStorage.removeItem(
        "medcareCurrentUser"
    );


    showToast(
        "Logged out successfully"
    );


    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 700);

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const text =
        document.getElementById("toastText");


    if (!toast || !text) return;


    text.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   CHARTS
========================================================= */

function initializeCharts() {

    if (
        typeof Chart === "undefined"
    ) return;


    const patientCanvas =
        document.getElementById(
            "patientChart"
        );


    if (patientCanvas) {

        new Chart(
            patientCanvas,
            {

                type: "line",

                data: {

                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],

                    datasets: [

                        {
                            label: "Patients",

                            data: [
                                80,
                                110,
                                95,
                                140,
                                180,
                                160,
                                210,
                                190,
                                230,
                                250,
                                280,
                                320
                            ],

                            tension: 0.4,

                            fill: true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            display: false
                        }
                    }

                }

            }
        );

    }


    const departmentCanvas =
        document.getElementById(
            "departmentChart"
        );


    if (departmentCanvas) {

        new Chart(
            departmentCanvas,
            {

                type: "doughnut",

                data: {

                    labels: [
                        "Cardiology",
                        "Neurology",
                        "Orthopedic",
                        "Pediatrics",
                        "Other"
                    ],

                    datasets: [

                        {
                            data: [
                                245,
                                168,
                                190,
                                210,
                                437
                            ]
                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "70%",

                    plugins: {

                        legend: {
                            display: false
                        }

                    }

                }

            }
        );

    }

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        function () {

            const sidebar =
                document.getElementById(
                    "sidebar"
                );

            if (sidebar) {

                sidebar.classList.toggle(
                    "mobile-open"
                );

            }

        }
    );

}


/* =========================================================
   SIDEBAR COLLAPSE
========================================================= */

const collapseBtn =
    document.getElementById(
        "collapseBtn"
    );


if (collapseBtn) {

    collapseBtn.addEventListener(
        "click",
        function () {

            const sidebar =
                document.getElementById(
                    "sidebar"
                );

            const main =
                document.getElementById(
                    "main"
                );


            if (sidebar) {
                sidebar.classList.toggle(
                    "collapsed"
                );
            }

            if (main) {
                main.classList.toggle(
                    "expanded"
                );
            }

        }
    );

}


/* =========================================================
   FORMATTERS
========================================================= */

function getInitials(name) {

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(function (word) {
            return word.charAt(0);
        })
        .join("")
        .toUpperCase();

}


function formatDate(dateString) {

    if (!dateString) return "-";


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatTime(time) {

    if (!time) return "-";


    const parts =
        time.split(":");


    let hour =
        Number(parts[0]);

    const minute =
        parts[1];


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return (
        String(hour).padStart(2, "0") +
        ":" +
        minute +
        " " +
        period
    );

}


function formatTimeParts(time) {

    const formatted =
        formatTime(time);

    const parts =
        formatted.split(" ");


    return {

        time: parts[0],

        period: parts[1]

    };

}


/* =========================================================
   SECURITY HELPERS
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return escapeHTML(value);

} 

/* =========================================================
   PREMIUM CLINICAL MODULES — MEDCARE HMS
========================================================= */

const PREMIUM_MODULES = {
  nursing:{title:"Nursing Department",eyebrow:"CLINICAL OPERATIONS",icon:"heart-handshake",subtitle:"Nursing teams, unit coverage, shifts and daily roster",stats:[["Nursing Staff","48","Active team"],["Units","6","Clinical units"],["On Duty","32","Current shift"],["Coverage","96%","Today's coverage"]],columns:["Staff ID","Nurse / Role","Unit","Shift","Status"],rows:[["RN-101","Anita Verma • Senior Nurse","Ward A","Morning","On Duty"],["RN-112","Kavita Singh • Staff Nurse","ICU","Night","On Duty"],["RN-118","Meena Joshi • Charge Nurse","Emergency","Morning","On Duty"],["RN-124","Pooja Sharma • Staff Nurse","Pediatrics","Evening","Available"]],actions:["Nursing Team","Roster","Download Schedule"]},
  icu:{title:"Intensive Care Unit (ICU)",eyebrow:"CRITICAL CARE",icon:"activity",subtitle:"Dedicated ICU operations, critical monitoring and bed visibility",stats:[["ICU Beds","24","12 occupied"],["Occupancy","50%","Within capacity"],["Critical Patients","7","Close monitoring"],["ICU Nurses","16","Dedicated roster"]],columns:["Bed","Patient","Severity","Monitor","Assigned Team"],rows:[["ICU-01","Patient A","Critical","ECG • SpO₂ • BP","Team Alpha"],["ICU-04","Patient B","Serious","ECG • SpO₂","Team Beta"],["ICU-09","Patient C","Stable","SpO₂ • BP","Team Alpha"],["ICU-14","Available","—","Ready","—"]],actions:["ICU Team","ICU Roster","Bed Monitor"]},
  supervisors:{title:"Supervisors Department",eyebrow:"HOSPITAL LEADERSHIP",icon:"user-cog",subtitle:"Shift supervisors and operational responsibilities",stats:[["Supervisors","12","Active"],["On Duty","8","Current shift"],["Units Covered","10","Operational units"],["Escalations","3","Open today"]],columns:["Supervisor","Department / Unit","Shift","Responsibility","Status"],rows:[["Rajiv Kapoor","Emergency & Front Desk","Morning","Operations Lead","Active"],["Sunita Rao","Nursing","Evening","Clinical Coverage","Active"],["Amit Gupta","Diagnostics","Morning","Lab & Radiology","Active"],["Neelam Arora","Housekeeping","Night","Support Services","On Call"]],actions:["Supervisor Directory","Duty Schedule","Download Roster"]},
  admissions:{title:"Admissions & Discharge",eyebrow:"PATIENT FLOW",icon:"clipboard-check",subtitle:"Track admissions, transfers, discharge planning and bed movement",stats:[["Admitted Today","18","New admissions"],["Discharges","11","Completed"],["Transfers","6","In progress"],["Avg. Stay","3.8 days","Current average"]],columns:["Patient ID","Patient","Ward / Room","Admission","Discharge Plan"],rows:[["PT-001","Rahul Sharma","Ward A • 104","05 Oct 2026","07 Oct 2026"],["PT-014","Priya Malhotra","Private • 208","05 Oct 2026","Planned"],["PT-027","Aarav Singh","ICU • ICU-04","04 Oct 2026","Review"],["PT-031","Neha Gupta","Ward B • 118","03 Oct 2026","06 Oct 2026"]],actions:["New Admission","Discharge Patient","Export Census"]},
  rooms:{title:"Rooms & Beds",eyebrow:"BED MANAGEMENT",icon:"bed-double",subtitle:"Real-time-style visibility for wards, rooms and bed occupancy",stats:[["Total Beds","180","Hospital capacity"],["Occupied","126","70% occupancy"],["Available","54","Ready for allocation"],["Cleaning","8","Turnaround"]],columns:["Room / Bed","Type","Floor","Patient / Status","Bed Status"],rows:[["104-A","General Ward","1","Rahul Sharma","Occupied"],["208-B","Private","2","Priya Malhotra","Occupied"],["ICU-04","ICU","G","Critical Patient","Occupied"],["305-C","Semi Private","3","Available","Ready"]],actions:["Allocate Bed","Room Directory","Occupancy Report"]},
  treatment:{title:"Treatment & Medical Records",eyebrow:"CLINICAL RECORDS",icon:"clipboard-plus",subtitle:"Diagnosis, treatment plans, medicines, tests and follow-up notes",stats:[["Active Records","342","Patient histories"],["Consultations","86","Today"],["Follow-ups","24","Due this week"],["Prescriptions","71","Issued today"]],columns:["Record","Patient","Diagnosis","Treatment","Follow-up"],rows:[["MR-1001","Rahul Sharma","Hypertension","Medication + Diet","12 Oct"],["MR-1002","Priya Malhotra","Migraine","Medication + Review","10 Oct"],["MR-1003","Aarav Singh","Respiratory distress","ICU Monitoring","Daily"],["MR-1004","Neha Gupta","Fracture","Physiotherapy","15 Oct"]],actions:["New Medical Record","Prescription","Clinical History"]},
  laboratory:{title:"Laboratory",eyebrow:"DIAGNOSTICS",icon:"test-tube-2",subtitle:"Test requests, sample tracking, priority and result workflow",stats:[["Tests Today","64","Requests"],["Samples","52","Collected"],["Processing","14","In laboratory"],["Critical Alerts","2","Review now"]],columns:["Lab ID","Patient","Test","Priority","Result / Status"],rows:[["LAB-401","Rahul Sharma","CBC","Routine","Processing"],["LAB-402","Priya Malhotra","Lipid Profile","Routine","Ready"],["LAB-403","Aarav Singh","ABG","Urgent","Critical Review"],["LAB-404","Neha Gupta","Vitamin D","Routine","Collected"]],actions:["New Test","Result Entry","Download Lab Report"]},
  radiology:{title:"Radiology & Imaging",eyebrow:"IMAGING SERVICES",icon:"scan-line",subtitle:"X-Ray, CT, MRI, ultrasound and imaging workflow",stats:[["Studies Today","38","Scheduled"],["Completed","29","Reported"],["In Queue","7","Waiting"],["Urgent","2","Priority cases"]],columns:["Study ID","Patient","Modality","Slot","Status"],rows:[["RAD-201","Rahul Sharma","Chest X-Ray","10:15 AM","Reported"],["RAD-202","Priya Malhotra","MRI Brain","11:30 AM","Scheduled"],["RAD-203","Aarav Singh","CT Chest","12:15 PM","Urgent"],["RAD-204","Neha Gupta","Ultrasound","01:00 PM","In Queue"]],actions:["Schedule Scan","Report Viewer","Imaging Summary"]},
  pharmacy:{title:"Pharmacy & Medicine Stock",eyebrow:"MEDICATION SERVICES",icon:"pill",subtitle:"Medicine inventory, batches, expiry and dispensing status",stats:[["Medicines","428","Catalog items"],["Low Stock","18","Reorder needed"],["Expiring Soon","9","Within 30 days"],["Issued Today","146","Dispensed"]],columns:["Medicine","Batch","Stock","Expiry","Status"],rows:[["Amlodipine 5mg","AM-2604","182","Apr 2027","In Stock"],["Ceftriaxone 1g","CF-2611","24","Nov 2026","Low Stock"],["Paracetamol 500mg","PC-2608","540","Aug 2027","In Stock"],["Insulin Glargine","IG-2602","12","Oct 2026","Reorder"]],actions:["Add Medicine","Dispense","Inventory Report"]},
  dietary:{title:"Dietary & Nutrition",eyebrow:"PATIENT WELLNESS",icon:"utensils",subtitle:"Breakfast, lunch, dinner and therapeutic diet planning",stats:[["Meals Today","312","Planned meals"],["Therapeutic Diets","86","Patient plans"],["Special Diets","24","Active"],["Hygiene Checks","100%","Compliant"]],columns:["Patient / Ward","Breakfast","Lunch","Dinner","Diet Plan"],rows:[["Ward A • PT-001","Low Salt","Cardiac","Low Salt","Cardiac Diet"],["Ward B • PT-014","Regular","Diabetic","Diabetic","Diabetic Diet"],["ICU • PT-027","NPO","NPO","NPO","Critical Care"],["Private • PT-031","High Protein","Balanced","High Protein","Recovery Diet"]],actions:["Create Diet Plan","Meal Schedule","Nutrition Report"]}
};

const EXTRA_PREMIUM_MODULES = {
  frontdesk:{title:"Front Desk & Reception",eyebrow:"PATIENT SERVICES",icon:"concierge-bell",subtitle:"Registration, visitor support, token management and reception operations",stats:[["Tokens Today","126","Patients served"],["Waiting","14","Current queue"],["Registrations","32","New today"],["Visitors","58","Logged today"]],columns:["Token","Patient / Visitor","Service","Desk","Status"],rows:[["TK-101","Rahul Sharma","Registration","Desk 01","Completed"],["TK-102","Priya Malhotra","Appointment","Desk 02","Waiting"],["TK-103","Aarav Singh","Admission","Desk 01","In Service"],["TK-104","Family Visitor","Visitor Pass","Desk 03","Completed"]],actions:["New Registration","Token Queue","Front Desk Report"]},
  finance:{title:"Finance & Accounts",eyebrow:"FINANCIAL CONTROL",icon:"indian-rupee",subtitle:"Revenue, collections, expenses, payments and hospital financial control",stats:[["Gross Revenue","₹12.8L","This month"],["Collected","₹10.6L","Paid invoices"],["Pending","₹2.2L","Outstanding"],["Expenses","₹4.1L","This month"]],columns:["Reference","Party / Patient","Category","Amount","Status"],rows:[["INV-1042","Rahul Sharma","Consultation","₹4,500","Paid"],["INV-1043","Priya Malhotra","Diagnostics","₹7,800","Pending"],["EXP-2201","MedSupply Co.","Supplies","₹82,000","Paid"],["INV-1044","Aarav Singh","ICU Services","₹24,600","Pending"]],actions:["Create Invoice","Record Payment","Finance Report"]},
  staff:{title:"Staff & Human Resources",eyebrow:"PEOPLE OPERATIONS",icon:"users-round",subtitle:"Hospital workforce, roles, attendance, shifts and staff directory",stats:[["Total Staff","186","Hospital workforce"],["On Duty","124","Current shift"],["Leave Today","9","Approved leave"],["Open Roles","7","Recruitment"]],columns:["Staff ID","Employee","Department","Shift","Status"],rows:[["ST-001","Anita Verma","Nursing","Morning","On Duty"],["ST-018","Rajiv Kapoor","Supervisors","Morning","On Duty"],["ST-034","Meena Joshi","Laboratory","Evening","Available"],["ST-052","Pooja Sharma","Front Desk","Morning","On Leave"]],actions:["Add Staff","Attendance","Staff Report"]},
  inventory:{title:"Inventory & Supplies",eyebrow:"SUPPLY CHAIN",icon:"boxes",subtitle:"Medical supplies, equipment, stock levels, purchase orders and vendors",stats:[["Stock Items","1,284","Catalog"],["Low Stock","23","Reorder needed"],["Purchase Orders","18","Open orders"],["Vendors","42","Active vendors"]],columns:["Item","Category","Stock","Reorder Level","Status"],rows:[["Surgical Gloves","Consumables","420 boxes","100","In Stock"],["IV Cannula 20G","Consumables","68 packs","80","Low Stock"],["ECG Electrodes","Diagnostics","214 packs","60","In Stock"],["Oxygen Mask","Emergency","34 packs","40","Reorder"]],actions:["Add Item","Purchase Order","Inventory Report"]},
  emergency:{title:"Emergency Department",eyebrow:"24×7 EMERGENCY CARE",icon:"siren",subtitle:"Emergency arrivals, triage, priority cases, beds and response teams",stats:[["Patients Today","47","Emergency arrivals"],["Critical","6","Immediate care"],["Waiting","8","Triage queue"],["Beds Ready","11","Emergency beds"]],columns:["Case ID","Patient","Triage","Assigned Area","Status"],rows:[["ER-501","Patient A","Critical","Resuscitation","Active"],["ER-502","Patient B","Urgent","Observation","Waiting"],["ER-503","Patient C","Moderate","Treatment Bay","Active"],["ER-504","Patient D","Routine","Fast Track","Completed"]],actions:["New Emergency Case","Triage Queue","Emergency Report"]}
};
Object.assign(PREMIUM_MODULES, EXTRA_PREMIUM_MODULES);

function injectPremiumModules(){
  const anchor=document.getElementById("reports");
  if(!anchor || document.getElementById("nursing")) return;
  Object.keys(PREMIUM_MODULES).forEach(key=>{
    const d=document.createElement("div"); d.className="page premium-module-page"; d.id=key; d.hidden=false;
    d.innerHTML=`<div class="premium-module-wrap" id="${key}ModuleContent"></div>`;
    anchor.parentNode.insertBefore(d,anchor);
  });
}

function premiumStorageKey(key){ return 'medcare_premium_records_' + key; }

function getPremiumRows(key){
  const cfg=PREMIUM_MODULES[key];
  if(!cfg) return [];
  try{
    const saved=JSON.parse(localStorage.getItem(premiumStorageKey(key))||'null');
    return Array.isArray(saved) ? saved : cfg.rows.map(r=>[...r]);
  }catch(e){ return cfg.rows.map(r=>[...r]); }
}

function savePremiumRows(key,rows){
  localStorage.setItem(premiumStorageKey(key),JSON.stringify(rows));
}

function ensurePremiumModal(){
  if(document.getElementById('premiumCrudModal')) return;
  const d=document.createElement('div');
  d.id='premiumCrudModal';
  d.className='premium-modal';
  d.hidden=true;
  d.innerHTML=`<div class="premium-modal-backdrop" onclick="closePremiumModal()"></div>
    <div class="premium-modal-dialog" role="dialog" aria-modal="true">
      <div class="premium-modal-head"><div><span class="premium-eyebrow" id="premiumModalEyebrow">MEDCARE HMS</span><h3 id="premiumModalTitle">Add Record</h3></div><button class="premium-icon-btn" onclick="closePremiumModal()" aria-label="Close"><i data-lucide="x"></i></button></div>
      <form id="premiumCrudForm" onsubmit="submitPremiumForm(event)"><div id="premiumFormFields" class="premium-form-grid"></div><div class="premium-modal-foot"><button type="button" class="btn btn-light" onclick="closePremiumModal()">Cancel</button><button type="submit" class="btn btn-primary" id="premiumSubmitBtn">Save Record</button></div></form>
    </div>`;
  document.body.appendChild(d);
  if(window.lucide) lucide.createIcons();
}

let premiumCrudState={key:null,index:-1,mode:'add'};

function openPremiumModal(key,index=-1,mode='add'){
  const cfg=PREMIUM_MODULES[key]; if(!cfg) return;
  ensurePremiumModal();
  premiumCrudState={key,index,mode};
  const modal=document.getElementById('premiumCrudModal');
  const rows=getPremiumRows(key);
  const row=index>=0 ? rows[index] : [];
  document.getElementById('premiumModalEyebrow').textContent=cfg.eyebrow;
  document.getElementById('premiumModalTitle').textContent=mode==='view'?'Record Details':(mode==='edit'?'Edit '+cfg.title:'Add '+cfg.title);
  document.getElementById('premiumSubmitBtn').textContent=mode==='edit'?'Update Record':'Save Record';
  document.getElementById('premiumSubmitBtn').style.display=mode==='view'?'none':'';
  document.getElementById('premiumFormFields').innerHTML=cfg.columns.map((c,i)=>{
    const value=row[i] ?? '';
    const readonly=mode==='view'?'readonly':'';
    return `<label class="premium-field"><span>${escapeHTML(c)}</span><input name="field_${i}" value="${escapeAttribute(value)}" ${readonly} placeholder="Enter ${escapeAttribute(c)}" required></label>`;
  }).join('');
  modal.hidden=false; document.body.classList.add('modal-open');
  if(window.lucide) lucide.createIcons();
  const first=modal.querySelector('input'); if(first && mode!=='view') setTimeout(()=>first.focus(),50);
}

function closePremiumModal(){
  const modal=document.getElementById('premiumCrudModal'); if(modal) modal.hidden=true;
  document.body.classList.remove('modal-open');
}

function submitPremiumForm(e){
  e.preventDefault();
  const {key,index,mode}=premiumCrudState; if(!key || mode==='view') return;
  const cfg=PREMIUM_MODULES[key];
  const rows=getPremiumRows(key);
  const row=cfg.columns.map((_,i)=>e.target.querySelector(`[name="field_${i}"]`)?.value.trim()||'');
  if(mode==='edit' && index>=0) rows[index]=row; else rows.push(row);
  savePremiumRows(key,rows); closePremiumModal(); loadPremiumModule(key);
  if(typeof showToast==='function') showToast(mode==='edit'?'Record updated successfully':'Record added successfully');
}

function deletePremiumRecord(key,index){
  const cfg=PREMIUM_MODULES[key]; if(!cfg) return;
  const rows=getPremiumRows(key);
  if(index<0 || index>=rows.length) return;
  const label=rows[index][1] || rows[index][0] || 'this record';
  if(!confirm(`Delete ${label}? This action cannot be undone.`)) return;
  rows.splice(index,1); savePremiumRows(key,rows); loadPremiumModule(key);
  if(typeof showToast==='function') showToast('Record deleted successfully');
}

function downloadPremiumModule(key){
  const cfg=PREMIUM_MODULES[key], rows=getPremiumRows(key); if(!cfg) return;
  const csv=[cfg.columns,...rows].map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'}), a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=cfg.title.replace(/[^a-z0-9]+/gi,'_').toLowerCase()+'.csv'; a.click(); URL.revokeObjectURL(a.href);
  if(typeof showToast==='function') showToast('Report downloaded');
}

function premiumFocusMarkup(key,cfg,rows){
  const focus={
    nursing:{label:'NURSING STATION',title:'Shift & Patient-Care Overview',icon:'heart-handshake',items:[['Morning Shift','18 nurses','On duty'],['Evening Shift','10 nurses','Coverage 94%'],['Night Shift','4 nurses','Ready'],['Priority Care','6 patients','Close monitoring']]},
    icu:{label:'ICU COMMAND CENTER',title:'Critical Care Focus',icon:'activity',items:[['Critical','7 patients','Immediate attention'],['Serious','9 patients','Close monitoring'],['Stable','6 patients','Routine monitoring'],['Beds Ready','12 beds','Available']]},
    supervisors:{label:'SUPERVISOR DESK',title:'Hospital Operations Focus',icon:'user-cog',items:[['On Duty','8 supervisors','Current shift'],['Clinical Units','10 units','Covered'],['Escalations','3 cases','Open today'],['Handover','100%','Completed']]},
    admissions:{label:'PATIENT FLOW',title:'Admission & Discharge Focus',icon:'clipboard-check',items:[['New Admissions','18','Today'],['Discharges','11','Completed'],['Transfers','6','In progress'],['Bed Requests','9','Waiting']]},
    rooms:{label:'BED CONTROL',title:'Room & Bed Occupancy',icon:'bed-double',items:[['Occupied','126 beds','70% occupancy'],['Available','54 beds','Ready'],['Cleaning','8 beds','Turnaround'],['ICU','12 beds','Available / monitored']]},
    treatment:{label:'MEDICAL RECORDS',title:'Clinical Documentation Focus',icon:'clipboard-plus',items:[['Active Records','342','Patient histories'],['Today Consults','86','Consultations'],['Prescriptions','71','Issued today'],['Follow-ups','24','Due this week']]},
    laboratory:{label:'LAB CONTROL',title:'Diagnostics Workflow',icon:'test-tube-2',items:[['Requests','64','Today'],['Collected','52','Samples'],['Processing','14','In laboratory'],['Critical','2','Review now']]},
    radiology:{label:'IMAGING CONTROL',title:'Radiology & Imaging Focus',icon:'scan-line',items:[['Scheduled','38','Studies today'],['Reported','29','Completed'],['Queue','7','Waiting'],['Urgent','2','Priority']]},
    pharmacy:{label:'PHARMACY CONTROL',title:'Medicine Stock Focus',icon:'pill',items:[['Catalog','428','Medicines'],['Low Stock','18','Reorder'],['Expiring','9','Within 30 days'],['Issued','146','Today']]},
    dietary:{label:'DIETARY DESK',title:'Nutrition & Meal Planning',icon:'utensils',items:[['Meals','312','Today'],['Therapeutic','86','Patient plans'],['Special Diets','24','Active'],['Hygiene','100%','Compliant']]},
    frontdesk:{label:'RECEPTION DESK',title:'Queue & Patient Services',icon:'concierge-bell',items:[['Tokens','126','Served today'],['Waiting','14','Current queue'],['Registrations','32','New today'],['Visitors','58','Logged today']]},
    finance:{label:'FINANCE CONTROL',title:'Revenue & Collections Focus',icon:'indian-rupee',items:[['Gross Revenue','₹12.8L','This month'],['Collected','₹10.6L','Paid invoices'],['Pending','₹2.2L','Outstanding'],['Expenses','₹4.1L','This month']]},
    staff:{label:'HR CONTROL',title:'People & Workforce Focus',icon:'users-round',items:[['Total Staff','186','Workforce'],['On Duty','124','Current shift'],['Leave','9','Today'],['Open Roles','7','Recruitment']]},
    inventory:{label:'SUPPLY CONTROL',title:'Inventory & Procurement Focus',icon:'boxes',items:[['Stock Items','1,284','Catalog'],['Low Stock','23','Reorder'],['Purchase Orders','18','Open'],['Vendors','42','Active']]},
    emergency:{label:'EMERGENCY COMMAND',title:'24×7 Triage & Response Focus',icon:'siren',items:[['Arrivals','47','Today'],['Critical','6','Immediate care'],['Waiting','8','Triage queue'],['Beds Ready','11','Emergency beds'] ]}
  }[key];
  if(!focus) return '';
  return `<section class="premium-focus premium-focus-${key}">
    <div class="premium-focus-head"><div class="premium-focus-title"><span class="premium-focus-kicker"><i data-lucide="${focus.icon}"></i>${focus.label}</span><h3>${focus.title}</h3><p>Live-style operational snapshot for presentation and day-to-day hospital workflow.</p></div><div class="premium-focus-badge"><i data-lucide="shield-check"></i> Premium Workspace</div></div>
    <div class="premium-focus-grid">${focus.items.map((x,i)=>`<div class="premium-focus-card"><span>${x[0]}</span><strong>${x[1]}</strong><small>${x[2]}</small><div class="focus-line"><i style="width:${[86,72,58,94][i%4]}%"></i></div></div>`).join('')}</div>
  </section>`;
}

function premiumVisualMarkup(key){
  if(key==='rooms') return `<div class="premium-visual-panel"><div class="visual-panel-head"><div><span>WARD MAP</span><h3>Bed Occupancy Board</h3></div><div class="legend"><b class="occupied"></b> Occupied <b class="ready"></b> Available <b class="cleaning"></b> Cleaning</div></div><div class="bed-grid">${['104-A','104-B','105-A','105-B','106-A','106-B','208-A','208-B','209-A','209-B','ICU-04','ICU-05'].map((b,i)=>`<div class="bed-card ${i%5===3?'ready':i%7===0?'cleaning':'occupied'}"><i data-lucide="bed-double"></i><strong>${b}</strong><small>${i%5===3?'Available':i%7===0?'Cleaning':'Occupied'}</small></div>`).join('')}</div></div>`;
  if(key==='icu') return `<div class="premium-visual-panel icu-monitor-panel"><div class="visual-panel-head"><div><span>CRITICAL CARE MONITOR</span><h3>ICU Bed Monitoring</h3></div><span class="live-dot">● LIVE MONITORING</span></div><div class="icu-bed-grid">${[['ICU-01','Critical','SpO₂ 88%','HR 118'],['ICU-04','Serious','SpO₂ 94%','HR 102'],['ICU-09','Stable','SpO₂ 97%','HR 82'],['ICU-14','Available','Ready','No patient']].map(x=>`<div class="icu-bed-card"><div class="icu-bed-top"><strong>${x[0]}</strong><span class="icu-state ${x[1].toLowerCase()}">${x[1]}</span></div><div class="monitor-wave"></div><div class="icu-vitals"><span>${x[2]}</span><span>${x[3]}</span></div></div>`).join('')}</div></div>`;
  if(key==='frontdesk') return `<div class="premium-visual-panel queue-panel"><div class="visual-panel-head"><div><span>RECEPTION QUEUE</span><h3>Token & Seating Board</h3></div><span class="queue-now">Now Serving <strong>TK-102</strong></span></div><div class="queue-layout"><div class="token-card"><small>NOW SERVING</small><strong>TK-102</strong><span>Appointment Desk 02</span></div><div class="seat-grid">${['S01','S02','S03','S04','S05','S06','S07','S08'].map((s,i)=>`<div class="seat ${i<5?'waiting':'free'}"><i data-lucide="armchair"></i><span>${s}</span><small>${i<5?'Waiting':'Free'}</small></div>`).join('')}</div></div></div>`;
  if(key==='nursing') return `<div class="premium-visual-panel"><div class="visual-panel-head"><div><span>NURSING ROSTER</span><h3>Shift Coverage Board</h3></div><div class="nursing-head-actions"><span class="roster-pill">32 On Duty</span><button class="btn btn-light btn-sm" onclick="printNursingReport()"><i data-lucide="file-text"></i> Nursing Report</button></div></div><div class="shift-grid">${[['Morning','18','Ward A • ICU'],['Evening','10','Ward B • Emergency'],['Night','4','ICU • Observation']].map((x,i)=>`<div class="shift-card"><div class="shift-icon"><i data-lucide="${i===0?'sun':i===1?'sunset':'moon'}"></i></div><div><strong>${x[0]} Shift</strong><span>${x[1]} nurses</span><small>${x[2]}</small></div><b>Coverage</b></div>`).join('')}</div></div>`;
  return '';
}

function loadPremiumModule(key){
  const cfg=PREMIUM_MODULES[key], target=document.getElementById(key+'ModuleContent');
  if(!cfg||!target) return;
  ensurePremiumModal();
  const rows=getPremiumRows(key);
  target.innerHTML=`<div class="premium-module-shell premium-shell-${key}">
  <div class="premium-module-hero premium-hero-large"><div class="premium-hero-copy"><span class="premium-eyebrow"><i data-lucide="sparkles"></i>${cfg.eyebrow}</span><h2><span class="premium-title-icon"><i data-lucide="${cfg.icon}"></i></span>${cfg.title}</h2><p>${cfg.subtitle}</p><div class="premium-hero-meta"><span><i data-lucide="activity"></i> Hospital Operations</span><span><i data-lucide="clock-3"></i> Live-style Workspace</span><span><i data-lucide="badge-check"></i> Presentation Ready</span></div></div><div class="premium-module-actions"><button class="btn btn-primary premium-main-action" onclick="openPremiumModal('${key}',-1,'add')"><i data-lucide="plus"></i>Add New Record</button><button class="btn btn-light" onclick="downloadPremiumModule('${key}')"><i data-lucide="download"></i>Export Report</button></div></div>
  <div class="premium-stat-grid premium-stat-grid-large">${cfg.stats.map((x,i)=>`<div class="premium-stat premium-stat-large"><div class="premium-stat-icon"><i data-lucide="${['bar-chart-3','activity','clipboard-check','trending-up'][i%4]}"></i></div><div><span>${x[0]}</span><strong>${i===0&&rows.length!==cfg.rows.length?rows.length:x[1]}</strong><small>${x[2]}</small></div></div>`).join('')}</div>
  ${premiumFocusMarkup(key,cfg,rows)}
  ${premiumVisualMarkup(key)}
  <div class="premium-content-card premium-directory-card"><div class="premium-card-head premium-card-head-large"><div><span class="premium-eyebrow">${cfg.eyebrow}</span><h3>${cfg.title} Directory</h3><small class="premium-record-count">${rows.length} records • Search, filter, view, edit and delete</small></div><div class="premium-tools"><div class="premium-search premium-search-large"><i data-lucide="search"></i><input placeholder="Search ${cfg.title}..." oninput="filterPremiumTable(this,'${key}Table')"></div><select class="premium-filter premium-filter-large" onchange="filterPremiumStatus(this,'${key}Table')"><option value="">All Status</option><option value="active">Active</option><option value="on duty">On Duty</option><option value="available">Available</option><option value="pending">Pending</option><option value="waiting">Waiting</option><option value="completed">Completed</option><option value="in stock">In Stock</option><option value="low stock">Low Stock</option><option value="critical">Critical</option></select></div></div><div class="table-wrap premium-table-wrap"><table id="${key}Table"><thead><tr>${cfg.columns.map(c=>`<th>${escapeHTML(c)}</th>`).join('')}<th>Actions</th></tr></thead><tbody>${rows.map((row,ri)=>`<tr data-row-index="${ri}">${row.map((v,i)=>`<td>${i===row.length-1?`<span class="premium-status ${String(v).toLowerCase().replace(/[^a-z]+/g,'-')}">${escapeHTML(v)}</span>`:escapeHTML(v)}</td>`).join('')}<td><div class="row-actions"><button class="premium-row-btn view" title="View record" onclick="openPremiumModal('${key}',${ri},'view')"><i data-lucide="eye"></i></button><button class="premium-row-btn edit" title="Edit record" onclick="openPremiumModal('${key}',${ri},'edit')"><i data-lucide="pencil"></i></button><button class="premium-row-btn delete" title="Delete record" onclick="deletePremiumRecord('${key}',${ri})"><i data-lucide="trash-2"></i></button></div></td></tr>`).join('')}</tbody></table></div></div></div>`;
  if(window.lucide) lucide.createIcons();
}

function filterPremiumTable(input,id){
  const q=input.value.toLowerCase();
  document.querySelectorAll('#'+id+' tbody tr').forEach(tr=>{ const status=tr.querySelector('.premium-status')?.innerText.toLowerCase()||''; const match=tr.innerText.toLowerCase().includes(q); const activeFilter=tr.dataset.statusFilter; tr.style.display=match && (!activeFilter || status.includes(activeFilter))?'':'none'; });
}
function filterPremiumStatus(select,id){
  const value=select.value.toLowerCase();
  document.querySelectorAll('#'+id+' tbody tr').forEach(tr=>{tr.dataset.statusFilter=value; const text=tr.innerText.toLowerCase(); const q=document.querySelector('#'+id)?.closest('.premium-content-card')?.querySelector('.premium-search input')?.value.toLowerCase()||''; tr.style.display=text.includes(q)&&(!value || text.includes(value))?'':'none';});
}
function premiumAction(key,action){
  if(action.toLowerCase().includes('download')||action.toLowerCase().includes('report')) return downloadPremiumModule(key);
  if(action.toLowerCase().includes('add')||action.toLowerCase().includes('new')||action.toLowerCase().includes('registration')||action.toLowerCase().includes('admission')||action.toLowerCase().includes('test')||action.toLowerCase().includes('medicine')||action.toLowerCase().includes('staff')||action.toLowerCase().includes('item')||action.toLowerCase().includes('invoice')||action.toLowerCase().includes('case')) return openPremiumModal(key,-1,'add');
  const rows=getPremiumRows(key); if(rows.length) return openPremiumModal(key,0,'view');
  if(typeof showToast==='function') showToast(`${action} opened for ${PREMIUM_MODULES[key].title}`);
}


/* =========================================================
   MEDCARE HMS — PRESENTATION PRO MODULE UI
   Keeps the original data/CRUD system, but gives each
   operational module a realistic, visual hospital layout.
========================================================= */
(function(){
  const basePremiumModuleLoader = window.loadPremiumModule;

  const moduleMeta = {
    nursing: {
      desc:"Nursing station, staff roster, shift coverage and patient-care responsibilities.",
      tabs:["Overview","Duty Roster","Shift Coverage"]
    },
    icu: {
      desc:"ICU bed board, critical-care monitoring and assigned clinical teams.",
      tabs:["ICU Overview","Bed Board","Monitoring"]
    },
    rooms: {
      desc:"Ward, room and bed management with clear occupancy and housekeeping status.",
      tabs:["Bed Board","Rooms","Housekeeping"]
    },
    admissions: {
      desc:"Admission, transfer and discharge workflow with patient-flow visibility.",
      tabs:["Today's Census","Admissions","Discharges"]
    },
    treatment: {
      desc:"Patient medical history, diagnosis, treatment plan, medicines and follow-up.",
      tabs:["Clinical Records","Today's Visits","Follow-ups"]
    },
    laboratory: {
      desc:"Laboratory test requests, sample collection, processing and result status.",
      tabs:["Lab Queue","Samples","Results"]
    },
    radiology: {
      desc:"Imaging workflow for X-Ray, CT, MRI and ultrasound studies.",
      tabs:["Imaging Queue","Schedule","Reports"]
    },
    pharmacy: {
      desc:"Medicine inventory, batch/expiry tracking and dispensing workflow.",
      tabs:["Stock","Dispensing","Expiry Alerts"]
    },
    dietary: {
      desc:"Patient diet plans, meal schedules and therapeutic nutrition management.",
      tabs:["Meal Board","Diet Plans","Kitchen"]
    },
    frontdesk: {
      desc:"Reception desk, patient registration, tokens, visitors and service queue.",
      tabs:["Live Queue","Registration","Visitors"]
    },
    finance: {
      desc:"Hospital collections, invoices, expenses and payment tracking.",
      tabs:["Financial Overview","Invoices","Payments"]
    },
    staff: {
      desc:"Employee directory, attendance, shifts, leave and workforce overview.",
      tabs:["Staff Directory","Attendance","Shifts"]
    },
    inventory: {
      desc:"Medical supplies, equipment, stock levels, vendors and purchase orders.",
      tabs:["Stock Room","Low Stock","Purchase Orders"]
    },
    emergency: {
      desc:"Emergency arrivals, triage priority, treatment areas and available beds.",
      tabs:["Triage Board","Emergency Beds","Response Team"]
    }
  };

  function esc(v){
    return String(v ?? "").replace(/[&<>"']/g, s => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[s]));
  }

  function statusClass(v){
    const s=String(v||"").toLowerCase();
    if(s.includes("critical")||s.includes("urgent")||s.includes("low stock")||s.includes("reorder")||s.includes("waiting")||s.includes("pending")) return "danger";
    if(s.includes("processing")||s.includes("in service")||s.includes("on call")||s.includes("cleaning")||s.includes("scheduled")) return "warn";
    if(s.includes("available")||s.includes("ready")||s.includes("reported")||s.includes("paid")||s.includes("completed")||s.includes("active")||s.includes("on duty")||s.includes("in stock")) return "good";
    return "neutral";
  }

  function iconFor(key){
    const m={
      nursing:"heart-pulse",icu:"activity",rooms:"bed-double",admissions:"clipboard-check",
      treatment:"file-heart",laboratory:"test-tube-2",radiology:"scan-line",pharmacy:"pill",
      dietary:"utensils",frontdesk:"concierge-bell",finance:"indian-rupee",staff:"users-round",
      inventory:"boxes",emergency:"siren"
    };
    return m[key]||"hospital";
  }

  function roomCards(rows){
    return rows.map((r,i)=>{
      const occupied=String(r[4]||"").toLowerCase().includes("occupied");
      const cleaning=String(r[4]||"").toLowerCase().includes("clean");
      return `<div class="hc-bed-card ${occupied?"occupied":cleaning?"cleaning":"available"}">
        <div class="hc-bed-top"><span class="hc-bed-number">${esc(r[0])}</span><span class="hc-status ${statusClass(r[4])}">${esc(r[4]||"Available")}</span></div>
        <div class="hc-bed-icon"><i data-lucide="bed-double"></i></div>
        <strong>${esc(r[3]||"Available")}</strong>
        <small>${esc(r[1]||"Room")} • Floor ${esc(r[2]||"—")}</small>
        <div class="hc-bed-actions">
          <button onclick="openPremiumModal('rooms',${i},'view')">View</button>
          <button onclick="openPremiumModal('rooms',${i},'edit')">Edit</button>
        </div>
      </div>`;
    }).join("");
  }

  function icuCards(rows){
    return rows.map((r,i)=>{
      const sev=String(r[2]||"").toLowerCase();
      const cls=sev.includes("critical")?"critical":sev.includes("serious")?"serious":"stable";
      return `<div class="hc-icu-card ${cls}">
        <div class="hc-icu-head"><span>${esc(r[0])}</span><span class="hc-status ${statusClass(r[2])}">${esc(r[2]||"Stable")}</span></div>
        <div class="hc-icu-patient"><div class="hc-pulse"><i data-lucide="activity"></i></div><div><strong>${esc(r[1])}</strong><small>${esc(r[4]||"No team assigned")}</small></div></div>
        <div class="hc-vitals"><span><b>ECG</b> <em>Normal</em></span><span><b>SpO₂</b> <em>98%</em></span><span><b>BP</b> <em>120/80</em></span></div>
        <button class="hc-full-btn" onclick="openPremiumModal('icu',${i},'view')">Open Patient Monitor</button>
      </div>`;
    }).join("");
  }

  function nursingCards(rows){
    return rows.map((r,i)=>`<div class="hc-nurse-card">
      <div class="hc-avatar"><i data-lucide="user-round"></i></div>
      <div class="hc-nurse-main"><strong>${esc(r[1])}</strong><span>${esc(r[0])}</span><small>${esc(r[2])} • ${esc(r[3])} Shift</small></div>
      <span class="hc-status ${statusClass(r[4])}">${esc(r[4])}</span>
      <button onclick="openPremiumModal('nursing',${i},'edit')"><i data-lucide="pencil"></i></button>
    </div>`).join("");
  }

  function emergencyCards(rows){
    return rows.map((r,i)=>`<div class="hc-emergency-card ${String(r[2]).toLowerCase()}">
      <div class="hc-emergency-strip"></div>
      <div class="hc-emergency-top"><strong>${esc(r[0])}</strong><span class="hc-status ${statusClass(r[2])}">${esc(r[2])}</span></div>
      <h3>${esc(r[1])}</h3><p><i data-lucide="map-pin"></i>${esc(r[3])}</p>
      <div class="hc-emergency-foot"><span>${esc(r[4])}</span><button onclick="openPremiumModal('emergency',${i},'view')">Open Case</button></div>
    </div>`).join("");
  }

  function genericTable(key,cfg,rows){
    return `<div class="hc-data-card"><div class="hc-table-head"><div><h3>${esc(cfg.title)} Records</h3><p>Manage live records stored in this browser.</p></div><button class="btn btn-primary" onclick="openPremiumModal('${key}',-1,'add')"><i data-lucide="plus"></i>Add Record</button></div>
      <div class="table-responsive"><table class="hc-table"><thead><tr>${cfg.columns.map(c=>`<th>${esc(c)}</th>`).join("")}<th>Action</th></tr></thead><tbody>
      ${rows.map((r,i)=>`<tr>${r.map((v,j)=>`<td>${j===r.length-1?`<span class="hc-status ${statusClass(v)}">${esc(v)}</span>`:esc(v)}</td>`).join("")}<td><div class="hc-row-actions"><button onclick="openPremiumModal('${key}',${i},'view')">View</button><button onclick="openPremiumModal('${key}',${i},'edit')">Edit</button><button class="delete" onclick="deletePremiumRecord('${key}',${i})">Delete</button></div></td></tr>`).join("")}
      </tbody></table></div></div>`;
  }

  function renderSpecial(key,cfg,rows){
    if(key==="rooms") return `<div class="hc-section"><div class="hc-section-title"><div><h3>Hospital Bed Board</h3><p>Clear room-by-room visibility for occupied, available and cleaning beds.</p></div><div class="hc-legend"><span><i class="dot green"></i>Available</span><span><i class="dot red"></i>Occupied</span><span><i class="dot amber"></i>Cleaning</span></div></div><div class="hc-bed-grid">${roomCards(rows)}</div>${genericTable(key,cfg,rows)}</div>`;
    if(key==="icu") return `<div class="hc-section"><div class="hc-section-title"><div><h3>ICU Bed & Patient Monitor</h3><p>Critical-care board with bed status and patient monitoring.</p></div></div><div class="hc-icu-grid">${icuCards(rows)}</div>${genericTable(key,cfg,rows)}</div>`;
    if(key==="nursing") return `<div class="hc-section"><div class="hc-section-title"><div><h3>Today's Nursing Roster</h3><p>See who is on duty, their unit and current shift.</p></div></div><div class="hc-nurse-grid">${nursingCards(rows)}</div>${genericTable(key,cfg,rows)}</div>`;
    if(key==="emergency") return `<div class="hc-section"><div class="hc-section-title"><div><h3>Emergency Triage Board</h3><p>Priority-based emergency cases for quick clinical visibility.</p></div></div><div class="hc-emergency-grid">${emergencyCards(rows)}</div>${genericTable(key,cfg,rows)}</div>`;
    return genericTable(key,cfg,rows);
  }

  window.loadPremiumModule = function(key){
    const cfg=window.PREMIUM_MODULES && PREMIUM_MODULES[key];
    const target=document.getElementById(key+"ModuleContent");
    if(!cfg || !target){ return basePremiumModuleLoader(key); }
    const rows=getPremiumRows(key);
    const meta=moduleMeta[key]||{};
    target.innerHTML=`
      <div class="hc-module-hero">
        <div class="hc-hero-icon"><i data-lucide="${iconFor(key)}"></i></div>
        <div class="hc-hero-copy"><span>${esc(cfg.eyebrow)}</span><h2>${esc(cfg.title)}</h2><p>${esc(meta.desc||cfg.subtitle)}</p></div>
        <div class="hc-hero-actions"><button class="btn btn-primary" onclick="openPremiumModal('${key}',-1,'add')"><i data-lucide="plus"></i>Add New</button><button class="btn btn-light" onclick="downloadPremiumModule('${key}')"><i data-lucide="download"></i>Export</button></div>
      </div>
      <div class="hc-stat-grid">${cfg.stats.map((s,i)=>`<div class="hc-stat-card"><span>${esc(s[0])}</span><strong>${i===0&&rows.length!==cfg.rows.length?rows.length:esc(s[1])}</strong><small>${esc(s[2])}</small></div>`).join("")}</div>
      <div class="hc-tabs">${(meta.tabs||["Overview"]).map((t,i)=>`<button class="${i===0?"active":""}">${esc(t)}</button>`).join("")}</div>
      ${renderSpecial(key,cfg,rows)}
    `;
    if(window.lucide) lucide.createIcons();
  };

  const style=document.createElement("style");
  style.textContent=`
    .hc-module-hero{display:flex;align-items:center;gap:18px;padding:24px;border-radius:22px;background:linear-gradient(135deg,#0b3550,#0f6170);color:#fff;margin-bottom:18px;box-shadow:0 16px 36px rgba(6,42,61,.16)}
    .hc-hero-icon{width:58px;height:58px;border-radius:17px;background:rgba(255,255,255,.15);display:grid;place-items:center}.hc-hero-icon svg{width:29px;height:29px}
    .hc-hero-copy{flex:1}.hc-hero-copy span{font-size:11px;letter-spacing:1.4px;font-weight:800;opacity:.75}.hc-hero-copy h2{margin:4px 0;font-size:27px}.hc-hero-copy p{margin:0;opacity:.82}
    .hc-hero-actions{display:flex;gap:9px}.hc-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:18px 0}.hc-stat-card{background:#fff;border:1px solid #e5edf2;border-radius:17px;padding:18px;box-shadow:0 7px 20px rgba(18,55,73,.05)}.hc-stat-card span,.hc-stat-card small{display:block;color:#6b7d88;font-size:12px}.hc-stat-card strong{display:block;font-size:25px;color:#123a50;margin:7px 0}.hc-tabs{display:flex;gap:8px;margin:8px 0 18px;border-bottom:1px solid #e4ebef}.hc-tabs button{border:0;background:transparent;padding:10px 15px;font-weight:700;color:#6a7b86;border-bottom:2px solid transparent}.hc-tabs button.active{color:#0a6374;border-color:#0a9b91}
    .hc-section{background:#f7fafb;border-radius:20px;padding:18px}.hc-section-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:15px}.hc-section-title h3{margin:0;color:#173f54}.hc-section-title p{margin:4px 0;color:#73828a;font-size:13px}.hc-legend{display:flex;gap:12px;font-size:12px;color:#61727c}.hc-legend span{display:flex;align-items:center;gap:5px}.dot{width:8px;height:8px;border-radius:50%;display:inline-block}.dot.green{background:#20a46a}.dot.red{background:#e15252}.dot.amber{background:#e7a52b}
    .hc-bed-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.hc-bed-card{background:#fff;border-radius:18px;padding:15px;border:1px solid #e4edf1;position:relative;overflow:hidden}.hc-bed-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#20a46a}.hc-bed-card.occupied:before{background:#e15252}.hc-bed-card.cleaning:before{background:#e7a52b}.hc-bed-top{display:flex;justify-content:space-between;align-items:center}.hc-bed-number{font-weight:800;color:#193f52}.hc-bed-icon{height:76px;display:grid;place-items:center;color:#1a8090}.hc-bed-icon svg{width:48px;height:48px}.hc-bed-card strong,.hc-bed-card small{display:block}.hc-bed-card small{color:#788993;margin-top:4px}.hc-bed-actions{display:flex;gap:6px;margin-top:12px}.hc-bed-actions button,.hc-row-actions button,.hc-emergency-foot button{border:1px solid #dce6eb;background:#fff;border-radius:8px;padding:6px 9px;font-size:11px;font-weight:700}.hc-bed-actions button:hover,.hc-row-actions button:hover{background:#eef7f8}
    .hc-icu-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.hc-icu-card{background:#fff;border:1px solid #e4edf1;border-radius:18px;padding:15px;box-shadow:0 7px 18px rgba(18,55,73,.04)}.hc-icu-card.critical{border-top:4px solid #e15252}.hc-icu-card.serious{border-top:4px solid #e7a52b}.hc-icu-card.stable{border-top:4px solid #20a46a}.hc-icu-head{display:flex;justify-content:space-between;font-weight:800}.hc-icu-patient{display:flex;gap:10px;align-items:center;margin:16px 0}.hc-pulse{width:42px;height:42px;border-radius:12px;background:#edf8f8;display:grid;place-items:center;color:#0b8c8d}.hc-icu-patient strong,.hc-icu-patient small{display:block}.hc-icu-patient small{color:#788993;margin-top:3px}.hc-vitals{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px}.hc-vitals span{background:#f5f8fa;padding:8px;border-radius:9px;font-size:10px}.hc-vitals b,.hc-vitals em{display:block}.hc-vitals em{font-style:normal;color:#1d8b67;margin-top:2px}.hc-full-btn{width:100%;margin-top:12px;border:0;background:#edf6f7;border-radius:9px;padding:9px;font-weight:800;color:#11636f}
    .hc-nurse-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:18px}.hc-nurse-card{display:flex;align-items:center;gap:11px;background:#fff;border:1px solid #e4edf1;border-radius:15px;padding:12px}.hc-avatar{width:42px;height:42px;border-radius:50%;background:#e9f5f6;display:grid;place-items:center;color:#0a7d88}.hc-nurse-main{flex:1}.hc-nurse-main strong,.hc-nurse-main span,.hc-nurse-main small{display:block}.hc-nurse-main span,.hc-nurse-main small{font-size:11px;color:#778690}.hc-nurse-card>button{border:0;background:#f0f6f8;border-radius:8px;padding:8px;color:#4c6875}
    .hc-emergency-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.hc-emergency-card{background:#fff;border-radius:18px;border:1px solid #e5edf1;overflow:hidden}.hc-emergency-strip{height:5px;background:#20a46a}.hc-emergency-card.critical .hc-emergency-strip{background:#e15252}.hc-emergency-card.urgent .hc-emergency-strip{background:#e7a52b}.hc-emergency-card.moderate .hc-emergency-strip{background:#3f8fbd}.hc-emergency-card.routine .hc-emergency-strip{background:#20a46a}.hc-emergency-top,.hc-emergency-card h3,.hc-emergency-card p{margin:14px 15px}.hc-emergency-top{display:flex;justify-content:space-between}.hc-emergency-card h3{margin-top:8px;margin-bottom:4px}.hc-emergency-card p{color:#73838c;font-size:12px;display:flex;gap:5px;align-items:center}.hc-emergency-foot{display:flex;justify-content:space-between;align-items:center;padding:12px 15px;background:#f7fafb;color:#667781;font-size:12px}
    .hc-data-card{background:#fff;border:1px solid #e2ebef;border-radius:18px;overflow:hidden}.hc-table-head{display:flex;justify-content:space-between;align-items:center;padding:17px 18px;border-bottom:1px solid #e7eef1}.hc-table-head h3{margin:0}.hc-table-head p{margin:3px 0 0;color:#788993;font-size:12px}.hc-table{width:100%;border-collapse:collapse}.hc-table th{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#70818b;background:#f7fafb;text-align:left;padding:11px 14px}.hc-table td{padding:12px 14px;border-top:1px solid #edf1f3;font-size:12px;color:#344f5c}.hc-row-actions{display:flex;gap:5px}.hc-row-actions .delete{color:#c34b4b}.hc-status{display:inline-flex;align-items:center;padding:5px 8px;border-radius:999px;font-size:10px;font-weight:800;background:#eef2f4;color:#66757d}.hc-status.good{background:#e6f7ee;color:#168053}.hc-status.danger{background:#fdeaea;color:#c74444}.hc-status.warn{background:#fff4df;color:#ae7518}.hc-status.neutral{background:#edf2f5;color:#5e707a}
    @media(max-width:1100px){.hc-bed-grid,.hc-icu-grid,.hc-emergency-grid{grid-template-columns:repeat(2,1fr)}.hc-stat-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:700px){.hc-module-hero{flex-wrap:wrap}.hc-hero-actions{width:100%}.hc-bed-grid,.hc-icu-grid,.hc-emergency-grid,.hc-nurse-grid{grid-template-columns:1fr}.hc-stat-grid{grid-template-columns:1fr 1fr}.hc-table{min-width:760px}}
  `;
  document.head.appendChild(style);
})();


/* =========================================================
   MEDCARE VISUAL POLISH V2
   Keeps the original data/features and improves presentation.
========================================================= */
(function(){
  function mapUrl(s){
    if(s.mapLink && /^https?:\/\//i.test(s.mapLink)) return s.mapLink;
    return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([s.hospitalName,s.address,s.city,s.state,s.country].filter(Boolean).join(', '));
  }
  const originalLoadSettings = window.loadSettings;
  window.loadSettings = function(){
    originalLoadSettings();
    setTimeout(function(){
      const s=getSettings();
      const panel=document.getElementById('locationSetting');
      if(!panel || panel.querySelector('.location-showcase')) return;
      const city=[s.city,s.state].filter(Boolean).join(', ');
      panel.insertAdjacentHTML('beforeend',`<div class="location-showcase">
        <div class="location-map"><div class="location-pin"><i data-lucide="map-pin"></i></div></div>
        <div class="location-info-card">
          <h3 style="margin:0 0 5px;color:#21495a">Hospital Location</h3>
          <p style="margin:0 0 12px;color:#7a8e98;font-size:12px">A clear location profile for hospital administration and reports.</p>
          <div class="loc-row"><i data-lucide="hospital"></i><div><strong>${escapeHTML(s.hospitalName||'MedCare Hospital')}</strong><span>${escapeHTML(s.hospitalCode||'MC-HMS-001')}</span></div></div>
          <div class="loc-row"><i data-lucide="map-pin"></i><div><strong>Address</strong><span>${escapeHTML(s.address||'-')}</span></div></div>
          <div class="loc-row"><i data-lucide="map"></i><div><strong>City & State</strong><span>${escapeHTML(city||'-')}</span></div></div>
          <div class="loc-row"><i data-lucide="mail"></i><div><strong>PIN / Country</strong><span>${escapeHTML([s.pin,s.country].filter(Boolean).join(' • ')||'-')}</span></div></div>
          <a href="${mapUrl(s)}" target="_blank" rel="noopener" class="btn btn-primary" style="display:inline-flex;margin-top:14px;text-decoration:none"><i data-lucide="external-link"></i> Open Location</a>
        </div></div>`);
      if(window.lucide) lucide.createIcons();
    },0);
  };

  const oldCharts=window.initializeCharts;
  window.initializeCharts=function(){
    if(typeof Chart==='undefined') return oldCharts && oldCharts();
    Chart.defaults.font.family='Inter, system-ui, -apple-system, Segoe UI, sans-serif';
    Chart.defaults.color='#617985';
    const centerText={id:'mcCenterText',afterDraw(chart){if(chart.config.type!=='doughnut')return;const ds=chart.data.datasets[0];if(!ds)return;const total=ds.data.reduce((a,b)=>a+(Number(b)||0),0);const ctx=chart.ctx;const x=(chart.chartArea.left+chart.chartArea.right)/2;const y=(chart.chartArea.top+chart.chartArea.bottom)/2;ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#173b4c';ctx.font='800 25px Inter, sans-serif';ctx.fillText(total.toLocaleString('en-IN'),x,y-5);ctx.fillStyle='#7a8e98';ctx.font='600 10px Inter, sans-serif';ctx.fillText('TOTAL PATIENTS',x,y+17);ctx.restore();}};
    if(!Chart.registry.plugins.get('mcCenterText')) Chart.register(centerText);
    document.querySelectorAll('canvas').forEach(c=>{const chart=Chart.getChart(c);if(chart)chart.destroy();});
    const pc=document.getElementById('patientChart');
    if(pc){const ctx=pc.getContext('2d');const g=ctx.createLinearGradient(0,0,0,300);g.addColorStop(0,'rgba(15,139,141,.30)');g.addColorStop(1,'rgba(15,139,141,.02)');new Chart(pc,{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],datasets:[{label:'Patients',data:[80,110,95,140,180,160,210,190,230,250,280,320],borderColor:'#0f8b8d',backgroundColor:g,fill:true,tension:.42,borderWidth:3,pointRadius:3,pointHoverRadius:6,pointBackgroundColor:'#fff',pointBorderWidth:2,pointBorderColor:'#0f8b8d'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#173b4c',padding:12,displayColors:false}},scales:{x:{grid:{display:false},border:{display:false}},y:{grid:{color:'rgba(115,139,150,.12)'},border:{display:false},beginAtZero:true}}}});}
    const dc=document.getElementById('departmentChart');
    if(dc){new Chart(dc,{type:'doughnut',data:{labels:['Cardiology','Neurology','Orthopedic','Pediatrics','Other'],datasets:[{data:[245,168,190,210,437],backgroundColor:['#0f8b8d','#1664a5','#65b7a9','#e7a52b','#d9e6ea'],borderColor:'#fff',borderWidth:5,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'72%',plugins:{legend:{position:'bottom',labels:{usePointStyle:true,pointStyle:'circle',padding:15,font:{size:10,weight:'700'}}},tooltip:{backgroundColor:'#173b4c',padding:12}}}});}
  };

  const oldReport=window.loadReportLanding;
  window.loadReportLanding=function(){oldReport && oldReport();setTimeout(function(){
    const strip=document.getElementById('reportSummaryStrip');if(!strip)return;
    strip.insertAdjacentHTML('beforeend','<div class="report-summary-item"><span>System Status</span><strong style="color:#1d7658">● Operational</strong></div>');
    if(strip.children.length>4) strip.style.gridTemplateColumns='repeat(5,minmax(0,1fr))';
  },0)};
})();

/* =========================================================
   MEDCARE HMS — BEAUTIFUL PRO V3
   Final visual pass: dashboard, reports, staff and nursing.
   Original CRUD, LocalStorage and module data remain intact.
========================================================= */
(function(){
  const css = `
  .mc-v3-shell{display:grid;gap:18px}
  .mc-v3-welcome{display:flex;justify-content:space-between;align-items:center;padding:22px 24px;border:1px solid #dfecef;border-radius:22px;background:linear-gradient(135deg,#ffffff,#f1fafb 55%,#eef5fc);box-shadow:0 12px 32px rgba(20,60,78,.07)}
  .mc-v3-welcome h2{margin:3px 0 5px;color:#173f50;font-size:24px}.mc-v3-welcome p{margin:0;color:#78909a;font-size:12px}.mc-v3-chip{padding:8px 12px;border-radius:999px;background:#e5f7ef;color:#187652;font-size:11px;font-weight:800}
  .mc-v3-chart-card{border:1px solid #e0eaee!important;border-radius:20px!important;overflow:hidden;box-shadow:0 10px 26px rgba(20,60,78,.055)!important}.mc-v3-chart-head{display:flex;justify-content:space-between;align-items:center}.mc-v3-chart-head h3{margin:0;color:#21495a}.mc-v3-chart-head span{font-size:10px;color:#83959e;background:#f4f8f9;padding:7px 9px;border-radius:999px}.mc-v3-chart-box{height:285px;position:relative;padding:4px 8px 0}.mc-v3-chart-box canvas{width:100%!important;height:100%!important}
  .mc-v3-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}.mc-v3-kpi{background:#fff;border:1px solid #e0eaee;border-radius:17px;padding:15px;box-shadow:0 8px 22px rgba(20,60,78,.05);position:relative;overflow:hidden}.mc-v3-kpi:after{content:"";position:absolute;right:-18px;top:-18px;width:70px;height:70px;border-radius:50%;background:#eaf7f7}.mc-v3-kpi small,.mc-v3-kpi strong,.mc-v3-kpi span{display:block;position:relative;z-index:1}.mc-v3-kpi small{color:#82949d;font-size:10px}.mc-v3-kpi strong{font-size:23px;color:#1b4557;margin:4px 0}.mc-v3-kpi span{font-size:10px;color:#19805d;font-weight:800}
  .mc-v3-visual-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:18px}.mc-v3-card{background:#fff;border:1px solid #e0eaee;border-radius:19px;padding:17px;box-shadow:0 9px 24px rgba(20,60,78,.05)}.mc-v3-card-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:13px}.mc-v3-card-head h3{margin:0;color:#21495a;font-size:15px}.mc-v3-card-head span{font-size:10px;color:#7c8f98}.mc-v3-list{display:grid;gap:9px}.mc-v3-list-row{display:flex;align-items:center;gap:10px;padding:9px;border-radius:12px;background:#f7fafb}.mc-v3-icon{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#e8f7f7;color:#0c7f88}.mc-v3-list-row strong{display:block;font-size:11px;color:#294c5b}.mc-v3-list-row small{display:block;font-size:10px;color:#83939b;margin-top:2px}.mc-v3-status{margin-left:auto;font-size:9px;font-weight:800;padding:5px 7px;border-radius:999px;background:#e7f7ee;color:#177a55}
  .mc-nurse-board{display:grid;grid-template-columns:1.4fr .6fr;gap:15px;margin-bottom:18px}.mc-nurse-roster{display:grid;grid-template-columns:repeat(2,1fr);gap:11px}.mc-nurse-profile{border:1px solid #e0eaee;border-radius:16px;padding:13px;background:linear-gradient(145deg,#fff,#f8fbfc);display:flex;gap:11px;align-items:center}.mc-nurse-avatar{width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,#dff6f4,#e8f0fb);display:grid;place-items:center;color:#087d87;font-weight:900}.mc-nurse-profile strong,.mc-nurse-profile small{display:block}.mc-nurse-profile strong{font-size:12px;color:#21495a}.mc-nurse-profile small{font-size:10px;color:#81919a;margin-top:3px}.mc-nurse-shift{margin-left:auto;text-align:right}.mc-nurse-shift b{display:block;font-size:10px;color:#16805a}.mc-nurse-shift span{font-size:9px;color:#8a9aa2}.mc-coverage{background:linear-gradient(145deg,#0b6f7a,#1664a5);border-radius:18px;padding:18px;color:#fff;box-shadow:0 12px 25px rgba(15,103,126,.18)}.mc-coverage h3{margin:0 0 5px}.mc-coverage p{font-size:11px;color:#d8eef0;margin:0 0 18px}.mc-ring{width:132px;height:132px;border-radius:50%;margin:0 auto 16px;background:conic-gradient(#7de0cf 0 96%,rgba(255,255,255,.18) 96%);display:grid;place-items:center}.mc-ring:before{content:"96%";width:98px;height:98px;border-radius:50%;background:#126b7d;display:grid;place-items:center;font-size:23px;font-weight:900}.mc-coverage-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mc-coverage-grid div{background:rgba(255,255,255,.1);padding:9px;border-radius:10px}.mc-coverage-grid strong,.mc-coverage-grid span{display:block}.mc-coverage-grid strong{font-size:14px}.mc-coverage-grid span{font-size:9px;color:#d5e8eb}
  .mc-staff-board{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:18px}.mc-staff-card{background:#fff;border:1px solid #e0eaee;border-radius:18px;padding:15px;box-shadow:0 8px 22px rgba(20,60,78,.05)}.mc-staff-top{display:flex;justify-content:space-between;align-items:center}.mc-staff-avatar{width:44px;height:44px;border-radius:14px;background:#edf6fb;color:#17658a;display:grid;place-items:center;font-weight:900}.mc-staff-card h4{margin:12px 0 3px;color:#21495a}.mc-staff-card p{margin:0;color:#7d9099;font-size:10px}.mc-staff-meta{display:flex;justify-content:space-between;margin-top:13px;padding-top:10px;border-top:1px solid #edf1f3}.mc-staff-meta span{font-size:9px;color:#87979f}.mc-staff-meta b{font-size:10px;color:#1a7b58}
  .mc-report-dashboard{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px}.mc-report-meter{display:grid;gap:11px}.mc-report-meter-row{display:grid;grid-template-columns:95px 1fr 45px;align-items:center;gap:8px;font-size:10px;color:#657b85}.mc-report-meter-track{height:9px;background:#edf2f4;border-radius:999px;overflow:hidden}.mc-report-meter-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#0f8b8d,#4bb5a5)}.mc-report-insight{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}.mc-report-insight div{background:#f7fafb;border:1px solid #e8eff1;border-radius:12px;padding:11px}.mc-report-insight strong{display:block;color:#21495a;font-size:17px}.mc-report-insight span{font-size:9px;color:#80929a}
  .mc-location-note{display:flex;align-items:center;gap:8px;background:#edf8f7;border:1px solid #d8eeeb;border-radius:12px;padding:10px 12px;color:#27636b;font-size:10px;margin-top:12px}
  @media(max-width:1000px){.mc-v3-kpis,.mc-staff-board{grid-template-columns:repeat(2,1fr)}.mc-v3-visual-grid{grid-template-columns:1fr 1fr}.mc-nurse-board{grid-template-columns:1fr}}
  @media(max-width:650px){.mc-v3-kpis,.mc-v3-visual-grid,.mc-staff-board,.mc-nurse-roster,.mc-report-dashboard{grid-template-columns:1fr}.mc-v3-welcome{align-items:flex-start;gap:12px;flex-direction:column}}
  `;
  const st=document.createElement('style');st.id='mcBeautifulV3Style';st.textContent=css;document.head.appendChild(st);

  function esc(v){return typeof escapeHTML==='function'?escapeHTML(v):String(v??'');}
  function initials(name){return String(name||'Staff').split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'ST';}
  function statusClass(v){let s=String(v||'').toLowerCase();return /leave|offline|cancel/.test(s)?'background:#fff0f0;color:#c84b4b':/pending|waiting|cleaning|low/.test(s)?'background:#fff6e5;color:#a56b12':'background:#e7f7ee;color:#177a55';}

  const oldPremium=window.loadPremiumModule;
  window.loadPremiumModule=function(key){
    if(!PREMIUM_MODULES[key]) return oldPremium&&oldPremium(key);
    const cfg=PREMIUM_MODULES[key], target=document.getElementById(key+'ModuleContent'); if(!target) return oldPremium&&oldPremium(key);
    ensurePremiumModal(); const rows=getPremiumRows(key);
    const statHTML=cfg.stats.map((x,i)=>`<div class="mc-v3-kpi"><small>${esc(x[0])}</small><strong>${esc(i===0&&rows.length!==cfg.rows.length?rows.length:x[1])}</strong><span>${esc(x[2])}</span></div>`).join('');
    let special='';
    if(key==='nursing'){
      special=`<div class="mc-nurse-board"><div class="mc-v3-card"><div class="mc-v3-card-head"><h3>Today's Nursing Roster</h3><span>Live shift view</span></div><div class="mc-nurse-roster">${rows.map(r=>`<div class="mc-nurse-profile"><div class="mc-nurse-avatar">${initials(r[1])}</div><div><strong>${esc(r[1])}</strong><small>${esc(r[2])} • ${esc(r[3])}</small></div><div class="mc-nurse-shift"><b>${esc(r[4])}</b><span>Shift</span></div></div>`).join('')}</div></div><div class="mc-coverage"><h3>Ward Coverage</h3><p>Current nursing coverage across clinical units.</p><div class="mc-ring"></div><div class="mc-coverage-grid"><div><strong>32</strong><span>On Duty</span></div><div><strong>6</strong><span>Units</span></div><div><strong>48</strong><span>Total Staff</span></div><div><strong>96%</strong><span>Coverage</span></div></div></div></div>`;
    }
    if(key==='staff'){
      special=`<div class="mc-v3-card" style="margin-bottom:18px"><div class="mc-v3-card-head"><h3>Employee Directory</h3><span>Workforce overview</span></div><div class="mc-staff-board">${rows.map(r=>`<div class="mc-staff-card"><div class="mc-staff-top"><div class="mc-staff-avatar">${initials(r[1])}</div><span style="font-size:9px;font-weight:800;padding:5px 7px;border-radius:999px;${statusClass(r[4])}">${esc(r[4])}</span></div><h4>${esc(r[1])}</h4><p>${esc(r[2])}</p><div class="mc-staff-meta"><span>${esc(r[0])}</span><b>${esc(r[3])}</b></div></div>`).join('')}</div></div>`;
    }
    if(key==='rooms'){
      special=`<div class="mc-v3-card" style="margin-bottom:18px"><div class="mc-v3-card-head"><h3>Bed Occupancy Snapshot</h3><span>Room management</span></div><div class="mc-v3-visual-grid">${rows.map(r=>`<div class="mc-v3-card" style="padding:13px"><div style="display:flex;justify-content:space-between"><strong style="color:#21495a;font-size:13px">${esc(r[0])}</strong><span style="font-size:9px;padding:5px 7px;border-radius:999px;${statusClass(r[4])}">${esc(r[4])}</span></div><div style="font-size:28px;text-align:center;padding:16px 0;color:#0f8b8d">🛏</div><small style="color:#82939b">${esc(r[1])} • Floor ${esc(r[2])}</small><strong style="display:block;margin-top:4px;font-size:11px;color:#345767">${esc(r[3])}</strong></div>`).join('')}</div></div>`;
    }
    if(key==='icu'){
      special=`<div class="mc-v3-card" style="margin-bottom:18px"><div class="mc-v3-card-head"><h3>ICU Bed Monitor</h3><span>Critical care view</span></div><div class="mc-v3-visual-grid">${rows.map(r=>`<div class="mc-v3-card" style="padding:14px;background:linear-gradient(145deg,#fff,#f7fbfc)"><div style="display:flex;justify-content:space-between"><strong style="color:#21495a">${esc(r[0])}</strong><span style="font-size:9px;font-weight:800;color:${/critical/i.test(r[2])?'#c84b4b':'#17805b'}">${esc(r[2])}</span></div><div style="margin:14px 0;padding:10px;border-radius:12px;background:#f3f8fa;font-size:10px;color:#45606c">♥ ECG &nbsp; 98 &nbsp; • &nbsp; SpO₂ 97% &nbsp; • &nbsp; BP 120/80</div><small style="color:#7d9099">${esc(r[1])} • ${esc(r[4])}</small></div>`).join('')}</div></div>`;
    }
    const table=`<div class="premium-content-card"><div class="premium-card-head"><div><span class="premium-eyebrow">WORKSPACE</span><h3>${esc(cfg.title)} Records</h3><small class="premium-record-count">${rows.length} records</small></div><div class="premium-tools"><div class="premium-search"><i data-lucide="search"></i><input placeholder="Search this module..." oninput="filterPremiumTable(this,'${key}Table')"></div><select class="premium-filter" onchange="filterPremiumStatus(this,'${key}Table')"><option value="">All Status</option><option>Active</option><option>On Duty</option><option>Available</option><option>Pending</option><option>Waiting</option><option>Completed</option><option>In Stock</option><option>Low Stock</option></select></div></div><div class="table-wrap"><table id="${key}Table"><thead><tr>${cfg.columns.map(c=>`<th>${esc(c)}</th>`).join('')}<th>Actions</th></tr></thead><tbody>${rows.map((row,ri)=>`<tr data-row-index="${ri}">${row.map((v,i)=>`<td>${i===row.length-1?`<span class="premium-status" style="${statusClass(v)}">${esc(v)}</span>`:esc(v)}</td>`).join('')}<td><div class="row-actions"><button class="premium-row-btn view" onclick="openPremiumModal('${key}',${ri},'view')"><i data-lucide="eye"></i></button><button class="premium-row-btn edit" onclick="openPremiumModal('${key}',${ri},'edit')"><i data-lucide="pencil"></i></button><button class="premium-row-btn delete" onclick="deletePremiumRecord('${key}',${ri})"><i data-lucide="trash-2"></i></button></div></td></tr>`).join('')}</tbody></table></div></div>`;
    target.innerHTML=`<div class="mc-v3-shell"><div class="premium-module-hero"><div><span class="premium-eyebrow">${esc(cfg.eyebrow)}</span><h2><i data-lucide="${cfg.icon}"></i>${esc(cfg.title)}</h2><p>${esc(cfg.subtitle)}</p></div><div class="premium-module-actions"><button class="btn btn-primary" onclick="openPremiumModal('${key}',-1,'add')"><i data-lucide="plus"></i>Add New</button><button class="btn btn-light" onclick="downloadPremiumModule('${key}')"><i data-lucide="download"></i>Export CSV</button></div></div><div class="mc-v3-kpis">${statHTML}</div>${special}${table}</div>`;
    if(window.lucide)lucide.createIcons();
  };

  const oldCharts=window.initializeCharts;
  window.initializeCharts=function(){
    if(typeof Chart==='undefined') return oldCharts&&oldCharts();
    document.querySelectorAll('canvas').forEach(c=>{const ch=Chart.getChart(c);if(ch)ch.destroy();});
    Chart.defaults.font.family='Inter,system-ui,-apple-system,Segoe UI,sans-serif';Chart.defaults.color='#617985';
    const center={id:'mcV3Center',afterDraw(chart){if(chart.config.type!=='doughnut')return;const d=chart.data.datasets[0]?.data||[];const total=d.reduce((a,b)=>a+(+b||0),0),ctx=chart.ctx,x=(chart.chartArea.left+chart.chartArea.right)/2,y=(chart.chartArea.top+chart.chartArea.bottom)/2;ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#173f50';ctx.font='800 26px Inter';ctx.fillText(total.toLocaleString('en-IN'),x,y-5);ctx.fillStyle='#80939b';ctx.font='700 9px Inter';ctx.fillText('TOTAL PATIENTS',x,y+17);ctx.restore();}};
    if(!Chart.registry.plugins.get('mcV3Center'))Chart.register(center);
    const patients=getData('medcarePatients'), doctors=getData('medcareDoctors');
    const pc=document.getElementById('patientChart');
    if(pc){const ctx=pc.getContext('2d'),g=ctx.createLinearGradient(0,0,0,280);g.addColorStop(0,'rgba(15,139,141,.30)');g.addColorStop(1,'rgba(15,139,141,.02)');new Chart(pc,{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],datasets:[{data:[80,110,95,140,180,160,210,190,230,250,280,Math.max(320,patients.length)],borderColor:'#0f8b8d',backgroundColor:g,fill:true,tension:.42,borderWidth:3,pointRadius:3,pointHoverRadius:7,pointBackgroundColor:'#fff',pointBorderColor:'#0f8b8d',pointBorderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#173f50',padding:12,displayColors:false}},scales:{x:{grid:{display:false},border:{display:false}},y:{beginAtZero:true,grid:{color:'rgba(115,139,150,.11)'},border:{display:false}}}}});}
    const dc=document.getElementById('departmentChart');
    if(dc){const depts={};doctors.forEach(d=>{const k=d.department||d.specialization||'Other';depts[k]=(depts[k]||0)+1;});let pairs=Object.entries(depts);if(!pairs.length)pairs=[['Cardiology',245],['Neurology',168],['Orthopedic',190],['Pediatrics',210],['Other',437]];pairs=pairs.slice(0,6);new Chart(dc,{type:'doughnut',data:{labels:pairs.map(x=>x[0]),datasets:[{data:pairs.map(x=>x[1]),backgroundColor:['#0f8b8d','#1664a5','#65b7a9','#e7a52b','#8b74b9','#d9e6ea'],borderColor:'#fff',borderWidth:5,hoverOffset:9}]},options:{responsive:true,maintainAspectRatio:false,cutout:'72%',plugins:{legend:{position:'bottom',labels:{usePointStyle:true,pointStyle:'circle',padding:13,font:{size:10,weight:'700'}}},tooltip:{backgroundColor:'#173f50',padding:11}}}});}
  };

  const oldReport=window.openReport;
  window.openReport=function(type){oldReport&&oldReport(type);setTimeout(()=>{const box=document.querySelector('#reportViewModal .report-view');if(!box||box.querySelector('.mc-report-dashboard'))return;const data=reportData();let items=[];if(type==='patients')items=[['Registered',data.patients.length],['Appointments',data.appointments.length],['Doctors',getData('medcareDoctors').length],['Records Ready',Math.max(0,data.patients.length-1)]];else if(type==='appointments')items=[['Appointments',data.appointments.length],['Confirmed',data.appointments.filter(a=>/confirmed|completed/i.test(a.status||'')).length],['Pending',data.appointments.filter(a=>/pending/i.test(a.status||'')).length],['Doctors',getData('medcareDoctors').length]];else items=[['Revenue',formatCurrency(data.revenue)],['Paid',formatCurrency(data.paid)],['Pending',formatCurrency(data.pending)],['Invoices',data.invoices.length]];box.querySelector('.report-content-grid')?.insertAdjacentHTML('beforebegin',`<div class="mc-report-dashboard"><div class="mc-v3-card"><div class="mc-v3-card-head"><h3>Performance Snapshot</h3><span>Live hospital data</span></div><div class="mc-report-insight">${items.map(x=>`<div><strong>${esc(x[1])}</strong><span>${esc(x[0])}</span></div>`).join('')}</div></div><div class="mc-v3-card"><div class="mc-v3-card-head"><h3>Operational Health</h3><span>Current status</span></div><div class="mc-report-meter"><div class="mc-report-meter-row"><span>Service Flow</span><div class="mc-report-meter-track"><div class="mc-report-meter-fill" style="width:92%"></div></div><b>92%</b></div><div class="mc-report-meter-row"><span>Data Ready</span><div class="mc-report-meter-track"><div class="mc-report-meter-fill" style="width:96%"></div></div><b>96%</b></div><div class="mc-report-meter-row"><span>Collections</span><div class="mc-report-meter-track"><div class="mc-report-meter-fill" style="width:${data.revenue?Math.min(100,Math.round(data.paid/data.revenue*100)):0}%"></div></div><b>${data.revenue?Math.min(100,Math.round(data.paid/data.revenue*100)):0}%</b></div></div></div></div>`);},0)};
})();

/* =========================================================
   CLINICAL NOTE / PRESCRIPTION EDITOR V4
========================================================= */
function prescriptionRowHTML(m={}){
  return `<div class="rx-editor-row"><div class="form-group"><label>Medicine</label><input class="rx-med-name" value="${escapeAttribute(m.name||"")}" placeholder="Paracetamol 500 mg"></div><div class="form-group"><label>Dose</label><input class="rx-med-dose" value="${escapeAttribute(m.dose||"")}" placeholder="1 tablet"></div><div class="form-group"><label>Frequency</label><input class="rx-med-frequency" value="${escapeAttribute(m.frequency||"")}" placeholder="Twice daily"></div><div class="form-group"><label>Duration</label><input class="rx-med-duration" value="${escapeAttribute(m.duration||"")}" placeholder="3 days"></div><button type="button" class="rx-remove" onclick="this.closest('.rx-editor-row').remove()" title="Remove medicine"><i data-lucide="trash-2"></i></button></div>`;
}
function addPrescriptionMedicineRow(m){
  const box=document.getElementById("rxMedicineEditor"); if(!box)return;
  box.insertAdjacentHTML("beforeend",prescriptionRowHTML(m||{}));
  if(window.lucide)lucide.createIcons();
}
function openPrescriptionEditor(){
  const patient=getCurrentPatientForDocument(); if(!patient){showToast("Open a patient record first");return;}
  const rx=patient.prescription||{diagnosis:"",medicines:[],advice:"",followup:""};
  document.getElementById("rxDiagnosis").value=rx.diagnosis||"";
  document.getElementById("rxAdvice").value=rx.advice||"";
  document.getElementById("rxFollowup").value=rx.followup||"";
  const box=document.getElementById("rxMedicineEditor"); box.innerHTML="";
  (rx.medicines?.length?rx.medicines:[{}]).forEach(addPrescriptionMedicineRow);
  openModal("prescriptionEditorModal");
}
function savePrescriptionFromEditor(e){
  e.preventDefault();
  const patient=getCurrentPatientForDocument(); if(!patient)return;
  const medicines=[...document.querySelectorAll("#rxMedicineEditor .rx-editor-row")].map(row=>({name:row.querySelector(".rx-med-name")?.value.trim()||"",dose:row.querySelector(".rx-med-dose")?.value.trim()||"",frequency:row.querySelector(".rx-med-frequency")?.value.trim()||"",duration:row.querySelector(".rx-med-duration")?.value.trim()||""})).filter(m=>m.name);
  patient.prescription={diagnosis:document.getElementById("rxDiagnosis").value.trim()||"Clinical assessment / follow-up",medicines,advice:document.getElementById("rxAdvice").value.trim()||"Continue medicines as advised and maintain adequate rest and hydration.",followup:document.getElementById("rxFollowup").value.trim()||"Review as advised by the doctor."};
  const patients=getData("medcarePatients"); const idx=patients.findIndex(p=>p.id===patient.id); if(idx>=0){patients[idx]=patient;saveData("medcarePatients",patients);}
  closeModal("prescriptionEditorModal");
  viewPatient(patient.id);
  showToast("Doctor's clinical notes and prescription saved");
}
document.addEventListener("DOMContentLoaded",()=>{const f=document.getElementById("prescriptionEditorForm");if(f)f.addEventListener("submit",savePrescriptionFromEditor);});


function filterReports(value) {
    const query = String(value || "").trim().toLowerCase();
    document.querySelectorAll("#reportGrid .report-card").forEach(card => {
        card.classList.toggle("is-hidden", !!query && !card.textContent.toLowerCase().includes(query));
    });
}

/* =========================================================
   MEDCARE HMS — ORIGINAL UI + FEATURE BOOST
   Additive only: original modules/data/navigation remain intact.
========================================================= */
(function(){
  function esc(v){return String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
  function get(key){try{return JSON.parse(localStorage.getItem(key)||'[]')||[]}catch(e){return[]}}
  function injectPatientTools(){
    const page=document.getElementById('patients');
    if(!page || page.querySelector('.original-feature-boost')) return;
    const header=page.querySelector('.section-header'); if(!header)return;
    const box=document.createElement('section');
    box.className='original-feature-boost patient-feature-boost';
    const patients=get('medcarePatients');
    const appointments=get('medcareAppointments');
    const invoices=get('medcareInvoices');
    const active=patients.filter(p=>String(p.status||'').toLowerCase()!=='inactive').length;
    const pending=appointments.filter(a=>/pending|scheduled|confirmed/i.test(a.status||'')).length;
    const outstanding=invoices.reduce((s,i)=>s+Math.max(0,Number(i.balance??((Number(i.total)||0)-(Number(i.paid)||0)))),0);
    box.innerHTML=`<div class="feature-boost-head"><div><span class="feature-kicker">PATIENT CARE CENTER</span><h3>Patient Tools & Quick Overview</h3><p>Keep the original Patient Directory and use these additional shortcuts for faster hospital workflow.</p></div><div class="feature-actions"><button class="btn btn-light" onclick="openModal('patientModal')"><i data-lucide="user-plus"></i> Add Patient</button><button class="btn btn-primary" onclick="exportPatientCSV()"><i data-lucide="download"></i> Export Patients</button></div></div>
      <div class="feature-stat-row"><div><span>Total Patients</span><strong>${patients.length}</strong><small>Registered records</small></div><div><span>Active Patients</span><strong>${active}</strong><small>Current records</small></div><div><span>Upcoming Visits</span><strong>${pending}</strong><small>Scheduled / pending</small></div><div><span>Pending Billing</span><strong>₹${outstanding.toLocaleString('en-IN')}</strong><small>Outstanding balance</small></div></div>
      <div class="feature-tool-grid"><button onclick="openModal('patientModal')"><i data-lucide="clipboard-plus"></i><b>New Registration</b><small>Create a patient record</small></button><button onclick="showPage('appointments');openAppointmentModal()"><i data-lucide="calendar-plus"></i><b>Book Appointment</b><small>Schedule patient visit</small></button><button onclick="showPage('reports');openReport('patients')"><i data-lucide="file-search"></i><b>Patient Reports</b><small>View detailed reports</small></button><button onclick="showPage('billing');openModal('invoiceModal')"><i data-lucide="receipt"></i><b>Create Patient Bill</b><small>Open billing invoice</small></button><button onclick="showPage('treatment')"><i data-lucide="file-heart"></i><b>Medical Record</b><small>Clinical history & treatment</small></button><button onclick="showPage('laboratory')"><i data-lucide="test-tube-2"></i><b>Lab Services</b><small>Tests and results workflow</small></button></div>`;
    header.insertAdjacentElement('afterend',box);
    if(window.lucide) lucide.createIcons();
  }
  function injectBillingTools(){
    const page=document.getElementById('billing'); if(!page||page.querySelector('.billing-feature-tools'))return;
    const header=page.querySelector('.section-header'); if(!header)return;
    const box=document.createElement('div'); box.className='billing-feature-tools';
    box.innerHTML=`<div><span class="feature-kicker">BILLING CONTROL CENTER</span><h3>Billing Tools</h3><p>Quick actions for invoices, payments and billing reports.</p></div><div class="billing-tool-buttons"><button onclick="openModal('invoiceModal')"><i data-lucide="file-plus-2"></i>Create Bill</button><button onclick="showPage('reports');openReport('revenue')"><i data-lucide="bar-chart-3"></i>Billing Report</button><button onclick="showPage('finance')"><i data-lucide="wallet-cards"></i>Finance</button><button onclick="generateReport()"><i data-lucide="download"></i>Export Summary</button></div>`;
    header.insertAdjacentElement('afterend',box); if(window.lucide)lucide.createIcons();
  }
  function injectReportsTools(){
    const page=document.getElementById('reports'); if(!page||page.querySelector('.report-feature-strip'))return;
    const hero=page.querySelector('.reports-hero'); if(!hero)return;
    const strip=document.createElement('div'); strip.className='report-feature-strip';
    strip.innerHTML=`<button onclick="openReport('patients')"><i data-lucide="users"></i><b>Patient Reports</b><small>Patient-wise clinical records</small></button><button onclick="openReport('appointments')"><i data-lucide="calendar-check"></i><b>Appointment Reports</b><small>Schedule and status details</small></button><button onclick="openReport('revenue')"><i data-lucide="indian-rupee"></i><b>Billing Reports</b><small>Revenue, paid and pending</small></button><button onclick="showPage('laboratory')"><i data-lucide="test-tube-2"></i><b>Lab Reports</b><small>Test and result workflow</small></button><button onclick="showPage('radiology')"><i data-lucide="scan-line"></i><b>Radiology Reports</b><small>Imaging report workflow</small></button>`;
    hero.insertAdjacentElement('afterend',strip); if(window.lucide)lucide.createIcons();
  }
  function inject(){injectPatientTools();injectBillingTools();injectReportsTools();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(inject,50)); else setTimeout(inject,50);
  window.addEventListener('load',()=>setTimeout(inject,100));
})();


/* =========================================================
   BILLING ANALYTICS & REPORT TOOLS — PATIENT-WISE V2
========================================================= */
(function(){
  const baseLoadInvoices = window.loadInvoices;
  window.loadInvoices = function(filter){
    baseLoadInvoices(filter);
    setTimeout(()=>renderBillingAnalytics(document.getElementById('billingPatientSearch')?.value || ''), 0);
  };
  function invoices(){ return typeof getData==='function' ? getData('medcareInvoices') : []; }
  function money(n){ return '₹'+Number(n||0).toLocaleString('en-IN'); }
  function calc(i){
    const total=Number(i.amount)||0;
    const paid=Math.min(total,Number(i.paidAmount ?? (i.status==='Paid'?total:0))||0);
    return {total,paid,due:Math.max(0,total-paid)};
  }
  function matches(i,q){
    if(!q) return true;
    return `${i.id||''} ${i.patient||''} ${i.doctor||''} ${i.diagnosis||''} ${i.service||''} ${i.status||''} ${i.date||''}`.toLowerCase().includes(q);
  }
  window.renderBillingAnalytics = function(filter=''){
    const list=invoices();
    const q=String(filter||'').trim().toLowerCase();
    const visible=list.filter(i=>matches(i,q));
    let total=0,paid=0,due=0,paidCount=0,partialCount=0,pendingCount=0;
    list.forEach(i=>{const c=calc(i);total+=c.total;paid+=c.paid;due+=c.due;if(c.due===0)paidCount++;else if(c.paid>0)partialCount++;else pendingCount++;});

    // Patient-wise aggregation: the same patient can have multiple invoices.
    const groups={};
    visible.forEach(i=>{
      const key=String(i.patient||'Unknown Patient').trim()||'Unknown Patient';
      if(!groups[key]) groups[key]={patient:key,total:0,paid:0,due:0,invoices:0,latest:i,items:[]};
      const g=groups[key],c=calc(i);g.total+=c.total;g.paid+=c.paid;g.due+=c.due;g.invoices++;g.items.push(i);
      if(String(i.date||'')>=String(g.latest?.date||''))g.latest=i;
    });
    const ledger=document.getElementById('billingLedger');
    if(ledger){
      const arr=Object.values(groups).sort((a,b)=>String(b.latest?.date||'').localeCompare(String(a.latest?.date||'')));
      ledger.innerHTML=arr.map(g=>{
        const status=g.due===0?'Paid':g.paid>0?'Partially Paid':'Pending';
        const id=g.latest?.id||'';
        return `<div class="billing-patient-ledger-row">
          <div class="billing-patient-main"><div class="billing-patient-avatar"><i data-lucide="user-round"></i></div><div><strong>${escapeHTML(g.patient)}</strong><small>${g.invoices} bill${g.invoices===1?'':'s'} • Latest ${escapeHTML(g.latest?.date||'—')}</small></div></div>
          <div class="billing-patient-amount"><span>Total Bill</span><strong>${money(g.total)}</strong></div>
          <div class="billing-patient-amount paid"><span>Paid</span><strong>${money(g.paid)}</strong></div>
          <div class="billing-patient-amount due"><span>Balance Due</span><strong>${money(g.due)}</strong></div>
          <span class="ledger-status ${status.toLowerCase().replace(' ','-')}">${status}</span>
          <button class="btn btn-light btn-sm" onclick="viewInvoice('${escapeAttribute(id)}')"><i data-lucide="file-text"></i> View Bill</button>
        </div>`;
      }).join('') || '<div class="billing-empty">No patient billing records match your search.</div>';
    }
    if(typeof Chart!=='undefined'){
      const a=document.getElementById('billingBillPaidChart');
      if(a){if(window.medcareBillChart)window.medcareBillChart.destroy();window.medcareBillChart=new Chart(a,{type:'bar',data:{labels:['Total Bill','Paid','Balance Due'],datasets:[{label:'Amount',data:[total,paid,due],backgroundColor:['#2563eb','#16a34a','#f59e0b'],borderRadius:8}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{callback:v=>'₹'+Number(v).toLocaleString('en-IN')}}}}});}
      const b=document.getElementById('billingStatusChart');
      if(b){if(window.medcareStatusChart)window.medcareStatusChart.destroy();window.medcareStatusChart=new Chart(b,{type:'doughnut',data:{labels:['Paid','Partially Paid','Pending'],datasets:[{data:[paidCount,partialCount,pendingCount],backgroundColor:['#16a34a','#2563eb','#f59e0b'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'66%',plugins:{legend:{position:'bottom',labels:{usePointStyle:true,padding:14,font:{size:10,weight:'700'}}}}}});}
    }
    if(window.lucide)lucide.createIcons();
  };
  window.downloadBillingCSV=function(){
    const list=invoices();const rows=[['Invoice ID','Patient','Doctor','Service','Diagnosis','Bill Amount','Paid Amount','Balance Due','Date','Status']];
    list.forEach(i=>{const c=calc(i);rows.push([i.id||'',i.patient||'',i.doctor||'',i.service||'',i.diagnosis||'',c.total,c.paid,c.due,i.date||'',c.due===0?'Paid':c.paid>0?'Partially Paid':'Pending']);});
    const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    downloadFile(csv,'MedCare_Billing_Detailed_Report.csv','text/csv;charset=utf-8');showToast('Detailed billing report downloaded');
  };
  window.printBillingReport=function(){
    const list=invoices();const rows=list.map(i=>{const c=calc(i);return `<tr><td>${escapeHTML(i.id||'')}</td><td>${escapeHTML(i.patient||'')}</td><td>${escapeHTML(i.doctor||'')}</td><td>${escapeHTML(i.service||i.diagnosis||'')}</td><td>₹${c.total.toLocaleString('en-IN')}</td><td>₹${c.paid.toLocaleString('en-IN')}</td><td>₹${c.due.toLocaleString('en-IN')}</td><td>${escapeHTML(i.date||'')}</td><td>${c.due===0?'Paid':c.paid>0?'Partially Paid':'Pending'}</td></tr>`}).join('');
    const total=list.reduce((x,i)=>x+calc(i).total,0),paid=list.reduce((x,i)=>x+calc(i).paid,0);
    const w=window.open('','_blank','width=1200,height=850');if(!w){showToast('Please allow pop-ups to print the billing report');return;}
    w.document.write(`<!doctype html><html><head><title>MedCare HMS - Billing Report</title><style>body{font-family:Arial,sans-serif;padding:28px;color:#172033}h1{margin:0 0 5px;color:#155eef}.meta{color:#667085;margin-bottom:20px}.summary{display:flex;gap:12px;margin:18px 0}.box{padding:12px 18px;border:1px solid #d9e0ea;border-radius:10px}.box b{display:block;font-size:18px;margin-top:5px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #d9e0ea;padding:8px;font-size:11px;text-align:left}th{background:#eef4ff}@media print{button{display:none}}</style></head><body><h1>MEDCARE MULTI-SPECIALITY HOSPITAL</h1><div class="meta">Detailed Billing & Collection Report • Generated ${new Date().toLocaleString()}</div><div class="summary"><div class="box">Total Bills<b>₹${total.toLocaleString('en-IN')}</b></div><div class="box">Collected<b>₹${paid.toLocaleString('en-IN')}</b></div><div class="box">Balance Due<b>₹${Math.max(0,total-paid).toLocaleString('en-IN')}</b></div><div class="box">Invoices<b>${list.length}</b></div></div><table><thead><tr><th>Invoice</th><th>Patient</th><th>Doctor</th><th>Service</th><th>Total</th><th>Paid</th><th>Due</th><th>Date</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);w.document.close();w.focus();setTimeout(()=>w.print(),300);
  };
  document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>renderBillingAnalytics(''),350));
})();

/* =========================================================
   NURSING DEPARTMENT — FUNCTIONAL V2 ENHANCEMENT
========================================================= */
(function(){
  function nurseRows(){return typeof getPremiumRows==='function'?getPremiumRows('nursing'):[];}
  function refreshNursingStats(){
    const page=document.getElementById('nursing');if(!page)return;
    const rows=nurseRows();const on=rows.filter(r=>/on duty/i.test(r[4]||'')).length;const available=rows.filter(r=>/available/i.test(r[4]||'')).length;
    page.querySelectorAll('.mc-v3-kpis .mc-v3-kpi strong').forEach((el,i)=>{if(i===0)el.textContent=rows.length;if(i===2)el.textContent=on;});
    const coverage=rows.length?Math.min(100,Math.round(((on+available)/rows.length)*100)):0;
    page.querySelectorAll('.mc-coverage-grid strong').forEach((el,i)=>{if(i===0)el.textContent=on;if(i===2)el.textContent=rows.length;if(i===3)el.textContent=coverage+'%';});
    const ring=page.querySelector('.mc-ring');if(ring)ring.style.background=`conic-gradient(#7de0cf 0 ${coverage}%,rgba(255,255,255,.18) ${coverage}% 100%)`;
    const pill=page.querySelector('.roster-pill');if(pill)pill.textContent=on+' On Duty';
  }
  const oldLoad=window.loadPremiumModule;
  if(oldLoad){
    window.loadPremiumModule=function(key){oldLoad(key);if(key==='nursing')setTimeout(refreshNursingStats,0);};
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(refreshNursingStats,500));
})();

/* =========================================================
   MEDCARE HMS — PATIENT-WISE CLINICAL REPORTS + MODULE POLISH V5
========================================================= */
(function(){
  const esc = v => (typeof escapeHTML==='function' ? escapeHTML(String(v ?? '')) : String(v ?? ''));
  const money = v => typeof formatCurrency==='function' ? formatCurrency(Number(v)||0) : `₹${Number(v||0).toLocaleString('en-IN')}`;

  function patientClinicalData(patient){
    const appointments=getData('medcareAppointments').filter(a=>a.patient===patient.name);
    const doctors=getData('medcareDoctors');
    const latest=appointments[appointments.length-1]||{};
    const doctor=doctors.find(d=>d.name===latest.doctor)||doctors.find(d=>d.name===patient.doctor)||null;
    const invoices=getData('medcareInvoices').filter(i=>i.patient===patient.name);
    const prescription=patient.prescription||{};
    const diagnosis=prescription.diagnosis||patient.diagnosis||patient.medicalDetails||'Not recorded';
    const medicines=Array.isArray(prescription.medicines)?prescription.medicines:[];
    return {appointments,latest,doctor,invoices,prescription,diagnosis,medicines};
  }

  window.openPatientClinicalReport=function(id){
    const patient=getData('medcarePatients').find(p=>p.id===id); if(!patient)return;
    const d=patientClinicalData(patient);
    const total=d.invoices.reduce((s,i)=>s+(Number(i.amount)||0),0);
    const paid=d.invoices.reduce((s,i)=>s+(Number(i.paid)||Number(i.paidAmount)||0),0);
    const due=Math.max(0,total-paid);
    const reportModal=document.getElementById('reportViewModal');
    const content=document.getElementById('reportModalContent');
    const title=document.getElementById('reportModalTitle');
    if(!reportModal||!content)return;
    if(title)title.textContent=`${patient.name} • Clinical Report`;
    content.innerHTML=`
      <div class="patient-clinical-report">
        <div class="pcr-head">
          <div><span class="premium-eyebrow">PATIENT-WISE REPORT</span><h2>${esc(patient.name)}</h2><p>${esc(patient.id)} • Generated ${new Date().toLocaleString()}</p></div>
          <div class="pcr-actions"><button class="report-action-btn" onclick="viewPatient('${esc(patient.id)}')"><i data-lucide="file-text"></i> Open Full Record</button><button class="report-action-btn primary" onclick="printPatientClinicalReport('${esc(patient.id)}')"><i data-lucide="printer"></i> Print / Save PDF</button></div>
        </div>
        <div class="pcr-kpis">
          <div><span>Age / Gender</span><strong>${esc(patient.age)} / ${esc(patient.gender)}</strong></div>
          <div><span>Blood Group</span><strong>${esc(patient.bloodGroup||'Not recorded')}</strong></div>
          <div><span>Visits</span><strong>${d.appointments.length}</strong></div>
          <div><span>Balance Due</span><strong>${money(due)}</strong></div>
        </div>
        <div class="pcr-grid">
          <section class="pcr-panel"><h3><i data-lucide="user-round"></i> Patient Information</h3><div class="pcr-fields">
            <div><span>Patient ID</span><b>${esc(patient.id)}</b></div><div><span>Phone</span><b>${esc(patient.phone||'Not recorded')}</b></div>
            <div><span>Address</span><b>${esc(patient.address||'Not recorded')}</b></div><div><span>Allergies</span><b>${esc(patient.allergies||'No allergy recorded')}</b></div>
            <div><span>Emergency Contact</span><b>${esc(patient.emergencyName||'Not recorded')}${patient.emergencyPhone?' • '+esc(patient.emergencyPhone):''}</b></div><div><span>Profession</span><b>${esc(patient.profession||'Not recorded')}</b></div>
          </div></section>
          <section class="pcr-panel"><h3><i data-lucide="stethoscope"></i> Clinical Assessment</h3>
            <div class="pcr-highlight"><span>Latest Diagnosis / Clinical Impression</span><strong>${esc(d.diagnosis)}</strong></div>
            <div class="pcr-two"><div><span>Chief Complaint</span><b>${esc(patient.complaint||'Not recorded')}</b></div><div><span>Latest Visit</span><b>${esc(d.latest.date||'Not recorded')}</b></div></div>
            <div class="pcr-two"><div><span>Consulting Doctor</span><b>${esc(d.doctor?.name||'Not assigned')}</b></div><div><span>Specialization</span><b>${esc(d.doctor?.specialization||d.doctor?.department||'Not recorded')}</b></div></div>
          </section>
          <section class="pcr-panel"><h3><i data-lucide="pill"></i> Prescription & Treatment</h3>
            ${d.medicines.length?`<div class="pcr-meds">${d.medicines.map((m,i)=>`<div><strong>${i+1}. ${esc(m.name)}</strong><span>${esc(m.dose||'')} • ${esc(m.frequency||'')} • ${esc(m.duration||'')}</span></div>`).join('')}</div>`:'<div class="pcr-empty">No prescription medicines recorded for this patient.</div>'}
            <div class="pcr-note"><span>Doctor's Notes</span><b>${esc(d.prescription.advice||'No doctor notes recorded.')}</b></div>
            <div class="pcr-note"><span>Follow-up</span><b>${esc(d.prescription.followup||'Not recorded')}</b></div>
          </section>
          <section class="pcr-panel"><h3><i data-lucide="receipt"></i> Billing Summary</h3>
            <div class="pcr-billing"><div><span>Total</span><strong>${money(total)}</strong></div><div><span>Paid</span><strong>${money(paid)}</strong></div><div><span>Due</span><strong>${money(due)}</strong></div></div>
            <div class="pcr-table-wrap"><table><thead><tr><th>Invoice</th><th>Service</th><th>Amount</th><th>Status</th></tr></thead><tbody>${d.invoices.length?d.invoices.map(i=>`<tr><td>${esc(i.id||'-')}</td><td>${esc(i.service||i.diagnosis||'Hospital Service')}</td><td>${money(i.amount)}</td><td>${esc(i.status||'Pending')}</td></tr>`).join(''):'<tr><td colspan="4">No billing record found.</td></tr>'}</tbody></table></div>
          </section>
          <section class="pcr-panel pcr-wide"><h3><i data-lucide="calendar-check"></i> Visit / Appointment History</h3>
            <div class="pcr-table-wrap"><table><thead><tr><th>Date</th><th>Time</th><th>Doctor</th><th>Reason</th><th>Status</th></tr></thead><tbody>${d.appointments.length?d.appointments.map(a=>`<tr><td>${esc(a.date||'-')}</td><td>${esc(a.time||'-')}</td><td>${esc(a.doctor||'Not assigned')}</td><td>${esc(a.reason||a.notes||'Consultation')}</td><td>${esc(a.status||'Scheduled')}</td></tr>`).join(''):'<tr><td colspan="5">No appointment history recorded.</td></tr>'}</tbody></table></div>
          </section>
        </div>
        <div class="pcr-disclaimer"><i data-lucide="info"></i><span>This report displays information currently stored in the MedCare HMS demo records. Missing clinical fields are shown as “Not recorded” rather than being invented.</span></div>
      </div>`;
    openModal('reportViewModal');
    if(window.lucide)lucide.createIcons();
  };

  window.printPatientClinicalReport=function(id){
    const patient=getData('medcarePatients').find(p=>p.id===id); if(!patient)return;
    const d=patientClinicalData(patient); const total=d.invoices.reduce((s,i)=>s+(Number(i.amount)||0),0); const paid=d.invoices.reduce((s,i)=>s+(Number(i.paid)||Number(i.paidAmount)||0),0); const due=Math.max(0,total-paid);
    const w=window.open('','_blank','width=1050,height=900'); if(!w){showToast('Please allow pop-ups to print the report');return;}
    const meds=d.medicines.length?d.medicines.map(m=>`<li><b>${esc(m.name)}</b> — ${esc(m.dose||'')} • ${esc(m.frequency||'')} • ${esc(m.duration||'')}</li>`).join(''):'<li>No prescription medicines recorded.</li>';
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Clinical Report - ${esc(patient.name)}</title><style>body{font-family:Arial;color:#173b4c;background:#f5f8fa;padding:28px}.sheet{max-width:950px;margin:auto;background:#fff;padding:30px;border:1px solid #dce8ec}.head{border-bottom:3px solid #0f8b8d;padding-bottom:18px}.head h1{margin:0;font-size:25px}.head p{color:#6b7e87}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}.box{border:1px solid #dce8ec;border-radius:10px;padding:14px}.box h3{margin:0 0 10px;color:#0f7f88}.field{margin:7px 0}.field span{display:block;color:#82939b;font-size:10px;text-transform:uppercase}.field b{font-size:12px}.wide{grid-column:1/-1}table{width:100%;border-collapse:collapse;margin-top:10px}th,td{text-align:left;padding:9px;border-bottom:1px solid #e5ecef;font-size:11px}th{background:#f3f8f8}li{margin:7px 0;font-size:11px}.billing{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.billing div{padding:12px;background:#f5f9fa;border-radius:9px}.billing span{display:block;font-size:10px;color:#758992}.billing b{font-size:16px}.foot{margin-top:20px;color:#71848c;font-size:10px}@media print{body{background:#fff;padding:0}.sheet{border:0}}</style></head><body><div class="sheet"><div class="head"><h1>MEDCARE MULTI-SPECIALITY HOSPITAL</h1><p>Patient Clinical Report • ${esc(patient.name)} • ${esc(patient.id)}</p></div><div class="grid"><div class="box"><h3>Patient Information</h3><div class="field"><span>Age / Gender</span><b>${esc(patient.age)} / ${esc(patient.gender)}</b></div><div class="field"><span>Blood Group</span><b>${esc(patient.bloodGroup||'Not recorded')}</b></div><div class="field"><span>Phone</span><b>${esc(patient.phone||'Not recorded')}</b></div><div class="field"><span>Address</span><b>${esc(patient.address||'Not recorded')}</b></div></div><div class="box"><h3>Clinical Assessment</h3><div class="field"><span>Diagnosis</span><b>${esc(d.diagnosis)}</b></div><div class="field"><span>Complaint</span><b>${esc(patient.complaint||'Not recorded')}</b></div><div class="field"><span>Doctor</span><b>${esc(d.doctor?.name||'Not assigned')}</b></div><div class="field"><span>Latest Visit</span><b>${esc(d.latest.date||'Not recorded')}</b></div></div><div class="box wide"><h3>Prescription & Treatment</h3><ul>${meds}</ul><div class="field"><span>Doctor's Notes</span><b>${esc(d.prescription.advice||'No doctor notes recorded.')}</b></div><div class="field"><span>Follow-up</span><b>${esc(d.prescription.followup||'Not recorded')}</b></div></div><div class="box wide"><h3>Billing Summary</h3><div class="billing"><div><span>Total</span><b>${money(total)}</b></div><div><span>Paid</span><b>${money(paid)}</b></div><div><span>Due</span><b>${money(due)}</b></div></div></div><div class="box wide"><h3>Visit History</h3><table><tr><th>Date</th><th>Doctor</th><th>Reason</th><th>Status</th></tr>${d.appointments.map(a=>`<tr><td>${esc(a.date||'-')}</td><td>${esc(a.doctor||'-')}</td><td>${esc(a.reason||a.notes||'Consultation')}</td><td>${esc(a.status||'Scheduled')}</td></tr>`).join('')||'<tr><td colspan="4">No appointment history recorded.</td></tr>'}</table></div></div><div class="foot">Generated from currently stored MedCare HMS records. Missing information is shown as “Not recorded”.</div></div></body></html>`);
    w.document.close();w.focus();setTimeout(()=>w.print(),350);
  };

  const baseOpenReport=window.openReport;
  window.openReport=function(type){
    baseOpenReport&&baseOpenReport(type);
    if(type!=='patients')return;
    setTimeout(()=>{
      const content=document.getElementById('reportModalContent'); if(!content)return;
      const patients=getData('medcarePatients');
      const host=content.querySelector('.report-view'); if(!host)return;
      const old=host.querySelector('.patient-wise-report-list'); if(old)old.remove();
      const section=document.createElement('section'); section.className='patient-wise-report-list';
      section.innerHTML=`<div class="pwr-head"><div><span class="premium-eyebrow">INDIVIDUAL REPORTS</span><h3>Patient-wise Clinical Reports</h3><p>Open a separate report for each registered patient.</p></div><div class="pwr-search"><i data-lucide="search"></i><input placeholder="Search patient name or ID..." oninput="filterPatientClinicalReports(this.value)"></div></div><div class="pwr-grid">${patients.map(p=>{const d=patientClinicalData(p);return `<div class="pwr-card" data-search="${esc((p.name||'')+' '+(p.id||''))}"><div class="pwr-avatar">${esc(getInitials(p.name||'?'))}</div><div class="pwr-main"><h4>${esc(p.name)}</h4><span>${esc(p.id)} • ${esc(p.age)} yrs • ${esc(p.gender)}</span><small>Diagnosis: ${esc(d.diagnosis)}</small></div><button onclick="openPatientClinicalReport('${esc(p.id)}')">View Full Report <i data-lucide="arrow-right"></i></button></div>`}).join('')||'<div class="pcr-empty">No patients registered yet.</div>'}</div>`;
      host.appendChild(section); if(window.lucide)lucide.createIcons();
    },120);
  };
  window.filterPatientClinicalReports=function(value){const q=String(value||'').toLowerCase().trim();document.querySelectorAll('.pwr-card').forEach(c=>c.style.display=!q||c.dataset.search.toLowerCase().includes(q)?'':'none');};

  // Keep ICU presentation compact: summary + four monitoring cards, without oversized dashboard blocks.
  const oldVisual=window.premiumVisualMarkup;
  if(typeof oldVisual==='function'){
    window.premiumVisualMarkup=function(key){
      if(key==='icu') return `<div class="premium-visual-panel icu-compact-panel"><div class="visual-panel-head"><div><span>CRITICAL CARE</span><h3>Compact ICU Bed Monitor</h3></div><span class="live-dot">● LIVE</span></div><div class="icu-compact-grid">${[['ICU-01','Critical','SpO₂ 88%','HR 118'],['ICU-04','Serious','SpO₂ 94%','HR 102'],['ICU-09','Stable','SpO₂ 97%','HR 82'],['ICU-14','Available','Ready','No patient']].map(x=>`<div class="icu-compact-card"><div><strong>${x[0]}</strong><span class="icu-state ${x[1].toLowerCase()}">${x[1]}</span></div><p>${x[2]} <b>${x[3]}</b></p></div>`).join('')}</div></div>`;
      return oldVisual(key);
    };
  }
})();

/* =========================================================
   MEDCARE HMS — UPGRADE 5 INTERACTION POLISH
========================================================= */
(function(){
  // Department slider controls: cards remain inside their boxes.
  function setupDepartmentSlider(){
    const grid=document.getElementById('departmentGrid');
    if(!grid || grid.dataset.sliderReady==='1') return;
    grid.dataset.sliderReady='1';
    const controls=document.createElement('div');
    controls.className='department-slider-controls';
    controls.innerHTML='<button type="button" aria-label="Previous departments" onclick="slideDepartments(-1)"><i data-lucide="chevron-left"></i></button><button type="button" aria-label="Next departments" onclick="slideDepartments(1)"><i data-lucide="chevron-right"></i></button>';
    grid.parentNode.insertBefore(controls,grid.nextSibling);
    if(window.lucide) lucide.createIcons();
  }
  window.slideDepartments=function(dir){
    const grid=document.getElementById('departmentGrid');
    if(!grid) return;
    const card=grid.querySelector('.department-card');
    const step=card ? card.getBoundingClientRect().width + 16 : 320;
    grid.scrollBy({left:dir*step,behavior:'smooth'});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setupDepartmentSlider); else setupDepartmentSlider();

  // Keep the current premium ICU renderer, but add practical tools and a visual media area.
  const previousVisual=window.premiumVisualMarkup;
  if(typeof previousVisual==='function'){
    window.premiumVisualMarkup=function(key){
      if(key==='icu'){
        const base=previousVisual(key);
        const extra=`
          <div class="icu-tool-row">
            <button class="icu-tool-btn" onclick="openPremiumModal('icu',0,'view')"><i data-lucide="monitor-heart"></i>Bed Monitor</button>
            <button class="icu-tool-btn" onclick="openPremiumModal('icu',0,'edit')"><i data-lucide="pencil"></i>Update Vitals</button>
            <button class="icu-tool-btn" onclick="premiumAction('icu','ICU Roster')"><i data-lucide="users"></i>ICU Roster</button>
            <button class="icu-tool-btn" onclick="premiumAction('icu','ICU Team')"><i data-lucide="user-round-check"></i>Care Team</button>
            <button class="icu-tool-btn" onclick="downloadPremiumModule('icu')"><i data-lucide="download"></i>Export ICU</button>
          </div>
          <div class="icu-media-strip">
            <div class="icu-media-card">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80" alt="Hospital critical care environment">
              <div class="icu-media-overlay"><span>CRITICAL CARE ENVIRONMENT</span><h4>ICU Monitoring & Patient Care</h4></div>
            </div>
            <div class="icu-media-card icu-video-card">
              <div class="play"><i data-lucide="play"></i></div>
              <h4>ICU Monitoring Demo</h4>
              <p>Use the tools above to open the bed monitor, update patient vitals, view the care team and export ICU records.</p>
              <button class="icu-tool-btn" style="margin-top:12px" onclick="openPremiumModal('icu',0,'view')"><i data-lucide="external-link"></i>Open Monitor</button>
            </div>
          </div>`;
        return base+extra;
      }
      return previousVisual(key);
    };
  }

  // Re-render icons when an ICU page is opened after the dynamic module is built.
  const oldLoader=window.loadPremiumModule;
  if(typeof oldLoader==='function'){
    window.loadPremiumModule=function(key){
      oldLoader(key);
      setTimeout(()=>{ if(window.lucide) lucide.createIcons(); setupDepartmentSlider(); },80);
    };
  }
})();

/* =========================================================
   MEDCARE HMS — DEPARTMENT + BILLING SLIDERS / REPORT POLISH V6
========================================================= */
(function(){
  let deptIndex=0;
  let billIndex=0;
  function cardsPerView(){return window.innerWidth<=650?1:window.innerWidth<=1000?2:4;}
  window.slideDepartments=function(dir){
    const grid=document.getElementById('departmentGrid'); if(!grid)return;
    const cards=[...grid.children]; const max=Math.max(0,cards.length-cardsPerView());
    deptIndex=Math.max(0,Math.min(max,deptIndex+dir));
    const step=cards[0]?.getBoundingClientRect().width||0; const gap=parseFloat(getComputedStyle(grid).gap)||18;
    grid.style.transform=`translateX(-${deptIndex*(step+gap)}px)`;
    const label=document.getElementById('departmentSlideLabel'); if(label)label.textContent=`Showing departments ${deptIndex+1}–${Math.min(cards.length,deptIndex+cardsPerView())}`;
    const dots=document.getElementById('departmentDots'); if(dots){const pages=Math.max(1,Math.ceil(cards.length/cardsPerView()));dots.innerHTML=Array.from({length:pages},(_,i)=>`<button class="dept-dot ${i===Math.floor(deptIndex/cardsPerView())?'active':''}" onclick="slideDepartments(${i*cardsPerView()-deptIndex})" aria-label="Department page ${i+1}"></button>`).join('');}
  };
  window.slideBillingLedger=function(dir){
    const ledger=document.getElementById('billingLedger'); if(!ledger)return;
    const rows=[...ledger.children].filter(x=>x.classList.contains('billing-patient-ledger-row')); if(!rows.length)return;
    const visible=window.innerWidth<=700?1:2; const max=Math.max(0,rows.length-visible); billIndex=Math.max(0,Math.min(max,billIndex+dir));
    const step=rows[0]?.getBoundingClientRect().height||0; const gap=parseFloat(getComputedStyle(ledger).gap)||10;
    ledger.style.transform=`translateY(-${billIndex*(step+gap)}px)`;
    const label=document.getElementById('billingLedgerLabel'); if(label)label.textContent=`Patients ${billIndex+1}–${Math.min(rows.length,billIndex+visible)} of ${rows.length}`;
    const dots=document.getElementById('billingLedgerDots'); if(dots){const pages=Math.max(1,Math.ceil(rows.length/visible));dots.innerHTML=Array.from({length:pages},(_,i)=>`<button class="bill-dot ${i===Math.floor(billIndex/visible)?'active':''}" onclick="slideBillingLedger(${i*visible-billIndex})" aria-label="Billing page ${i+1}"></button>`).join('');}
  };
  function resetBillSlider(){billIndex=0;const l=document.getElementById('billingLedger');if(l)l.style.transform='translateY(0)';setTimeout(()=>slideBillingLedger(0),20);}
  const oldRender=window.renderBillingAnalytics;
  if(oldRender){window.renderBillingAnalytics=function(q){oldRender(q);resetBillSlider();};}
  window.downloadNursingWord=function(){
    const rows=typeof getPremiumRows==='function'?getPremiumRows('nursing'):[];
    const tr=rows.map(r=>`<tr>${r.map(v=>`<td style="border:1px solid #d9e3ea;padding:8px;font-size:11px">${escapeHTML(v)}</td>`).join('')}</tr>`).join('');
    const doc=`<!doctype html><html><head><meta charset="utf-8"><title>MedCare HMS - Nursing Report</title></head><body><h1 style="color:#155eef">MEDCARE HMS — Nursing Department Report</h1><p>Nursing staff roster, unit, shift and status.</p><table style="border-collapse:collapse;width:100%"><thead><tr>${['Staff ID','Nurse / Role','Unit','Shift','Status'].map(x=>`<th style="border:1px solid #d9e3ea;padding:8px;background:#eef4ff;text-align:left">${x}</th>`).join('')}</tr></thead><tbody>${tr}</tbody></table></body></html>`;
    downloadFile(doc,'MedCare_Nursing_Report.doc','application/msword');
    if(typeof showToast==='function')showToast('Nursing Word report downloaded');
  };
  window.printNursingReport=function(){
    const rows=typeof getPremiumRows==='function'?getPremiumRows('nursing'):[];
    const w=window.open('','_blank','width=1100,height=800'); if(!w){if(typeof showToast==='function')showToast('Please allow pop-ups for the nursing report');return;}
    const tr=rows.map(r=>`<tr>${r.map(v=>`<td>${escapeHTML(v)}</td>`).join('')}</tr>`).join('');
    w.document.write(`<!doctype html><html><head><title>MedCare HMS - Nursing Report</title><style>body{font-family:Arial;padding:28px;color:#173042}h1{margin:0;color:#155eef}p{color:#6b7c86}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #d9e3ea;padding:10px;text-align:left;font-size:12px}th{background:#eef4ff}@media print{button{display:none}}</style></head><body><h1>MEDCARE HMS — Nursing Department Report</h1><p>Staff roster, units, shifts and current status • Generated ${new Date().toLocaleString()}</p><table><thead><tr><th>Staff ID</th><th>Nurse / Role</th><th>Unit</th><th>Shift</th><th>Status</th></tr></thead><tbody>${tr}</tbody></table><button onclick="window.print()">Print / Save PDF</button></body></html>`);w.document.close();
  };
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{slideDepartments(0);slideBillingLedger(0);},500);});
  window.addEventListener('resize',()=>{setTimeout(()=>slideDepartments(0),50);});
})();


/* =========================================================
   V14 — SETTINGS CONTROLS + SEARCH / CAROUSEL POLISH
========================================================= */
(function(){
  function injectSettingsControls(){
    const page=document.getElementById('settings');
    if(!page || page.querySelector('.settings-control-strip')) return;
    const grid=page.querySelector('.three-grid'); if(!grid) return;
    const box=document.createElement('div');
    box.className='settings-control-strip';
    box.innerHTML=`<div class="settings-control-head"><div><strong>System Quick Controls</strong><span>Manage common demo preferences from one place.</span></div><span>MedCare HMS</span></div>
      <div class="settings-control-actions">
        <button type="button" onclick="saveMedcareSettings()"><i data-lucide="save"></i>Save Settings</button>
        <button type="button" onclick="exportMedcareSettings()"><i data-lucide="download"></i>Export Settings</button>
        <button type="button" onclick="toggleMedcareCompact()"><i data-lucide="layout-panel-top"></i>Compact View</button>
        <button type="button" onclick="showMedcareSettingsStatus()"><i data-lucide="circle-check"></i>System Status</button>
      </div>`;
    grid.insertAdjacentElement('afterend',box);
    if(window.lucide) lucide.createIcons();
  }
  window.saveMedcareSettings=function(){
    const payload={hospital:'MedCare Multi-Speciality Hospital',location:'New Delhi, India',savedAt:new Date().toISOString()};
    localStorage.setItem('medcareSettings',JSON.stringify(payload));
    if(typeof showToast==='function') showToast('Hospital settings saved');
  };
  window.exportMedcareSettings=function(){
    const payload=localStorage.getItem('medcareSettings')||JSON.stringify({hospital:'MedCare Multi-Speciality Hospital',location:'New Delhi, India'});
    if(typeof downloadFile==='function') downloadFile(payload,'MedCare_Settings.json','application/json');
    if(typeof showToast==='function') showToast('Settings exported');
  };
  window.toggleMedcareCompact=function(){
    document.body.classList.toggle('medcare-compact-view');
    localStorage.setItem('medcareCompact',document.body.classList.contains('medcare-compact-view')?'1':'0');
    if(typeof showToast==='function') showToast(document.body.classList.contains('medcare-compact-view')?'Compact view enabled':'Compact view disabled');
  };
  window.showMedcareSettingsStatus=function(){
    const p=getStatus();
    if(typeof showToast==='function') showToast(`System ready • Patients ${p.patients} • Doctors ${p.doctors} • Invoices ${p.invoices}`);
  };
  function getStatus(){
    const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]').length}catch(e){return 0}};
    return {patients:read('medcarePatients'),doctors:read('medcareDoctors'),invoices:read('medcareInvoices')};
  }
  const oldFilter=window.filterDepartments;
  if(typeof oldFilter==='function'){
    window.filterDepartments=function(value){oldFilter(value);setTimeout(()=>{const g=document.getElementById('departmentGrid');if(g)g.style.transform='translateX(0)';},0);};
  }
  document.addEventListener('DOMContentLoaded',()=>{injectSettingsControls();if(localStorage.getItem('medcareCompact')==='1')document.body.classList.add('medcare-compact-view');});
  window.addEventListener('load',()=>setTimeout(injectSettingsControls,150));
})();


/* =========================================================
   FINAL DEPARTMENT VIEW — ALL 8 CARDS
========================================================= */
window.viewDepartment = function(card){
    if(!card) return;
    const name = card.querySelector('h3')?.textContent?.trim() || 'Department';
    if(typeof showToast === 'function') showToast(`${name} department selected`);
};

/* Keep department filtering, but never move the grid like a carousel. */
const finalDepartmentFilter = window.filterDepartments;
window.filterDepartments = function(value){
    const q=String(value||'').trim().toLowerCase();
    document.querySelectorAll('#departmentGrid .department-card').forEach(card=>{
        card.style.display = !q || card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
    const grid=document.getElementById('departmentGrid');
    if(grid) grid.style.transform='none';
};
window.slideDepartments = function(){
    const grid=document.getElementById('departmentGrid');
    if(grid) grid.style.transform='none';
};

/* =========================================================
   DEPARTMENT DETAILS MODAL — FULL INFORMATION VIEW
========================================================= */
(function(){
  const departmentDetails = {
    Cardiology:{icon:'heart-pulse',doctors:'12',status:'Available',hours:'24/7 emergency support',focus:'Heart and cardiovascular care',services:['ECG & cardiac monitoring','Cardiac consultation','Blood pressure & heart-health assessment','Emergency cardiac support'],facilities:['Cardiac monitoring','ECG support','Emergency response','Specialist consultation']},
    Neurology:{icon:'brain',doctors:'9',status:'Available',hours:'Mon–Sat • 9:00 AM–6:00 PM',focus:'Brain, spine and nervous-system care',services:['Neurology consultation','Nervous-system assessment','Headache & migraine evaluation','Neurological follow-up'],facilities:['Specialist consultation','Diagnostic coordination','Patient monitoring','Follow-up care']},
    Pediatrics:{icon:'baby',doctors:'8',status:'Available',hours:'Mon–Sat • 9:00 AM–8:00 PM',focus:'Healthcare services for children',services:['Child health consultation','Growth & development assessment','Pediatric check-up','Vaccination guidance'],facilities:['Child-friendly consultation','Routine check-ups','Observation support','Parent guidance']},
    Orthopedics:{icon:'bone',doctors:'7',status:'Available',hours:'Mon–Sat • 9:00 AM–6:00 PM',focus:'Bones, joints and musculoskeletal care',services:['Orthopedic consultation','Joint & bone assessment','Muscle and mobility evaluation','Follow-up care'],facilities:['Specialist consultation','Mobility assessment','Diagnostic coordination','Recovery follow-up']},
    Ophthalmology:{icon:'eye',doctors:'6',status:'Available',hours:'Mon–Sat • 9:00 AM–6:00 PM',focus:'Complete eye care, diagnosis and surgery',services:['Eye examination','Vision assessment','Eye-disease consultation','Surgery consultation'],facilities:['Eye examination','Vision screening','Diagnostic support','Specialist consultation']},
    Emergency:{icon:'activity',doctors:'24/7 team',status:'Open 24/7',hours:'24 hours • 7 days',focus:'Emergency medical and trauma services',services:['Emergency assessment','Trauma support','Urgent medical care','Emergency observation'],facilities:['24/7 emergency desk','Rapid assessment','Observation support','Emergency coordination']},
    Radiology:{icon:'scan',doctors:'6+',status:'Available',hours:'Mon–Sat • 8:00 AM–8:00 PM',focus:'Imaging, scans, X-rays and diagnostics',services:['X-ray imaging','Diagnostic scans','Imaging consultation','Report coordination'],facilities:['Digital imaging support','X-ray services','Diagnostic reporting','Doctor coordination']},
    Laboratory:{icon:'flask-conical',doctors:'Lab team',status:'Available',hours:'Mon–Sat • 7:00 AM–8:00 PM',focus:'Medical tests and laboratory diagnostics',services:['Blood tests','Urine tests','Routine pathology tests','Diagnostic sample processing'],facilities:['Sample collection','Test processing','Result reporting','Diagnostic coordination']}
  };

  function esc(value){
    return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function ensureModal(){
    let modal=document.getElementById('departmentDetailsModal');
    if(modal) return modal;
    modal=document.createElement('div');
    modal.id='departmentDetailsModal';
    modal.className='department-details-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML=`
      <div class="department-details-backdrop" data-dept-close></div>
      <section class="department-details-dialog" role="dialog" aria-modal="true" aria-labelledby="departmentDetailsTitle">
        <button class="department-details-close" type="button" aria-label="Close department details" data-dept-close><i data-lucide="x"></i></button>
        <div class="department-details-hero">
          <div class="department-details-icon" id="departmentDetailsIcon"><i data-lucide="building-2"></i></div>
          <div class="department-details-heading">
            <span>MEDCARE HMS • DEPARTMENT</span>
            <h2 id="departmentDetailsTitle">Department</h2>
            <p id="departmentDetailsFocus">Department information</p>
          </div>
          <div class="department-details-status" id="departmentDetailsStatus">Available</div>
        </div>
        <div class="department-details-stats" id="departmentDetailsStats"></div>
        <div class="department-details-body">
          <div class="department-details-section">
            <div class="department-details-section-title"><i data-lucide="stethoscope"></i><h3>Services & Care</h3></div>
            <div class="department-detail-list" id="departmentDetailsServices"></div>
          </div>
          <div class="department-details-section">
            <div class="department-details-section-title"><i data-lucide="hospital"></i><h3>Facilities & Support</h3></div>
            <div class="department-detail-list" id="departmentDetailsFacilities"></div>
          </div>
        </div>
        <div class="department-details-note"><i data-lucide="info"></i><span>This department information is part of the MedCare HMS project interface and can be updated from the system data.</span></div>
      </section>`;
    document.body.appendChild(modal);
    modal.querySelectorAll('[data-dept-close]').forEach(el=>el.addEventListener('click',closeModal));
    if(window.lucide && typeof window.lucide.createIcons==='function') window.lucide.createIcons();
    return modal;
  }

  function listMarkup(items){
    return items.map(item=>`<div class="department-detail-item"><i data-lucide="check-circle-2"></i><span>${esc(item)}</span></div>`).join('');
  }

  function openModal(name){
    const data=departmentDetails[name] || departmentDetails.CardioLOGY || null;
    if(!data) return;
    const modal=ensureModal();
    modal.querySelector('#departmentDetailsTitle').textContent=name;
    modal.querySelector('#departmentDetailsFocus').textContent=data.focus;
    modal.querySelector('#departmentDetailsStatus').textContent=data.status;
    modal.querySelector('#departmentDetailsStats').innerHTML=`
      <div><small>Doctors / Team</small><strong>${esc(data.doctors)}</strong></div>
      <div><small>Service Hours</small><strong>${esc(data.hours)}</strong></div>
      <div><small>Department Type</small><strong>Specialist Care</strong></div>`;
    modal.querySelector('#departmentDetailsServices').innerHTML=listMarkup(data.services);
    modal.querySelector('#departmentDetailsFacilities').innerHTML=listMarkup(data.facilities);
    const icon=modal.querySelector('#departmentDetailsIcon');
    icon.innerHTML=`<i data-lucide="${esc(data.icon)}"></i>`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('department-modal-open');
    if(window.lucide && typeof window.lucide.createIcons==='function') window.lucide.createIcons();
    setTimeout(()=>modal.querySelector('.department-details-close')?.focus(),30);
  }

  function closeModal(){
    const modal=document.getElementById('departmentDetailsModal');
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('department-modal-open');
  }

  window.viewDepartment=function(card){
    if(!card) return;
    const name=card.querySelector('h3')?.textContent?.trim() || 'Department';
    openModal(name);
  };
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});
})();
