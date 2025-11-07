import './components/header';
import './components/logo-tagline';
import './components/search';
import './design-tokens/tokens.css';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = '<app-header></app-header>';
