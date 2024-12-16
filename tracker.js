document.addEventListener('DOMContentLoaded', () => {
  const checkinButton = document.getElementById('checkinButton');
  const calendarChart = document.getElementById('calendarChart');
  const consecutiveDaysDisplay = document.getElementById('consecutiveDays');

  checkinButton.addEventListener('click', () => {
    fetch('/daily-tracker/save_data.php', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          updateStats();
        } else {
          alert(data.message);
        }
      });
  });

  function updateStats() {
    fetch('/daily-tracker/get_data.php')
      .then(response => response.json())
      .then(data => {
        const calendarData = prepareCalendarData(data);
        renderCalendarChart(calendarData);
        consecutiveDaysDisplay.textContent = `连续打卡: ${data.length}天`;
      });
  }

  function prepareCalendarData(data) {
    const calendarData = Array(30).fill(0); // assuming a month view (30 days)

    data.forEach(date => {
      const day = new Date(date).getDate() - 1;
      calendarData[day] = 1;
    });

    return calendarData;
  }

  function renderCalendarChart(data) {
    new Chart(calendarChart, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => i + 1), // days of the month
        datasets: [{
          label: '打卡统计',
          data: data,
          backgroundColor: data.map(d => (d ? 'green' : 'gray')),
          borderColor: 'black',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateStats();
});