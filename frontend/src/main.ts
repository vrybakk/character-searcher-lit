import './components/logo-tagline';
import './design-tokens/tokens.css';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = '<logo-tagline></logo-tagline>';
