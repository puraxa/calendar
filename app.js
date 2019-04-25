let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let today;
let Month;
let Year;
function load(){
    today = new Date();
    Month = today.getMonth();
    Year = today.getFullYear();
    document.getElementById('displaying-month-year').innerText = `${months[Month]}, ${Year}`;
    displayCalendar(Month,Year);
    for(let i = 0; i < 12; i++){
        document.getElementById('month').innerHTML += `
            <option value=${i}>${months[i]}</option>
        `;
    }
}

function displayCalendar(month, year) {
    let daysInMonth = getDaysInMonth(month,year);
    let firstDay = new Date(year,month).getDay();
    let calendar = `
        <div class="days days-text gray">Su</div>
        <div class="days days-text gray">Mo</div>
        <div class="days days-text gray">Tu</div>
        <div class="days days-text gray">We</div>
        <div class="days days-text gray">Th</div>
        <div class="days days-text gray">Fr</div>
        <div class="days days-text gray">Sa</div>`;
    for(let i = 0; i < firstDay; i++){
        calendar += `<div class="days"></div>`;
    }
    for(let i = 0; i < daysInMonth; i++){
        if(today.getMonth() == Month && today.getDate() == i+1 && today.getFullYear() == Year){
            calendar += `<div class="days today">${i+1}</div>`;
        }
        else{
            calendar += `<div class="days">${i+1}</div>`;
        }
    }
    for(let i = 0; i < 6 - new Date(year,month,daysInMonth).getDay(); i++){
        calendar += `<div class="days"></div>`;
    }
    document.getElementById('calendar').innerHTML = calendar;
    document.getElementById('displaying-month-year').innerText = `${months[month]}, ${year}`;
}

function getDaysInMonth(month,year){
    return 32 - new Date(year, month, 32).getDate();
}

function previous(){
    Month = Month-1 < 0 ? 11 : Month-1;
    Year = Month-1 < 0 ? Year-1 : Year;
    displayCalendar(Month,Year);
}

function next(){
    Month = Month+1 > 11 ? 0 : Month+1;
    Year = Month+1 > 11  ? Year+1 : Year;
    displayCalendar(Month,Year);
}

function setDate(){
    Month = parseInt(document.getElementById('month').value);
    Year = parseInt(document.getElementById('year').value);
    displayCalendar(Month,Year);
}