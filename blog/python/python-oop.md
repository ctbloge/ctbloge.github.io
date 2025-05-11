# Python知识点（面向对象编程）

## 1.定义类

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name} says woof!")

my_dog = Dog("Buddy", 3)
my_dog.bark()
```



## 2. 类继承

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement abstract method")

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow!"

my_cat = Cat("Whiskers")
print(my_cat.speak())
```

## 3. 类属性

```python
class Dog:
    species = "Canis familiaris"

    def __init__(self, name, age):
        self.name = name
        self.age = age

my_dog = Dog("Buddy", 3)
print(my_dog.species)
```

## 4. 实例方法

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def description(self):
        return f"{self.name} is {self.age} years old."

my_dog = Dog("Buddy", 3)
print(my_dog.description())
```

## 5. 类方法

```python
class Dog:
    species = "Canis familiaris"

    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def get_species(cls):
        return cls.species

print(Dog.get_species())
```

## 6. 静态方法

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @staticmethod
    def is_adult(age):
        return age > 2

print(Dog.is_adult(3))
```

## 7. 属性装饰器

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def diameter(self):
        return self.radius * 2

circle = Circle(5)
print(circle.diameter)
```

## 8. 特殊方法

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name} is {self.age} years old."

my_dog = Dog("Buddy", 3)
print(my_dog)
```

## 9. 比较对象

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __lt__(self, other):
        return self.age < other.age

dog1 = Dog("Buddy", 3)
dog2 = Dog("Whiskers", 2)
print(dog1 < dog2)
```

## 10. 对象复制

```python
import copy

class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

dog1 = Dog("Buddy", 3)
dog2 = copy.copy(dog1)
dog2.age = 4
print(dog1.age, dog2.age)
```

## 11. 对象序列化

```python
import pickle

class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

dog = Dog("Buddy", 3)
with open('dog.pkl', 'wb') as file:
    pickle.dump(dog, file)

with open('dog.pkl', 'rb') as file:
    loaded_dog = pickle.load(file)
    print(loaded_dog.name, loaded_dog.age)
```

## 12. 单例模式

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance

obj1 = Singleton()
obj2 = Singleton()
print(obj1 is obj2)
```

## 13. 私有属性和方法

```python
class Dog:
    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    def get_name(self):
        return self.__name

    def get_age(self):
        return self.__age

my_dog = Dog("Buddy", 3)
print(my_dog.get_name())
```

## 14. 多态

```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

animals = [Dog(), Cat()]
for animal in animals:
    print(animal.speak())
```

## 15. 抽象基类

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

dog = Dog()
print(dog.speak())
```

## 16. 多继承

```python
class A:
    def method(self):
        print("A method")

class B:
    def method(self):
        print("B method")

class C(A, B):
    pass

c = C()
c.method()
```

## 17. 迭代器

```python
class MyIterator:
    def __init__(self, data):
        self.data = data
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= len(self.data):
            raise StopIteration
        result = self.data[self.index]
        self.index += 1
        return result

my_iter = MyIterator([1, 2, 3, 4])
for item in my_iter:
    print(item)
```

## 18. 生成器

```python
def my_generator():
    yield 1
    yield 2
    yield 3

gen = my_generator()
print(next(gen))
print(next(gen))
```

## 19. 上下文管理器

```python
class MyContextManager:
    def __enter__(self):
        print("Entering context")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting context")

with MyContextManager() as my_manager:
    print("Inside context")
```

## 20. 属性包装

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero is not possible")
        self._celsius = value

    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32

temp = Temperature(25)
print(temp.fahrenheit)
temp.celsius = 30
print(temp.fahrenheit)
```

## 21. 类装饰器

```python
def my_decorator(cls):
    class Wrapped(cls):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.decorated = True
    return Wrapped

@my_decorator
class MyClass:
    def __init__(self, value):
        self.value = value

obj = MyClass(10)
print(obj.decorated, obj.value)
```

## 22. 使用 `__slots__` 优化内存使用

```python
class Point:
    __slots__ = ['x', 'y']

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
print(p.x, p.y)
```