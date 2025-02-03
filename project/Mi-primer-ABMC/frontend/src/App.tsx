import NavBar from './components/Shared/NavBar';
import AppRouter from './routes/AppRoutes';

export default function App() {
  return (
    <main className='p-5'>
      <NavBar />
      <AppRouter />
    </main>
  )
}
