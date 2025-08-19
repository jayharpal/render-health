
export const dummyMembers: any[] = [
    {
        _id: '1',
        createdAt: '2023-05-05',
        memberName: 'Ariana Morrow',
        patientId: '5326086967',
        dateOfBirth: '',
        typeOfRegister: 'Patient',
        registeredBy: '',
        hospitalName: '',
    },
    {
        _id: '2',
        createdAt: '2023-06-10',
        memberName: 'James Carter',
        patientId: '6543219870',
        dateOfBirth: '1990-04-12',
        typeOfRegister: 'Patient',
        registeredBy: 'Admin',
        hospitalName: 'City Hospital',
    },
    {
        _id: '3',
        createdAt: '2023-06-15',
        memberName: 'Sophia Williams',
        patientId: '9876543210',
        dateOfBirth: '',
        typeOfRegister: 'Doctor',
        registeredBy: 'Super Admin',
        hospitalName: 'General Hospital',
    },
    {
        _id: '4',
        createdAt: '2023-07-01',
        memberName: 'Liam Smith',
        patientId: '1122334455',
        dateOfBirth: '1988-02-28',
        typeOfRegister: 'Patient',
        registeredBy: 'Admin',
        hospitalName: '',
    },
    {
        _id: '5',
        createdAt: '2023-07-05',
        memberName: 'Olivia Johnson',
        patientId: '2233445566',
        dateOfBirth: '',
        typeOfRegister: 'Nurse',
        registeredBy: 'Super Admin',
        hospitalName: 'Wellness Center',
    },
    {
        _id: '6',
        createdAt: '2023-08-12',
        memberName: 'Noah Brown',
        patientId: '3344556677',
        dateOfBirth: '',
        typeOfRegister: 'Patient',
        registeredBy: '',
        hospitalName: '',
    },
    {
        _id: '7',
        createdAt: '2023-08-20',
        memberName: 'Emma Davis',
        patientId: '4455667788',
        dateOfBirth: '1995-06-18',
        typeOfRegister: 'Patient',
        registeredBy: 'Admin',
        hospitalName: 'Sunrise Hospital',
    },
    {
        _id: '8',
        createdAt: '2023-09-01',
        memberName: 'William Martinez',
        patientId: '5566778899',
        dateOfBirth: '',
        typeOfRegister: 'Doctor',
        registeredBy: '',
        hospitalName: '',
    },
    {
        _id: '9',
        createdAt: '2023-09-10',
        memberName: 'Isabella Garcia',
        patientId: '6677889900',
        dateOfBirth: '',
        typeOfRegister: 'Patient',
        registeredBy: 'Super Admin',
        hospitalName: 'Metro Clinic',
    },
    {
        _id: '10',
        createdAt: '2023-09-15',
        memberName: 'Ethan Wilson',
        patientId: '7788990011',
        dateOfBirth: '',
        typeOfRegister: 'Nurse',
        registeredBy: 'Admin',
        hospitalName: '',
    },
    {
        _id: '11',
        createdAt: '2023-09-18',
        memberName: 'Mia Anderson',
        patientId: '8899001122',
        dateOfBirth: '',
        typeOfRegister: 'Patient',
        registeredBy: '',
        hospitalName: 'Central Hospital',
    },
    {
        _id: '12',
        createdAt: '2023-09-20',
        memberName: 'Lucas Thomas',
        patientId: '9900112233',
        dateOfBirth: '',
        typeOfRegister: 'Patient',
        registeredBy: 'Super Admin',
        hospitalName: '',
    },
    {
        _id: '13',
        createdAt: '2023-09-25',
        memberName: 'Charlotte Taylor',
        patientId: '0011223344',
        dateOfBirth: '',
        typeOfRegister: 'Doctor',
        registeredBy: '',
        hospitalName: 'LifeCare Hospital',
    },
    {
        _id: '14',
        createdAt: '2023-10-01',
        memberName: 'Henry Moore',
        patientId: '1122334466',
        dateOfBirth: '',
        typeOfRegister: 'Patient',
        registeredBy: 'Admin',
        hospitalName: '',
    },
    {
        _id: '15',
        createdAt: '2023-10-05',
        memberName: 'Amelia White',
        patientId: '2233445577',
        dateOfBirth: '',
        typeOfRegister: 'Nurse',
        registeredBy: '',
        hospitalName: '',
    },
];

