let jornadaId = null;
let segundos = 0;
let intervalo = null;

function iniciarCronometro() {
  intervalo = setInterval(() => {
    segundos++;

    let horas = Math.floor(segundos / 3600)
    let min = Math.floor((segundos % 3600)/ 60);
    let sec = segundos % 60;

    
    document.getElementById("cronometro").innerText =
      `${horas.toString().padStart(2, "0")}:` +
      `${min.toString().padStart(2, "0")}:` +
      `${sec.toString().padStart(2, "0")}`;

  }, 1000);
}

function detenerCronometro() {
  clearInterval(intervalo);
}

function agregarFila(data) {

  const tbody = document.getElementById("tablaBody");

  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td>${data.codigoEmpleado}</td>
    <td>${new Date(data.horaEntrada).toLocaleTimeString()}</td>
    <td>${new Date(data.horaSalida).toLocaleTimeString()}</td>
    <td>${data.tiempoTotal}</td>
  `;

  tbody.appendChild(fila);

}
async function iniciar() {

  const codigo = document.getElementById("codigo").value;

  const res = await fetch(
    "http://localhost:3000/jornada/iniciar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo }),
    }
  );

  const data = await res.json();

  jornadaId = data.id;

  segundos = 0;

  iniciarCronometro();
}

async function terminar() {

  if (!jornadaId) {
    alert("No hay jornada iniciada");
    return;
  }

 const res =  await fetch(
    "http://localhost:3000/jornada/terminar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: jornadaId }),
    }
  );
  const data =await res.json();
   detenerCronometro()
   agregarFila(data)

  detenerCronometro();
}