import hashlib

from your_full_name import your_full_name

def generate_hash_with_prefix(input_string, prefix="000"):
    number = 0
    while True:
        # Смешиваем исходную строку с произвольными данными (в данном случае с числом)
        test_string = input_string + str(number)
        # Вычисляем хэш (используем SHA-256)
        hash_object = hashlib.sha256(test_string.encode())
        hex_dig = hash_object.hexdigest()
        # Проверяем, удовлетворяет ли хэш условию
        if hex_dig.startswith(prefix):
            return number, hex_dig
        number += 1

# Входные данные
nonce, result_hash = generate_hash_with_prefix(your_full_name)
print(f"Для получения хэша начинающегося на '000' нужно добавить: {nonce}")
print(f"Результат хеширования: {result_hash}")
