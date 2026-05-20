
"use client";

import { useEffect,useState } from "react";
import jsPDF from "jspdf";

export default function Home(){

const [people,setPeople] = useState([]);

const [form,setForm] = useState({
name:"",
age:"",
job:"",
phone:"",
email:"",
bio:"",
image:""
});

const loadPeople = async ()=>{
const res = await fetch("/api/people");
const data = await res.json();
setPeople(data);
};

useEffect(()=>{
loadPeople();
},[]);

const handleImage = (e)=>{
const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = ()=>{
setForm({...form,image:reader.result});
};

reader.readAsDataURL(file);
};

const addPerson = async ()=>{

await fetch("/api/people",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
});

setForm({
name:"",
age:"",
job:"",
phone:"",
email:"",
bio:"",
image:""
});

loadPeople();
};

const exportPDF = (person)=>{

const doc = new jsPDF();

doc.setFontSize(24);
doc.text("Person Report",20,20);

doc.text("Name: " + person.name,20,50);
doc.text("Age: " + person.age,20,65);
doc.text("Job: " + person.job,20,80);
doc.text("Phone: " + person.phone,20,95);
doc.text("Email: " + person.email,20,110);

const bio = doc.splitTextToSize(person.bio || "",160);
doc.text(bio,20,140);

if(person.image){
try{
doc.addImage(person.image,"JPEG",130,30,50,50);
}catch{}
}

doc.save(person.name + ".pdf");
};

return(
<div className="container">

<h1>People Platform Cloud ☁️</h1>

<div className="form">

<input
className="input"
placeholder="Name"
value={form.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<input
className="input"
placeholder="Age"
value={form.age}
onChange={(e)=>setForm({...form,age:e.target.value})}
/>

<input
className="input"
placeholder="Job"
value={form.job}
onChange={(e)=>setForm({...form,job:e.target.value})}
/>

<input
className="input"
placeholder="Phone"
value={form.phone}
onChange={(e)=>setForm({...form,phone:e.target.value})}
/>

<input
className="input"
placeholder="Email"
value={form.email}
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<textarea
className="input"
rows="5"
placeholder="Bio"
value={form.bio}
onChange={(e)=>setForm({...form,bio:e.target.value})}
/>

<input
type="file"
className="input"
accept="image/*"
onChange={handleImage}
/>

<button className="btn" onClick={addPerson}>
Add Person
</button>

</div>

<div className="grid">

{people.map((person)=>(
<div className="card" key={person._id}>

<img src={person.image} />

<h2>{person.name}</h2>

<p>{person.job}</p>
<p>{person.email}</p>

<button
className="btn"
onClick={()=>exportPDF(person)}
>
Download PDF
</button>

</div>
))}

</div>

</div>
)
}
