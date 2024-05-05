document.addEventListener('DOMContentLoaded', function () {
    const calendario = document.querySelector('.day-month');
    const monthDisplay = document.querySelector('.month');
    const script2DataDisplay = document.querySelector('.script-2-data');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let selectedDay = null;
    let previousSelectedDayElement = null;

    function renderCalendar(year, month) {
        calendario.innerHTML = '';
        const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonth = new Date(year, month, 1);
        const currentDate = new Date();
        const today = currentDate.getDate();
        const firstDayIndex = currentMonth.getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthDisplay.textContent = `${monthNames[month]} ${year}`;
        script2DataDisplay.textContent = `${dayName[currentDate.getDay()]}, ${monthNames[month]} ${currentDate.getDate()}`;

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day');
            emptyDay.innerHTML = `<div></div>`;
            calendario.appendChild(emptyDay);
        }

        for (let i = 1; i <= lastDay; i++) {
            const day = document.createElement('div');
            day.classList.add('calendar-day');
            day.textContent = i;
            if (i === today && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                day.classList.add('current-day');
            }
            if ((i === 28 || i === 29) && currentDate.getMonth() <= month && currentDate.getDate() <= i) {
                day.classList.add('special-day');
                day.addEventListener('click', () => {
                    const showTime = document.querySelector('.terceira-parte');
                    if (selectedDay !== i) {
                        if (previousSelectedDayElement) {
                            previousSelectedDayElement.style.backgroundColor = '';
                            previousSelectedDayElement.style.color = '';
                        }
                        selectedDay = i;
                        previousSelectedDayElement = day;
                        showTime.classList.remove('tirar-horarios');
                        showTime.classList.add('mostrar-horarios');

                        day.style.backgroundColor = '#d7e163';
                        day.style.color = '#fff';
                    } else {
                        showTime.classList.remove('mostrar-horarios');
                        showTime.classList.add('tirar-horarios');
                        selectedDay = null; 
                        
                        day.style.backgroundColor = '';
                        day.style.color = '';
                    }
                    const clickedDate = new Date(year, month, i);
                    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    const clickedDayName = dayName[clickedDate.getDay() + 1];
                    script2DataDisplay.textContent = `${clickedDayName}, ${monthNames[month]} ${i}`;
                });
            }
            day.setAttribute('data-day', i);
            calendario.appendChild(day);
        }
    }

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    const showTime = document.querySelector('.terceira-parte');
    renderCalendar(currentYear, currentMonth);

    prevBtn.addEventListener('click', () => {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        showTime.classList.add('tirar-horarios');
        renderCalendar(currentYear, currentMonth);
    });

    nextBtn.addEventListener('click', () => {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        showTime.classList.add('tirar-horarios');
        renderCalendar(currentYear, currentMonth);
    });
});


















