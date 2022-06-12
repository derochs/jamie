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
    }, [session]);

    async function loadJournal() {
        console.log('loading...');
        const user = supabase.auth.user();
        let {data, error} = await supabase
            .from('journals')
            .select('bloodsugar');
        if (data.length == 0) {
            console.log('Creating new journal');
            await supabase.from('journals').insert({owner_id: user.id}, {returning: 'minimal'});
        } else {
            console.log('Received data');
            console.log(data);
            setBloodsugar(data[0].bloodsugar);
        }
    }

    async function createJournal() {
        console.log('Creating journal...');
        const user = supabase.auth.user();
        let {data, error} = await supabase
        .from('journals')
        .insert({owner_id: user.id}, {returning: 'minimal'});
        console.log(data);
        console.log(error);
    }

    async function createPermission() {
        console.log('Creating permission...');
        const user = supabase.auth.user();
        let {data, error} = await supabase
        .from('journal_permissions')
        .insert({user_id: user.id, journal_id: 1}, {returning: 'minimal'});
        console.log(data);
        console.log(error);
    }

    async function readJournals() {
        const user = supabase.auth.user();
        let {data, error} = await supabase
        .from('journals')
        .select('*');
        console.log(data);
        console.log(error);
    }

    async function addBloodsugar(timestamp, bloodsugarValue) {
        const request = {
            requester_id: supabase.auth.user().id,
            new_timestamp: timestamp,
            new_value: bloodsugarValue
        }
        let {data, error} = await supabase
            .rpc('add_bloodsugar', request);
        console.log(data);
        console.log(error);
    }

    async function logout() {
        supabase.auth.signOut();
    }

    return (
        <>
            <h1 className="text-xl">Dashboard</h1>
            <span>userId: {userId}</span><br/>
            <div className="my-4">
                <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => createJournal()}>Create journal</button>
                <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => createPermission()}>Create permission</button>
                <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => readJournals()}>Read journals</button>
                <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addBloodsugar('2022-06-04T14:29:03.974635+00:00', bloodsugar == null ? 0 : bloodsugar.length )}>Insert bloodsugar value</button>
                <button className="mx-1 bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
            </div>
        </>
    );
}
