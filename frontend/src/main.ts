import './components/header';
import './components/layout';
import './components/logo-tagline';
import './components/search';
import './design-tokens/tokens.css';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <app-layout>
    <div>Hello World</div>
  </app-layout>
`;
