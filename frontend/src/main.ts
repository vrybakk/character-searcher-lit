import './components/character-detail';
import './components/character-list';
import './components/character-summary';
import './components/header';
import './components/homepage';
import './components/layout';
import './components/logo-tagline';
import './components/search';
import './components/sidebar-wrapper';
import './design-tokens/tokens.css';
import './styles/style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <app-layout>
    <app-character-detail></app-character-detail>
    <app-sidebar-wrapper slot="sidebar-right">
      <app-character-summary></app-character-summary>
    </app-sidebar-wrapper>
  </app-layout>
`;

// Mock data for character detail
const mockCharacterDetail = {
  id: 1,
  name: 'Leia Organa',
  birth_year: '19BBY',
  gender: 'Female',
  homeworld: 'Tatooine',
  films: JSON.stringify(['Star Wars', 'Empire Strikes Back', 'Return of the Jedi']),
  description:
    'Leia Organa is one of the most iconic figures in the Star Wars saga. Born as Leia Amidala Skywalker, she was adopted by Bail and Breha Organa, the royal family of Alderaan. She grew up as a princess, but her destiny led her far beyond royal duties — becoming a senator, a general, and a key leader of the Rebel Alliance. Leia combined courage, diplomacy, and compassion with sharp political instincts. She stood as a symbol of resistance against tyranny, inspiring generations of rebels and freedom fighters across the galaxy.',
  traits: JSON.stringify([
    'Intelligent and persuasive, with strong diplomatic skills.',
    'Brave and decisive in moments of crisis.',
    'Deeply loyal to her allies, but unafraid to challenge them when needed.',
    'Naturally strong in the Force, though she focused more on leadership than training as a Jedi.',
  ]),
  key_moments: JSON.stringify([
    'Battle of Yavin: Pivotal role in transmitting Death Star plans.',
    "Escape from Jabba's Palace: Infiltrated Jabba's court and killed him.",
    "Battle of Endor: Led ground assault for second Death Star's destruction.",
    'Founding of the New Republic: Served as senator, founded the Resistance.',
  ]),
  relationships: JSON.stringify([
    'Luke Skywalker: Twin brother.',
    'Han Solo: Partner and eventual husband, son Ben Solo (Kylo Ren).',
    'Bail Organa: Adoptive father.',
  ]),
  icon: 'rebel',
};

// Wait for custom elements to be defined and then set mock data
Promise.all([
  customElements.whenDefined('app-character-detail'),
  customElements.whenDefined('app-character-summary'),
]).then(() => {
  const characterDetail = document.querySelector('app-character-detail') as any;
  const characterSummary = document.querySelector('app-character-summary') as any;

  if (characterDetail) {
    characterDetail.character = mockCharacterDetail;
  }

  if (characterSummary) {
    characterSummary.character = mockCharacterDetail;
  }
});
