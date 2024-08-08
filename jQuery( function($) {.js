jQuery( function($) {

	var newCat, noSyncChecks = false, syncChecks, catAddAfter;

	$('#link_name').trigger( 'focus' );
	// Postboxes.
	postboxes.add_postbox_toggles('link');

	$('#category-tabs a').on( 'click', function(){
		var t = $(this).attr('href');
		$(this).parent().addClass('tabs').siblings('li').removeClass('tabs');
		$('.tabs-panel').hide();
		$(t).show();
		if ( '#categories-all' == t )
			deleteUserSetting('cats');
		else
			setUserSetting('cats','pop');
		return false;
	});
	if ( getUserSetting('cats') )
		$('#category-tabs a[href="#categories-pop"]').trigger( 'click' );

	// Ajax Cat.
	newCat = $('#newcat').one( 'focus', function() { $(this).val( '' ).removeClass( 'form-input-tip' ); } );

	$('#link-category-add-submit').on( 'click', function() { newCat.focus(); } );

	syncChecks = function() {
		if ( noSyncChecks )
			return;
		noSyncChecks = true;
		var th = $(this), c = th.is(':checked'), id = th.val().toString();
		$('#in-link-category-' + id + ', #in-popular-link_category-' + id).prop( 'checked', c );
		noSyncChecks = false;
	};

	/* Adds event listeners to an added category.*/
	catAddAfter = function( r, s ) {
		$(s.what + ' response_data', r).each( function() {
			var t = $($(this).text());
			t.find( 'label' ).each( function() {
				var th = $(this),
					val = th.find('input').val(),
					id = th.find('input')[0].id,
					name = th.text().trim(),
					o;
				$('#' + id).on( 'change', syncChecks );
				o = $( '<option value="' +  parseInt( val, 10 ) + '"></option>' ).text( name );
			} );
		} );
	};

	$('#categorychecklist').List( {
		alt: '',
		what: 'link-category',
		response: 'category-ajax-response',

		// Callback that's run after an item got added to the list.
		addAfter: catAddAfter
	} );

	// All categories is the default tab, so we delete the user setting.
	$('a[href="#categories-all"]').on( 'click', function(){deleteUserSetting('cats');});

	// Set a preference for the popular categories to cookies.
	$('a[href="#categories-pop"]').on( 'click', function(){setUserSetting('cats','pop');});

	if ( 'pop' == getUserSetting('cats') )
		$('a[href="#categories-pop"]').trigger( 'click' );

	/* Adds event handler that shows the interface controls to add a new category.*/
	$('#category-add-toggle').on( 'click', function() {
		$(this).parents('div:first').toggleClass( 'wp-hidden-children' );
		$('#category-tabs a[href="#categories-all"]').trigger( 'click' );
		$('#newcategory').trigger( 'focus' );
		return false;
	} );

	$('.categorychecklist :checkbox').on( 'change', syncChecks ).filter( ':checked' ).trigger( 'change' );
});