export const hospitalOptions = [
    "Lagos University Teaching Hospital",
    "National Hospital Abuja",
    "Aminu Kano Teaching Hospital",
    "University of Benin Teaching Hospital",
    "Obafemi Awolowo University Teaching Hospital",
    "University College Hospital Ibadan",
    "Ahmadu Bello University Teaching Hospital",
    "Federal Medical Centre Abeokuta",
    "Federal Medical Centre Owerri",
];

export const insuranceOptions = [
    "AXA Mansard",
    "Hygeia HMO",
    "Reliance HMO",
    "Avon HMO",
    "Leadway Health",
    "Total Health Trust",
    "Clearline HMO",
    "Mediplan Healthcare",
    "Greenbay HMO",
];

export const stateOptions = [
    "Lagos",
    "Abuja (FCT)",
    "Kano",
    "Ogun",
    "Rivers",
    "Kaduna",
    "Enugu",
    "Oyo",
    "Anambra",
    "Bauchi",
];

export const roleOptions = [
    "Addministrationn staff",
    "Cashier"
];

export const lgaOptions = [
    "Ikeja",
    "Surulere",
    "Eti-Osa",
    "Mushin",
    "Agege",
    "Kosofe",
    "Epe",
    "Ikorodu",
    "Badagry",
    "Oshodi-Isolo",
];

// Date of Birth dropdowns
export const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const years = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i));

export const membersData: any[] = [
    {
        name: "Mr. Marko Marko",
        address: "23 Science Road",
        employeeId: "ID-Employee-1630409334",
        role: "Administration Staff",
        phone: "+234111111111111",
        status: "Active User",
    },
    {
        name: "Ms. Jane Doe",
        address: "14 River Street",
        employeeId: "ID-Employee-1630409335",
        role: "Finance Officer",
        phone: "+234222222222222",
        status: "Active User",
    },
    {
        name: "Mr. John Smith",
        address: "99 Ocean Avenue",
        employeeId: "ID-Employee-1630409336",
        role: "IT Support",
        phone: "+234333333333333",
        status: "Inactive User",
    },
    {
        name: "Mrs. Emily Clark",
        address: "77 Greenway Drive",
        employeeId: "ID-Employee-1630409337",
        role: "Human Resources",
        phone: "+234444444444444",
        status: "Active User",
    },
    {
        name: "Mr. Daniel White",
        address: "5 Maple Lane",
        employeeId: "ID-Employee-1630409338",
        role: "Administration Staff",
        phone: "+234555555555555",
        status: "Inactive User",
    },
    {
        name: "Ms. Olivia Brown",
        address: "18 Rose Street",
        employeeId: "ID-Employee-1630409339",
        role: "Finance Officer",
        phone: "+234666666666666",
        status: "Active User",
    },
    {
        name: "Mr. William Green",
        address: "42 Pine Avenue",
        employeeId: "ID-Employee-1630409340",
        role: "IT Support",
        phone: "+234777777777777",
        status: "Active User",
    },
    {
        name: "Mrs. Sophia Black",
        address: "56 Willow Street",
        employeeId: "ID-Employee-1630409341",
        role: "Human Resources",
        phone: "+234888888888888",
        status: "Inactive User",
    },
    {
        name: "Mr. James Carter",
        address: "12 Cherry Road",
        employeeId: "ID-Employee-1630409342",
        role: "Administration Staff",
        phone: "+234999999999999",
        status: "Active User",
    },
    {
        name: "Ms. Isabella Moore",
        address: "67 Lake View",
        employeeId: "ID-Employee-1630409343",
        role: "Finance Officer",
        phone: "+234101010101010",
        status: "Inactive User",
    },
    {
        name: "Mr. Henry Lewis",
        address: "89 Hilltop Lane",
        employeeId: "ID-Employee-1630409344",
        role: "Administration Staff",
        phone: "+234111122223333",
        status: "Active User",
    },
    {
        name: "Mrs. Ava Harris",
        address: "31 Sunset Boulevard",
        employeeId: "ID-Employee-1630409345",
        role: "Human Resources",
        phone: "+234444455556666",
        status: "Active User",
    },
    {
        name: "Mr. Ethan Walker",
        address: "7 Elm Street",
        employeeId: "ID-Employee-1630409346",
        role: "IT Support",
        phone: "+234777788889999",
        status: "Inactive User",
    },
    {
        name: "Ms. Charlotte Hill",
        address: "25 River Bend",
        employeeId: "ID-Employee-1630409347",
        role: "Finance Officer",
        phone: "+234123412341234",
        status: "Active User",
    },
    {
        name: "Mr. Liam Scott",
        address: "10 Meadow Lane",
        employeeId: "ID-Employee-1630409348",
        role: "Administration Staff",
        phone: "+234567856785678",
        status: "Active User",
    },
];

