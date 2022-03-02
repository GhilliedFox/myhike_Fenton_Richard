function read_display_quote(){
    db.collection("quotes").doc("tuesday")
    .onSnapshot(tuesdayDoc => {
        document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote;
    })
}
read_display_quote();

function display_name(){
    //to check if the user is logged in
firebase.auth().onAuthStateChanged(user =>{
    if (user){
        console.log(user.uid);
        currentUser = db.collection("users").doc(user.uid);
        currentUser.get().then(userDoc =>{
            //get user name
            var user_Name = userDoc.data().name;
            console.log(user_Name);
            document.getElementById("name-goes-here").innerText=user_Name;
        })
    }
})

function writeHikes() {
                    //define a variable for the collection you want to create in Firestore to populate data
                    var hikesRef = db.collection("hikes");

                    hikesRef.add({
                        code:"OAX01",
                        name: "Monte Alban",    //replace with your own city?
                        city: "Oaxaca",
                        province: "Mexico",
                        level: "easy",
                        length: "9.0 km",
                        details: "Lots of old ruins here"
                    });
                    hikesRef.add({
                        code:"CRAT01",
                        name: "Crater Lake Trail",    //replace with your own city?
                        city: "Smithers",
                        province: "BC",
                        level: "moderate",
                        length: "5.8 km",
                        details: "Great Wonder of Canada"
                    });
                    hikesRef.add({
                        code:"CYP01",
                        name: "Cypress Falls Hike",    //replace with your own city?
                        city: "West Vancouver",
                        province: "BC",
                        level: "moderate",
                        length: "8.2 km",
                        details: "Local to BCIT"
                    });
                }
                function displayCards(collection) {
                    let cardTemplate = document.getElementById("hikeCardTemplate");
                
                    db.collection(collection).get()
                        .then(snap => {
                            var i = 1;
                            snap.forEach(doc => { //iterate thru each doc
                                var title = doc.data().name;   // get value of the "name" key
                                var details = doc.data().details;   // get value of the "details" key
                                let newcard = cardTemplate.content.cloneNode(true);
                
                                //update title and text and image
                                newcard.querySelector('.card-title').innerHTML = title;
                                newcard.querySelector('.card-text').innerHTML = details;
                                newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg
                
                                //give unique ids to all elements for future use
                                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                                newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
                
                                //attach to gallery
                                document.getElementById(collection + "-go-here").appendChild(newcard);
                                i++;
                            })
                        })
                }
                
                displayCards("hikes");
}
display_name();