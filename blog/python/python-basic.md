# **Python知识点**（基础语法）

## 1.打印输出

```markdown
print("Hello, World!")
```

## 2. 变量与赋值

```python
x = 5
y = "Python"
print(x, y)
```

## 3. 数据类型

```python
age = 25  #整型
height = 1.75  #浮点型
greeting = "Hello"  #字符串
is_student = True  #布尔型
```

## 4. 输入函数

```python
name = input("请输入你的名字: ")
print("你好, " + name)
```

## 5. 条件语句

```python
score = 85
if score >= 90:
    print("优秀")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

## 6. 循环

```python
#for 循环
for i in range(5):
    print(i)
    
#while 循环
count = 0
while count < 5:
    print(count)
    count += 1
```

## 7. 函数定义

```python
def greet(name):
    return "Hello, " + name

print(greet("Alice"))
```

## 8. 列表推导式

```python
squares = [x**2 for x in range(10)]
print(squares)
```

## 9. 字典推导式

```python
squared_dict = {x: x**2 for x in range(10)}
print(squared_dict)
```

## 10. 集合操作

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1 | set2)  # 并集
print(set1 & set2)  # 交集
```

## 11. 异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("除数不能为零")
```

## 12. 文件操作

```python
#读取文件
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)

#写入文件
with open('example.txt', 'w') as file:
    file.write("这是一个示例文件。")
```

## 13. 模块导入

```python
import math
print(math.sqrt(16))
```

## 14. 注释

```python
# 这是一个单行注释
"""
这是一个多行注释
"""
```

## 15. 运算符

##### **15.1 算术运算符**

```python
a = 10
b = 5
print(a + b)  # 加法
print(a - b)  # 减法
```

##### 15.2 比较运算符

```python
x = 5
y = 10
print(x < y)  # 小于
print(x == y) # 等于
```

## 16. 连接字符串

```python
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)
```

## 17. 格式化字符串

```python
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")
```

## 18. 列表切片

```python
my_list = [0, 1, 2, 3, 4, 5]
print(my_list[1:4])
```

## 19. 字典操作

```python
person = {'name': 'Alice', 'age': 25}
print(person['name'])
person['age'] = 26
print(person)
```

## 20. 元组

```python
my_tuple = (1, 2, 3)
print(my_tuple[1])
```