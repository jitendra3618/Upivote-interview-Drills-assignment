function scoreAttempt(drill, answers) {
  const qmap = new Map((drill.questions||[]).map(q => [q.id, q]));
  let totalKeywords = 0;
  let hitKeywords = 0;
  for (const a of answers) {
    const q = qmap.get(a.qid);
    if (!q) continue;
    const kws = q.keywords || [];
    totalKeywords += kws.length;
    const lower = (a.text || '').toLowerCase();
    for (const k of kws) {
      if (lower.includes(k.toLowerCase())) hitKeywords++;
    }
  }
  const score = totalKeywords === 0 ? 0 : Math.round((hitKeywords / totalKeywords) * 100);
  return score;
}
module.exports = { scoreAttempt };
