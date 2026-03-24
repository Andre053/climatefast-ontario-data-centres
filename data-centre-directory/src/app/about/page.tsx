import About from '@/components/About';
import '../../globals.css';

export default async function Home() {

    return (
        <div className="text-center">
            <h1 className="text-4xl mt-5">
                <About />
            </h1>
        </div>
        
    );
};