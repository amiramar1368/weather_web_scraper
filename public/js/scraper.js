const buttons = document.querySelectorAll("button");
const dataDiv = document.getElementById("data")

Array.from(buttons).forEach(btn=>{
    btn.addEventListener("click",async (event)=>{
        Array.from(buttons).forEach(item=>{
            item.classList.remove("active");
        })
        event.target.classList.add("active");
        let html = '';

        if(!navigator.onLine){
           dataDiv.innerHTML =`<div>
           <label >ناموفق : </label><span>عدم دسترسی به اینترنت</span>
           </div>` ;
           return
        }

        const {data} = await axios.get(`/get-weather?city=${event.target.dataset.city}`);
        if(data.success){
            for(let key in data.data){
                html +=`
                <div>
                <label > ${key} </label><span> ${data.data[key]} </span>
                </div>
                `
            }
        }else{
            html +=`
                <div>
                <label >ناموفق : </label><span>خطایی رخ داده است</span>
                </div>
                `
        }
        dataDiv.innerHTML = html
    })
})