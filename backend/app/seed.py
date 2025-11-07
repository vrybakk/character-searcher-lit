import json
import random
from app.database import SessionLocal, init_db
from app.models import Character


def seed_database():
    """Seed the database with Star Wars characters."""
    init_db()
    db = SessionLocal()
    
    try:
        avatars = ["avatar-1.png", "avatar-2.png"]
        
        existing_count = db.query(Character).count()
        if existing_count > 0:
            print(f"Found {existing_count} existing characters. Updating icons...")
            existing_characters = db.query(Character).all()
            updated = 0
            for character in existing_characters:
                if not character.icon or character.icon not in avatars:
                    character.icon = random.choice(avatars)
                    updated += 1
            db.commit()
            print(f"Updated icons for {updated} characters.")
            return
        
        characters_data = [
            {
                "name": "Leia Organa",
                "birth_year": "19BBY",
                "gender": "Female",
                "homeworld": "Alderaan",
                "films": json.dumps(["Star Wars", "Empire Strikes Back", "Return of the Jedi"]),
                "description": "Leia Organa is one of the most iconic figures in the Star Wars saga. Born as Leia Amidala Skywalker, she was adopted by Bail and Breha Organa, the royal family of Alderaan. She grew up as a princess, but her destiny led her far beyond royal duties — becoming a senator, a general, and a key leader of the Rebel Alliance. Leia combined courage, diplomacy, and compassion with sharp political instincts. She stood as a symbol of resistance against tyranny, inspiring generations of rebels and freedom fighters across the galaxy.",
                "traits": json.dumps([
                    "Intelligent and persuasive, with strong diplomatic skills.",
                    "Brave and decisive in moments of crisis.",
                    "Deeply loyal to her allies, but unafraid to challenge them when needed.",
                    "Naturally strong in the Force, though she focused more on leadership than training as a Jedi."
                ]),
                "key_moments": json.dumps([
                    "Battle of Yavin: Leia played a pivotal role in transmitting the Death Star plans, leading to the station's destruction.",
                    "Escape from Jabba's Palace: Disguised as a bounty hunter, she infiltrated Jabba's court and ultimately killed him with her own chains.",
                    "Battle of Endor: She led the ground assault that ensured the destruction of the second Death Star.",
                    "Founding of the New Republic: After the fall of the Empire, Leia served as a senator and later founded the Resistance to oppose the rise of the First Order."
                ]),
                "relationships": json.dumps([
                    "Luke Skywalker: her twin brother, with whom she shared a deep bond through the Force.",
                    "Han Solo: her partner and eventual husband, with whom she had a son, Ben Solo (later known as Kylo Ren).",
                    "Bail Organa: her adoptive father, who shaped her sense of duty and justice."
                ]),
            },
            {
                "name": "Luke Skywalker",
                "birth_year": "19BBY",
                "gender": "Male",
                "homeworld": "Tatooine",
                "films": json.dumps(["Star Wars", "Empire Strikes Back", "Return of the Jedi"]),
                "description": "Jedi Knight and hero of the Rebellion. Son of Anakin Skywalker, he played a central role in the fall of the Empire and the redemption of Darth Vader.",
                "traits": json.dumps([
                    "Determined and optimistic, even in the face of overwhelming odds.",
                    "Strong connection to the Force, trained by Obi-Wan Kenobi and Yoda.",
                    "Compassionate, willing to see the good in others, even his father."
                ]),
                "key_moments": json.dumps([
                    "Battle of Yavin: Destroyed the first Death Star using the Force.",
                    "Battle of Hoth: Fought Darth Vader and learned the truth about his parentage.",
                    "Battle of Endor: Confronted the Emperor and redeemed his father, Darth Vader."
                ]),
                "relationships": json.dumps([
                    "Leia Organa: his twin sister.",
                    "Anakin Skywalker: his father, whom he redeemed from the dark side.",
                    "Obi-Wan Kenobi: his mentor and teacher."
                ]),
            },
            {
                "name": "Anakin Skywalker",
                "birth_year": "41BBY",
                "gender": "Male",
                "homeworld": "Tatooine",
                "films": json.dumps(["Star Wars", "Empire Strikes Back", "Return of the Jedi"]),
                "description": "Once a heroic Jedi Knight, Anakin was seduced by the dark side and became Darth Vader, one of the most feared Sith Lords in history.",
                "traits": json.dumps([
                    "Extremely powerful in the Force, considered the Chosen One.",
                    "Struggled with fear, anger, and attachment.",
                    "Ultimately redeemed through love for his son."
                ]),
                "key_moments": json.dumps([
                    "Fall to the dark side: Turned to the dark side to save Padmé, but lost everything.",
                    "As Darth Vader: Served the Empire for decades, hunting down Jedi and rebels.",
                    "Redemption: Sacrificed himself to save Luke and destroy the Emperor."
                ]),
                "relationships": json.dumps([
                    "Luke Skywalker: his son, whose love ultimately redeemed him.",
                    "Padmé Amidala: his wife, whose death led to his fall.",
                    "Obi-Wan Kenobi: his former master and friend, who became his enemy."
                ]),
            },
            {
                "name": "Darth Vader",
                "birth_year": "41BBY",
                "gender": "Male",
                "homeworld": "Tatooine",
                "films": json.dumps(["Star Wars", "Empire Strikes Back", "Return of the Jedi"]),
                "description": "The dark side persona of Anakin Skywalker, Darth Vader was the Sith Lord who served as the Emperor's enforcer. Feared throughout the galaxy, he was ultimately redeemed by his son Luke Skywalker.",
                "traits": json.dumps([
                    "Extremely powerful in the Force and lightsaber combat.",
                    "Ruthless and intimidating, but conflicted beneath the mask.",
                    "Bound to life support systems after his injuries on Mustafar."
                ]),
                "key_moments": json.dumps([
                    "Hunting down Jedi: Systematically eliminated most of the remaining Jedi Order.",
                    "Battle of Yavin: Oversaw the Death Star's destruction.",
                    "Battle of Endor: Turned against the Emperor to save Luke, sacrificing himself."
                ]),
                "relationships": json.dumps([
                    "Luke Skywalker: his son, who believed in his redemption.",
                    "Emperor Palpatine: his Sith master.",
                    "Leia Organa: his daughter, though he never knew during his life."
                ]),
            },
            {
                "name": "Lando Calrissian",
                "birth_year": "31BBY",
                "gender": "Male",
                "homeworld": "Socorro",
                "films": json.dumps(["Empire Strikes Back", "Return of the Jedi"]),
                "description": "A smooth-talking smuggler and gambler who became a general in the Rebel Alliance. Known for his charm, wit, and piloting skills.",
                "traits": json.dumps([
                    "Charismatic and persuasive.",
                    "Skilled pilot and gambler.",
                    "Loyal friend, despite initial betrayals."
                ]),
                "key_moments": json.dumps([
                    "Cloud City: Initially betrayed Han Solo to the Empire, but later helped rescue him.",
                    "Battle of Endor: Piloted the Millennium Falcon and helped destroy the second Death Star."
                ]),
                "relationships": json.dumps([
                    "Han Solo: his friend and former business partner.",
                    "Leia Organa: ally in the Rebellion."
                ]),
            },
            {
                "name": "Shmi Skywalker",
                "birth_year": "72BBY",
                "gender": "Female",
                "homeworld": "Tatooine",
                "films": json.dumps(["Star Wars"]),
                "description": "Mother of Anakin Skywalker, she raised him on Tatooine before he was discovered by the Jedi.",
                "traits": json.dumps([
                    "Loving and self-sacrificing.",
                    "Strong-willed despite her circumstances as a slave.",
                    "Believed in her son's destiny."
                ]),
                "key_moments": json.dumps([
                    "Anakin's birth: Gave birth to Anakin, who had no father.",
                    "Separation: Allowed Anakin to leave with the Jedi, despite her love for him.",
                    "Death: Killed by Tusken Raiders, which triggered Anakin's fall to the dark side."
                ]),
                "relationships": json.dumps([
                    "Anakin Skywalker: her son, whom she loved deeply."
                ]),
            },
            {
                "name": "Ben Skywalker (Legends)",
                "birth_year": "26ABY",
                "gender": "Male",
                "homeworld": "Coruscant",
                "films": json.dumps([]),
                "description": "Son of Luke Skywalker in the Expanded Universe. A powerful Jedi Knight who carried forward the Skywalker legacy.",
                "traits": json.dumps([
                    "Powerful Jedi Knight.",
                    "Carried on the Skywalker legacy.",
                    "Part of the Expanded Universe (Legends) continuity."
                ]),
                "key_moments": json.dumps([
                    "Jedi training: Trained by his father Luke Skywalker.",
                    "Various adventures in the Expanded Universe."
                ]),
                "relationships": json.dumps([
                    "Luke Skywalker: his father and teacher."
                ]),
            },
            {
                "name": "Cade Skywalker (Legends)",
                "birth_year": "130ABY",
                "gender": "Male",
                "homeworld": "Unknown",
                "films": json.dumps([]),
                "description": "Descendant of Luke Skywalker, known from the Star Wars: Legacy comics. Struggled with both light and dark sides of the Force.",
                "traits": json.dumps([
                    "Struggled with the dark side.",
                    "Descendant of the Skywalker line.",
                    "Part of the Expanded Universe (Legends) continuity."
                ]),
                "key_moments": json.dumps([
                    "Various adventures in the Legacy comic series."
                ]),
                "relationships": json.dumps([
                    "Descendant of Luke Skywalker."
                ]),
            }
        ]
        
        avatars = ["avatar-1.png", "avatar-2.png"]
        
        for char_data in characters_data:
            char_data["icon"] = random.choice(avatars)
            character = Character(**char_data)
            db.add(character)
        
        db.commit()
        print(f"Successfully seeded {len(characters_data)} characters into the database.")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

