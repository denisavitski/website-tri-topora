# Три топора

## Формы

Для отправки данных форм используется элемент `<e-form>`. Данные передаются в формате [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) на адрес, указанный в атрибуте url. Специальное значение `/test` используется для разработки.

Пример разметки формы:

```html
<e-form
  name="feedback"
  url="/test"
>
```

Вам потребуется настроить API-роут, который будет принимать запросы с указанного адреса.

## Скрипты

В этом проекте переходы между страницами происходят без их перезагрузки, поэтому скрипты нужно писать так, чтобы они правильно работали при динамическом обновлении контента.

### Основные принципы:

1. **Используйте кастомные элементы.**

    Кастомные элементы автоматически выполняют код через методы:

    - **connectedCallback** 

      запускается при добавлении элемента на страницу.

    - **disconnectedCallback** 

      запускается при удалении элемента.

2. **Подписывайтесь на события замены страниц.**

    Для управления логикой скриптов предусмотрены следующие события:

    - **morphStart**

     начало замены страницы.

    - **morphComplete**

     замена страницы завершена.

    - **morphNewChildrenAdded**

     новый контент добавлен на страницу.

    - **morphOldChildrenRemoved**

     старый контент удален.

Пример использования событий:

```ts
document.addEventListener('morphComplete', () => {
  console.log('Переход завершен');
});
```

## Использование атрибутов

Обращайте внимание на наличие атрибутов в разметке. Например, если элементы содержат стилизующие атрибуты, такие как:

```html
style="--index: n"
style="--reveal-index: n"
```

убедитесь, что они правильно проставлены.

## Блоки и структура страниц

### Блоки

Все страницы состоят из независимых сущностей, называемых блоками, которые хранятся в директории [blocks](/src/blocks/). Эти универсальные элементы, которые можно многократно использовать на одной или нескольких страницах. **Используйте их для создания шаблонов в CMS.**

Есть также **уникальные блоки**, они находятся в папке [singletons](/src/singletons/). Эти блоки предназначены для использования только один раз на странице, и их нельзя повторять.

В собранной разметке блоки помечаются специальными комментариями:

- **Повторяемые блоки** помечаются как `<!-- BLOCK -->`.
- **Уникальные блоки** помечаются как `<!-- SINGLETON -->`.

## Ссылки

Все внутренние ссылки на страницы должны начинаться с символа слэша (`/`)

Пример: 

```html
<a href="/about"></a>
```

Если ссылка не является ссылкой на внутренную страницу, но начинается со слеша, то на ссылку необходимо добавить атрибут `data-morph-skip`.

```html
<a href="/document.pdf" data-morph-skip></a>
```

## `<head>`

В Яндекс.Метрике используется элемент `<noscript>` для сбора статистики, если js отключён. Хотя сайт не работает без JS, если вам всё же нужно добавить этот элемент, поместите его не в `<head>`, а в конец` <body>`.

Если на страницу добавляются внешние стили или скрипты, и страница загружается медленно, добавьте атрибут `data-no-waiting` к этим элементам. Этот атрибут также следует использовать для скриптов, которые не генерируют событие load, например, для скриптов типа `application/ld+json` или `<link rel="canonical"/>`.

Пример:

```html
<link data-no-waiting rel="stylesheet">
<script data-no-waiting type="application/ld+json"></script>
```

Не критично, но на скрипты метрики лучше добавить атрибут `data-permanent`.

Пример:

```html
<script type="text/javascript" data-permanent>
```