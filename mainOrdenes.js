$(document).ready(function () {
  const tableAfiliados = $("#tablaOrdenes").DataTable({
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
    },
    ajax: {
      type: "GET",
      url: "https://api-borvo.fly.dev/api/v1/ordenes/?limit=1000",
      dataSrc: "results",
      mode: "cors",
      async: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
    columns: [
      { data: "id" },
      {
        data: "ips",
        render: function (data) {
          const ips = data.substring(37);
          ipsFinal = ips.substring(0, ips.length - 1);
          return ipsFinal
        },
      },
      { data: "afiliado",
        render: function (data) {
            const afiliado = data.substring(43);
            afiliadoFinal = afiliado.substring(0, afiliado.length - 1);
            return afiliadoFinal
         },
      },
      { data: "fecha" },
      { data: "medico" },
      { data: "diagnostico"},
      {
        defaultContent:
          '<div class="btn-group btn-group-sm" role="group" aria-label="Small button group"><button type="button" class="btn btn-warning d-flex justify-align-center"><i class="bx bx-edit" style="font-size: 1.5rem; color:white"></i></button><button type="button" class="btn btn-danger d-flex justify-align-center"><i class="bx bx-trash" style="font-size: 1.5rem; color:white"></i></button></div>',
      },
    ],
    responsive: true,
    processing: true,
  });
});
