# Python知识点（数据结构）

## 1.列表

```python
fruits = ['apple', 'banana', 'cherry']
print(fruits)
```

## 2. 元组

```python
dimensions = (200, 50)
print(dimensions)
```

## 3. 字典

```python
person = {'name': 'Alice', 'age': 25}
print(person)
```

## 4. 集合

```python
unique_items = {1, 2, 3, 4, 4, 5, 5, 5}
print(unique_items)
```

## 5. 队列

```python
from collections import deque

queue = deque(["apple", "banana", "cherry"])
queue.append("date")
print(queue.popleft())
```

## 6. 栈

```python
stack = [1, 2, 3, 4, 5]
stack.append(6)
print(stack.pop())
```

## 7. 数组

```python
from array import array

arr = array('i', [1, 2, 3])
print(arr)
```

## 8. 链表

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

ll = LinkedList()
ll.append(1)
ll.append(2)
```

## 9. 栈式队列

```python
class StackQueue:
    def __init__(self):
        self.stack1 = []
        self.stack2 = []

    def enqueue(self, x):
        self.stack1.append(x)

    def dequeue(self):
        if len(self.stack2) == 0:
            while len(self.stack1) > 0:
                self.stack2.append(self.stack1.pop())
        return self.stack2.pop()

sq = StackQueue()
sq.enqueue(1)
sq.enqueue(2)
print(sq.dequeue())
```

## 10. 集合操作

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1 | set2)  # 并集
print(set1 & set2)  # 交集
```

## 11. 集合推导式

```python
set_of_squares = {x**2 for x in range(10)}
print(set_of_squares)
```

## 12. 集合方法

```python
set1 = {1, 2, 3}
set1.add(4)
set1.remove(2)
print(set1)
```

## 13. 并集和交集

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))  # 并集
print(set1.intersection(set2))  # 交集
```

## 14. 差集

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1 - set2)  # 差集
```

## 15. 字典视图方法

```python
person = {'name': 'Alice', 'age': 25}
print(person.keys())
print(person.values())
```

## 16. 字典方法

```python
person = {'name': 'Alice', 'age': 25}
person.update({'age': 26})
print(person)
```

## 17. 列表方法

```python
fruits = ['apple', 'banana', 'cherry']
fruits.append('date')
print(fruits)
```

## 18. 列表排序

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
numbers.sort()
print(numbers)
```

## 19. 列表反转

```python
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)
```

## 20. 列表生成器

```python
squares = (x**2 for x in range(10))
print(next(squares))
```