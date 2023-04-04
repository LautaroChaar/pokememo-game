import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout, Loading } from './components';
import { GamesContext, ThemeContext, UserContext } from './context';

const Landing = lazy(() => import('./pages/LandingPage/LandingPage'));
const Pokemon = lazy(() => import('./pages/PokemonSection/PokemonSection'));
const Numbers = lazy(() => import('./pages/NumberSection/NumberSection'));
const RegisterView = lazy(() => import('./pages/Register/Register'));
const LoginView = lazy(() => import('./pages/Login/Login'));
const HomeView = lazy(() => import('./pages/Home/Home'));


function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <UserContext>
          <GamesContext>
            <ThemeContext>
              <div className="App">
                <Layout>
                  <Routes>
                    <Route path='/' element={ <Landing/> } />
                    <Route path='/register' element={ <RegisterView/> } />
                    <Route path='/login' element={ <LoginView/> } />
                    <Route path='/home' element={ <HomeView/> } />
                    <Route path='/pokemon' element={ <Pokemon/> } />
                    <Route path='/numbers' element={ <Numbers/> } />
                    <Route path='*' element={<Navigate to="/login" replace /> } />
                  </Routes>
                </Layout>
              </div>
            </ThemeContext>
          </GamesContext>
        </UserContext>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
