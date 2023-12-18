import { deleteDoc, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function App() {
  const [Runs, setRuns] = useState(null);
  const [calories, setCalories] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [mood, setMood] = useState("");
const [updateMoods, setUpdateMoods] = useState("")
  const runsCollectionRef = collection(db, "Runs");

  useEffect(() => {
    const getRuns = async () => {
      try {
        const data = await getDocs(runsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRuns(filteredData);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };

    getRuns();
  }, [runsCollectionRef]);

  const onSubmit = async () => {
    try {
      await addDoc(runsCollectionRef, {
        Calories: calories,
        Speed: speed,
        Mood: mood,
        Distance: distance,
      });
      // Clear the input fields after submission
      setCalories(0);
      setSpeed(0);
      setDistance(0);
      setMood("");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const deleteRun = async (id) => {
    const runsDoc = doc(db, "Runs", id);

    await deleteDoc(runsDoc);
  };

  const updateMood = async (id) => {
    const runsDoc = doc(db, "Runs", id);

    await updateDoc(runsDoc, {Mood: updateMoods});
    setUpdateMoods("")

  }
  return (
    <div>
      <br />
      <Auth />
      <br />
      <input
        placeholder="Calories"
        type="number"
        value={calories}
        onChange={(e) => setCalories(Number(e.target.value))}
      />
      <input
        placeholder="Speed (km/h)"
        type="number"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
      <input
        placeholder="Distance (km)"
        type="number"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />
      <input
        placeholder="Mood"
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />

      <button onClick={onSubmit}>Submit</button>

<div style={{display:"flex", justifyContent:"center"}}>

{Runs ? (
        Runs.map((run) => (
          <div
            key={run.id}
            style={{
              border: "3px solid black",
              borderRadius: "10px",
              display: "flex",
              padding: "10px",
              flexWrap: "wrap",
              width: "5%",
              justifyContent: "center",
            }}
          >
            <p>Calories: {run.Calories}</p>
            <p>Speed: {run.Speed}</p>
            <p>Distance: {run.Distance}</p>
            <p>Mood: {run.Mood}</p>
            <button onClick={() => deleteRun(run.id)}>Remove run</button>
            <input placeholder="Edit Mood" onChange={(e)=> {
              setUpdateMoods(e.target.value)

            }}/>
            <button
              onClick={() => {
                updateMood(run.id);
              }}
            >Update</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
  
</div>
      
    </div>
  );
}
