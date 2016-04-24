( function( $, History, undefined ) {

	if ( !History.enabled ) {
		return false;
	}

	var $wrap = $( "#wrap" );

	$wrap.on( "click", ".page-link", function( event ) {

		event.preventDefault();

		if ( window.location === this.href ) {
			return;
		}

		var pageTitle = ( this.title ) ? this.title : this.textContent;
			pageTitle = ( this.getAttribute( "rel" ) === "home" ) ? pageTitle : pageTitle + " — Acme";

		History.pushState( null, pageTitle, this.href );

	} );

	History.Adapter.bind( window, "statechange", function() {

		var state = History.getState();

		$.get( state.url, function( res ) {
			$.each( $( res ), function( index, elem ) {
				
				if ( $wrap.selector !== "#" + elem.id ) {
					return;
				}

				$wrap
					.html( $( elem ).html() )
					.promise()
						.done( function( res ) {

							if ( typeof ga === "function" && res.length !== 0 ) { // Make sure the new content is added, and the 'ga()' method is available.
								ga('set', { 
									page: window.location.pathname,
									title: state.title
								});
								ga('send', 'pageview');
							}
						});
			} );
		} );
	} );

} )( jQuery, window.History );
