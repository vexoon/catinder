let container = document.getElementsByClassName('container')[0];
let cover = document.getElementsByClassName('cover')[0];
let catImg = document.getElementById('catImg');
let like = document.getElementById('like');
let dislike = document.getElementById('dislike');

let mouseCurrentDownX=-1;
let mouseCurrentUpX=-1;


async function getNewCatImgUrl() {
    const response = await fetch("https://cataas.com/cat?json=true");
    const result = await response.json();
    return result.url;
}

async function putNewCatImg(className){
    // İlk yükleme
    if (!className) {
        catImg.src = await getNewCatImgUrl();
        return;
    }

    // Animasyonu başlat
    catImg.classList.add(className);

    setTimeout(async () => {

        // Elementi resetlemek için DOM’dan çıkar
        const newElement = catImg.cloneNode(true);

        // Class'sız hali
        newElement.className = "";
        newElement.id = "catImg";

        // Yeni resmi yükle
        newElement.src = await getNewCatImgUrl();

        // Eskisini sil
        catImg.remove();

        // Yeniyi ekle
        container.appendChild(newElement);

        // Global değişkeni güncelle
        catImg = newElement;

    }, 500);
}

like.addEventListener('click', () => {
    putNewCatImg('removed-right');
});

dislike.addEventListener('click', () => {
    putNewCatImg('removed-left');
});

cover.addEventListener('touchstart', function(e){
    //console.log('touchstart', e.touches[0].clientX);
    mouseCurrentDownX = e.touches[0].clientX;
})

cover.addEventListener('touchend', function(e){
    //console.log('touchend', e.changedTouches[0].clientX);
    mouseCurrentUpX = e.changedTouches[0].clientX;
    action();
})

cover.addEventListener('mousedown',function(e){
    mouseCurrentDownX = e.clientX;
});

cover.addEventListener('mouseup',function(e){
    mouseCurrentUpX = e.clientX;
    action();
    
});

function action() {
    if (Math.abs(mouseCurrentUpX - mouseCurrentDownX) < 20) {
        return;
    }

    if (mouseCurrentUpX - mouseCurrentDownX > 0) {
        putNewCatImg('removed-right');
    } else {
        putNewCatImg('removed-left');
    }
}

putNewCatImg();