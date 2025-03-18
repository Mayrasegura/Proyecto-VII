import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [service, setService] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/appointments/USER_ID")
            .then(response => setAppointments(response.data))
            .catch(error => console.log(error));
    }, []);

    const createAppointment = () => {
        axios.post("http://localhost:3000/appointments", {
            userId: "USER_ID",
            date,
            time,
            service
        }).then(() => window.location.reload());
    };

    return (
        <div>
            <h1>GlowUp App</h1>
            <h2>Reservar Cita</h2>
            <input type="date" onChange={e => setDate(e.target.value)} />
            <input type="time" onChange={e => setTime(e.target.value)} />
            <input type="text" placeholder="Servicio" onChange={e => setService(e.target.value)} />
            <button onClick={createAppointment}>Reservar</button>

            <h2>Mis Citas</h2>
            <ul>
                {appointments.map(appt => (
                    <li key={appt.id}>
                        {appt.date} - {appt.time} ({appt.service})
                        <button onClick={() => axios.delete(`http://localhost:3000/appointments/${appt.id}`).then(() => window.location.reload())}>
                            Cancelar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
