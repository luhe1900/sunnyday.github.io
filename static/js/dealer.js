

// jQuery Datatable
function filterGlobal (elem) {
	var table = $(elem).parents("table").parent().next().find("table");
//	console.log(table);
    
	table.DataTable().search(
//	$('#trustedLenderTable').DataTable().column( i ).search(
    	$('#global_filter').val()
//    	,$('#global_regex').prop('checked')
//    	,$('#global_smart').prop('checked')
	).draw();
}

function filterColumn1 ( i ) {
	var table = $("#trustedLenderTable");
    
//	table.DataTable().column( i ).search(
	$('#trustedLenderTable').DataTable().column( i ).search(
    	$('#searchFields1 .col'+i+'_filter').val()
//    	,$('#col'+i+'_regex').prop('checked')
//    	,$('#col'+i+'_smart').prop('checked')
	).draw();
}

function filterColumn2 ( i ) {
	var table = $("#availableLenderTable");
    
//	table.DataTable().column( i ).search(
	$('#availableLenderTable').DataTable().column( i ).search(
//    	var str = 'col'+i+'_filter';
//    	console.log($('#searchFields2 col'+i+'_filter'));
    	$('#searchFields2 .col'+i+'_filter').val()
//    	,$('#col'+i+'_regex').prop('checked')
//    	,$('#col'+i+'_smart').prop('checked')
	).draw();
}


$.fn.dataTable.ext.search.push(
	function( settings, data, dataIndex ) {
    	var min = parseInt( $('#minRate').val(), 10 );
    	var max = parseInt( $('#maxRate').val(), 10 );
    	var rate = parseFloat( data[3] ) || 0; // use data for the APR / 4th column
 
    	if ( ( isNaN( min ) && isNaN( max ) ) ||
         	( isNaN( min ) && rate <= max ) ||
         	( min <= rate   && isNaN( max ) ) ||
         	( min <= rate   && rate <= max ) )
    	{
        	return true;
    	}
    	return false;
	}
);

$(document).ready(function() {
	var table = $('#trustedLenderTable').DataTable({
    // searching: false,
    // paging: false
  });
  $(table.table().container()).removeClass('form-inline');
 
	$('input.global_filter').on( 'keyup click', function () {
    	filterGlobal(this);
	} );
 
	$('#searchFields1 input.column_filter').on( 'keyup click', function () {
    	filterColumn1( $(this).parents('tr').attr('data-column') );
	} );
    
	$('#searchFields2 input.column_filter').on( 'keyup click', function () {
    	filterColumn2( $(this).parents('tr').attr('data-column') );
	} );
    
	var table = $('#availableLenderTable').DataTable();
  $(table.table().container()).removeClass('form-inline');

    
	// Event listener to the two range filtering inputs to redraw on input
	$('#minRate, #maxRate').keyup( function() {
    	table.draw();
	} );
    
	$('#minRate, #maxRate').focusin( function() {
    	$(".slider").show();
	} );
    
    
    
    
	$( "#slider-range" ).slider({
  	range: true,
  	min: 0,
  	max: 100,
  	values: [ 15, 30 ],
  	slide: function( event, ui ) {
    	$( "#amount" ).val( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
    	$( "#minRate" ).val( ui.values[ 0 ] );
    	$( "#maxRate" ).val( ui.values[ 1 ] );
  	}
	});
    
	// set #amount default
	$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
  	"% - " + $( "#slider-range" ).slider( "values", 1 ) + "%" );
    
	$(".slider").hide();
    
    
    
//	$('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
//    	$.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
//	} );
//	 
//	$('table.table').DataTable( {
////    	ajax:       	'../ajax/data/arrays.txt',
//    	scrollY:    	200,
//    	scrollCollapse: true,
//    	paging:     	false
//	} );
//
//	// Apply a search to the second table for the demo
//	$('#availableLenderTable').DataTable().draw();
    
    
    
	$('[data-uk-tab]').on( 'change.uk.tab', function (e,active) {
      	console.log("UK-TABLE",$('.uk-switcher').find('.uk-table').get(active.index()).id);
                	console.log("PAGE DATATABLE ARE ",$.fn.dataTable.tables());
                	console.log("THIS DATATABLE IS: ", $.fn.dataTable.tables(true));

        	console.log( $('#tableB:visible').length );

          	$($.fn.dataTable.tables({visible: true, api: true})).DataTable().columns.adjust();
	});

} );