export const dealData = [
    {
        image: "https://via.placeholder.com/50",
        name_of_facility: "Sunrise Medical Center",
        deal_category: "Healthcare",
        deal_start_date: "2025-01-15",
        deal_end_date: "2025-06-15",
        deal_status: "Active"
    },
    {
        image: "https://via.placeholder.com/50",
        name_of_facility: "Green Leaf Spa",
        deal_category: "Wellness",
        deal_start_date: "2025-02-01",
        deal_end_date: "2025-05-30",
        deal_status: "Inactive"
    },
    {
        image: "https://via.placeholder.com/50",
        name_of_facility: "FitZone Gym",
        deal_category: "Fitness",
        deal_start_date: "2025-03-10",
        deal_end_date: "2025-09-10",
        deal_status: "Active"
    },
    {
        image: "https://via.placeholder.com/50",
        name_of_facility: "Royal Hotel",
        deal_category: "Hospitality",
        deal_start_date: "2025-04-05",
        deal_end_date: "2025-12-31",
        deal_status: "Active"
    },
    {
        image: "https://via.placeholder.com/50",
        name_of_facility: "Bright Dental Clinic",
        deal_category: "Healthcare",
        deal_start_date: "2025-01-20",
        deal_end_date: "2025-04-20",
        deal_status: "Inactive"
    }
];

export const facilityOpstion = [
    {
        label: "Global Hospital",
        value: "Global Hospital"
    },
    {
        label: "Local Hospital",
        value: "Local Hospital"
    },
    {
        label: "Test",
        value: "Test"
    },
    {
        label: "Merchant Test",
        value: "Merchant Test"
    },
    {
        label: "Demo",
        value: "Demo"
    },

]

export const BankOpstion = [
    {
        label: "Bank A",
        value: "Bank A"
    },
    {
        label: "Bank B",
        value: "Bank B"
    },
    {
        label: "Bank C",
        value: "Bank C"
    },
    {
        label: "Bank D",
        value: "Bank D"
    },
    {
        label: "Bank E",
        value: "Bank E"
    },

]

export const CategoriesOpstion = [
    {
        label: "Categories 1",
        value: "Categories 1"
    },
    {
        label: "Categories 2",
        value: "Categories 2"
    },
    {
        label: "Categories 3",
        value: "Categories 3"
    },

]

export const appointments = [
    {
        date: "27 April 2023",
        appointmentType: "Facility appointment",
        doctorId: "1679464380",
        patientProfile: "View Profile",
        timeScheduled: "06:30 PM",
        hospitalName: "--",
        deal_status: "Active"
    },
    {
        date: "15 May 2023",
        appointmentType: "Teleconsultation",
        doctorId: "9837465120",
        patientProfile: "View Profile",
        timeScheduled: "09:00 AM",
        hospitalName: "City Hospital",
        deal_status: "Active"
    },
    {
        date: "02 June 2023",
        appointmentType: "Home visit",
        doctorId: "4521879650",
        patientProfile: "View Profile",
        timeScheduled: "11:15 AM",
        hospitalName: "Green Valley Medical Center",
        deal_status: "Inactive"
    },
    {
        date: "18 July 2023",
        appointmentType: "Facility appointment",
        doctorId: "8675309123",
        patientProfile: "View Profile",
        timeScheduled: "04:45 PM",
        hospitalName: "--",
        deal_status: "Active"
    },
    {
        date: "09 August 2023",
        appointmentType: "Teleconsultation",
        doctorId: "7345612890",
        patientProfile: "View Profile",
        timeScheduled: "02:00 PM",
        hospitalName: "Sunrise Clinic",
        deal_status: "Inactive"
    }
];

export const filterOption = [
    {
        label: "All",
        value: "All"
    },
    {
        label: "Active",
        value: "Active"
    },
    {
        label: "Inactive",
        value: "Inactive"
    },
    {
        label: "Expired",
        value: "Expired"
    },
]

