const accessKey = "yG19osGlE-pWf8owp6RNFGRRE5Hd1P7hh3zh1AdNoV4";

let count = 10;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

let fetching = false;

async function getPhotos() {
    fetching = true;
    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data);

    let box = document.querySelector(".masonry");
    data.forEach((photo) => {
        let imageDiv = document.createElement("div");
        imageDiv.className = "item";
        
        let img = document.createElement("img");
        img.src = photo.urls.regular;
        
        let like =document.createElement('div');
        like.innerHTML=`<i class="fa-solid fa-heart"></i>`;
        like.className="like";

        like.addEventListener('click',()=>{
            like.children[0].classList.toggle('active');
            
        })
        let a = document.createElement("a");
        a.href = "#"; // Prevents the default behavior of the anchor
        
        let icon = document.createElement("i");
        icon.className = "fa-solid fa-circle-arrow-down";
        icon.style.cursor = "pointer";

        // Add the download event on click
        a.addEventListener('click', function(e) {
            e.preventDefault();
            downloadImage(photo.urls.regular, "downloaded-image.jpg");
        });

        a.appendChild(icon);

        imageDiv.appendChild(img);
        imageDiv.appendChild(a);
        imageDiv.appendChild(like);
        box.appendChild(imageDiv);
    });
    fetching = false;
}

function downloadImage(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(() => alert('Failed to download image!'));
}

getPhotos();

window.addEventListener("scroll", function () {
    console.log(window.scrollY, window.innerHeight, document.body.offsetHeight);
    if (
        !fetching &&
        window.scrollY + window.innerHeight + 100 >= document.body.offsetHeight
    ) {
        getPhotos();
    }
});
