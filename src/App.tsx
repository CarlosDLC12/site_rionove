import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess').then(m => ({ default: m.OrderSuccess })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(m => ({ default: m.ProductDetails })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Returns = lazy(() => import('./pages/Returns').then(m => ({ default: m.Returns })));
const TrackOrder = lazy(() => import('./pages/TrackOrder').then(m => ({ default: m.TrackOrder })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));

function App() {
    return (
        <Router>
            <Toaster position="top-center" richColors />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<OrderSuccess />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/product/:slugOrId" element={<ProductDetails />} />
                    <Route path="/termos" element={<Terms />} />
                    <Route path="/privacidade" element={<Privacy />} />
                    <Route path="/trocas" element={<Returns />} />
                    <Route path="/rastreio" element={<TrackOrder />} />
                    <Route path="/dicas-locais" element={<Blog />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