export const healthTypeFilterOption = [
    {
        label: "Initil Record",
        value: "Initil Record"
    },
    {
        label: "Past Record",
        value: "Past Record"
    },
    {
        label: "New Consulation",
        value: "New Consulation"
    },
]

export const patientData = [
    {
        date: "11 April 2023",
        image: "https://via.placeholder.com/50",
        patientId: "ID-7593840271",
        hospital: "City Care Hospital",
        doctorName: "Dr. Ramesh Verma",
        medicalRecordNumber: "MRN-9082736451",
        deal_status: "Active"
    },
    {
        date: "12 April 2023",
        image: "https://via.placeholder.com/50",
        patientId: "ID-6384729105",
        hospital: "Sunrise Medical Center",
        doctorName: "Dr. Anita Sharma",
        medicalRecordNumber: "MRN-7264510938",
        deal_status: "Active"
    },
    {
        date: "13 April 2023",
        image: "https://via.placeholder.com/50",
        patientId: "ID-9847263501",
        hospital: "Global Hospital",
        doctorName: "Dr. Karan Mehta",
        medicalRecordNumber: "MRN-6173849205",
        deal_status: "Inactive"
    },
    {
        date: "14 April 2023",
        image: "https://via.placeholder.com/50",
        patientId: "ID-7263501984",
        hospital: "Lotus Health Clinic",
        doctorName: "Dr. Sneha Gupta",
        medicalRecordNumber: "MRN-8203947561",
        deal_status: "Active"
    },
    {
        date: "15 April 2023",
        image: "https://via.placeholder.com/50",
        patientId: "ID-5039184726",
        hospital: "Fortis Health Care",
        doctorName: "Dr. Rajiv Kapoor",
        medicalRecordNumber: "MRN-9350172846",
        deal_status: "Inactive"
    }
];

export const hmoData = [
    {
        hmoName: "MediCare Plus",
        hmoId: "HMO-001",
        staff: 45,
        enrollee: 320,
        facilities: 8,
        billsClaims: "$12,450",
        status: "Active",
    },
    {
        hmoName: "HealthFirst",
        hmoId: "HMO-002",
        staff: 32,
        enrollee: 280,
        facilities: 6,
        billsClaims: "$9,780",
        status: "Active",
    },
    {
        hmoName: "CareWell",
        hmoId: "HMO-003",
        staff: 28,
        enrollee: 210,
        facilities: 5,
        billsClaims: "$7,340",
        status: "Pending",
    },
    {
        hmoName: "LifeGuard Health",
        hmoId: "HMO-004",
        staff: 51,
        enrollee: 400,
        facilities: 10,
        billsClaims: "$15,890",
        status: "Active",
    },
    {
        hmoName: "WellnessCover",
        hmoId: "HMO-005",
        staff: 20,
        enrollee: 150,
        facilities: 3,
        billsClaims: "$5,670",
        status: "Inactive",
    },
];

export const enrolleeData = [
    {
        createdDate: "2023-04-19",
        enrolleeName: "John Doe",
        assignId: "ASG-1001",
        companyName: "Global Health Corp",
        typeOfEnrollee: "Primary",
        status: "Active",
    },
    {
        createdDate: "2023-04-18",
        enrolleeName: "Jane Smith",
        assignId: "ASG-1002",
        companyName: "WellCare Ltd",
        typeOfEnrollee: "Dependent",
        status: "Inactive",
    },
    {
        createdDate: "2023-04-15",
        enrolleeName: "Michael Johnson",
        assignId: "ASG-1003",
        companyName: "LifePlus Insurance",
        typeOfEnrollee: "Primary",
        status: "Active",
    },
    {
        createdDate: "2023-04-12",
        enrolleeName: "Emily Davis",
        assignId: "ASG-1004",
        companyName: "HealthFirst Partners",
        typeOfEnrollee: "Dependent",
        status: "Pending",
    },
    {
        createdDate: "2023-04-10",
        enrolleeName: "Robert Brown",
        assignId: "ASG-1005",
        companyName: "CareWell Group",
        typeOfEnrollee: "Primary",
        status: "Active",
    },
];

export const TypeOfDependent = [
    {
        label: "Child",
        value: "Child"
    },
    {
        label: "Spouse",
        value: "Spouse"
    },
    {
        label: "Extra",
        value: "Extra"
    },
]

