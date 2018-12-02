window.onload = init;

function init() {
    new Vue({
        el: "#app",
        data: {
            restaurants: [
                {
                    nom: 'café de Paris',
                    cuisine: 'Française'
                },
                {
                    nom: 'Sun City Café',
                    cuisine: 'Américaine'
                }
            ],
            nom: '',
            cuisine: '',
            modify: false,
            count: 0,
            page: 0
        },
        mounted() {
          //  console.log("test");
            this.getRestaurantsFromServeur();
        },
        methods: {
            getRestaurantsFromServeur() {
                let url = "http://localhost:8080/api/restaurants?page=" + this.page;
                fetch(url).then((repJSON) => {
                    return repJSON.json();
                })
                    .then((repJS) => {
                        this.restaurants = repJS.data;
                        this.restaurants.count = repJS.count;

                    })
                    .catch((err) => {
                        console.log("ERROR SERVER");
                    })
            },
            pageNext() {
                this.page++;
                this.getRestaurantsFromServeur();
            },
            pagePrev() {
                this.page--;
                this.getRestaurantsFromServeur();
            },
			pageFirst() {
				if(this.page--){
					this.page = 0;
				}
				this.getRestaurantsFromServeur();
			},
			/*pageLast() {
				while(this.page++) {
					this.page++;
					this.getRestaurantsFromServeur();
				}
	
			},*/
            supprimerRestaurant(index) {
                this.restaurants.splice(index, 1);
            },
            ajouterRestaurant(event) {
                // Pour éviter que la page ne se ré-affiche
                event.preventDefault();

                // Récupération du formulaire. 
                let form = event.target;
               
                // Récupération des valeurs des champs du formulaire
                let donneesFormulaire = new FormData(form);

                let url = "http://127.0.0.1:8080/api/restaurants";

                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((res) => {
                                // Maintenant res est un vrai objet JavaScript
                                this.getRestaurantsFromServeur();
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            getColor(index) {
                return (index % 2) ? 'white' : 'lightGrey';
            },
            edit(restaurants) {
                //hide label 
                var lab = document.querySelector("#lab" + restaurants.restaurant_id);
                lab.style.display = "none";

                //display input
                var input = document.querySelector("#input" + restaurants.restaurant_id);
                input.style.display = "block";

                //display btn
                var btnV = document.querySelector("#btnV" + restaurants.restaurant_id);
                btnV.style.display = "block";
				
				//hide btn
                var btnE = document.querySelector("#btnE" + restaurants.restaurant_id);
                btnE.style.display = "none";
            },
            valid(restaurant_id) {

                //hide label 
                var lab = document.querySelector("#lab" + restaurant_id);
                lab.style.display = "block";

                //display input
                var input = document.querySelector("#input" + restaurant_id);
                input.style.display = "none";

				//display btn
                var btnV = document.querySelector("#btnV" + restaurant_id);
                btnV.style.display = "none";
				
                //hide btn
                var btnE = document.querySelector("#btnE" + restaurant_id);
                btnE.style.display = "block";


            },
            update(event) {
                // Pour éviter que la page ne se ré-affiche
                
                
                // Récupération du formulaire.
                var form = document.querySelector("#tete");
                console.log(form._id);
                // Récupération des valeurs des champs du formulaire
                let donneesFormulaire = new FormData(event.target);
                
				//Pour chercher la valeur d'un champ du fomulaire si elle est connue
                let id = form._id.value;
                
                let url = "/api/restaurants/" + id;

                fetch(url, {
                    method: "PUT",
                    body: donneesFormulaire
                })
                    .then(function (responseJSON) {
                        responseJSON.json()
                            .then(function (res) {
                                // Maintenant res est un vrai objet JavaScript
                                afficheReponsePUT(res);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            getName(restaurants) {
                return restaurants.name;
            },
            getRestId(restaurants) {
                return restaurants.restaurant_id;
            },
            getId(restaurants){
                return restaurants._id;
            }

        }
    })
}
