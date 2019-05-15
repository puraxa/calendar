let months: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let today:Date;
let Month:number;
let Year:number;
function load(){
    today = new Date();
    Month = today.getMonth();
    Year = today.getFullYear();
    document.getElementById('displaying-month-year').innerText = `${months[Month]}, ${Year}`;
    displayCalendar();
    for(let i = 0; i < 12; i++){
        document.getElementById('month').innerHTML += `
            <option value=${i}>${months[i]}</option>
        `;
    }
}

function displayCalendar():void {
    let daysInMonth:number = getDaysInMonth();
    let firstDay:number = new Date(Year,Month).getDay();
    let calendar:string = `
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
    for(let i = 0; i < 6 - new Date(Year,Month,daysInMonth).getDay(); i++){
        calendar += `<div class="days"></div>`;
    }
    document.getElementById('calendar').innerHTML = calendar;
    document.getElementById('displaying-month-year').innerText = `${months[Month]}, ${Year}`;
}

function getDaysInMonth():number{
    return new Date(Year, Month+1, 0).getDate();
}

function previous(){
    Month = Month-1 < 0 ? 11 : Month-1;
    Year = Month == 11 ? Year-1 : Year;
    displayCalendar();
}

function next():void{
    Month = Month+1 > 11 ? 0 : Month+1;
    Year = Month == 0  ? Year+1 : Year;
    displayCalendar();
}

function setDate():void{
    let m:string = (<HTMLInputElement>document.getElementById('month')).value;
    Month = parseInt(m);
    let y:string = (<HTMLInputElement>document.getElementById('year')).value;
    Year = parseInt(y);
    displayCalendar();
}