export const assignedFacility = [
    {
        label: "Facility 1",
        value: "Facility 1"
    },
    {
        label: "Facility 2",
        value: "Facility 2"
    },
    {
        label: "Facility 3",
        value: "Facility 3"
    },
]

export const categoryTypeData = [
    {
        label: "Primary",
        value: "Primary"
    },
    {
        label: "Secondary",
        value: "Secondary"
    },
    {
        label: "Tertiary",
        value: "Tertiary"
    },
]

export const typeOfEnrollee = [
    {
        label: "PHIS",
        value: "PHIS"
    },
    {
        label: "NHIS",
        value: "NHIS"
    },
    {
        label: "Extra",
        value: "Extra"
    },
]

export const AssignedBillingTariff = [
    {
        label: "Billing Tariff",
        value: "Billing Tariff"
    },
    {
        label: "Billing Tariff 2",
        value: "Billing Tariff 2"
    },
]

export const billsClaimsData = [
    {
        dateReceived: "2023-04-19",
        authorizationCode: "AUTH-90321",
        hospitalLabs: "Global Hospital",
        enrolleeName: "John Doe",
        requested: 1200,
        approved: 1100,
        paid: 1100,
    },
    {
        dateReceived: "2023-04-18",
        authorizationCode: "AUTH-90322",
        hospitalLabs: "City Labs",
        enrolleeName: "Jane Smith",
        requested: 800,
        approved: 750,
        paid: 750,
    },
    {
        dateReceived: "2023-04-15",
        authorizationCode: "AUTH-90323",
        hospitalLabs: "MediCare Clinic",
        enrolleeName: "Michael Johnson",
        requested: 1500,
        approved: 1400,
        paid: 1400,
    },
    {
        dateReceived: "2023-04-12",
        authorizationCode: "AUTH-90324",
        hospitalLabs: "LifeCare Hospital",
        enrolleeName: "Emily Davis",
        requested: 950,
        approved: 900,
        paid: 900,
    },
    {
        dateReceived: "2023-04-10",
        authorizationCode: "AUTH-90325",
        hospitalLabs: "Prime Health Labs",
        enrolleeName: "Robert Brown",
        requested: 2000,
        approved: 1800,
        paid: 1800,
    },
];

export const billsClaimsOutStandingData = [
    {
        dateReceived: "2023-04-19",
        authorizationCode: "AUTH-525896",
        hospitalLabs: "Hospital Global Hospital",
        enrolleeName: "Test 1",
        requested: 8900,
        approved: 2589,
        paid: 263,
    },
    {
        dateReceived: "2023-04-18",
        authorizationCode: "AUTH-001122",
        hospitalLabs: "City Labs",
        enrolleeName: "Test 2",
        requested: 900,
        approved: 1500,
        paid: 8800,
    },
];

export const billsClaimspaidData = [
    {
        dateReceived: "2023-04-19",
        authorizationCode: "AUTH-520225",
        hospitalLabs: "Hospital Global Hospital",
        enrolleeName: "Test 1",
        requested: 1500,
        approved: 150,
        paid: 199,
    },
    {
        dateReceived: "2035-01-25",
        authorizationCode: "AUTH-58955",
        hospitalLabs: "City Labs",
        enrolleeName: "Test 2",
        requested: 900,
        approved: 1500,
        paid: 8800,
    },
    {
        dateReceived: "1999-04-20",
        authorizationCode: "AUTH-8956",
        hospitalLabs: "City Labs",
        enrolleeName: "Test 2",
        requested: 900,
        approved: 1500,
        paid: 8800,
    }
];

export const facilityData = [
    {
        facilityName: "Global Hospital",
        facilityId: "FAC-1001",
        address: "123 Main Street, Lagos",
        state: "Lagos",
        hmoName: "HealthFirst HMO",
        status: "Active",
    },
    {
        facilityName: "City Medical Center",
        facilityId: "FAC-1002",
        address: "45 Broad Avenue, Abuja",
        state: "FCT",
        hmoName: "WellCare HMO",
        status: "Inactive",
    },
    {
        facilityName: "PrimeCare Clinic",
        facilityId: "FAC-1003",
        address: "78 King’s Road, Port Harcourt",
        state: "Rivers",
        hmoName: "MedPlus HMO",
        status: "Active",
    },
    {
        facilityName: "LifeLine Hospital",
        facilityId: "FAC-1004",
        address: "16 Park Lane, Ibadan",
        state: "Oyo",
        hmoName: "SecureHealth HMO",
        status: "Active",
    },
    {
        facilityName: "Hope Wellness Center",
        facilityId: "FAC-1005",
        address: "210 Freedom Street, Enugu",
        state: "Enugu",
        hmoName: "CareTrust HMO",
        status: "Inactive",
    },
];

