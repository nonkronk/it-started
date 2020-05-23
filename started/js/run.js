const data = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
  since: null, 
  until: null
};

getHtml();
calcTime();
showTime()

function getHtml() {
  var path = window.location.pathname;
  if (path == "/started/pset0.html") {
    data.since = 1586101016000,  // Epoch timestamp, since April 5, 2020 3:36:56 PM
    data.until = 1586092440000   // Epoch timestamp, until April 5, 2020 8:14:00 PM
  }
  else if (path == "/started/pset1.html") {
    data.since = 1586092440000, // Epoch timestamp, since April 5, 2020 8:14:00 PM
    data.until = 1586079724000  // Epoch timestamp, until April 5, 2020 9:42:04 PM
  }
  else if (path == "/started/pset2.html") {
    data.since = 1586079724000, // Epoch timestamp, since April 5, 2020 9:42:04 PM
    data.until = 1586220147000  // Epoch timestamp, until April 7, 2020 12:42:27 AM
  }
  else if (path == "/started/pset3.html") {
    data.since = 1586220147000  // Epoch timestamp, since April 7, 2020 12:42:27 AM
    data.until = 1586890018000  // Epoch timestamp, until April 14, 2020 6:46:58 PM
  }
  else if (path == "/started/pset4.html") {
    data.since = 1586890018000, // Epoch timestamp, since April 14, 2020 6:46:58 PM
    data.until = 1587233006000  // Epoch timestamp, until April 18, 2020 6:03:26 PM
  }
  else if (path == "/started/pset5.html") {
    data.since = 1587233006000  // Epoch timestamp, since April 18, 2020 6:03:26 PM
    data.until = 1587719244000  // Epoch timestamp, until April 24, 2020 9:07:24 AM
  }
  else if (path == "/started/pset6.html") {
    data.since = 1587719244000, // Epoch timestamp, since April 24, 2020 9:07:24 AM
    data.until = 1587905990000  // Epoch timestamp, until April 26, 2020 12:59:50 PM
  }
  else if (path == "/started/pset7.html") {
    data.since = 1587905990000  // Epoch timestamp, since April 26, 2020 12:59:50 PM
    data.until = 1588100497000  // Epoch timestamp, until April 28, 2020 7:01:37 PM
  }
}

function calcTime() {
  const seconds = Math.abs(data.until - data.since) / 1000;
  data.days = seconds / 86400;
  data.hours = seconds / 3600;
  data.minutes = seconds / 60;
  data.seconds = seconds;  
}

function showTime() {
  const progresses = document.querySelectorAll(".progres[fraction]");
  const radius = 25;
  const circumference = radius * 2 * Math.PI;
  progresses.forEach(progres => {
    const value = data[progres.getAttribute("fraction")];
    const complete = Math.floor(value);
    let v = complete.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (complete < 10) v = value.toFixed(2).replace(".", ",");
    if (complete < 1) v = value.toFixed(3).replace(".", ",");
    progres.querySelector("h2").innerText = v;
    const percent = Math.round((value - complete) * 100 * 10) / 10;
    const offset = circumference - (percent / 100) * circumference;
    progres.querySelector(
      ".left"
    ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 100 100">
    <circle class="bg" r="${radius}" cx="50" cy="50" />
    <circle
      class="prog"
      r="${radius}"
      cx="50"
      cy="50"
      stroke-dasharray="${circumference} ${circumference}"
      stroke-dashoffset="${offset}"
    />
  </svg>`;
  });
}