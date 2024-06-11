import firebase_admin    
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./medihacks.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

with open('codes.txt', 'r') as file:
    codes_content = file.read()

referral_codes = [code.strip() for code in codes_content.split(',')]

doc_ref = db.collection('users').document('available_codes')

doc_ref.set({'codes': referral_codes}, merge=True)

print(f"Successfully added {len(referral_codes)} referral codes to Firestore.")
