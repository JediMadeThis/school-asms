const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');

let timetable = 1;
let today;
let currentSubject;

const subjectTimes = {
  1: {
    0: [7, 40],
    1: [8, 30],
    2: [9, 20],
    3: [10, 10],
    4: [11, 0],
    5: [11, 50],
    6: [12, 40],
    7: [13, 30],
    8: [14, 20],
    9: [15, 10],
    10: [16, 0],
    11: [16, 50],
  },
};

const daysOfWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

// Date format: dd/mm/yyyy
const homework = [
  {
    subject: 'History',
    teacher: 'T. Varin',
    name: 'Important historic places',
    due: [17, 6, 2025],
  },
  {
    subject: 'Social',
    teacher: 'T. Varin',
    name: 'Important places of state/country',
    due: [17, 6, 2025],
  },
  {
    subject: 'English Writing',
    teacher: 'T. Sai',
    name: 'UNLOCK Book Page 33: Essay',
    due: [12, 6, 2025],
  },
  {
    subject: 'Physics',
    teacher: 'P. Kuang',
    name: 'Physics Book: 13-question unit conversion',
    due: [11, 6, 2025],
  },
  {
    subject: 'Science',
    teacher: 'Aj. Jarukamol',
    name: 'Parallel circuit presentation',
    due: [12, 6, 2025],
  },
];

function sortedHomework() {
  let res = homework.sort((a, b) => {
    let year = a.due[2] - b.due[2];
    let month = a.due[1] - b.due[1];
    let day = a.due[0] - b.due[0];

    if (year !== 0) {
      return year;
    }

    if (month !== 0) {
      return month;
    }

    return day;
  });

  return res;
}

const hwTable = document.getElementById('hwTable');

function setTable() {
  let sortedHw = sortedHomework();

  let dueToday = [];
  let dueThisWeek = [];
  let dueLater = [];

  const d = new Date();
  const now = Date.now();

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  const dayMs = 86400000;

  sortedHw.forEach((hw) => {
    let processableDateFormat = `${hw.due[2]}-${hw.due[1]}-${hw.due[0]}`;
    const date = new Date(Date.parse(processableDateFormat));
    const dateInt = date.getTime();

    if (dateInt < now) {
      return;
    }

    if (hw.due[2] === year && hw.due[1] === month && hw.due[0] === day) {
      dueToday.push(hw);
    } else if (dateInt <= now + dayMs * 7) {
      dueThisWeek.push(hw);
    } else if (dateInt > now + dayMs * 7) {
      dueLater.push(hw);
    }
  });

  console.log(dueToday, dueThisWeek, dueLater);

  if (dueToday.length > 0) {
    hwTable.appendChild(createTrBig('Due today', 'bigTd'));

    dueToday
      // .sort((a, b) => {
      //   return a.teacher.localeCompare(b.teacher);
      // })
      .forEach((hw1) => {
        const tr = createTr(
          hw1.subject,
          hw1.name,
          formatDate(hw1.due[0], hw1.due[1], hw1.due[2]),
          hw1.teacher
        );
        document.getElementById('hwTable').appendChild(tr);
      });
  }

  if (dueThisWeek.length > 0) {
    hwTable.appendChild(createTrBig('Due in 7 days', 'bigTd'));

    dueThisWeek
      // .sort((a, b) => {
      //   return a.teacher.localeCompare(b.teacher);
      // })
      .forEach((hw1) => {
        const tr = createTr(
          hw1.subject,
          hw1.name,
          formatDate(hw1.due[0], hw1.due[1], hw1.due[2]),
          hw1.teacher
        );
        document.getElementById('hwTable').appendChild(tr);
      });
  }

  if (dueLater.length > 0) {
    hwTable.appendChild(createTrBig('Due later', 'bigTd'));

    dueLater
      // .sort((a, b) => {
      //   return a.teacher.localeCompare(b.teacher);
      // })
      .forEach((hw1) => {
        const tr = createTr(
          hw1.subject,
          hw1.name,
          formatDate(hw1.due[0], hw1.due[1], hw1.due[2]),
          hw1.teacher
        );
        document.getElementById('hwTable').appendChild(tr);
      });
  }
}

function createTr(subject, assignment, due, teacher) {
  const tr = document.createElement('tr');

  const subjectTd = document.createElement('td');
  const assignmentTd = document.createElement('td');
  const dueTd = document.createElement('td');
  const teacherTd = document.createElement('td');

  const subjectTxt = document.createTextNode(subject);
  const assignmentTxt = document.createTextNode(assignment);
  const dueTxt = document.createTextNode(due);
  const teacherTxt = document.createTextNode(teacher);

  subjectTd.classList.add('subjectTd');
  assignmentTd.classList.add('assignmentTd');
  dueTd.classList.add('dueTd');
  teacherTd.classList.add('teacherTd');

  subjectTd.appendChild(subjectTxt);
  assignmentTd.appendChild(assignmentTxt);
  dueTd.appendChild(dueTxt);
  teacherTd.appendChild(teacherTxt);

  tr.appendChild(subjectTd);
  tr.appendChild(assignmentTd);
  tr.appendChild(dueTd);
  tr.appendChild(teacherTd);

  return tr;
}

function createTrBig(text, classNameTd) {
  const tr = document.createElement('tr');

  const textTd = document.createElement('td');
  const textTxt = document.createTextNode(text);

  textTd.appendChild(textTxt);
  textTd.classList.add(classNameTd);
  textTd.colSpan = 4;

  tr.appendChild(textTd);

  return tr;
}

function formatDate(d, m, y) {
  const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  return `${months[m]} ${d}, ${y}`;
}

setTable();

function table() {}

function updateDateAndTime() {
  const d = new Date();

  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  const day = daysOfWeek[d.getDay()];

  today = day;

  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  timeElement.textContent = `${
    hours.toString().length < 2 ? `0${hours}` : hours
  }:${minutes.toString().length < 2 ? `0${minutes}` : minutes}:${
    seconds.toString().length < 2 ? `0${seconds}` : seconds
  }`;
  dateElement.textContent = `${day}, ${date} ${month} ${year}`;
}

updateDateAndTime();

setInterval(() => {
  updateDateAndTime();
}, 1000);
