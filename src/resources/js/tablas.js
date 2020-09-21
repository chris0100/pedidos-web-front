// *********************************SCRIPT TABLAS**********************
// Manejo de tablas
function tablas() {
/*  $(document).ready(function () {
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
  });*/


  $(document).ready(function () {
    $('#dt-filter-select').dataTable({

      initComplete: function () {
        this.api().columns().every( function () {
          var column = this;
          var select = $('<select  class="browser-default custom-select form-control-sm"><option value="" selected>Search</option></select>')
            .appendTo( $(column.footer()).empty() )
            .on( 'change', function () {
              var val = $.fn.dataTable.util.escapeRegex(
                $(this).val()
              );

              column
                .search( val ? '^'+val+'$' : '', true, false )
                .draw();
            } );

          column.data().unique().sort().each( function ( d, j ) {
            select.append( '<option value="'+d+'">'+d+'</option>' )
          } );
        } );
      }
    });
  });
}
