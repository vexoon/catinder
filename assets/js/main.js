console.log('main js is here');
let conatiner = document.getElementsByClassName('container')[0];
let cover = document.getElementsByClassName('cover')[0];
let catImg = document.getElementById('catImg');
let like = document.getElementById('like');
let dislike = document.getElementById('dislike');
let mouseCurrentDownX=-1;
let mouseCurrentUpX=-1;
let catPics=[];
let likes = 0;
let disLikes = 0;

async function getNewCatImgUrl() {
    const response = await fetch("https://cataas.com/cat?json=true");
    const result = await response.json();
    //console.log(result.url)
    return result.url;
}

async function putNewCatImg(className){//???
    const catUrl = await getNewCatImgUrl();
    catImg.src = catUrl;
    addLink(catUrl);

    if (className) {
        conatiner.classList.add(className);
        setTimeout(async function () {
            conatiner.classList.remove(className);
        }, 500);
    }
}



like.addEventListener('click', () => {
    putNewCatImg('removed-right');
});

dislike.addEventListener('click', () => {
    putNewCatImg('removed-right');
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
        likes++;
    } else {
        putNewCatImg('removed-left');
        disLikes++;
    }
    updateInfo();
}

function addLink(catLink) {
    catPics.push(catLink);
    let catLinks = document.getElementById('catLinks');

    let tmpLi = document.createElement('li');
    tmpLi.innerText = catLink;
    catLinks.appendChild(tmpLi);

}

function updateInfo(){
    document.getElementById('likes').textContent = 'likes : '+ likes;
    document.getElementById('dislikes').textContent = 'dislikes : '+ disLikes;
}


putNewCatImg();