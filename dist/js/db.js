// Initialize Firebase
var config = {
    apiKey: "AIzaSyDpFxnwnSuJsY6H8f6RxKB_GumOif4NeFs",
    authDomain: "ourvenue-1b3c7.firebaseapp.com",
    databaseURL: "https://ourvenue-1b3c7.firebaseio.com",
    projectId: "ourvenue-1b3c7",
    storageBucket: "ourvenue-1b3c7.appspot.com",
    messagingSenderId: "338399270757"
};

firebase.initializeApp(config);
const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});
// firebase.firestore().enablePersistence();

let list = $('#ourvenues');
// Push Venue
// const editVenueBtn = $('#editVenueBtn');
let addVenueBtn = $('#addVenueBtn');
var notif = "<p class='added animated pulse'>Venue has been added <i class='fas fa-check'></i></p>";
$('.form-venue input, .form-venue select').focus(function(){
    $('.added').remove();
});

// Display Venues
let getVenues = function (doc) {
    var listItem = `<div data-id=${doc.id} class="feature">
    <a href="edit.html?id=${doc.id}"><div id="" class="item-option edit"><i class="fas fa-edit"></i></div></a>
    <div id="" class="item-option close"><i class="fas fa-times"></i></div>
    <a href="#">
        <figure>
            <img src=${doc.data().imageUrl} alt="">
        </figure>
        <div class="detail">
            <h2 class="mt-none align-left">${doc.data().name}</h2>
            <p class="mt-none align-left">${doc.data().location}, ${doc.data().state}
            <span class="${doc.data().status == 1 ? "status" : "status nota"}">
            ${doc.data().status == 1 ? "Available" : "Not Available"}</span>
            </p>
        </div>
    </a>
    </div>`;
    list.append(listItem);

    // let featureNode = $(this).parents('.feature');
    // let id = featureNode[0].getAttribute('data-id');
    // $('.close').click(function () {
    //     alert('Are you sure you want to delete this venue?');
    //     db.collection('venues').doc(id).delete();
    // });
    // $('.edit').click(function () {
    //     location = edit-venue.html;
    //     var docRef = db.collection("venues").doc(id);

    //     docRef.get().then(function (doc) {
    //         if (doc.exists) {
    //             formVenue.name.value = doc.data().name;
    //             formVenue.category.value = doc.data().category;
    //             formVenue.location.value = doc.data().location;
    //             formVenue.state.value = doc.data().state;
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     }).catch(function (error) {
    //         console.log("Error getting document:", error);
    //     });
    // });

}
db.collection('venues').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        getVenues(doc);
    })
});

// formVenue.on('submit', (e) => {
//     e.preventDefault();

// })

// // File upload
$('#file').click(function () {
    $('#file-upload').click();
    $('#file-upload').change(function (e) {
        selectedFile = e.target.files[0];
        filename = selectedFile.name;
        $('#file').val(filename);
    });
});

function onAdd() {
    //create root reference
    var storageRef = firebase.storage().ref();
    var filename = selectedFile.name;
    var uploadTask = storageRef.child('venueImages/' + filename).put(selectedFile);
    console.log(filename);
    $('.fa-spinner').removeClass('d-none');
    $('.add-venue-text').addClass('d-none');
    addVenueBtn.attr("disabled", true);
    // Upload completed successfully, now we can get the download URL
    uploadTask.on('state_changed', function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            var formVenue = $('.form-venue')[0];
            // console.log(formVenue.category);
            db.collection('venues').add({
                name: formVenue.name.value,
                category: formVenue.category.value,
                location: formVenue.location.value,
                state: formVenue.state.value,
                status: formVenue.status.value,
                imageUrl: downloadURL
            });
            $('.fa-spinner').addClass('d-none');
            $('.add-venue-text').removeClass('d-none');
            addVenueBtn.attr("disabled", false);
            formVenue.name.value = "";
            formVenue.location.value = "";
            formVenue.status.value = 1;
            $('#file').val('Upload Image');
            var tabgroup = $('.tab-group');
            console.log(tabgroup);
            tabgroup.append(notif);
        });
    });
}

addVenueBtn.click(function () {
    onAdd();
});

// function onEdit() {
//     // Upload completed successfully, now we can get the download URL
//     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//         db.collection('venues').doc(id).update({
//             name: formVenue.name.value,
//             category: formVenue.category.value,
//             location: formVenue.location.value,
//             state: formVenue.state.value,
//             status: formVenue.status.value,
//             imageUrl: downloadURL
//         });
//     });
// }


