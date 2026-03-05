
function groupShows(data){

const shows={}

data.forEach(r=>{
if(!shows[r.show]) shows[r.show]=[]
shows[r.show].push(r)
})

return shows
}

function render(){

const search=document.getElementById("search").value.toLowerCase()
const format=document.getElementById("formatFilter").value
const year=document.getElementById("yearFilter").value

let filtered=recordings.filter(r=>{

if(search && !JSON.stringify(r).toLowerCase().includes(search)) return false
if(format && r.format!==format) return false
if(year && r.year!=year) return false

return true
})

const grouped=groupShows(filtered)
const container=document.getElementById("shows")

container.innerHTML=""

Object.keys(grouped).sort().forEach(show=>{

const div=document.createElement("div")
div.className="show"

div.innerHTML="<h3>"+show+" ("+grouped[show].length+")</h3>"

grouped[show].forEach(r=>{

let badges=""

if(r.proshot) badges+='<span class="badge proshot">PROSHOT</span>'
if(r.nft) badges+='<span class="badge nft">NFT</span>'

const row=document.createElement("div")

row.className="recording "+r.format.toLowerCase()

row.innerHTML=r.year+" | "+r.location+" | "+r.format+" "+badges

row.onclick=()=>{
alert(
show+"\n"+
r.year+" "+r.location+"\n"+
"Cast: "+(r.cast||"unknown")+"\n"+
"Master: "+(r.master||"unknown")
)
}

div.appendChild(row)

})

container.appendChild(div)

})

}

function populateYears(){

const years=[...new Set(recordings.map(r=>r.year))].sort()

const select=document.getElementById("yearFilter")

years.forEach(y=>{

const o=document.createElement("option")
o.value=y
o.textContent=y
select.appendChild(o)

})

}

document.getElementById("search").oninput=render
document.getElementById("formatFilter").onchange=render
document.getElementById("yearFilter").onchange=render

document.getElementById("importEncora").onclick=()=>{
alert("Upload your Encora export and replace data.js")
}

populateYears()
render()
