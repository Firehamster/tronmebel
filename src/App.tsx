import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ServiceGallery from './pages/ServiceGallery';
import ProductGallery from './pages/ProductGallery';
import NotFound from './pages/NotFound';
import StickyRevealFrame from './components/StickyRevealFrame';
import Header from '@/components/ui/Header'; // your colorful header

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <StickyRevealFrame headerHeight={96} hotzoneHeight={6}>
          <Header />
        </StickyRevealFrame>

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/service/:slug" element={<ServiceGallery />} />
          <Route path="/product/:slug" element={<ProductGallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
