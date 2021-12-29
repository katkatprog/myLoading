//3秒立つまでnowloadingと表示をする。完了したらcompleteと表示。

function myLoading(){
    const millSec = 3000
    let showSpace = document.getElementById("showSpace");

    return new Promise((resolve, reject)=>{
        console.log("Now Loading...");
        showSpace.textContent = "Now Loading...";
        setTimeout(() => {
            console.log("Complete!");
            showSpace.textContent = "Complete!";
            resolve();
        }, millSec);
    })
}

function myLoadingFetch(){
    let showSpace = document.getElementById("showSpaceFetch");
    const inputSpace = document.getElementById("inputSpaceFetch")

    return new Promise((resolve, reject)=>{
        console.log("Now Loading...");
        showSpace.textContent = "Now Loading...";
        
        const userId = inputSpace.value;
        console.log(userId);
        fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then((res)=>{
            console.log(res.status);
            if(res.status !== 200){
                throw new Error("not found")
            }
            return res.json();
        }).then((userInfo)=>{
            console.log(userInfo);
            showSpace.innerHTML = `
                <h3>userID:${userInfo.login}</h3>
                <h3>userName:${userInfo.name}</h3>
                <img src="${userInfo.avatar_url}" alt="${userInfo.login}">
            `;
        }).catch((err)=>{
            console.error("a error happend");
            console.error(err.message);
            showSpace.textContent = "not found, please type correct user";
            setTimeout(() => {
                showSpace.textContent = "";
            }, 3000);
        }).finally(()=>{
            inputSpace.value="";
        })
    })
}

// myLoading(3000)

