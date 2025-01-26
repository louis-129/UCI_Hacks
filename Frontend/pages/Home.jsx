import React, { useState } from "react";
import axios from "axios";
import "../css/home.css"; 

const Calendar = () => {

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState({date: today.getDate(), month: today.getMonth(), year: today.getFullYear()}); // State for the highlighted date
  console.log(selectedDate);

  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [timeout, setTimeOut] = useState(null)

  function getRealDate(){
        return date
  }

  const renderCalendarDays = (date) => {
    const days = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Previous month's dates
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay; i > 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="fade">
          {prevMonthLastDay - i + 1}
        </div>
      );
    }

    // Current month's dates
    for (let i = 1; i <= lastDay; i++) {
      const isSelected =
        selectedDate &&
        selectedDate.date === i &&
        selectedDate.month === month &&
        selectedDate.year === year;

      days.push(
        <div
          key={`current-${i}`}
          className={`day ${isSelected ? 'selected' : ''} ${
            i === selectedDate.date &&
            month === selectedDate.month &&
            year === selectedDate.year
              ? 'today'
              : ''
          }`}
          onClick={() => handleDateClick(i, month, year)}
        >
          {i}
        </div>
      );
    }

    // Next month's dates
    const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
    for (let i = 1; i <= nextMonthStartDay; i++) {
      days.push(
        <div key={`next-${i}`} className="fade">
          {i}
        </div>
      );
    }

    return days;
  };

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };


  const loadData = (formattedDate) => {
    console.log("DATE BEFORE REQUEST: " + formattedDate); // Log the formatted date
    
    axios.get("http://localhost:3000/load-note", { params: { date: formattedDate }, withCredentials: true })
      .then((response) => {
          console.log("The note:" + response.data);
          setText(response.data); 
          console.log("Note loaded successfully!");
      })
      .catch((error) => {
          console.error("Error loading note:", error);
      });
  };
  

  const saveData = () =>{
    const noteData = {text, date};
    console.log("DATA BEFORE SEND: " + date);
    axios.post("http://localhost:3000/save-note", noteData, { withCredentials: true })
      .then(() => {
        console.log("Note saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
  }


  const handleInputChange = (field, value) => {
    if(timeout){
        clearTimeout(timeout)
    }
    if (field === "text") {
        setText(value);
        console.log(selectedDate);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedDate = `${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`;
        setDate(formattedDate);
        console.log(formattedDate);

    }
    

    const timeoutPeriod = setTimeout(() => {
        saveData(text,date);
  }, 1000)
    setTimeOut(timeoutPeriod)
  }
  const handleDateClick = (date, month, year) => {
    setText("");
    setSelectedDate({ date, month, year });
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${months[month]} ${date}, ${year}`;
    
    console.log("Formatted Date before request: ", formattedDate); // Log the date being sent
    
    loadData(formattedDate);  // Pass formatted date directly to loadData
  };


  const handleSignOut = () => {
    axios.post("http://localhost:3000/logout", {}, { withCredentials: true })
      .then((response) => {
        console.log("User signed out successfully");
        window.location.href = "/signin";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };


  return (
    <>



    <div className="flex grid grid-cols-2 place-items-center">
      <div className="calendar">
        <div className="header">
          <div id="prev" className="btn" onClick={handlePrev}>
            ←
          </div>
          <div id="month-year">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <div id="next" className="btn" onClick={handleNext}>
            →
          </div>
        </div>
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days" id="days">
          {renderCalendarDays(today)}
        </div>
      </div>

      <div className="notes">
        <form >
        <div>
        <textarea
            className="fillable"
            type="text"
            value={text}
            onChange={(e) => handleInputChange("text", e.target.value)}
        />
        </div>
        </form>
      </div>
    </div>

    <button className="signOut" onClick={handleSignOut}>
    Sign Out
    </button>
    

    </>
  
  );
};

export default Calendar;
