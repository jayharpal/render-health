
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