export const OptionBystatusBilling = [
    {
        label: "Doctor",
        value: "Doctor"
    },
    {
        label: "Hospital",
        value: "Hospital"
    },
    {
        label: "Paid/Unpaid",
        value: "Paid/Unpaid"
    },
]

export const merchantTypeoption = [
    {
        label: "Hospitals",
        value: "Hospitals"
    },
    {
        label: "Pharmacy",
        value: "Pharmacy"
    },
    {
        label: "Online",
        value: "Online"
    },
    {
        label: "GYM",
        value: "GYM"
    },
    {
        label: "Other",
        value: "Other"
    },
]

export const approvedPaymentType = [
    {
        label: "ALL",
        value: "ALL"
    },
    {
        label: "PAID",
        value: "PAID"
    },
    {
        label: "UNPAID",
        value: "UNPAID"
    },
]


export const statusTypeoption = [
    {
        label: "Hold",
        value: "Hold"
    },
    {
        label: "In review",
        value: "In review"
    },
    {
        label: "Approved",
        value: "Approved"
    },
    {
        label: "Rejected",
        value: "Rejected"
    },
    {
        label: "Other",
        value: "Other"
    },
]

export const doctorData = [
    {
        createdDate: "2025-08-01",
        doctorId: "DOC-2001",
        doctorData: "Dr. Samuel Okafor",
        hospitalData: "Global Hospital, Lagos",
        phoneNumber: "+2348012345678",
        status: "Active",
    },
    {
        createdDate: "2025-07-25",
        doctorId: "DOC-2002",
        doctorData: "Dr. Grace Adebayo",
        hospitalData: "City Medical Center, Abuja",
        phoneNumber: "+2348098765432",
        status: "Inactive",
    },
    {
        createdDate: "2025-07-10",
        doctorId: "DOC-2003",
        doctorData: "Dr. Emeka Nwosu",
        hospitalData: "PrimeCare Clinic, Port Harcourt",
        phoneNumber: "+2348023456789",
        status: "Active",
    },
    {
        createdDate: "2025-06-30",
        doctorId: "DOC-2004",
        doctorData: "Dr. Aisha Bello",
        hospitalData: "LifeLine Hospital, Ibadan",
        phoneNumber: "+2348076543210",
        status: "Active",
    },
    {
        createdDate: "2025-06-15",
        doctorId: "DOC-2005",
        doctorData: "Dr. Tunde Adeyemi",
        hospitalData: "Hope Wellness Center, Enugu",
        phoneNumber: "+2348056789123",
        status: "Inactive",
    },
];

export const hospitalStaffData = [
    {
        memberData: "Lagos Central Hospital",
        hospitalId: "HSP-1001",
        doctors: 25,
        nurses: 48,
        admin: 12
    },
    {
        memberData: "City Medical Center, Abuja",
        hospitalId: "HSP-1002",
        doctors: 18,
        nurses: 35,
        admin: 9
    },
    {
        memberData: "PrimeCare Clinic, Port Harcourt",
        hospitalId: "HSP-1003",
        doctors: 10,
        nurses: 22,
        admin: 5
    },
    {
        memberData: "LifeLine Hospital, Ibadan",
        hospitalId: "HSP-1004",
        doctors: 15,
        nurses: 28,
        admin: 8
    },
    {
        memberData: "Hope Wellness Center, Enugu",
        hospitalId: "HSP-1005",
        doctors: 8,
        nurses: 16,
        admin: 4
    }
];

