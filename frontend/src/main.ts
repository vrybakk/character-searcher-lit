import './components/header';
import './components/homepage';
import './components/layout';
import './components/logo-tagline';
import './components/search';
import './design-tokens/tokens.css';
import './styles/style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <app-layout>
    <app-homepage></app-homepage>
  </app-layout>
`;
