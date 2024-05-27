import hashlib

def generate_hash_with_prefix(input_string, prefix="000"):
    number = 0
    while True:
        test_string = input_string + str(number)
        hash_object = hashlib.sha256(test_string.encode())
        hex_dig = hash_object.hexdigest()
        if hex_dig.startswith(prefix):
            return number, hex_dig
        number += 1

fio = "Крапачев Данил Алексеевич"
nonce, result_hash = generate_hash_with_prefix(fio)
print(f"Для получения хэша начинающегося на '000' нужно добавить: {nonce}")
print(f"Результат хеширования: {result_hash}")