export const doctorDirectory = [
    {
        doctorData: "Dr. John Okafor - Cardiologist",
        doctorId: "DOC-2001",
        phoneNumber: "+2348012345678",
        status: "Active"
    },
    {
        doctorData: "Dr. Amina Bello - Pediatrician",
        doctorId: "DOC-2002",
        phoneNumber: "+2348098765432",
        status: "Active"
    },
    {
        doctorData: "Dr. Samuel Eze - General Surgeon",
        doctorId: "DOC-2003",
        phoneNumber: "+2348023456789",
        status: "On Leave"
    },
    {
        doctorData: "Dr. Grace Adeniyi - Gynecologist",
        doctorId: "DOC-2004",
        phoneNumber: "+2348076543210",
        status: "Active"
    },
    {
        doctorData: "Dr. Musa Ibrahim - Orthopedic Specialist",
        doctorId: "DOC-2005",
        phoneNumber: "+2348054321987",
        status: "Retired"
    }
];

export const bloodGroupOptions = [
    {
        label: "A+",
        value: "A+"
    },
    {
        label: "A-",
        value: "A-"
    },
    {
        label: "B+",
        value: "B+"
    },
    {
        label: "B-",
        value: "B-"
    },
    {
        label: "AB+",
        value: "AB+"
    },
    {
        label: "AB-",
        value: "AB-"
    },
    {
        label: "O+",
        value: "O+"
    },
    {
        label: "O-",
        value: "O-"
    },
]

export const companies = [
    {
        companyId: "8966767982",
        name: "emp_name",
        email: "-",
        phone: "-",
        employeeCount: 1,
        balance: "₦0.00"
    },
    {
        companyId: "1002457893",
        name: "TechNova Solutions Ltd",
        email: "info@technova.com",
        phone: "+2348011122233",
        employeeCount: 54,
        balance: "₦1,250,000.00"
    },
    {
        companyId: "2009876543",
        name: "HealthFirst Nigeria",
        email: "contact@healthfirst.com.ng",
        phone: "+2348093344556",
        employeeCount: 132,
        balance: "₦3,450,500.00"
    },
    {
        companyId: "3006547890",
        name: "GreenAgro Industries",
        email: "support@greenagro.com",
        phone: "+2348029988776",
        employeeCount: 87,
        balance: "₦875,900.00"
    },
    {
        companyId: "4001236789",
        name: "Skyline Properties Ltd",
        email: "admin@skyline.com.ng",
        phone: "+2348056677889",
        employeeCount: 25,
        balance: "₦420,000.00"
    }
];

export const merchants = [
    {
        id: "4802463784",
        businessName: "Apr",
        onboardedBy: "Jeo Tyler",
        type: "GYM"
    },
    {
        id: "5903578921",
        businessName: "FreshBites Restaurant",
        onboardedBy: "Amaka Okoro",
        type: "Restaurant"
    },
    {
        id: "6728945610",
        businessName: "WellLife Pharmacy",
        onboardedBy: "David Johnson",
        type: "Pharmacy"
    },
    {
        id: "7812345098",
        businessName: "Elite Fitness Hub",
        onboardedBy: "Chioma Adeyemi",
        type: "GYM"
    },
    {
        id: "8956432781",
        businessName: "TechHive Solutions",
        onboardedBy: "Michael Smith",
        type: "IT Services"
    },
    {
        id: "9345627812",
        businessName: "CityCare Hospital",
        onboardedBy: "Ngozi Chukwu",
        type: "Healthcare"
    }
];

export const StaffData = [
    {
        createdAt: "2025-08-01 10:15:30",
        rhId: "RH1001",
        name: "Alice Johnson",
        email: "alice.johnson@example.com"
    },
    {
        createdAt: "2025-08-02 14:45:10",
        rhId: "RH1002",
        name: "Michael Brown",
        email: "michael.brown@example.com"
    },
    {
        createdAt: "2025-08-03 09:20:45",
        rhId: "RH1003",
        name: "Sophia Williams",
        email: "sophia.williams@example.com"
    },
    {
        createdAt: "2025-08-05 16:10:05",
        rhId: "RH1004",
        name: "David Smith",
        email: "david.smith@example.com"
    },
    {
        createdAt: "2025-08-07 11:55:50",
        rhId: "RH1005",
        name: "Emma Davis",
        email: "emma.davis@example.com"
    }
];

