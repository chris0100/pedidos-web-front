
function historial(){
  //Manejo de tablas
  $(document).ready(function () {
    $('#dt-filter-search').dataTable({

      initComplete: function () {
        this.api().columns().every( function () {
          var column = this;
          var search = $(`<input class="form-control form-control-sm" type="text" placeholder="Search">`)
            .appendTo( $(column.footer()).empty() )
            .on( 'change input', function () {
              var val = $(this).val()

              column
                .search( val ? val : '', true, false )
                .draw();
            } );

        } );
      }
    });
  });

// Data Picker Initialization
  $('.datepicker').pickadate();

}



