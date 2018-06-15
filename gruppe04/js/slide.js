	//SCRIPT FOR SLIDING WHEN CLICK ON COUNTRY//

	/*global $*/
	function slideTo(slideNr) {
		$('.carousel').carousel(slideNr);
	}

	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	//SCRIPT FOR SLIDING WHEN CLICK ON CITY//
	navigateCountryCity();

	function navigateCountryCity() {
		// Get parameters from URL (country, city)
		var country = getParameterByName("country");
		var city = getParameterByName("city");

		if (country !== null && city == null) {
			switch (country) {
				case 'germany':
					slideTo(1);
					break;
				case 'netherlands':
					slideTo(2);
					break;
				case 'austria':
					slideTo(3);
					break;
				case 'belgium':
					slideTo(4);
					break;
				case 'hungary':
					slideTo(5);
					break;
				default:
					console.error("Country unknown: " + country);
					break;
			}
		}
		/*global getHotelInfo*/
		else if (city !== null) {
			getHotelInfo(updateModal);
		}


	}

	function showCity(city) {
		/*global history*/

		var path = window.location.pathname;

		if (path !== "/index.html") {
			path = "/index.html";
			window.location.href = window.location.protocol + "//" + window.location.host + path + '?city=' + city;
		}

		else {

			if (history.pushState) {
				var newurl = window.location.protocol + "//" + window.location.host + path + '?city=' + city;
				window.history.pushState({ path: newurl }, '', newurl);
			}
		}

		getHotelInfo(updateModal);
	}

	//SCRIPT FOR UPDATING THE MODAL INFORMATION//
	function updateModal(hotels) {
		var placeholderName = document.getElementById("hotelName");
		var placeholderAdress = document.getElementById("hotelAdress");
		var placeholderRoute = document.getElementById("hotelRoute");
		var placeholderApeContact = document.getElementById("apeContact");

		var city = getParameterByName("city");
		/*global global firebasetools*/
		var cityObj = firebasetools.filterArrayBy(hotels, "id", city)[0];

		placeholderName.innerHTML = cityObj.name;
		placeholderAdress.innerHTML = cityObj.adress;
		placeholderApeContact.innerHTML = cityObj.apecontact;


		document.getElementById("navigateLink").setAttribute("href", cityObj.route);

		slideTo(parseInt(cityObj.mapNo));
		$('#infoModal').modal({ backdrop: 'static' });

	}