export const RecommendationsData = [
    {
        businessName: "Green Health Clinic",
        facilityType: "Hospital",
        handler: "John Carter",
        suggestedBy: "Emily Watson",
        action: "Approved"
    },
    {
        businessName: "FitLife Gym",
        facilityType: "Gym",
        handler: "Michael Lee",
        suggestedBy: "David Parker",
        action: "Pending"
    },
    {
        businessName: "Happy Smiles Dental",
        facilityType: "Dental Clinic",
        handler: "Sarah Johnson",
        suggestedBy: "Chris Brown",
        action: "Rejected"
    },
    {
        businessName: "Wellness Hub",
        facilityType: "Spa",
        handler: "Anna White",
        suggestedBy: "James Harris",
        action: "Approved"
    },
    {
        businessName: "Vital Care Pharmacy",
        facilityType: "Pharmacy",
        handler: "Robert Green",
        suggestedBy: "Laura King",
        action: "Pending"
    }
];

export const paymentData = [
    {
        paymentId: "5346199443",
        status: "Approved",
        cardHolder: "Ajay Bodara",
        facility: "Global Hospital Pvt Ltd",
        amount: "₦ 12,000.00",
        discount: "₦ 500.00",
        transactionFee: "₦ 120.00",
        payout: "₦ 11,380.00",
        submittedBy: "Jaylo Patel",
        submissionDate: "May 03, 2023 - 12:48 PM",
        approvedDate: "May 04, 2023 - 12:09 PM",
        reviewedBy: "Jeo Jeo"
    },
    {
        paymentId: "6785432190",
        status: "Pending",
        cardHolder: "Riya Sharma",
        facility: "Wellness Care Clinic",
        amount: "₦ 8,500.00",
        discount: "₦ 300.00",
        transactionFee: "₦ 90.00",
        payout: "₦ 8,110.00",
        submittedBy: "Michael Lee",
        submissionDate: "May 07, 2023 - 09:30 AM",
        approvedDate: "-",
        reviewedBy: "-"
    },
    {
        paymentId: "9823417655",
        status: "Rejected",
        cardHolder: "David Parker",
        facility: "FitLife Gym",
        amount: "₦ 5,000.00",
        discount: "₦ 0.00",
        transactionFee: "₦ 50.00",
        payout: "₦ 0.00",
        submittedBy: "Emily Watson",
        submissionDate: "May 10, 2023 - 04:15 PM",
        approvedDate: "-",
        reviewedBy: "Sarah Johnson"
    },
    {
        paymentId: "4532198765",
        status: "Approved",
        cardHolder: "Sarah Johnson",
        facility: "Happy Smiles Dental",
        amount: "₦ 15,000.00",
        discount: "₦ 1,000.00",
        transactionFee: "₦ 150.00",
        payout: "₦ 13,850.00",
        submittedBy: "Robert Green",
        submissionDate: "May 12, 2023 - 11:22 AM",
        approvedDate: "May 13, 2023 - 02:05 PM",
        reviewedBy: "James Harris"
    },
    {
        paymentId: "7654982310",
        status: "Approved",
        cardHolder: "Emily Watson",
        facility: "Vital Care Pharmacy",
        amount: "₦ 6,800.00",
        discount: "₦ 200.00",
        transactionFee: "₦ 80.00",
        payout: "₦ 6,520.00",
        submittedBy: "Anna White",
        submissionDate: "May 14, 2023 - 08:40 AM",
        approvedDate: "May 15, 2023 - 01:00 PM",
        reviewedBy: "Laura King"
    }
];

export const claimData = [
    {
        claimId: "5346199443",
        status: "Approved",
        patientName: "Ajay Bodara",
        payout: "₦ 0.00",
        charge: "₦ 0.00",
        date: "May 03, 2023 - 12:48 PM"
    },
    {
        claimId: "7823645123",
        status: "Pending",
        patientName: "Riya Sharma",
        payout: "₦ 2,500.00",
        charge: "₦ 3,000.00",
        date: "May 07, 2023 - 09:20 AM"
    },
    {
        claimId: "9834127654",
        status: "Rejected",
        patientName: "David Parker",
        payout: "₦ 0.00",
        charge: "₦ 4,200.00",
        date: "May 09, 2023 - 02:45 PM"
    },
    {
        claimId: "6523987410",
        status: "Approved",
        patientName: "Sarah Johnson",
        payout: "₦ 5,000.00",
        charge: "₦ 5,500.00",
        date: "May 12, 2023 - 11:10 AM"
    },
    {
        claimId: "8712456390",
        status: "Approved",
        patientName: "Emily Watson",
        payout: "₦ 3,800.00",
        charge: "₦ 4,000.00",
        date: "May 15, 2023 - 08:30 AM"
    }
];

