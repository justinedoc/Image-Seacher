'use strict';

const searchInputBox = document.getElementById("searchInput");
const API = "3rpbYxdOEi36Ato7meo42FEqCCvHnQRYpq4H6EecpwyIy9hI6q0aDd8U";
const search = (input, button) => {

    const searchInput = document.getElementById(input);
    const searchBtn = document.getElementById(button);

    searchBtn.addEventListener("click", () => {
        document.title = searchInput.value;
        fetchImage();
        fetchImageSearch();
    });
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            document.title = searchInput.value;
            fetchImage();
            fetchImageSearch()
        }
    });
}
search('searchInput', 'submit');





///Loader

let counter = 0;
const fetchImage = () => {
    const load_box = document.querySelector(".load-box");
    load_box.classList.add("active");

    const image_box = document.getElementById("image-box");
    image_box.classList.remove("active");

    const showLoading = setInterval(() => {
        counter++
        if (counter === 60) {
            load_box.classList.remove("active");
            image_box.classList.add("active");
        }

        if (counter >= 70) {
            clearInterval(showLoading)
            counter = 0;
        }
    }, 60)
}

// image fetcher
let imgURL;
const fetchImageSearch = () => {
    const searchQuery = searchInputBox.value.trim();
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=1`;
    fetch(url, {
        method: "Get",
        headers: new Headers({
            'Authorization': API
        })
    }).then((response) => {
        return response.json()
    }).then(data => {
        console.log(data);
        const image_box = document.getElementById("image-box");
        image_box.innerHTML = `<img src="${data.photos[0].src.original}" id="image">`;
        imgURL = data.photos[0].src.original;
        downloadImg(imgURL);
    }).catch((err) => {
        const image_box = document.getElementById("image-box")
        image_box.innerHTML = "Image Not Found";
        console.log(err)
    })
}


// download Image (btn eventListener)

const downloadBtn = document.getElementById("download-Btn");
downloadBtn.addEventListener("click", () => {
    downloadImg(imgURL);
});


// download image
function downloadImg(url) {
    fetch(url, {
        method: 'Get',
        headers: new Headers({
            "Authorization": API
        })
    }).then(res => res.blob()).then(file => {
        let tempDownloadUrl = URL.createObjectURL(file);
        let link = document.getElementById("download-Btn");
        link.href = tempDownloadUrl;
        link.download = `${url.replace(/^.*[\\\/]/, '')}`;
    })
}


