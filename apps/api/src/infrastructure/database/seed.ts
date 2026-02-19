import 'dotenv/config'
import { db } from './db'
import { foodsTable } from './schema'

async function seed() {
  console.log('🌱 Seeding database...')

  const foods = [
    {
      name: 'Frango Grelhado',
      calories: '165',
      carbohydrates: '0',
      protein: '31',
      fat: '3.6',
    },
    {
      name: 'Arroz Branco Cozido',
      calories: '130',
      carbohydrates: '28',
      protein: '2.7',
      fat: '0.3',
    },
    {
      name: 'Ovo Cozido',
      calories: '155',
      carbohydrates: '1.1',
      protein: '13',
      fat: '11',
    },
    {
      name: 'Banana Nanica',
      calories: '89',
      carbohydrates: '23',
      protein: '1.1',
      fat: '0.3',
    },
    {
      name: 'Pasta de Amendoim',
      calories: '588',
      carbohydrates: '20',
      protein: '25',
      fat: '50',
    },
    {
      name: 'Aveia em Flocos',
      calories: '389',
      carbohydrates: '66',
      protein: '17',
      fat: '7',
    },
    {
      name: 'Patinho Moído',
      calories: '219',
      carbohydrates: '0',
      protein: '35.9',
      fat: '7.3',
    },
  ]

  try {
    console.log('Inserting foods...')
    await db.insert(foodsTable).values(foods)
    console.log('✅ Seed completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    process.exit(0)
  }
}

seed()
