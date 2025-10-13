import psycopg2

conn = psycopg2.connect(
    host="168.131.100.148",
    port=5432,
    dbname="postgres",
    user="postgres",  
    password="Park4089!"
)
print("연결 성공!")
