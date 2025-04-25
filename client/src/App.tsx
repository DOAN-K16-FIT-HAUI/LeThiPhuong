import { useEffect } from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';

function App() {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    return (
        <div>
            <header>
                <Header />
            </header>

            <main>
                <HomePage />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
