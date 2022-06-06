import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Table from "../components/Table";

export default function Dashboard({ session }) {

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [bloodsugar, setBloodsugar] = useState([]);

    useEffect(() => {
        setUserId(supabase.auth.user().id);    
        loadJournal();
    }, [session]);

    async function loadJournal() {
        const user = supabase.auth.user();
        let {data, error} = await supabase
            .from('journals')
            .select('bloodsugar');
        if (data.length == 0) {
            await supabase.from('journals').insert({owner_id: user.id}, {returning: 'minimal'});
        } else {
            setBloodsugar(data[0].bloodsugar);
        }
    }

    async function addBloodsugar(timestamp, bloodsugarValue) {
        const request = {
            requester_id: supabase.auth.user().id,
            new_timestamp: timestamp,
            new_value: bloodsugarValue
        }
        let {data, error} = await supabase
            .rpc('add_bloodsugar', request);
        loadJournal();
    }

    async function logout() {
        supabase.auth.signOut();
    }

    return (
        <>
            <h1 className="text-xl">Dashboard</h1>
            <span>userId: {userId}</span><br/>
            <div>

            </div>
                <button className="mx-8 my-8 bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addBloodsugar('2022-06-04T14:29:03.974635+00:00', bloodsugar == null ? 0 : bloodsugar.length )}>Add bloodsugar value</button>            
            <div>
                <Table headers={['Timestamps', 'Bloodsugar']} data={bloodsugar}/>
            </div>
        </>
    );
}
