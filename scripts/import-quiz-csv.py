"""Convert reviewed operator CSV to the static application bank. No DB connection."""
import csv,hashlib,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=root/'content/editorial/quiz-review-v2.csv'
with source.open(encoding='utf-8-sig',newline='')as f:rows=list(csv.DictReader(f))
levels={'하':'beginner','중':'intermediate','상':'advanced'}
questions=[];excluded=[]
for row in rows:
 number=int(row['문항번호'])
 if row['검토상태']!='검토완료':
  excluded.append({'sourceNumber':number,'status':row['검토상태']});continue
 kind={'MCQ':'mcq','선다':'mcq','OX':'ox'}[row['question_type']]
 options=[{'id':key.upper(),'text':row[f'option_{key}_ko']}for key in 'abc'if row[f'option_{key}_ko'].strip()not in ('','—')]
 assert row['question_ko'].strip() and row['해설'].strip()
 assert 2<=len(options)<=3
 assert row['정답선택지']in [option['id']for option in options]
 assert row['정답']==next(option['text']for option in options if option['id']==row['정답선택지'])
 if kind=='ox':assert len(options)==2
 questions.append(dict(id=f'almeng-{number:03}',sourceNumber=number,level=levels[row['난이도']],type=kind,category=row['category'],prompt=row['question_ko'],options=options,correctOptionId=row['정답선택지'],explanation=row['해설']))
assert len({q['id']for q in questions})==len(questions)
version=hashlib.sha256(json.dumps(questions,ensure_ascii=False,sort_keys=True).encode()).hexdigest()[:16]
bank={'version':version,'language':'ko','questions':questions}
(root/'content/quiz-bank.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
manifest={'source':'content/editorial/quiz-review-v2.csv','version':version,'sourceRows':len(rows),'includedRows':len(questions),'levels':{level:sum(q['level']==level for q in questions)for level in levels.values()},'excluded':excluded}
(root/'content/quiz-bank-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(manifest,ensure_ascii=False))
