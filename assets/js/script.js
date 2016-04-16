( function( $, History ) {

	if ( !History.enabled ) {
		return false;
	}

	var $wrap = $( "#wrap" );

	$wrap.on( "click", ".page-link", function( event ) {

		event.preventDefault();

		if ( window.location === this.href ) {
			return;
		}

		var pageTitle = ( this.getAttribute( "rel" ) !== "home" ) ? this.textContent + " — Acme" : this.textContent;
		var pageURL = this.href;

		History.pushState( null, pageTitle, pageURL );
	} );

	History.Adapter.bind( window, "statechange", function( event ) { // Note: We are using statechange instead of popstate

		var regex = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
		var state = History.getState();

		$.get( state.url, function( res ) {

			var $res = $( res );

			$.each( $res, function( index, elem ) {
				if ( "wrap" !== elem.id ) {
					return;
				}
				$wrap.html( $( elem ).html() );			
			});
		} );
	} );

} )( jQuery, window.History );
