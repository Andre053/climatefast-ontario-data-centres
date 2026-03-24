import DatacenterMap from '@/components/Map';
import '../../globals.css';

export default async function Home() {

    return (
        <>
            <div className="app">
                <h1>Environmental Activity and Sector Registrations</h1>
                <p>EASR-Air Emissions</p>
                <DatacenterMap />
            </div>
            <script type="module" src="/src/main.js"></script>
        </>
    );
};