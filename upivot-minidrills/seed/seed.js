/*
Seed script for drills. Run with: node seed/seed.js
Requires MONGO_URI env var (default: mongodb://localhost:27017/upivot)
*/
const mongoose = require('mongoose');
const path = require('path');
const Drill = require(path.join(__dirname, '..', 'api', 'src', 'models', 'Drill'));
require('dotenv').config({ path: '.env' });

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/upivot';
  await mongoose.connect(uri);
  console.log('connected to', uri);

  const sample = [
    {
      title: 'Behavioral Basics',
      difficulty: 'easy',
      tags: ['behavioral','communication'],
      questions: [
        { id: 'q1', prompt: 'Tell me about a time you faced conflict at work.', keywords: ['conflict','team','resolve'] },
        { id: 'q2', prompt: 'Describe a time you led a project.', keywords: ['lead','project','result'] },
        { id: 'q3', prompt: 'How do you handle deadlines?', keywords: ['prioritize','deadline','plan'] },
        { id: 'q4', prompt: 'Explain a failure and what you learned.', keywords: ['failure','learn','improve'] },
        { id: 'q5', prompt: 'What motivates you?', keywords: ['motivate','passion','goal'] }
      ]
    },
    {
      title: 'System Design Short',
      difficulty: 'medium',
      tags: ['system','design'],
      questions: [
        { id: 'q1', prompt: 'How would you design a URL shortener?', keywords: ['shorten','hash','scale'] },
        { id: 'q2', prompt: 'How to ensure availability?', keywords: ['replication','failover','redundancy'] },
        { id: 'q3', prompt: 'How to handle collisions?', keywords: ['collision','retry','unique'] },
        { id: 'q4', prompt: 'How to scale reads?', keywords: ['cache','replica','read'] },
        { id: 'q5', prompt: 'How to monitor the system?', keywords: ['monitor','metrics','alert'] }
      ]
    },
    {
      title: 'Algorithms Quick',
      difficulty: 'hard',
      tags: ['algorithms','ds'],
      questions: [
        { id: 'q1', prompt: 'Explain quicksort.', keywords: ['pivot','partition','recursion'] },
        { id: 'q2', prompt: 'Explain dynamic programming idea.', keywords: ['overlap','memo','optimize'] },
        { id: 'q3', prompt: 'What is time complexity of binary search?', keywords: ['log','binary','complexity'] },
        { id: 'q4', prompt: 'When to use greedy?', keywords: ['greedy','optimal','choices'] },
        { id: 'q5', prompt: 'Describe hash table basics.', keywords: ['hash','collision','lookup'] }
      ]
    }
  ];

  await Drill.deleteMany({});
  await Drill.insertMany(sample);
  console.log('seeded drills');
  await mongoose.disconnect();
  console.log('done');
}

main().catch(err=>{ console.error(err); process.exit(1); });
